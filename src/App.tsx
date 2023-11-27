import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { AppProvider } from './context/myContext';

export default function App() {
	return (
		<AppProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				{/*<Route path="/signup" element={<Signup />} />*/}
			</Routes>
		</AppProvider>
	);
}
