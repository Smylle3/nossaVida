import { useState } from 'react';
import './AlbumTag.css';
import { MdAdd, MdClose, MdOutlinePhotoAlbum } from 'react-icons/md';
import { message, Tag, Input } from 'antd';
import { BsCheck } from 'react-icons/bs';

import useFirestore from '../../hooks/useFirestore';
import { Album } from '../../types/albumsType';

interface AlbumTagProps {
	type: 'newAlbum' | 'oldAlbum' | 'allAlbums';
	album?: Album;
	colorTag?: string;
	onClick?: React.MouseEventHandler<HTMLInputElement>;
	onClose?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
	closeIcon?: boolean;
}
export default function AlbumTag({
	type,
	album,
	colorTag,
	onClick,
	onClose,
	closeIcon,
}: AlbumTagProps) {
	const { createAlbum } = useFirestore();
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
	else if (type === 'oldAlbum' && album)
		return (
			<Tag
				icon={<MdOutlinePhotoAlbum />}
				closeIcon={closeIcon}
				className="oldAlbum"
				onClose={onClose}
				bordered={false}
				color={colorTag ? colorTag : '#845ec2'}
				onClick={onClick}
			>
				{album?.name}
			</Tag>
		);
	else if (type === 'allAlbums')
		return (
			<Tag
				icon={<MdOutlinePhotoAlbum />}
				className="oldAlbum"
				color="#845ec2"
				bordered={false}
			>
				Todos os álbuns
			</Tag>
		);
}
