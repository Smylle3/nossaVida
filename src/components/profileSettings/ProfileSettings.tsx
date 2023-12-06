import { Avatar, Button } from 'antd';
import { MdVerified } from 'react-icons/md';

import { useAuth } from '../../hooks/useAuth';
import './ProfileSettings.css';
import Description from '../description/Description';

export default function ProfileSettings() {
	const { user } = useAuth();
	return (
		<div className="profileContainer">
			<Avatar src={user?.photoURL} size={100} />
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
			/>
		</div>
	);
}
