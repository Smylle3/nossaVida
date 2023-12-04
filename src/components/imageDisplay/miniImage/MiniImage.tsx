import { useState } from 'react';

import { Image } from '../../../types/imageType';
import ImageScreenModal from '../../modals/imageScreen/ImageScreenModal';
import './MiniImage.css';

export default function MiniImage({ image }: { image: Image }) {
	const [openImage, setOpenImage] = useState<boolean>(false);
	const timestamp = new Date(
		image.uploadAt.seconds * 1000 + image.uploadAt.nanoseconds / 1e6,
	);

	return (
		<div className="mini" onClickCapture={() => setOpenImage(true)}>
			<div
				className="miniPhoto"
				style={{ backgroundImage: `url(${image.imageUrl})` }}
			/>
			<ImageScreenModal
				image={image}
				openImage={openImage}
				setOpenImage={setOpenImage}
				timestamp={timestamp}
			/>
		</div>
	);
}
