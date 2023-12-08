import './MyDropDown.css';
import { MdLogout } from 'react-icons/md';
import { BsGrid3X3Gap, BsViewStacked } from 'react-icons/bs';
import { signOut } from 'firebase/auth';
import { message } from 'antd';

import { useApp } from '../../../hooks/useApp';
import { auth } from '../../../firebase/config';
import MyPopover from '../myPopover/MyPopover';
import AlbumTag from '../../albumTag/AlbumTag';
import { Album } from '../../../types/albumsType';
import useFirestore from '../../../hooks/useFirestore';
import AlbumFilter from '../../albumFilter/AlbumFilter';

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
	const { gridType, setGridType } = useApp();
	const { deleteAlbum } = useFirestore();
	const [messageApi] = message.useMessage();

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
					content={<AlbumFilter />}
				>
					{children}
				</MyPopover>
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
