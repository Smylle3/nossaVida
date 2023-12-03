import { Timestamp } from 'firebase/firestore';

import { ImageAlbum } from './albumsType';

export type Image = {
	id: string;
	imageName: string;
	imageFormat: string;
	imageUrl: string;
	subtitle: string;
	lastModifiedDate: number;
	album: ImageAlbum[];
	uploadAt: Timestamp;
};
