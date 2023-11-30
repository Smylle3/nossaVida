import { useState } from 'react';
import './AlbumTag.css';
import { MdAdd, MdClose, MdOutlinePhotoAlbum } from 'react-icons/md';
import { message, Tag, Input } from 'antd';
import { BsCheck } from 'react-icons/bs';

import useFirestore from '../../hooks/useFirestore';
import { Album } from '../../types/albumsType';

interface AlbumTagProps {
	type: 'newAlbum' | 'oldAlbum';
	album?: Album;
	colorTag?: string;
	onClick?: React.MouseEventHandler<HTMLInputElement>;
}
export default function AlbumTag({ type, album, colorTag, onClick }: AlbumTagProps) {
	const { createAlbum, deleteAlbum } = useFirestore();
	const [inputVisible, setInputVisible] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [messageApi, contextHolder] = message.useMessage();

	const handleInputConfirm = (
		e:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		e.preventDefault();
		if (inputValue.length <= 0) {
			messageApi.open({
				type: 'error',
				content: `Dê um nome ao álbum novo! 😉`,
			});
			return;
		}
		setInputVisible(false);
		setInputValue('');
		createAlbum(inputValue);
		messageApi.open({
			type: 'success',
			content: `${inputValue} adicionado com sucesso! 🎉🎊🎇`,
		});
	};

	const handleDelete = async (AlbumTag: Album) => {
		await deleteAlbum(AlbumTag);
		messageApi.open({
			type: 'success',
			content: `Álbum deletado com sucesso!`,
		});
	};

	const handleInputCancel = () => {
		setInputVisible(false);
		setInputValue('');
	};

	const newAlbumStyle: React.CSSProperties = {
		height: 22,
		borderStyle: 'dashed',
	};

	if (type === 'newAlbum')
		return (
			<>
				{contextHolder}
				{inputVisible ? (
					<form
						className="newAlbumForm"
						onSubmit={(e) => handleInputConfirm(e)}
					>
						<Input
							type="text"
							size="small"
							className="newModalInput"
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
							autoFocus
						/>
						<button type="submit" className="createAlbumButton">
							<BsCheck size={20} />
						</button>
						<button
							onClick={handleInputCancel}
							type="button"
							className="createAlbumButton"
						>
							<MdClose size={20} />
						</button>
					</form>
				) : (
					<Tag
						style={newAlbumStyle}
						icon={<MdAdd />}
						onClick={() => setInputVisible(true)}
						className="newAlbum"
					>
						Novo álbum
					</Tag>
				)}
			</>
		);
	else if (album)
		return (
			<Tag
				icon={<MdOutlinePhotoAlbum />}
				closeIcon
				className="oldAlbum"
				onClose={() => handleDelete(album)}
				bordered={false}
				color={colorTag ? colorTag : '#845ec2'}
				onClick={onClick}
			>
				{contextHolder}
				{album?.name}
			</Tag>
		);
}
