import { useState } from 'react';
import { BsCloudUploadFill, BsFileImage } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Progress, Image } from 'antd';

import useStorage from '../../hooks/useStorage';
import MyButton from '../defaultComponents/myButton/MyButton';
import './UploadForm.css';
import { useAuth } from '../../hooks/useAuth';
import useFirestore from '../../hooks/useFirestore';
import AlbumTag from '../albumTag/AlbumTag';
import { Album } from '../../types/albumsType';
import MyModal from '../defaultComponents/myModal/MyModal';

interface UploadFormProps {
	modalIsOpen: boolean;
	setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function UploadForm({ modalIsOpen, setModalIsOpen }: UploadFormProps) {
	const { albums } = useFirestore();
	const { user } = useAuth();
	const { startUpload, loading } = useStorage();
	const [subTitle, setSubTitle] = useState<string>('');
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const [albumSelected, setAlbumSelected] = useState<Album[]>([]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
		if (selectedFile) {
			startUpload(selectedFile, subTitle, albumSelected, setModalIsOpen);
		}
		resetModal();
	};

	const resetModal = () => {
		setSelectedFile(null);
		setPreviewUrl(null);
		setAlbumSelected([]);
		setSubTitle('');
	};

	const removeSelectedAlbum = (album: Album) => {
		return albumSelected.filter((item) => item.id !== album.id);
	};

	const addAlbumToImage = (album: Album) => {
		const hasBeenSelected = albumSelected.find((item) => item.id === album.id);
		if (!hasBeenSelected) setAlbumSelected((e) => [...(e || []), album]);
		else {
			setAlbumSelected(removeSelectedAlbum(album));
		}
	};

	return (
		<MyModal
			openModal={modalIsOpen}
			setOpenModal={setModalIsOpen}
			afterClose={resetModal}
		>
			<div className="formContainer">
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
						{previewUrl ? (
							<>
								<div className="previewImage">
									<MyButton
										onClick={() => {
											setPreviewUrl(null);
											setSelectedFile(null);
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
												albumSelected.includes(album)
													? 'success'
													: '#845ec2'
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
						) : (
							<>
								<div
									className="dropImage"
									onDrop={handleDrop}
									onDragOver={(e) => e.preventDefault()}
								>
									<BsFileImage size={100} /> Arraste e solte
								</div>
								<input
									onChange={handleFileChange}
									type="file"
									accept="image/png, image/jpeg"
									id="fileInput"
									className="inputFile"
								/>
								<label htmlFor="fileInput" className="customFileInput">
									<BsCloudUploadFill />
									Ou selecione uma imagem <BsCloudUploadFill />
								</label>
							</>
						)}
					</div>
				)}
			</div>
		</MyModal>
	);
}
