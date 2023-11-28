import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

interface PrivateProps {
	children: React.ReactElement
}
export default function PrivateRoutes({ children }: PrivateProps) {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/signup" replace={true} />;
	} else return children;
}
