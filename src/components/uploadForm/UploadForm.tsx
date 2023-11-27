import { useState } from 'react';
import { BsCloudUploadFill, BsFileImage } from 'react-icons/bs';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { Circle } from 'rc-progress';

import useStorage from '../../hooks/useStorage';
import MyButton from '../myButton/MyButton';
import './UploadForm.css';

export default function UploadForm() {
	const { startUpload, loading } = useStorage();
	const [subTitle, setSubTitle] = useState<string>('');
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleFile(e.target.files);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		handleFile(e.dataTransfer.files);
	};

	const handleFile = (files: FileList | null) => {
		if (files && files[0]) {
			const file = files[0];
			console.log(file);
			const reader = new FileReader();
			reader.onload = () => {
				setPreviewUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
			setSelectedFile(files[0]);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (selectedFile) {
			startUpload(selectedFile, subTitle);
		}
		setSelectedFile(null);
		setPreviewUrl(null);
	};

	return (
		<div className="formContainer">
			{loading >= 0 ? (
				<div className="progress">
					{loading != 100 ? (
						<>
							<Circle
								percent={loading}
								strokeWidth={6}
								strokeColor="#845EC2"
								trailColor="#B0A8B9"
							/>
							<span>Estamos fazendo o upload...</span>
						</>
					) : (
						<>
							<IoCheckmarkDoneCircle size={300} />
							<div>"Upload realizado com sucesso!"</div>
						</>
					)}
				</div>
			) : (
				<form onSubmit={handleSubmit} className="myForm">
					{previewUrl ? (
						<>
							<div className="imagePreview">
								<MyButton
									onClick={() => {
										setPreviewUrl(null);
										setSelectedFile(null);
									}}
									type="edge"
									className="deletePreview"
									position={{ top: -10, left: -10 }}
								>
									<MdDelete />
								</MyButton>
								<div className="previewPhoto">
									<img
										className="previewImage"
										src={previewUrl}
										alt="image"
									/>
								</div>
								<input
									onChange={(e) => setSubTitle(e.target.value)}
									className="previewSubTitle"
									type="text"
									placeholder="Descrição"
								/>
							</div>
							<MyButton type="free" formType="submit">
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
				</form>
			)}
		</div>
	);
}
