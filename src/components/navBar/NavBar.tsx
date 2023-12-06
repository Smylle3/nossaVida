import { useState } from 'react';
import { BsGrid3X3Gap, BsViewStacked, BsList, BsFilter } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5';
import { signOut } from 'firebase/auth';
import { message } from 'antd';

import './NavBar.css';
import { auth } from '../../firebase/config';
import { useApp } from '../../hooks/useApp';
import UploadForm from '../modals/uploadForm/UploadForm';
import MyDropDown from '../defaultComponents/myDropDown/MyDropDown';
import useFirestore from '../../hooks/useFirestore';
import AlbumTag from '../albumTag/AlbumTag';
import MyDrawer from '../defaultComponents/myDrawer/MyDrawer';
import AlbumFilter from '../albumFilter/AlbumFilter';
import DrawerContent from '../defaultComponents/myDrawer/DrawerContent';
import EmojiContainer from '../emojiContainer/EmojiContainer';
import ProfileSettings from '../profileSettings/profileSettings';

export default function NavBar() {
	const { gridType, setGridType, isMobile, filterAlbumsSelected } = useApp();
	const { albums } = useFirestore();
	const [messageApi, contextHolder] = message.useMessage();
	const [openDrawer, setOpenDrawer] = useState<boolean>(false);

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

	return (
		<>
			{contextHolder}
			<div className="nav">
				{isMobile ? (
					<>
						<MyDropDown type="menu" iconPosition="menuPosition">
							<BsList size={30} />
						</MyDropDown>
						<MyDropDown
							type="filter"
							albums={albums}
							iconPosition="filterPosition"
						>
							<BsFilter size={30} />
						</MyDropDown>
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
					</>
				) : (
					<>
						<div className="webNavbarOptions">
							<div
								className={`typeGrid`}
								onClick={() => setOpenDrawer(true)}
							>
								<BsGrid3X3Gap size={25} />
							</div>
						</div>
						<MyDrawer
							open={openDrawer}
							setOpen={setOpenDrawer}
							title="userConfigs"
						>
							<div className="drawerContainer">
								<DrawerContent title="Visualização">
									<>
										<div
											className={`typeGrid ${
												gridType && 'gridSelected'
											}`}
											onClick={() => setGridType(true)}
										>
											<BsGrid3X3Gap size={25} /> Visualizar por
											grade
										</div>
										<div
											className={`typeGrid ${
												!gridType && 'gridSelected'
											}`}
											onClick={() => setGridType(false)}
										>
											<BsViewStacked size={25} /> Visualizar por
											lista
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
						<button className="logoutButton" onClick={logout}>
							<IoLogOut size={20} />
						</button>
					</>
				)}
				<UploadForm />
				<h1 className="title">❤️ Nossa Vida ❤️</h1>
			</div>
			<div className="back" />
		</>
	);
}
