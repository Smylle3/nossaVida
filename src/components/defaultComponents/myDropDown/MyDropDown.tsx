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

interface MyDropDownProps {
	children: React.ReactElement;
	type: 'filter' | 'menu';
	albums?: Album[];
	iconPosition?: string;
}
export default function MyDropDown({
	children,
	type,
	albums,
	iconPosition,
}: MyDropDownProps) {
	const { gridType, setGridType } = useApp();
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
					title="Filtro de álbuns"
					content={
						<div className="albumContainer">
							{albums.map((album) => (
								<AlbumTag type="oldAlbum" album={album} key={album.id} />
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
