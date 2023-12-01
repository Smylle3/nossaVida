import { useApp } from '../../hooks/useApp';
import useFirestore from '../../hooks/useFirestore';
import CardImage from '../imageDisplay/cardImage/CardImage';
import MiniImage from '../imageDisplay/miniImage/MiniImage';
import PolaroidImage from '../imageDisplay/polaroidImage/PolaroidImage';
import './ImageGallery.css';

export default function ImageGallery() {
	const { gridType, isMobile } = useApp();
	const { docs: images } = useFirestore();

	if (gridType) {
		return (
			<div className="polaroidContainer">
				{images.map((image, index) => (
					<PolaroidImage image={image} id={index} key={image.id} />
				))}
			</div>
		);
	} else if (!isMobile) {
		return (
			<div className="cardContainer">
				{images.map((image, index) => (
					<CardImage image={image} id={index} key={image.id} />
				))}
			</div>
		);
	} else {
		return (
			<div className="miniContainer">
				<div className="miniGridContainer">
					{images.map((image) => (
						<MiniImage image={image} key={image.id} />
					))}
				</div>
			</div>
		);
	}
}
