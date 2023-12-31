import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';

import { db, storage } from '../firebase/config';
import { ImageAlbum } from '../types/albumsType';
import { useAuth } from './useAuth';

export default function useStorage() {
	const { user } = useAuth();
	const [error, setError] = useState<Error | null>(null);
	const [url, setUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState<number>(-1);

	const startUpload = async (
		file: File,
		subtitle: string,
		albunsSelected: ImageAlbum[],
		setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
	) => {
		if (!file) return;

		const nameFIle = uuidv4();
		const formatFIle = file.type.split('/')[1];
		const storageRef = ref(storage, `nossaVida/${nameFIle}.${formatFIle}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setLoading(progress);
			},
			(error) => {
				setError(error);
			},
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
				setUrl(downloadURL);
				await addDoc(collection(db, 'images'), {
					imageName: nameFIle,
					imageFormat: formatFIle,
					imageUrl: downloadURL,
					subtitle: subtitle,
					lastModifiedDate: file.lastModified,
					album: albunsSelected,
					uploadAt: new Date(),
					reaction: {},
					uploadBy: user?.email,
				});
				setLoading(-1);
				setOpenModal(false);
			},
		);
	};

	return { error, url, startUpload, loading };
}
