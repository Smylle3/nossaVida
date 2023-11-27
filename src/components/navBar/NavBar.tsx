import { useState } from 'react';
import { BsGrid3X3Gap, BsViewStacked, BsList } from 'react-icons/bs';
import { MdAddToPhotos } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

import { auth } from '../../firebase/config';
import { useApp } from '../../hooks/useApp';
import UploadForm from '../uploadForm/UploadForm';
import MyModal from '../modal/MyModal';
import MyDropDown from '../myDropDown/MyDropDown';
import MyButton from '../myButton/MyButton';

import './NavBar.css';

export default function NavBar() {
	const { gridType, setGridType, isMobile } = useApp();
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

	const toggleMenu = () => {
		setIsOpenMenu(!isOpenMenu);
	};

	const openModal = () => {
		setModalIsOpen(true);
	};

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			toast.error('Erro ao fazer login 😢', {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	return (
		<>
			<div className="nav">
				{isMobile ? (
					<>
						<div className="selectGrid hamburguerMenu" onClick={toggleMenu}>
							<BsList size={30} />
							<MyDropDown isOpen={isOpenMenu} />
						</div>
						<MyButton
							type="edge"
							className="newImageMobile"
							onClick={openModal}
						>
							<MdAddToPhotos size={20} />
						</MyButton>
					</>
				) : (
					<>
						<MyButton type="fixed" onClick={openModal}>
							🥰 Guardar lembrança 🥰
						</MyButton>
						<div className="selectGrid">
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
						</div>
						<MyButton
							type="edge"
							className="logoutWebButton"
							onClick={logout}
						>
							<IoLogOut size={20} />
						</MyButton>
					</>
				)}
				<MyModal
					className="uploadModal"
					modalIsOpen={modalIsOpen}
					setModalIsOpen={setModalIsOpen}
				>
					<UploadForm />
				</MyModal>
				<h1 className="title">❤️ Nossa Vida ❤️</h1>
			</div>
			<div className="back" />
		</>
	);
}
