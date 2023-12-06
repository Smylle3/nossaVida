import { Collapse, CollapseProps } from 'antd';

interface MyCollapseProps {
	children: React.ReactElement;
	label: React.ReactNode;
}
export default function MyCollapse({ children, label }: MyCollapseProps) {
	const items: CollapseProps['items'] = [
		{
			key: '1',
			label: label,
			children: <>{children}</>,
		},
	];

	return <Collapse ghost items={items} />;
}
