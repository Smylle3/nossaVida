import { useState } from 'react';
import { MdDelete, MdFullscreen, MdOutlineFileDownload } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Image } from '../../../types/imageType';
import MyButton from '../../defaultComponents/myButton/MyButton';
import useFirestore from '../../../hooks/useFirestore';
import ImageScreenModal from '../../modals/imageScreen/ImageScreenModal';

import './CardImage.css';

export default function CardImage({ image }: { image: Image; id: number }) {
	const { deleteImage } = useFirestore();
	const [openImage, setOpenImage] = useState<boolean>(false);
	const timestamp = new Date(
		image.uploadAt.seconds * 1000 + image.uploadAt.nanoseconds / 1e6,
	);
	const lastModified = new Date(image.lastModifiedDate);
	const position = -10;

	return (
		<div className="card">
			<div className="cardImage">
				<div
					className="cardPhoto"
					style={{ backgroundImage: `url(${image.imageUrl})` }}
				/>
			</div>
			<div className="cardLine" />
			<div className="description">
				<p className="cardSubtitle">{image.subtitle}</p>
				<p>Data de upload: {timestamp.toLocaleString()}</p>
				<p>Data da ultima alteração: {lastModified.toLocaleString()}</p>
			</div>
			<MyButton
				position={{ bottom: position, left: position }}
				className="deleteButton"
				type="edge"
				onClick={() =>
					deleteImage(image.id, 'nossaVida', image.imageName, image.imageFormat)
				}
			>
				<MdDelete />
			</MyButton>
			<Link to={image.imageUrl} download target="_blank">
				<MyButton
					position={{ bottom: position, right: position }}
					className="deleteButton"
					type="edge"
				>
					<MdOutlineFileDownload />
				</MyButton>
			</Link>
			<MyButton
				position={{ top: position, right: position }}
				className="zoomButton"
				type="edge"
				onClick={() => setOpenImage(true)}
			>
				<MdFullscreen />
			</MyButton>
			<ImageScreenModal
				image={image}
				openImage={openImage}
				setOpenImage={setOpenImage}
				timestamp={timestamp}
			/>
		</div>
	);
}
