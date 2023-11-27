import { useState } from 'react'
import { MdDelete, MdFullscreen } from 'react-icons/md'
import { Image } from '../../types/imageType'
import useFirestore from '../../hooks/useFirestore'
import MyButton from '../myButton/MyButton'
import ImageScreenModal from '../modal/ImageScreenModal'
import './PolaroidImage.css'

export default function PolaroidImage({ image }: { image: Image; id: number }) {
    const { deleteImage } = useFirestore('images')
    const timestamp = new Date(
        image.uploadAt.seconds * 1000 + image.uploadAt.nanoseconds / 1e6,
    )
    const lastModified = new Date(image.lastModifiedDate)
    const [openImage, setOpenImage] = useState<boolean>(false)
    const position = -10

    return (
        <div className="box">
            <div className="polaroid">
                <MyButton
                    position={{ bottom: position, left: position }}
                    className="deleteButton"
                    type="edge"
                    onClick={() =>
                        deleteImage(
                            image.id,
                            'nossaVida',
                            image.imageName,
                            image.imageFormat,
                        )
                    }
                >
                    <MdDelete />
                </MyButton>
                <MyButton
                    position={{ top: position, right: position }}
                    className="zoomButton"
                    type="edge"
                    onClick={() => setOpenImage(true)}
                >
                    <MdFullscreen />
                </MyButton>
                <div
                    className="photo"
                    style={{ backgroundImage: `url(${image.imageUrl})` }}
                />
                <label className="subTitle">{image.subtitle}</label>
            </div>
            <ImageScreenModal
                image={image}
                lastModified={lastModified}
                openImage={openImage}
                setOpenImage={setOpenImage}
                timestamp={timestamp}
            />
        </div>
    )
}
