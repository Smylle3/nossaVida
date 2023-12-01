import { ReactElement } from 'react';
import { Modal } from 'antd';

import './MyModal.css';
import MyButton from '../myButton/MyButton';

interface MyModalProps {
	children: ReactElement;
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	className?: string;
	title?: string;
	footer?: boolean;
	afterClose?: () => void;
}

export default function MyModal({
	children,
	openModal,
	setOpenModal,
	className,
	title,
	footer,
	afterClose,
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
		<div className="modalWebButton">
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
			onOk={closeModal}
			onCancel={closeModal}
			className={className}
			width="fit-content"
			closeIcon={null}
			styles={stylesModal}
			afterClose={afterClose}
			footer={footer && footerComponent}
		>
			{children}
		</Modal>
	);
}
