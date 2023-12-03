import { Modal } from 'antd';

import './MyModal.css';
import MyButton from '../myButton/MyButton';
import { MyModalProps } from './myModal.inteface';

export default function MyModal({
	children,
	openModal,
	setOpenModal,
	className,
	title,
	footer,
	afterClose,
	okText,
	cancelText,
	okFunction,
	cancelFunction,
	okType,
}: MyModalProps) {
	const closeModal = () => {
		setOpenModal(false);
	};

	const stylesModal = {
		body: {
			display: 'flex',
		},
	};

	const footerComponent = (
		<div className="modalFooterContainer">
			<MyButton className="modalWebButton" type="free" onClick={closeModal}>
				❌ Fechar ❌
			</MyButton>
		</div>
	);

	return (
		<Modal
			centered
			title={title}
			open={openModal}
			className={className}
			width="fit-content"
			closeIcon={null}
			styles={stylesModal}
			afterClose={afterClose}
			footer={footer && footerComponent}
			okText={okText}
			cancelText={cancelText}
			onOk={okFunction ? okFunction : () => setOpenModal(false)}
			okType={okType}
			onCancel={cancelFunction ? cancelFunction : () => setOpenModal(false)}
		>
			{children}
		</Modal>
	);
}
