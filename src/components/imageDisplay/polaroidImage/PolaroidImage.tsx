import { useState } from 'react';
import { BsFullscreen } from 'react-icons/bs';

import { Image } from '../../../types/imageType';
import ImageScreenModal from '../../modals/imageScreen/ImageScreenModal';
import './PolaroidImage.css';
import MyButton from '../../defaultComponents/myButton/MyButton';
import PopoverReaction from '../../popoverReaction/PopoverReaction';

export default function PolaroidImage({ image }: { image: Image; id: number }) {
	const timestamp = new Date(
		image.uploadAt.seconds * 1000 + image.uploadAt.nanoseconds / 1e6,
	);
	const [openImage, setOpenImage] = useState<boolean>(false);
	const [openReaction, setOpenReaction] = useState<boolean>(false);
	const position = -10;

	return (
		<div className="box">
			<div className="polaroid">
				<MyButton
					position={{ bottom: position, right: position }}
					className="imageButton"
					type="edge"
					onClick={() => setOpenImage(true)}
				>
					<BsFullscreen />
				</MyButton>
				<PopoverReaction
					open={openReaction}
					setOpen={setOpenReaction}
					image={image}
					anchor
				/>
				<div
					className="photo"
					style={{ backgroundImage: `url(${image.imageUrl})` }}
				/>
				<label className="subTitle">{image.subtitle}</label>
			</div>
			<ImageScreenModal
				image={image}
				openImage={openImage}
				setOpenImage={setOpenImage}
				timestamp={timestamp}
			/>
		</div>
	);
}
