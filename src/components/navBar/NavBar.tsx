import { useState } from 'react';
import { BsGrid3X3Gap, BsViewStacked, BsList, BsFilter } from 'react-icons/bs';
import { MdAddToPhotos } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';
import { signOut } from 'firebase/auth';
import { message } from 'antd';

import './NavBar.css';
import { auth } from '../../firebase/config';
import { useApp } from '../../hooks/useApp';
import UploadForm from '../uploadForm/UploadForm';
import MyDropDown from '../defaultComponents/myDropDown/MyDropDown';
import MyButton from '../defaultComponents/myButton/MyButton';
import useFirestore from '../../hooks/useFirestore';

export default function NavBar() {
	const { gridType, setGridType, isMobile } = useApp();
	const { albums } = useFirestore();
	const [messageApi, contextHolder] = message.useMessage();
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	const openModal = () => {
		setModalIsOpen(true);
	};

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
						<button className="logoutButton" onClick={openModal}>
							<MdAddToPhotos size={20} />
						</button>
					</>
				) : (
					<>
						<MyButton type="fixed" onClick={openModal}>
							🥰 Guardar lembrança 🥰
						</MyButton>
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
					</>
				)}
				<UploadForm modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
				<h1 className="title">❤️ Nossa Vida ❤️</h1>
			</div>
			<div className="back" />
		</>
	);
}
