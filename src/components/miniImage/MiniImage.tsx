import { useState } from 'react';

import { Image } from '../../types/imageType';
import ImageScreenModal from '../modal/ImageScreenModal';
import './MiniImage.css';

export default function MiniImage({ image }: { image: Image }) {
	const [openImage, setOpenImage] = useState<boolean>(false);
	const timestamp = new Date(
		image.uploadAt.seconds * 1000 + image.uploadAt.nanoseconds / 1e6,
	);
	const lastModified = new Date(image.lastModifiedDate);

	return (
		<div className="mini" onClickCapture={() => setOpenImage(true)}>
			<div
				className="miniPhoto"
				style={{ backgroundImage: `url(${image.imageUrl})` }}
			/>
			<ImageScreenModal
				image={image}
				lastModified={lastModified}
				openImage={openImage}
				setOpenImage={setOpenImage}
				timestamp={timestamp}
			/>
		</div>
	);
}
