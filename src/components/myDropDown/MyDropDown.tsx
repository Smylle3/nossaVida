import './MyDropDown.css';
import { MdLogout } from 'react-icons/md';
import { BsGrid3X3Gap, BsViewStacked } from 'react-icons/bs';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

import { useApp } from '../../hooks/useApp';
import { auth } from '../../firebase/config';

interface MyDropDownProps {
	isOpen: boolean;
}
export default function MyDropDown({ isOpen }: MyDropDownProps) {
	const { gridType, setGridType } = useApp();

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
		<div className="dropdown">
			{isOpen && (
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
			)}
		</div>
	);
}
