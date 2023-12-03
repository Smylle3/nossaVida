import MyModal from '../../defaultComponents/myModal/MyModal';
import './ConfirmModal.css';

interface ConfirmModalProps {
	openDeleteModal: boolean;
	setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	text: string;
	okText?: string;
	okFunction: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function ConfirmModal({
	openDeleteModal,
	setOpenDeleteModal,
	okText,
	text,
	okFunction,
}: ConfirmModalProps) {
	return (
		<MyModal
			openModal={openDeleteModal}
			setOpenModal={setOpenDeleteModal}
			okText={okText}
			cancelText="Cancelar 😀"
			okFunction={okFunction}
			cancelFunction={() => setOpenDeleteModal(false)}
			okType="danger"
		>
			<div>
				<h3>{text}</h3>
			</div>
		</MyModal>
	);
}
