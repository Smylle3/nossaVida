import { useState, useEffect } from 'react';
import { MdSave, MdOutlineCheck } from 'react-icons/md';

import MyButton from '../defaultComponents/myButton/MyButton';
import './Description.css';
import useFirestore from '../../hooks/useFirestore';
import SimpleInput from '../defaultComponents/customInput/SimpleInput';

interface DescriptionProps {
	text: string;
	title?: string;
	isEdit?: boolean;
	id?: string;
	typeValue: 'album' | 'description';
	placeHolder?: string;
}

export default function Description({
	text,
	title,
	isEdit,
	id,
	typeValue,
	placeHolder,
}: DescriptionProps) {
	const { updateImage, updateAlbum, createAlbum } = useFirestore();
	const [value, setValue] = useState<string>(text);
	const [isChanging, setIsChanging] = useState<boolean>(false);
	const [isUploaded, setIsUploaded] = useState<boolean>(false);
	const oldValue: string = text;

	useEffect(() => {
		const isChangedValue = () => {
			setIsUploaded(false);
			if (oldValue === value) setIsChanging(false);
		};
		isChangedValue();
	}, [oldValue, value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsUploaded(false);
		setIsChanging(true);
		setValue(e.target.value);
	};

	const onSave = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (typeValue === 'description' && id)
				await updateImage({ docName: id, newSubtitle: value });
			if (typeValue === 'album' && id) {
				await updateAlbum({ albumId: id, newName: value });
			}
			if (typeValue === 'album' && !id) {
				await createAlbum(value);
				setValue(text);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setIsChanging(false);
			setIsUploaded(true);
		}
	};

	return (
		<div className="zoomSubTitle">
			<div className="descTitle">
				{title && <span className="spanTitle">{title}</span>}
				{isEdit ? (
					<form className="inputAndButton" onSubmit={(e) => onSave(e)}>
						<SimpleInput
							placeHolder={placeHolder}
							onChange={handleChange}
							value={value}
						/>
						{isChanging ? (
							<MyButton type="edge" className="saveDesc" formType="submit">
								<MdSave />
							</MyButton>
						) : (
							<>
								{isUploaded && (
									<MyButton type="edge" className="saveDesc">
										<MdOutlineCheck />
									</MyButton>
								)}
							</>
						)}
					</form>
				) : (
					<span className="descriptionContent">{text}</span>
				)}
			</div>
		</div>
	);
}
