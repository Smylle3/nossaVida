import { useState } from 'react';

import { Image } from '../../../types/imageType';
import ImageScreenModal from '../../modals/imageScreen/ImageScreenModal';
import './PolaroidImage.css';

export default function PolaroidImage({ image }: { image: Image; id: number }) {
	const timestamp = new Date(
		image.uploadAt.seconds * 1000 + image.uploadAt.nanoseconds / 1e6,
	);
	const lastModified = new Date(image.lastModifiedDate);
	const [openImage, setOpenImage] = useState<boolean>(false);

	return (
		<div className="box">
			<div className="polaroid" onClick={() => setOpenImage(true)}>
				<div
					className="photo"
					style={{ backgroundImage: `url(${image.imageUrl})` }}
				/>
				<label className="subTitle">{image.subtitle}</label>
			</div>
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
