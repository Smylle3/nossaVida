import { useEffect, useState } from 'react';

import { useApp } from '../../hooks/useApp';
import useFirestore from '../../hooks/useFirestore';
import CardImage from '../imageDisplay/cardImage/CardImage';
import MiniImage from '../imageDisplay/miniImage/MiniImage';
import PolaroidImage from '../imageDisplay/polaroidImage/PolaroidImage';
import './ImageGallery.css';
import { Image } from '../../types/imageType';

export default function ImageGallery() {
	const { gridType, isMobile, filterAlbumsSelected } = useApp();
	const { docs: images, albums } = useFirestore();
	const [newImageArray, setNewImageArray] = useState<Image[]>(images);

	useEffect(() => {
		if (filterAlbumsSelected.length !== albums.length) {
			const filteredImage = images.filter((image) => {
				return image.album.some((album) =>
					filterAlbumsSelected.some(
						(selectedAlbum) => album.id === selectedAlbum.id,
					),
				);
			});
			setNewImageArray(filteredImage);
		} else if (filterAlbumsSelected.length === albums.length) {
			setNewImageArray(images);
		}
	}, [albums, filterAlbumsSelected, images]);

	if (gridType) {
		return (
			<div className="polaroidContainer">
				{newImageArray.map((image, index) => (
					<PolaroidImage image={image} id={index} key={image.id} />
				))}
			</div>
		);
	} else if (!isMobile) {
		return (
			<div className="cardContainer">
				{newImageArray.map((image, index) => (
					<CardImage image={image} id={index} key={image.id} />
				))}
			</div>
		);
	} else {
		return (
			<div className="miniContainer">
				<div className="miniGridContainer">
					{newImageArray.map((image) => (
						<MiniImage image={image} key={image.id} />
					))}
				</div>
			</div>
		);
	}
}
