import { useState } from 'react';
import { MdSettings } from 'react-icons/md';
import { message } from 'antd';

import AlbumTag from '../albumTag/AlbumTag';
import MyButton from '../defaultComponents/myButton/MyButton';
import { Album } from '../../types/albumsType';
import { useApp } from '../../hooks/useApp';
import useFirestore from '../../hooks/useFirestore';
import AlbumConfig from '../modals/albumConfig/AlbumConfig';
import './AlbumFilter.css';

export default function AlbumFilter() {
	const { filterAlbumsSelected, setFilterAlbumsSelected } = useApp();
	const { albums, deleteAlbum } = useFirestore();
	const [messageApi] = message.useMessage();
	const [modalConfig, setModalConfig] = useState<boolean>(false);

	const handleDelete = async (AlbumTag: Album) => {
		await deleteAlbum(AlbumTag);
		messageApi.open({
			type: 'success',
			content: `Álbum deletado com sucesso!`,
		});
	};

	const setAlbumFilter = (album: Album) => {
		const hasBeenSelected = filterAlbumsSelected.find((item) => item.id === album.id);
		if (hasBeenSelected) {
			setFilterAlbumsSelected(
				filterAlbumsSelected.filter((item) => item.id !== album.id),
			);
		} else {
			setFilterAlbumsSelected((prev) => [...prev, album]);
		}
	};
	return (
		<div className="albumContainer">
			{albums.map((album) => (
				<AlbumTag
					type="oldAlbum"
					album={album}
					key={album.id}
					onClose={() => handleDelete(album)}
					onClick={() => setAlbumFilter(album)}
					colorTag={`${
						filterAlbumsSelected.find((item) => item.id === album.id)
							? '#845ec2'
							: 'purple'
					}`}
				/>
			))}
			<AlbumTag type="newAlbum" />
			<MyButton
				type="edge"
				className="albumConfig"
				onClick={() => setModalConfig(true)}
			>
				<MdSettings />
			</MyButton>
			<AlbumConfig modalConfig={modalConfig} setModalConfig={setModalConfig} />
		</div>
	);
}
