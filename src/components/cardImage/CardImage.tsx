import { useState } from "react";
import { MdDelete, MdFullscreen } from 'react-icons/md';
import { Image } from '../../types/imageType'
import MyButton from '../myButton/MyButton';
import useFirestore from '../../hooks/useFirestore';
import ImageScreenModal from "../modal/ImageScreenModal";
import "./cardImage.css"

export default function CardImage({ image }: { image: Image, id: number }) {
	const { deleteImage } = useFirestore("images");
	const [openImage, setOpenImage] = useState<boolean>(false);
	const timestamp = new Date(image.uploadAt.seconds * 1000 + image.uploadAt.nanoseconds / 1e6);
	const lastModified = new Date(image.lastModifiedDate);
	const position = -10;

	return (
		<div className="card" >
			<div className="cardImage">
				<div className="cardPhoto" style={{ backgroundImage: `url(${image.imageUrl})` }} />
			</div>
			<div className="cardLine" />
			<div className="description">
				<p className="cardSubtitle" >{image.subtitle}</p>
				<p>Data de upload: {timestamp.toLocaleString()}</p>
				<p>Data da ultima alteração: {lastModified.toLocaleString()}</p>
			</div>
			<MyButton
				position={{ bottom: position, left: position }}
				className="deleteButton"
				type="edge"
				onClick={() => deleteImage(image.id, "nossaVida", image.imageName, image.imageFormat)}
			>
				<MdDelete />
			</MyButton>
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
				lastModified={lastModified}
				openImage={openImage}
				setOpenImage={setOpenImage}
				timestamp={timestamp}
			/>
		</div>
	)
}
