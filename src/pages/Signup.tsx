import { useForm } from 'react-hook-form';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useEffect, useState } from 'react';

import CustomInput from '../components/defaultComponents/customInput/CustomInput';
import './style.css';
import MyButton from '../components/defaultComponents/myButton/MyButton';
import { auth } from '../firebase/config';
import { useApp } from '../hooks/useApp';
import { anaNicknames } from '../utils/Nicknames';

interface FormValue {
	email: string;
	password: string;
}

export const Signup = () => {
	const [randomNickname, setRandomNickname] = useState<number>(0);
	const { isMobile } = useApp();
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();
	const { handleSubmit, control } = useForm<FormValue>({
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const notify = () => {
		messageApi.open({
			type: 'error',
			content: 'Erro ao fazer login 😢',
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

	useEffect(() => {
		const randomNumber = Math.floor(Math.random() * anaNicknames.length);
		setRandomNickname(randomNumber);
	}, []);

	if (isMobile)
		return (
			<>
				{contextHolder}
				<div className="loginMobileContainer">
					<div className="recieveMobileContainer">
						<h3 className="appTitle">❤️ NOSSA VIDA ❤️</h3>
						<h2 className="recieveContainer">
							OI {anaNicknames[randomNickname]}!!
						</h2>
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
				</div>
			</>
		);
	else
		return (
			<div className="loginContainer">
				{contextHolder}
				<div className="leftSideContainer">
					<h3 className="appTitle">❤️ NOSSA VIDA ❤️</h3>
					<h1 className="recieveContainer">
						Oii {anaNicknames[randomNickname]}!!
					</h1>
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
			</div>
		);
};
