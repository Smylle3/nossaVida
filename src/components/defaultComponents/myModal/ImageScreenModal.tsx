import React from 'react';
import { MdClose, MdOutlineFileDownload } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Image as ImageAntd } from 'antd';
import { BsFilter } from 'react-icons/bs';

import MyModal from './MyModal';
import Description from '../../description/Description';
import MyButton from '../myButton/MyButton';
import { Image } from '../../../types/imageType';
import { useApp } from '../../../hooks/useApp';
import './ImageScreenModal.css';
import AlbumTag from '../../albumTag/AlbumTag';
import { Album } from '../../../types/albumsType';
import useFirestore from '../../../hooks/useFirestore';
import MyDropDown from '../myDropDown/MyDropDown';

interface ImageScreenModalProps {
	openImage: boolean;
	setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
	image: Image;
	lastModified: Date;
	timestamp: Date;
}

export default function ImageScreenModal({
	openImage,
	setOpenImage,
	image,
	lastModified,
	timestamp,
}: ImageScreenModalProps) {
	const { isMobile } = useApp();

	if (isMobile)
		return (
			<MyModal
				openModal={openImage}
				setOpenModal={setOpenImage}
				footer={
					<div>
						<MyButton
							type="edge"
							className="mobileCloseButton"
							onClick={() => setOpenImage(false)}
						>
							<MdClose size={25} />
						</MyButton>
						<Link to={image.imageUrl} download target="_blank">
							<MyButton type="edge" className="mobileDownloadButton">
								<MdOutlineFileDownload size={25} />
							</MyButton>
						</Link>
					</div>
				}
			>
				<div className="mobileModalContainer">
					<div className="modalMobileImage">
						<ImageAntd src={image.imageUrl} className="mobileImage" />
					</div>
					<div className="modalMobileDescription">
						<TagOnModalImage image={image} />
						<Description
							text={image.subtitle}
							title="Descrição"
							isEdit
							imageId={image.id}
						/>
						<Description
							text={timestamp.toLocaleString()}
							title="Data de upload"
						/>
					</div>
				</div>
			</MyModal>
		);
	else
		return (
			<MyModal
				openModal={openImage}
				setOpenModal={setOpenImage}
				footer={
					<div className="modalWebButton">
						<MyButton
							className="modalWebButton"
							type="free"
							onClick={() => setOpenImage(false)}
						>
							❌ Fechar ❌
						</MyButton>
					</div>
				}
			>
				<div className="modalWebContainer">
					<div className="modalWebImage">
						<ImageAntd src={image.imageUrl} height="100%" />
					</div>
					<div className="modalWebDescription">
						<TagOnModalImage image={image} />
						<Description
							text={image.subtitle}
							title="Descrição:"
							isEdit
							imageId={image.id}
						/>
						<Description
							text={lastModified.toLocaleString()}
							title="Data da ultima alteração:"
						/>
						<Description
							text={timestamp.toLocaleString()}
							title="Data de upload:"
						/>
					</div>
				</div>
			</MyModal>
		);
}

interface tagOnModalImageProps {
	image: Image;
}
function TagOnModalImage({ image }: tagOnModalImageProps) {
	const { updateImage, albums } = useFirestore();

	const updateAlbumOnImage = (albumToUpdate: Album, event: 'add' | 'delete') => {
		const currentImage: Image | undefined = { ...image };

		if (event === 'delete') {
			currentImage.album = currentImage.album?.filter(
				(item) => item.id !== albumToUpdate.id,
			);
		}
		if (event === 'add' && currentImage.album) {
			if (!currentImage.album.includes(albumToUpdate))
				currentImage.album = [...(currentImage.album || []), albumToUpdate];
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
					album={item}
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
