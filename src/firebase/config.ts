import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_APP_ID,
    measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
    databaseURL: import.meta.env.VITE_REACT_APP_DATABASE_URL,
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
const db = getFirestore(app)

export { storage, db }
