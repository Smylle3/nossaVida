import {
	addDoc,
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
import { message } from 'antd';

import { db, storage } from '../firebase/config';
import { Image } from '../types/imageType';
import { useAuth } from './useAuth';
import { Album, ImageAlbum } from '../types/albumsType';
import { collectionName } from './../types/collectionNames';

export default function useFirestore() {
	const { user } = useAuth();
	const [messageApi] = message.useMessage();
	const [docs, setDocs] = useState<Image[]>([]);
	const [albums, setAlbums] = useState<Album[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!user) return;
		let unsubscribe: () => void;
		const getData = async () => {
			try {
				const getImages = query(
					collection(db, collectionName.image),
					orderBy('uploadAt', 'desc'),
				);
				unsubscribe = onSnapshot(getImages, (querySnapshot) => {
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
							album: doc.data()?.album,
						};
						images.push(imageFromDoc);
					});
					setDocs(images);
				});

				const getAlbums = query(collection(db, collectionName.album));
				unsubscribe = onSnapshot(getAlbums, (querySnapshot) => {
					const albums: Album[] = [];
					querySnapshot.forEach((doc) => {
						const albumFromDoc: Album = {
							id: doc.id,
							name: doc.data()?.name,
						};
						albums.push(albumFromDoc);
					});
					setAlbums(albums);
				});
			} catch (error) {
				messageApi.open({
					type: 'error',
					content: 'Erro ao carregar informações! 😢',
				});
			} finally {
				setIsLoading(false);
			}
		};

		collectionName && getData();
		return () => unsubscribe && unsubscribe();
	}, [messageApi, user]);

	const deleteImage = async (
		docName: string,
		pathName: string,
		imageName: string,
		imageFormat: string,
	) => {
		const desertRef = ref(storage, `${pathName}/${imageName}.${imageFormat}`);
		await deleteDoc(doc(db, collectionName.image, docName));
		await deleteObject(desertRef);
	};

	const updateImage = async (objectToUpdate: {
		docName: string;
		newSubtitle?: string;
		newAlbum?: ImageAlbum[];
	}) => {
		const docRef = doc(db, collectionName.image, objectToUpdate.docName);

		try {
			const updateData: { subtitle?: string; album?: ImageAlbum[] } = {};

			if (objectToUpdate.newSubtitle) {
				updateData.subtitle = objectToUpdate.newSubtitle;
			}
			if (objectToUpdate.newAlbum) {
				updateData.album = objectToUpdate.newAlbum;
			}
			updateDoc(docRef, updateData);
		} catch (error) {
			return 'falied';
		}
		return 'sucess';
	};

	/*****************************************************************************************/

	const createAlbum = async (newAlbum: string) => {
		await addDoc(collection(db, 'albums'), {
			name: newAlbum,
		}).catch(() => {
			messageApi.open({
				type: 'error',
				content: `Erro ao adicionar novo álbum 😢`,
			});
		});
	};

	const updateAlbum = async (objectToUpdate: { albumId: string; newName: string }) => {
		const docRef = doc(db, collectionName.album, objectToUpdate.albumId);

		try {
			updateDoc(docRef, {
				id: objectToUpdate.albumId,
				name: objectToUpdate.newName,
			});
		} catch (error) {
			return 'falied';
		}
		return 'sucess';
	};

	const deleteAlbum = async (albumInfos: Album) => {
		if (!albumInfos) return;
		await deleteDoc(doc(db, 'albums', albumInfos?.id)).then(() => {
			messageApi.open({
				type: 'success',
				content: `Álbum deletado com sucesso!`,
			});
		});
	};

	return {
		docs,
		albums,
		isLoading,
		deleteImage,
		updateImage,
		createAlbum,
		updateAlbum,
		deleteAlbum,
	};
}
