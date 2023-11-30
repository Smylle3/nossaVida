import { Timestamp } from 'firebase/firestore';

import { Album } from './albumsType';

export type Image = {
	id: string;
	imageName: string;
	imageFormat: string;
	imageUrl: string;
	subtitle: string;
	lastModifiedDate: number;
	album?: Album[];
	uploadAt: Timestamp;
};
