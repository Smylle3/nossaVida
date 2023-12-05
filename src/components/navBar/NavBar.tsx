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

export default function NavBar() {
	const { gridType, setGridType, isMobile, filterAlbumsSelected } = useApp();
	const { albums } = useFirestore();
	const [messageApi, contextHolder] = message.useMessage();

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
								className={`typeGrid ${gridType && 'gridSelected'}`}
								onClick={() => setGridType(true)}
							>
								<BsGrid3X3Gap size={25} />
							</div>
							<div className="line" />
							<div
								className={`typeGrid ${!gridType && 'gridSelected'}`}
								onClick={() => setGridType(false)}
							>
								<BsViewStacked size={25} />
							</div>
							<div className="line" />
							<MyDropDown
								type="filter"
								albums={albums}
								iconPosition="typeGrid"
							>
								<BsFilter size={30} />
							</MyDropDown>
						</div>
						<button className="logoutButton" onClick={logout}>
							<IoLogOut size={20} />
						</button>
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
				)}
				<UploadForm />
				<h1 className="title">❤️ Nossa Vida ❤️</h1>
			</div>
			<div className="back" />
		</>
	);
}
