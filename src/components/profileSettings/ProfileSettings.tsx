import { Button } from 'antd';
//import { MdVerified } from 'react-icons/md';
import { signOut } from 'firebase/auth';
import { MdLogout } from 'react-icons/md';

//import { useAuth } from '../../hooks/useAuth';
import './ProfileSettings.css';
//import Description from '../description/Description';
import { auth } from '../../firebase/config';

export default function ProfileSettings() {
	//const { user } = useAuth();

	const logout = async () => {
		try {
			await signOut(auth);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="profileContainer">
			{/*<Avatar src={user?.photoURL} size={100} />
			<p>
				{user?.email}{' '}
				{user?.emailVerified ? <MdVerified /> : <Button>Verificar Email</Button>}
			</p>
			<Description
				text={user?.displayName || ''}
				title="Nome de usuário"
				typeValue="user"
				placeHolder="Defina um nome de usuário"
				isEdit
			/>
			<Description
				text={user?.phoneNumber || ''}
				title="Numero de telefone"
				placeHolder="Digite seu número de telefone"
				typeValue="phone"
				isEdit
			/>*/}
			<Button type="primary" onClick={logout} danger icon={<MdLogout />}>
				Logout
			</Button>
		</div>
	);
}
