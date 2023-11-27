import { TbEye, TbEyeClosed } from 'react-icons/tb';
import './Footer.css';

export default function Footer() {
	return (
		<div className="footerContainer">
			<p className="footerText">❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️</p>
			<p className="footerText">QUE NOSSO AMOR DURE PARA SEMPRE</p>
			<div className="catEye">
				{'{'}
				<TbEye />
				<TbEye />
				{'} '}
				{' {'}
				<TbEyeClosed />
				<TbEyeClosed />
				{'} '}
				{' {'}
				<TbEyeClosed />
				<TbEyeClosed />
				{'} '}
				{' {'}
				<TbEyeClosed />
				<TbEyeClosed />
				{'} '}
				{' {'}
				<TbEye />
				<TbEye />
				{'}'}
			</div>
		</div>
	);
}
