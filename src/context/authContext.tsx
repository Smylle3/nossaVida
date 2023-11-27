import { User, onAuthStateChanged } from 'firebase/auth';
import { FC, createContext, useEffect, useState } from 'react';

import { auth } from '../firebase/config';

interface AuthContextType {
	user: User | null;
	loading: boolean;
}
export const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: false,
});

interface AuthProviderProps {
	children: React.ReactElement;
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		user,
		loading,
	};
	return (
		<AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
	);
};
