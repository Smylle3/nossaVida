import { Popover } from 'antd';

import { useApp } from '../../../hooks/useApp';
import './MyPopover.css';

interface MyPopoverProps {
	title?: string;
	placement?:
		| 'top'
		| 'left'
		| 'right'
		| 'bottom'
		| 'topLeft'
		| 'topRight'
		| 'bottomLeft'
		| 'bottomRight'
		| 'leftTop'
		| 'leftBottom'
		| 'rightTop'
		| 'rightBottom';
	children: React.ReactElement;
	content: React.ReactElement;
	open?: boolean;
	setOpen?: (visible: boolean) => void;
}
export default function MyPopover({
	title,
	children,
	content,
	placement,
	open,
	setOpen,
}: MyPopoverProps) {
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
			placement={placement ? placement : 'top'}
			open={open}
			onOpenChange={setOpen}
		>
			{children}
		</Popover>
	);
}
