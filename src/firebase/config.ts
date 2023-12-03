import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import firebaseConfigProd from './firebaseConfig.prod';
import firebaseConfigDev from './firebaseConfig.dev';

const firebaseConfig =
	process.env.NODE_ENV === 'production' ? firebaseConfigProd : firebaseConfigDev;

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { storage, db, auth };
