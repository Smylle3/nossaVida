import { useState, useEffect } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { message } from 'antd';

import useFirestore from '../../hooks/useFirestore';
import './EmojiContainer.css';

export default function EmojiContainer() {
	const { myUser, updateUserEmoji } = useFirestore();
	const [messageApi, contextHolder] = message.useMessage();
	const [clickedEmojiIndex, setClickedEmojiIndex] = useState<number | null>(null);
	const [emojiSelected, setEmojiSelected] = useState<string | null>(null);

	const handleClickEmoji = (index: number | null) => {
		if (index === clickedEmojiIndex) return;
		setClickedEmojiIndex(index);
		setEmojiSelected(null);
	};

	const emojiChanges = (e: EmojiClickData) => {
		setEmojiSelected(e.emoji);
	};

	useEffect(() => {
		const handleEmojiChange = async () => {
			if (clickedEmojiIndex !== null && emojiSelected) {
				const newEmojis = [...(myUser?.emojis || [])];
				newEmojis[clickedEmojiIndex] = emojiSelected;
				const res = await updateUserEmoji(newEmojis);
				setClickedEmojiIndex(null);
				setEmojiSelected(null);
				if (res === 'sucess') {
					messageApi.open({
						type: 'success',
						content: `Emoji atualizado com sucesso! ${emojiSelected}`,
					});
				}
			}
		};
		handleEmojiChange();
	}, [clickedEmojiIndex, emojiSelected, messageApi, myUser?.emojis, updateUserEmoji]);

	return (
		<div className="emojiContainer">
			{contextHolder}
			<div className="reactionContainer">
				{myUser?.emojis?.map((emoji, index) => (
					<div
						className={`emoji ${
							clickedEmojiIndex === index && 'reacted emojiSelected'
						}`}
						onClick={() => handleClickEmoji(index)}
						key={index}
					>
						{emoji}
					</div>
				))}
			</div>
			{clickedEmojiIndex !== null && (
				<EmojiPicker
					autoFocusSearch={false}
					onEmojiClick={(e) => emojiChanges(e)}
				/>
			)}
		</div>
	);
}
