import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { deleteObject, ref } from 'firebase/storage';
import { message } from 'antd';
import { sendEmailVerification, updateProfile } from 'firebase/auth';

import { auth, db, storage } from '../firebase/config';
import { Image } from '../types/imageType';
import { useAuth } from './useAuth';
import { Album, ImageAlbum } from '../types/albumsType';
import { collectionName } from './../types/collectionNames';
import { MyUser } from '../types/myUserType';

export default function useFirestore() {
	const { user } = useAuth();
	const [messageApi] = message.useMessage();
	const [docs, setDocs] = useState<Image[]>([]);
	const [albums, setAlbums] = useState<Album[]>([]);
	const [myUser, setMyUser] = useState<MyUser>();
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
							reactions: doc.data()?.reactions,
							uploadBy: doc.data()?.uploadBy,
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

				if (user.email) {
					const docRef = doc(db, collectionName.user, user.email);
					const docSnap = await getDoc(docRef);

					if (docSnap.exists()) {
						unsubscribe = onSnapshot(
							doc(db, collectionName.user, user.email),
							(doc) => {
								const userFromDoc: MyUser = {
									email: doc?.data()?.email,
									emojis: doc?.data()?.emojis,
								};
								setMyUser(userFromDoc);
							},
						);
					} else {
						await setDoc(doc(db, collectionName.user, user.email), {
							email: user.email,
							emojis: ['😍', '❤️', '😂', '😢', '👍'],
						});
					}
				}
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
		reactions?: { [x: string]: string | null };
	}) => {
		const docRef = doc(db, collectionName.image, objectToUpdate.docName);

		try {
			const updateData: {
				subtitle?: string;
				album?: ImageAlbum[];
				reactions?: { [x: string]: string | null };
			} = {};
			if (objectToUpdate.newSubtitle) {
				updateData.subtitle = objectToUpdate.newSubtitle;
			}
			if (objectToUpdate.newAlbum) {
				updateData.album = objectToUpdate.newAlbum;
			}
			if (objectToUpdate.reactions) {
				updateData.reactions = objectToUpdate.reactions;
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

		const imagesWithAlbum = docs.filter(
			(image) => image.album?.some((album) => album.id === albumInfos.id),
		);

		imagesWithAlbum.forEach(async (image) => {
			const newAlbumArray = image.album.filter((album) => {
				return album.id !== albumInfos.id;
			});
			await updateImage({ docName: image.id, newAlbum: newAlbumArray });
		});

		await deleteDoc(doc(db, 'albums', albumInfos?.id));
	};

	/******************************************************************************************************/

	const updateUserEmoji = async (emojis: string[]) => {
		if (!user?.email) return;
		const docRef = doc(db, collectionName.user, user?.email);

		updateDoc(docRef, {
			emojis: emojis,
		}).catch(() => {
			return 'falied';
		});
		return 'sucess';
	};

	const updateUser = async (objectToUpdate: {
		displayName?: string;
		phoneNumber?: string;
	}) => {
		if (!auth?.currentUser) return;

		try {
			const updateData: {
				displayName?: string;
				phoneNumber?: string;
			} = {};

			if (objectToUpdate.displayName) {
				updateData.displayName = objectToUpdate.displayName;
			}
			if (objectToUpdate.phoneNumber) {
				updateData.phoneNumber = objectToUpdate.phoneNumber;
			}
			updateProfile(auth.currentUser, updateData);
		} catch {
			(err: Error) => {
				console.log(err);
			};
		}
	};

	const emailVerification = async () => {
		if (!auth?.currentUser) return;

		try {
			sendEmailVerification(auth.currentUser);
		} catch {
			(err: Error) => {
				console.log(err);
			};
		}
	};

	/******************************************************************************************************/

	return {
		docs,
		albums,
		myUser,
		isLoading,
		deleteImage,
		updateImage,
		createAlbum,
		updateAlbum,
		deleteAlbum,
		updateUserEmoji,
		updateUser,
		emailVerification,
	};
}
