import React from 'react';
import './MyDrawer.css';

interface DrawerContentProps {
	title: string;
	children: React.ReactElement;
}
export default function DrawerContent({ title, children }: DrawerContentProps) {
	return (
		<div className="drawerContentContainer">
			<h3>{title}</h3>
			{children}
		</div>
	);
}
