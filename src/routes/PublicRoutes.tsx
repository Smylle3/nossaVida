import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface PublicProps {
	children: React.ReactElement
}
export default function PublicRoutes({ children }: PublicProps) {
	const { user } = useAuth();

	if (user) {
		return <Navigate to="/" replace={true} />;
	}

	return children;
}
