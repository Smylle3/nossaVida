const firebaseConfigDev = {
	apiKey: import.meta.env.VITE_REACT_APP_API_KEY_DEV,
	authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN_DEV,
	databaseURL: import.meta.env.VITE_REACT_APP_DATABASE_URL_DEV,
	projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID_DEV,
	storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET_DEV,
	messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID_DEV,
	appId: import.meta.env.VITE_REACT_APP_APP_ID_DEV,
};

export default firebaseConfigDev;
