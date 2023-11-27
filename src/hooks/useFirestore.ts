import { toast } from 'react-toastify';
import {
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';

import { db, storage } from '../firebase/config';
import { Image } from '../types/imageType';
import { useAuth } from './useAuth';

export default function useFirestore(collectionName: string) {
	const { user } = useAuth();
	const [docs, setDocs] = useState<Image[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!user) return;
		let unsubscribe: () => void;
		const getData = async () => {
			try {
				const q = query(
					collection(db, collectionName),
					orderBy('uploadAt', 'desc'),
				);
				unsubscribe = onSnapshot(q, (querySnapshot) => {
					const images: Image[] = [];
					querySnapshot.forEach((doc) => {
						const imageFromDoc: Image = {
							id: doc.id,
							uploadAt: doc.data()?.uploadAt,
							imageName: doc.data()?.imageName,
							imageFormat: doc.data()?.imageFormat,
							imageUrl: doc.data()?.imageUrl,
							lastModifiedDate: doc.data()?.lastModifiedDate,
							subtitle: doc.data()?.subtitle,
						};
						images.push(imageFromDoc);
					});
					setDocs(images);
				});
			} catch (error) {
				toast('Erro ao carregar informações! 😢', {
					position: 'top-center',
					type: 'error',
				});
			} finally {
				setIsLoading(false);
			}
		};

		collectionName && getData();
		return () => unsubscribe && unsubscribe();
	}, [collectionName, user]);

	const deleteImage = async (
		docName: string,
		pathName: string,
		imageName: string,
		imageFormat: string,
	) => {
		const desertRef = ref(storage, `${pathName}/${imageName}.${imageFormat}`);
		await deleteDoc(doc(db, collectionName, docName));
		await deleteObject(desertRef);
	};

	const updateImage = async (docName: string, newSubtitle: string) => {
		const docRef = doc(db, collectionName, docName);

		try {
			updateDoc(docRef, {
				subtitle: newSubtitle,
			});
		} catch (error) {
			console.log(error);
			return 'falied';
		}
		return 'sucess';
	};

	return {
		docs,
		isLoading,
		deleteImage,
		updateImage,
	};
}
