import { Timestamp } from 'firebase/firestore'

export type Image = {
    id: string
    imageName: string
    imageFormat: string
    imageUrl: string
    subtitle: string
    lastModifiedDate: number
    uploadAt: Timestamp
}
