import { useEffect, useState } from 'react';
import { BsHeart } from 'react-icons/bs';

import MyPopover from '../defaultComponents/myPopover/MyPopover';
import MyButton from '../defaultComponents/myButton/MyButton';
import './PopoverReaction.css';
import useFirestore from '../../hooks/useFirestore';
import { Image } from '../../types/imageType';
import { useAuth } from '../../hooks/useAuth';

interface PopoverReactionProps {
	image: Image;
	open?: boolean;
	setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	anchor?: boolean;
}

export default function PopoverReaction({
	open,
	setOpen,
	anchor,
	image,
}: PopoverReactionProps) {
	const { user } = useAuth();
	const { updateImage, myUser } = useFirestore();
	const position = -10;
	const userReaction = user?.email ? image.reactions?.[user.email] : '';
	const [isReacted, setIsReacted] = useState<boolean>(false);

	useEffect(() => {
		if (user?.email && image.reactions && image.reactions[user.email]) {
			setIsReacted(true);
		}
	}, [image.reactions, user?.email]);

	const handleSelectReaction = (reaction: string) => {
		if (!user || !user.email) return;
		if (setOpen) setOpen(false);

		updateImage({
			docName: image.id,
			reactions: { ...(image.reactions || {}), [user.email]: reaction },
		});
	};

	const ReactionContent = (
		<div className={`reactionContainer ${!anchor && 'anchorConfig'}`}>
			{myUser?.emojis?.map((emoji, index) => (
				<div
					key={index}
					onClick={() => handleSelectReaction(emoji)}
					className={`emoji ${
						isReacted && userReaction === emoji ? 'reacted' : ''
					}`}
				>
					{emoji}
				</div>
			))}
		</div>
	);

	if (anchor && user?.email)
		return (
			<MyPopover
				placement="bottom"
				content={ReactionContent}
				open={open}
				setOpen={setOpen}
			>
				<MyButton
					position={{ bottom: position, left: position }}
					className="imageButton"
					type="edge"
				>
					<BsHeart />
				</MyButton>
			</MyPopover>
		);
	else if (user?.email) return ReactionContent;
	return null; // Se não há usuário, retorna null
}
