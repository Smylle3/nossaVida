import { useState } from 'react';
import './MyDropDown.css';
import { MdDelete, MdLogout, MdSettings } from 'react-icons/md';
import { BsGrid3X3Gap, BsViewStacked } from 'react-icons/bs';
import { signOut } from 'firebase/auth';
import { message } from 'antd';

import { useApp } from '../../../hooks/useApp';
import { auth } from '../../../firebase/config';
import MyPopover from '../myPopover/MyPopover';
import AlbumTag from '../../albumTag/AlbumTag';
import { Album } from '../../../types/albumsType';
import useFirestore from '../../../hooks/useFirestore';
import MyButton from '../myButton/MyButton';
import MyModal from '../myModal/MyModal';
import Description from '../../description/Description';

interface MyDropDownProps {
	children: React.ReactElement;
	type: 'filter' | 'menu' | 'setFilter';
	albums?: Album[];
	iconPosition?: string;
	title?: string;
	clickFunction?: (album: Album, event: 'add' | 'delete') => void;
	className?: string;
}
export default function MyDropDown({
	children,
	type,
	albums,
	iconPosition,
	title,
	clickFunction,
}: MyDropDownProps) {
	const { gridType, setGridType, filterAlbumsSelected, setFilterAlbumsSelected } =
		useApp();
	const { deleteAlbum } = useFirestore();
	const [messageApi] = message.useMessage();
	const [modalConfig, setModalConfig] = useState<boolean>(false);

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			messageApi.open({
				type: 'error',
				content: 'Erro ao fazer logout 😢',
			});
		}
	};

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

	if (type === 'menu')
		return (
			<div className={`selectGrid ${iconPosition}`}>
				<MyPopover
					title=""
					content={
						<div className="dropdown-content">
							<p
								className={`pTypeGrid ${gridType && 'gridSelected'}`}
								onClick={() => setGridType(true)}
							>
								<BsViewStacked /> Visualizar por lista
							</p>
							<p
								className={`pTypeGrid ${!gridType && 'gridSelected'}`}
								onClick={() => setGridType(false)}
							>
								<BsGrid3X3Gap /> Visualizar por galeria
							</p>
							<div className="line" />
							<p className={`pTypeGrid`} onClick={logout}>
								<MdLogout /> Fazer logout
							</p>
						</div>
					}
				>
					{children}
				</MyPopover>
			</div>
		);
	else if (type === 'filter' && albums)
		return (
			<div className={`selectGrid ${iconPosition}`}>
				<MyPopover
					title={title ? title : 'Filtro de álbuns'}
					content={
						<div className="albumContainer">
							{albums.map((album) => (
								<AlbumTag
									closeIcon
									type="oldAlbum"
									album={album}
									key={album.id}
									onClose={() => handleDelete(album)}
									onClick={() => setAlbumFilter(album)}
									colorTag={`${
										filterAlbumsSelected.find(
											(item) => item.id === album.id,
										)
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
						</div>
					}
				>
					{children}
				</MyPopover>
				<MyModal openModal={modalConfig} setOpenModal={setModalConfig} footer>
					<AlbumConfig />
				</MyModal>
			</div>
		);
	else if (type === 'setFilter' && albums && clickFunction)
		return (
			<div className={`selectGrid ${iconPosition}`}>
				<MyPopover
					title={title ? title : 'Filtro de álbuns'}
					content={
						<div className="albumContainer">
							{albums.map((album) => (
								<AlbumTag
									closeIcon
									type="oldAlbum"
									album={album}
									key={album.id}
									onClick={() => clickFunction(album, 'add')}
									onClose={() => handleDelete(album)}
								/>
							))}
							<AlbumTag type="newAlbum" />
						</div>
					}
				>
					{children}
				</MyPopover>
			</div>
		);
}

const AlbumConfig = () => {
	const { albums, deleteAlbum } = useFirestore();

	return (
		<div className="modalAlbumConfigContainer">
			<h3>Edição de álbuns</h3>
			{albums.map((album) => (
				<div className="modalAlbumConfigSingleAlbum" key={album.id}>
					<Description
						typeValue="album"
						text={album.name}
						title=""
						isEdit
						id={album.id}
					/>
					<MyButton
						type="edge"
						className="modalAlbumConfigDeleteButton"
						formType="submit"
						onClick={() => deleteAlbum(album)}
					>
						<MdDelete />
					</MyButton>
				</div>
			))}
			<div className="line" />
			<h3>Adicionar novo álbum</h3>
			<Description
				typeValue="album"
				text=""
				title=""
				placeHolder="Nome do álbum"
				isEdit
				id=""
			/>
		</div>
	);
};
