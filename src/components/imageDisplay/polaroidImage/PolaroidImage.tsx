import { useState } from 'react';

import { Image } from '../../../types/imageType';
import ImageScreenModal from '../../modals/imageScreen/ImageScreenModal';
import './PolaroidImage.css';
import PopoverReaction from '../../popoverReaction/PopoverReaction';
import MyBadge from '../../defaultComponents/myBadge/MyBadge';

export default function PolaroidImage({ image }: { image: Image; id: number }) {
	const timestamp = new Date(
		image.uploadAt.seconds * 1000 + image.uploadAt.nanoseconds / 1e6,
	);
	const [openImage, setOpenImage] = useState<boolean>(false);
	const [openReaction, setOpenReaction] = useState<boolean>(false);

	return (
		<div className="box">
			<MyBadge image={image}>
				<div className="polaroid" onClick={() => setOpenImage(true)}>
					<div
						className="photo"
						style={{ backgroundImage: `url(${image.imageUrl})` }}
					/>
					<label className="subTitle">{image.subtitle}</label>
				</div>
			</MyBadge>
			<PopoverReaction
				open={openReaction}
				setOpen={setOpenReaction}
				image={image}
				anchor
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
