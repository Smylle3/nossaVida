import { useState } from 'react';
import { BsCloudUploadFill, BsFileImage } from 'react-icons/bs';
import { MdAddToPhotos, MdDelete } from 'react-icons/md';
import { Progress, Image, message } from 'antd';

import useStorage from '../../../hooks/useStorage';
import MyButton from '../../defaultComponents/myButton/MyButton';
import './UploadForm.css';
import { useAuth } from '../../../hooks/useAuth';
import useFirestore from '../../../hooks/useFirestore';
import AlbumTag from '../../albumTag/AlbumTag';
import { ImageAlbum } from '../../../types/albumsType';
import MyModal from '../../defaultComponents/myModal/MyModal';
import { useApp } from '../../../hooks/useApp';
import MyPopover from '../../defaultComponents/myPopover/MyPopover';

export default function UploadForm() {
	const [messageApi, contextHolder] = message.useMessage();
	const { albums } = useFirestore();
	const { user } = useAuth();
	const { isMobile } = useApp();
	const { startUpload, loading } = useStorage();
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
	const [webModalIsOpen, setWebModalIsOpen] = useState<boolean>(false);
	const [subTitle, setSubTitle] = useState<string>('');
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [albumSelected, setAlbumSelected] = useState<ImageAlbum[]>([]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWebModalIsOpen(false);
		setModalIsOpen(true);
		handleFile(e.target.files);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		handleFile(e.dataTransfer.files);
	};

	const handleFile = (files: FileList | null) => {
		if (!user) return;
		if (files && files[0]) {
			const file = files[0];
			const reader = new FileReader();
			reader.onload = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
			setSelectedFile(files[0]);
		}
	};

	const handleSubmit = () => {
		if (albumSelected.length <= 0) {
			messageApi.open({
				type: 'error',
				content: `Adicione pelo menos um álbum à imagem! 🤓`,
			});
			return;
		}
		if (selectedFile) {
			startUpload(selectedFile, subTitle, albumSelected, setModalIsOpen);
		}
		resetModal();
	};

	const resetModal = () => {
		setWebModalIsOpen(false);
		setSelectedFile(null);
		setPreviewUrl(null);
		setAlbumSelected([]);
		setSubTitle('');
	};

	const removeSelectedAlbum = (albumId: ImageAlbum) => {
		return albumSelected.filter((item) => item.id !== albumId.id);
	};

	const addAlbumToImage = (albumId: ImageAlbum) => {
		const hasBeenSelected = albumSelected.find((item) => item.id === albumId.id);
		if (!hasBeenSelected) setAlbumSelected((e) => [...(e || []), { id: albumId.id }]);
		else {
			setAlbumSelected(removeSelectedAlbum(albumId));
		}
	};

	return (
		<>
			<MyModal
				openModal={modalIsOpen}
				setOpenModal={setModalIsOpen}
				afterClose={resetModal}
				footer={false}
			>
				<div className="formContainer">
					{contextHolder}
					{loading >= 0 ? (
						<div className="progress">
							<Progress
								percent={Math.floor(loading)}
								type="circle"
								strokeColor="#845EC2"
								trailColor="#B0A8B9"
								strokeWidth={5}
								success={{
									percent: Math.floor(loading),
									strokeColor: '#00C2A8',
								}}
							/>
							{loading != 100 ? (
								<span>Estamos fazendo o upload...</span>
							) : (
								<span style={{ color: '#00C2A8' }}>
									Upload realizado com sucesso!
								</span>
							)}
						</div>
					) : (
						<div className="formUploadImage">
							{previewUrl && (
								<>
									<div className="previewImage">
										<MyButton
											onClick={() => {
												setPreviewUrl(null);
												setSelectedFile(null);
												setModalIsOpen(false);
											}}
											type="edge"
											className="previewDelete"
											position={{ top: -10, left: -10 }}
										>
											<MdDelete />
										</MyButton>
										<div className="previewPhoto">
											<Image
												src={previewUrl}
												className="previewAntdImage"
											/>
										</div>
										<input
											onChange={(e) => setSubTitle(e.target.value)}
											className="previewSubTitle"
											type="text"
											placeholder="Descrição"
										/>
									</div>
									<div className="previewAlbums">
										{albums.map((album) => (
											<AlbumTag
												type="oldAlbum"
												album={album}
												key={album.id}
												colorTag={`${
													albumSelected.find(
														(item) => item.id === album.id,
													)
														? '#845ec2'
														: 'purple'
												}`}
												onClick={() => addAlbumToImage(album)}
											/>
										))}
										<AlbumTag type="newAlbum" />
									</div>
									<MyButton type="free" onClick={() => handleSubmit()}>
										⬆️ Fazer Upload ⬆️
									</MyButton>
								</>
							)}
						</div>
					)}
				</div>
			</MyModal>
			{isMobile ? (
				<label htmlFor="fileInput" className="logoutButton">
					<MdAddToPhotos size={20} />
				</label>
			) : (
				<>
					<MyPopover
						content={
							<div className="formContainer">
								<div
									className="dropImage"
									onDrop={handleDrop}
									onDragOver={(e) => e.preventDefault()}
								>
									<BsFileImage size={100} /> Arraste e solte
								</div>
								<label htmlFor="fileInput" className="customFileInput">
									<BsCloudUploadFill />
									Ou selecione uma imagem <BsCloudUploadFill />
								</label>
							</div>
						}
						open={webModalIsOpen}
						setOpen={setWebModalIsOpen}
					>
						<MyButton type="fixed" onClick={() => setWebModalIsOpen(true)}>
							🥰 Guardar lembrança 🥰
						</MyButton>
					</MyPopover>
				</>
			)}
			<input
				onChange={handleFileChange}
				type="file"
				accept="image/png, image/jpeg"
				id="fileInput"
				className="inputFile"
			/>
		</>
	);
}
