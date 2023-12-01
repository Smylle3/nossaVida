import React from 'react';
import { Tooltip } from 'antd';

interface MyTooltipProps {
	children: React.ReactElement;
	title: React.ReactNode;
}
export default function MyTooltip({ children, title }: MyTooltipProps) {
	return <Tooltip title={title}>{children}</Tooltip>;
}
