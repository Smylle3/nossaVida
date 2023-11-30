import { ReactElement } from 'react';
import { Modal } from 'antd';
import './MyModal.css';

interface MyModalProps {
	children: ReactElement;
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	className?: string;
	title?: string;
	footer?: React.ReactNode;
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

	return (
		<Modal
			centered
			title={title}
			open={openModal}
			onOk={closeModal}
			onCancel={closeModal}
			className={className}
			footer={footer ? footer : null}
			width="fit-content"
			closeIcon={null}
			styles={stylesModal}
			afterClose={afterClose}
		>
			{children}
		</Modal>
	);
}
