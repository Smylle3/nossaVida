import { useForm } from 'react-hook-form';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import CustomInput from '../components/customInput/CustomInput';
import './style.css';
import MyButton from '../components/myButton/MyButton';
import { auth } from '../firebase/config';
import { useApp } from '../hooks/useApp';

interface FormValue {
	email: string;
	password: string;
}

export const Signup = () => {
	const { isMobile } = useApp();
	const navigate = useNavigate();
	const { handleSubmit, control } = useForm<FormValue>({
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const notify = () => {
		toast.error('Erro ao fazer login 😢', {
			position: toast.POSITION.TOP_CENTER,
		});
	};

	const onSubmit = handleSubmit(async (data) => {
		if (
			data.email === 'joao21731@gmail.com' ||
			data.email === 'carmorais14@gmail.com'
		) {
			try {
				await signInWithEmailAndPassword(auth, data.email, data.password);
				navigate('/');
			} catch (error) {
				try {
					await createUserWithEmailAndPassword(auth, data.email, data.password);
				} catch (error) {
					notify();
				}
			}
		} else notify();
	});

	if (isMobile)
		return (
			<div className="loginMobileContainer">
				<div className="recieveMobileContainer">
					<h3 className="appTitle">❤️ NOSSA VIDA ❤️</h3>
					<h2 className="recieveContainer">OI ANOCA (ou JUAU)</h2>
				</div>
				<form className="formLoginMobileContainer" onSubmit={onSubmit}>
					<h1>LOGIN</h1>
					<CustomInput<FormValue>
						id="email-id"
						control={control}
						name="email"
						type="email"
						label="Email"
						placeHolder="Digita o email aqui, ana bananinha..."
					/>
					<CustomInput<FormValue>
						id="pass-id"
						control={control}
						name="password"
						type="password"
						label="Senha"
						placeHolder="E a senha aqui, minha gatinha..."
					/>
					<MyButton type="free" formType="submit">
						😍 ENTRAR NA NOSSA VIDA 😍
					</MyButton>
				</form>
				<ToastContainer />
			</div>
		);
	else
		return (
			<div className="loginContainer">
				<div className="leftSideContainer">
					<h3 className="appTitle">❤️ NOSSA VIDA ❤️</h3>
					<h1 className="recieveContainer">OI ANOCA (ou JUAU)</h1>
				</div>
				<form className="formLoginContainer" onSubmit={onSubmit}>
					<h1>LOGIN</h1>
					<CustomInput<FormValue>
						id="email-id"
						control={control}
						name="email"
						type="email"
						label="Email"
						placeHolder="Digita o email aqui, ana bananinha..."
					/>
					<CustomInput<FormValue>
						id="pass-id"
						control={control}
						name="password"
						type="password"
						label="Senha"
						placeHolder="E a senha aqui, minha gatinha..."
					/>
					<MyButton type="free" formType="submit">
						😍 ENTRAR NA NOSSA VIDA 😍
					</MyButton>
				</form>
				<ToastContainer />
			</div>
		);
};
