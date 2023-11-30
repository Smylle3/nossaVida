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
		<Drawer title={title} placement="right" onClose={onClose} open={open}>
			{children}
		</Drawer>
	);
}