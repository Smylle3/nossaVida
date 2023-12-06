import { Drawer } from 'antd';

interface MyDrawerProps {
	title: string;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactElement;
}
export default function MyDrawer({ title, open, setOpen, children }: MyDrawerProps) {
	const onClose = () => {
		setOpen(false);
	};

	return (
		<Drawer
			styles={{
				body: { boxSizing: 'border-box', padding: '1em' },
				content: { width: 'fit-content', padding: 0 },
			}}
			title={title}
			placement="right"
			onClose={onClose}
			open={open}
		>
			{children}
		</Drawer>
	);
}
