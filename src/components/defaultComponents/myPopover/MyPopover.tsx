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
}
export default function MyPopover({
	title,
	children,
	content,
	placement,
	open,
	setOpen,
	trigger,
}: MyPopoverProps) {
	const popoverStyle: React.CSSProperties = {
		width: 'fit-content',
		color: '#845ec2',
		backgroundColor: '#fdf7ff',
	};

	return (
		<Popover
			content={content}
			title={title}
			overlayStyle={popoverStyle}
			trigger={trigger ? trigger : 'click'}
			color="#fdf7ff"
			placement={placement ? placement : 'top'}
			open={open}
			onOpenChange={setOpen}
		>
			{children}
		</Popover>
	);
}
