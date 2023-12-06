import { Popover } from 'antd';
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
	trigger?: 'click' | 'hover';
	setOpen?: (visible: boolean) => void;
	backgroundColor?: string;
}
export default function MyPopover({
	title,
	children,
	content,
	placement,
	open,
	setOpen,
	trigger,
	backgroundColor,
}: MyPopoverProps) {
	const popoverStyle: React.CSSProperties = {
		width: 'fit-content',
		color: '#845ec2',
		backgroundColor: backgroundColor ? backgroundColor : '#fdf7ff',
		borderRadius: '20px',
	};

	return (
		<Popover
			content={open && content} // only render content if open
			title={title}
			overlayStyle={popoverStyle}
			trigger={trigger ? trigger : 'click'}
			color={backgroundColor ? backgroundColor : '#fdf7ff'}
			placement={placement ? placement : 'top'}
			open={open}
			onOpenChange={setOpen}
		>
			{children}
		</Popover>
	);
}
