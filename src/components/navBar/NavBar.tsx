import { useState } from 'react';
import { BsGrid3X3Gap, BsViewStacked } from 'react-icons/bs';
import { MdMenu } from 'react-icons/md';
import { message } from 'antd';

import './NavBar.css';
import { useApp } from '../../hooks/useApp';
import UploadForm from '../modals/uploadForm/UploadForm';
import useFirestore from '../../hooks/useFirestore';
import AlbumTag from '../albumTag/AlbumTag';
import MyDrawer from '../defaultComponents/myDrawer/MyDrawer';
import AlbumFilter from '../albumFilter/AlbumFilter';
import DrawerContent from '../defaultComponents/myDrawer/DrawerContent';
import EmojiContainer from '../emojiContainer/EmojiContainer';
import ProfileSettings from '../profileSettings/ProfileSettings';

export default function NavBar() {
	const { gridType, setGridType, isMobile, filterAlbumsSelected } = useApp();
	const { albums } = useFirestore();
	const [, contextHolder] = message.useMessage();
	const [openDrawer, setOpenDrawer] = useState<boolean>(false);

	return (
		<>
			{contextHolder}
			<div className="nav">
				{isMobile ? (
					<div
						className="typeGrid navbarOptions"
						onClick={() => setOpenDrawer(true)}
					>
						<MdMenu size={25} />
					</div>
				) : (
					<div className="navbarOptions">
						<div className={`typeGrid`} onClick={() => setOpenDrawer(true)}>
							<MdMenu size={25} />
						</div>
					</div>
				)}
				<MyDrawer open={openDrawer} setOpen={setOpenDrawer} title="Configurações">
					<div className="drawerContainer">
						<DrawerContent title="Visualização">
							<>
								<div
									className={`typeGrid ${gridType && 'gridSelected'}`}
									onClick={() => setGridType(true)}
								>
									<BsGrid3X3Gap size={25} /> Visualizar por grade
								</div>
								<div
									className={`typeGrid ${!gridType && 'gridSelected'}`}
									onClick={() => setGridType(false)}
								>
									<BsViewStacked size={25} /> Visualizar por lista
								</div>
							</>
						</DrawerContent>
						<div className="line" />
						<DrawerContent title="Álbuns">
							<AlbumFilter />
						</DrawerContent>
						<div className="line" />
						<DrawerContent title="Emojis">
							<EmojiContainer />
						</DrawerContent>
						<div className="line" />
						<DrawerContent title="Configurações de usuário">
							<ProfileSettings />
						</DrawerContent>
					</div>
				</MyDrawer>
				<div className="filterSelected">
					{filterAlbumsSelected.length === albums.length ? (
						<AlbumTag type="allAlbums" />
					) : (
						filterAlbumsSelected.map((filterSelected, index) => (
							<AlbumTag
								type="oldAlbum"
								album={filterSelected}
								key={index}
							/>
						))
					)}
				</div>
				<UploadForm />
				<h1 className="title">❤️ Nossa Vida ❤️</h1>
			</div>
			<div className="back" />
		</>
	);
}
