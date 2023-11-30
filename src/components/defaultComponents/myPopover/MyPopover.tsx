import { Popover } from 'antd';

import { useApp } from '../../../hooks/useApp';
import './MyPopover.css';

interface MyPopoverProps {
	title: string;
	children: React.ReactElement;
	content: React.ReactElement;
}
export default function MyPopover({ title, children, content }: MyPopoverProps) {
	const { isMobile } = useApp();

	const popoverStyle: React.CSSProperties = {
		width: isMobile ? '90%' : '30%',
		color: '#845ec2',
		backgroundColor: '#fdf7ff',
	};

	return (
		<Popover
			content={content}
			title={title}
			overlayStyle={popoverStyle}
			trigger="click"
			color="#fdf7ff"
		>
			{children}
		</Popover>
	);
}
