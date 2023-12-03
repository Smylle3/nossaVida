const firebaseConfigProd = {
	apiKey: import.meta.env.VITE_REACT_APP_API_KEY_PROD,
	authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN_PROD,
	projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID_PROD,
	storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET_PROD,
	messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID_PROD,
	appId: import.meta.env.VITE_REACT_APP_APP_ID,
	measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID_PROD,
	databaseURL: import.meta.env.VITE_REACT_APP_DATABASE_URL_PROD,
};

export default firebaseConfigProd;
