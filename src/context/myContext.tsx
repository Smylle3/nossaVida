import { createContext, FC, useState, useEffect } from 'react';

import { Album } from '../types/albumsType';
import useFirestore from '../hooks/useFirestore';

interface AppContextType {
	gridType: boolean;
	setGridType: React.Dispatch<React.SetStateAction<boolean>>;
	isMobile: boolean;
	filterAlbumsSelected: Album[];
	setFilterAlbumsSelected: React.Dispatch<React.SetStateAction<Album[]>>;
}
export const AppContext = createContext<AppContextType>({
	gridType: false,
	setGridType: () => {},
	isMobile: false,
	filterAlbumsSelected: [],
	setFilterAlbumsSelected: () => {},
});

interface AppProviderProps {
	children: React.ReactElement;
}
export const AppProvider: FC<AppProviderProps> = ({ children }) => {
	const { albums } = useFirestore();
	const [gridType, setGridType] = useState<boolean>(true);
	const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
	const [filterAlbumsSelected, setFilterAlbumsSelected] = useState<Album[]>([]);

	const handleResize = () => {
		setIsMobile(window.innerWidth <= 768);
	};

	useEffect(() => {
		if (albums.length > 0) setFilterAlbumsSelected(albums);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [albums]);

	const value = {
		gridType,
		setGridType,
		isMobile,
		filterAlbumsSelected,
		setFilterAlbumsSelected,
	};
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
