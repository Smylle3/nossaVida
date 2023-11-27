import { useState } from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { PiEyeBold, PiEyeClosedBold } from 'react-icons/pi';
import './CustomInput.css';

interface CustomInputProps<T extends FieldValues> {
	id: string;
	control: Control<T>;
	name: Path<T>;
	type: 'email' | 'image' | 'number' | 'password' | 'search' | 'text' | 'url';
	label?: string;
	placeHolder?: string;
}

export default function CustomInput<T extends FieldValues>({
	id,
	control,
	name,
	type,
	label,
	placeHolder,
}: CustomInputProps<T>) {
	const [isShowPass, setIsShowPass] = useState<boolean>(false);

	return (
		<div className="inputContainer">
			{label && <label htmlFor={id}>{label}</label>}
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, onBlur, value } }) => (
					<input
						className="customInput"
						id={id}
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						type={isShowPass ? 'text' : type}
						placeholder={placeHolder}
						autoComplete="off"
					/>
				)}
			/>
			{type === 'password' && (
				<button
					onClick={() => setIsShowPass(!isShowPass)}
					className="passButton"
					type="button"
				>
					{isShowPass ? <PiEyeBold size={18} /> : <PiEyeClosedBold size={18} />}
				</button>
			)}
		</div>
	);
}
