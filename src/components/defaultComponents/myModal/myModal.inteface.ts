import React, { ReactElement } from 'react';

export interface MyModalProps {
	children: ReactElement;
	openModal: boolean;
	className?: string;
	title?: string;
	footer?: boolean;
	okText?: string;
	cancelText?: string;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	afterClose?: () => void;
	okFunction?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	cancelFunction?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	okType?: 'default' | 'primary' | 'dashed' | 'link' | 'text' | 'danger';
}
