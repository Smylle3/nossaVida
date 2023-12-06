import { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import useFirestore from '../../hooks/useFirestore';
import './EmojiContainer.css';

export default function EmojiContainer() {
	const { myUser, updateUserEmoji } = useFirestore();
	const [clickedEmojiIndex, setClickedEmojiIndex] = useState<number | null>(null);

	const handleClickEmoji = (index: number | null) => {
		if (clickedEmojiIndex === index) {
			setClickedEmojiIndex(null);
		} else {
			setClickedEmojiIndex(index);
		}
	};

	const emojiChanges = (e: EmojiClickData) => {
		const newEmojis = [...(myUser?.emojis || [])];
		if (newEmojis && clickedEmojiIndex !== null) {
			newEmojis[clickedEmojiIndex] = e.emoji;
			updateUserEmoji(newEmojis);
			setClickedEmojiIndex(null);
		}
	};

	return (
		<div className="emojiContainer">
			<div className="reactionContainer">
				{myUser?.emojis?.map((emoji, index) => (
					<div
						className="reacted emoji"
						onClick={() => handleClickEmoji(index)}
						key={index}
					>
						{emoji}
					</div>
				))}
			</div>
			{clickedEmojiIndex !== null && (
				<EmojiPicker onEmojiClick={(e) => emojiChanges(e)} />
			)}
		</div>
	);
}
