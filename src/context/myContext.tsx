import { createContext, FC, useState, useEffect } from 'react'

interface AppContextType {
	gridType: boolean,
	setGridType: React.Dispatch<React.SetStateAction<boolean>>,
	isMobile: boolean
}
export const AppContext = createContext<AppContextType>({
	gridType: false,
	setGridType: () => { },
	isMobile: false
})

interface AppProviderProps {
	children: React.ReactElement
}
export const AppProvider: FC<AppProviderProps> = ({ children }) => {
	const [gridType, setGridType] = useState<boolean>(true);
	const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

	const handleResize = () => {
		setIsMobile(window.innerWidth <= 768);
	};

	useEffect(() => {
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const value = {
		gridType,
		setGridType,
		isMobile
	}
	return (
		<AppContext.Provider value={value} >
			{children}
		</AppContext.Provider>
	)
}
