import { Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { AppProvider } from './context/myContext';
import { Signup } from './pages/Signup';
import { AuthProvider } from './context/authContext';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';
import JodoDaVeiaDois from './pages/JodoDaVeiaDois';

export default function App() {
	return (
		<AuthProvider>
			<AppProvider>
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoutes>
								<Home />
							</PrivateRoutes>
						}
					/>
					<Route
						path="/jogo-da-veia-dois"
						element={
							<PrivateRoutes>
								<JodoDaVeiaDois />
							</PrivateRoutes>
						}
					/>
					<Route
						path="/signup"
						element={
							<PublicRoutes>
								<Signup />
							</PublicRoutes>
						}
					/>
				</Routes>
			</AppProvider>
		</AuthProvider>
	);
}
