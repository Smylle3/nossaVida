import React from 'react';
import { MdClose, MdOutlineFileDownload } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Image as ImageAntd } from 'antd';

import MyModal from './MyModal';
import Description from '../../description/Description';
import MyButton from '../myButton/MyButton';
import { Image } from '../../../types/imageType';
import { useApp } from '../../../hooks/useApp';
import './ImageScreenModal.css';

interface ImageScreenModalProps {
	openImage: boolean;
	setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
	image: Image;
	lastModified: Date;
	timestamp: Date;
}

export default function ImageScreenModal({
	openImage,
	setOpenImage,
	image,
	lastModified,
	timestamp,
}: ImageScreenModalProps) {
	const { isMobile } = useApp();

	if (isMobile)
		return (
			<MyModal
				openModal={openImage}
				setOpenModal={setOpenImage}
				footer={
					<div>
						<MyButton
							type="edge"
							className="mobileCloseButton"
							onClick={() => setOpenImage(false)}
						>
							<MdClose size={25} />
						</MyButton>
						<Link to={image.imageUrl} download target="_blank">
							<MyButton type="edge" className="mobileDownloadButton">
								<MdOutlineFileDownload size={25} />
							</MyButton>
						</Link>
					</div>
				}
			>
				<div className="mobileModalContainer">
					<div className="modalMobileImage">
						<ImageAntd src={image.imageUrl} className="mobileImage" />
					</div>
					<div className="modalMobileDescription">
						<Description
							text={image.subtitle}
							title="Descrição"
							isEdit
							imageId={image.id}
						/>
						<Description
							text={lastModified.toLocaleString()}
							title="Data da ultima alteração"
						/>
						<Description
							text={timestamp.toLocaleString()}
							title="Data de upload"
						/>
					</div>
				</div>
			</MyModal>
		);
	else
		return (
			<MyModal
				openModal={openImage}
				setOpenModal={setOpenImage}
				footer={
					<div className="modalWebButton">
						<MyButton
							className="modalWebButton"
							type="free"
							onClick={() => setOpenImage(false)}
						>
							❌ Fechar ❌
						</MyButton>
					</div>
				}
			>
				<div className="modalWebContainer">
					<div className="modalWebImage">
						<ImageAntd src={image.imageUrl} height="100%" />
					</div>
					<div className="modalWebDescription">
						<Description
							text={image.subtitle}
							title="Descrição:"
							isEdit
							imageId={image.id}
						/>
						<Description
							text={lastModified.toLocaleString()}
							title="Data da ultima alteração:"
						/>
						<Description
							text={timestamp.toLocaleString()}
							title="Data de upload:"
						/>
					</div>
				</div>
			</MyModal>
		);
}
