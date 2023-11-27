import { ReactElement } from 'react';
import Modal from 'react-modal';
import './MyModal.css';

interface MyModalProps {
	children: ReactElement;
	modalIsOpen: boolean;
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	className?: string;
}

export default function MyModal({
	children,
	modalIsOpen,
	setModalIsOpen,
	className,
}: MyModalProps) {
	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				className={`myModal ${className}`}
				overlayClassName="overlay"
			>
				{children}
			</Modal>
		</>
	);
}
