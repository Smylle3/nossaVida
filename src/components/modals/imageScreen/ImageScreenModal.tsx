import React, { useState } from 'react';
import { Image as ImageAntd } from 'antd';
import { BsFilter } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';

import MyModal from '../../defaultComponents/myModal/MyModal';
import Description from '../../description/Description';
import { Image } from '../../../types/imageType';
import { useApp } from '../../../hooks/useApp';
import './ImageScreenModal.css';
import AlbumTag from '../../albumTag/AlbumTag';
import { ImageAlbum } from '../../../types/albumsType';
import useFirestore from '../../../hooks/useFirestore';
import MyDropDown from '../../defaultComponents/myDropDown/MyDropDown';
import MyButton from '../../defaultComponents/myButton/MyButton';
import DeleteImageModal from '../confirmModal/ConfirmModal';
import PopoverReaction from '../../popoverReaction/PopoverReaction';
import MyBadge from '../../defaultComponents/myBadge/MyBadge';

interface ImageScreenModalProps {
	openImage: boolean;
	setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
	image: Image;
	timestamp: Date;
}

export default function ImageScreenModal({
	openImage,
	setOpenImage,
	image,
	timestamp,
}: ImageScreenModalProps) {
	const { isMobile } = useApp();
	const { deleteImage } = useFirestore();
	const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
	const position = -10;
	const formattedTimestamp = timestamp.toLocaleString('pt-BR', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});

	return (
		<MyModal openModal={openImage} setOpenModal={setOpenImage} footer>
			<>
				{isMobile ? (
					<div className="mobileModalContainer">
						<div className="modalMobileImage">
							<ImageAntd src={image.imageUrl} className="mobileImage" />
						</div>
						<div className="modalMobileDescription">
							<MyBadge image={image} badgeInner />
							<div className="timeStamp">
								<Description
									text={image.uploadBy?.split('@')[0] || ''}
									title="Por "
									typeValue="description"
								/>
								<Description
									text={formattedTimestamp}
									title="Dia "
									typeValue="description"
								/>
							</div>
							<Description
								text={image.subtitle}
								isEdit
								id={image.id}
								typeValue="description"
							/>
							<TagOnModalImage image={image} />
							<PopoverReaction image={image} />
						</div>
					</div>
				) : (
					<div className="modalWebContainer">
						<div className="modalWebImage">
							<ImageAntd src={image.imageUrl} height="100%" />
						</div>
						<div className="modalWebDescription">
							<MyBadge image={image} badgeInner />
							<div className="timeStamp">
								<Description
									text={image.uploadBy?.split('@')[0] || ''}
									title="Por "
									typeValue="description"
								/>
								<Description
									text={formattedTimestamp}
									title="Dia "
									typeValue="description"
								/>
							</div>
							<Description
								text={image.subtitle}
								isEdit
								id={image.id}
								typeValue="description"
							/>
							<TagOnModalImage image={image} />
							<PopoverReaction image={image} />
						</div>
					</div>
				)}
				<MyButton
					position={{ bottom: position, left: position }}
					className="deleteButton"
					type="edge"
					onClick={() => setOpenDeleteModal(true)}
				>
					<MdDelete />
				</MyButton>
				<DeleteImageModal
					openDeleteModal={openDeleteModal}
					setOpenDeleteModal={setOpenDeleteModal}
					okText="Deletar foto 😢"
					okFunction={() =>
						deleteImage(
							image.id,
							'nossaVida',
							image.imageName,
							image.imageFormat,
						)
					}
					text="🗑️ Tem certeza que quer deletar essa foto? 🗑️"
				/>
			</>
		</MyModal>
	);
}

interface TagOnModalImageProps {
	image: Image;
}
function TagOnModalImage({ image }: TagOnModalImageProps) {
	const { updateImage, albums } = useFirestore();

	const updateAlbumOnImage = (albumToUpdate: ImageAlbum, event: 'add' | 'delete') => {
		const currentImage: Image | undefined = { ...image };

		if (event === 'delete') {
			currentImage.album = currentImage.album?.filter(
				(item) => item.id !== albumToUpdate.id,
			);
		}
		if (event === 'add' && currentImage.album) {
			if (!currentImage.album.includes(albumToUpdate))
				currentImage.album = [
					...(currentImage.album || []),
					{ id: albumToUpdate.id },
				];
		}
		updateImage({ docName: image.id, newAlbum: currentImage.album });
	};

	return (
		<div className="modalWebTag">
			{image.album?.map((item) => (
				<AlbumTag
					key={item.id}
					closeIcon
					type="oldAlbum"
					album={albums.find((album) => album.id === item.id)}
					onClose={() => updateAlbumOnImage(item, 'delete')}
				/>
			))}
			<MyDropDown
				title="Lista de álbuns"
				type="setFilter"
				albums={albums.filter(
					(album) => !image.album?.map((item) => item.id)?.includes(album.id),
				)}
				iconPosition="modalFilterConfig"
				clickFunction={updateAlbumOnImage}
			>
				<BsFilter size={30} />
			</MyDropDown>
		</div>
	);
}
