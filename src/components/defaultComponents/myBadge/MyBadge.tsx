import React from 'react';
import { Badge } from 'antd';

import { useAuth } from '../../../hooks/useAuth';
import { Image } from '../../../types/imageType';
import './MyBadge.css';
import MyPopover from '../myPopover/MyPopover';

interface MyBadgeProps {
	children?: React.ReactElement;
	image: Image;
	badgeInner?: boolean;
}
export default function MyBadge({ children, image, badgeInner }: MyBadgeProps) {
	const { user } = useAuth();
	const otherReactions: [string, string | null][] = Object.entries(
		image.reactions || [],
	).filter(([email, emoji]) => email !== user?.email && emoji);

	const [otherUserEmail, otherUserEmoji] = otherReactions[0] || [];
	const otherUser = (
		<div className="reactText">
			{otherUserEmail?.split('@')[0]} reagiu com {otherUserEmoji}
		</div>
	);
	if (badgeInner)
		return (
			<MyPopover content={otherUser} trigger="hover" placement="left">
				<div className="badgeButton">{otherUserEmoji}</div>
			</MyPopover>
		);
	else
		return (
			<Badge.Ribbon text={otherUserEmoji} color="#845ec2">
				{children}
			</Badge.Ribbon>
		);
}
