import React from 'react'
import MyModal from './MyModal'
import Description from '../description/Description'
import MyButton from '../myButton/MyButton'
import { Image } from '../../types/imageType'
import { useApp } from '../../hooks/useApp'
import { MdClose } from 'react-icons/md'
import './ImageScreenModal.css'

interface ImageScreenModalProps {
    openImage: boolean
    setOpenImage: React.Dispatch<React.SetStateAction<boolean>>
    image: Image
    lastModified: Date
    timestamp: Date
}

export default function ImageScreenModal({
    openImage,
    setOpenImage,
    image,
    lastModified,
    timestamp,
}: ImageScreenModalProps) {
    const { isMobile } = useApp()

    if (isMobile)
        return (
            <MyModal modalIsOpen={openImage} setModalIsOpen={setOpenImage}>
                <div className="mobileModalContainer">
                    <div
                        className="mobileModalphoto"
                        style={{ backgroundImage: `url(${image.imageUrl})` }}
                    />
                    <div className="mobileDescription">
                        <Description
                            text={image.subtitle}
                            title="Descrição"
                            isEdit
                            imageId={image.id}
                        />
                        <Description
                            text={lastModified.toLocaleString()}
                            title="Data da ultima alteração"
                        />
                        <Description
                            text={timestamp.toLocaleString()}
                            title="Data de upload"
                        />
                    </div>
                    <MyButton
                        type="edge"
                        className="mobileCloseButton"
                        onClick={() => setOpenImage(false)}
                    >
                        <MdClose size={25} />
                    </MyButton>
                </div>
            </MyModal>
        )
    else
        return (
            <MyModal modalIsOpen={openImage} setModalIsOpen={setOpenImage}>
                <div className="zoomImageContainer">
                    <div className="zoomPolaroid">
                        <div
                            className="photo"
                            style={{ backgroundImage: `url(${image.imageUrl})` }}
                        />
                    </div>
                    <Description
                        text={image.subtitle}
                        title="Descrição"
                        isEdit
                        imageId={image.id}
                    />
                    <Description
                        text={lastModified.toLocaleString()}
                        title="Data da ultima alteração"
                    />
                    <Description
                        text={timestamp.toLocaleString()}
                        title="Data de upload"
                    />
                    <MyButton
                        type="free"
                        className="zoomModalButton"
                        onClick={() => setOpenImage(false)}
                    >
                        ❌ Fechar ❌
                    </MyButton>
                </div>
            </MyModal>
        )
}
