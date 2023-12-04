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
	const { updateImage } = useFirestore();
	const position = -10;

	const handleSelectReaction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		console.log(image);
		if (!user || !user.email) return;
		if (setOpen) setOpen(false);
		const reaction = e.currentTarget.textContent;
		updateImage({
			docName: image.id,
			reactions: { ...(image.reactions || {}), [user.email]: reaction },
		});
	};

	const ReactionContent = (
		<div className={`reactionContainer ${!anchor && 'anchorConfig'}`}>
			<div onClick={handleSelectReaction}>😍</div>
			<div onClick={handleSelectReaction}>😂</div>
			<div onClick={handleSelectReaction}>😢</div>
			<div onClick={handleSelectReaction}>👍</div>
			<div onClick={handleSelectReaction}>👎</div>
		</div>
	);
	if (anchor)
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
	else return ReactionContent;
}
