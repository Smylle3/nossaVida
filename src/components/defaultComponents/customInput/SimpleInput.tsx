import React from 'react';

interface SimpleInputProps {
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	value?: string;
	className?: string;
	placeHolder?: string;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
export default function SimpleInput({
	onChange,
	value,
	className,
	placeHolder,
	onBlur,
}: SimpleInputProps) {
	return (
		<input
			onChange={onChange}
			value={value}
			className={`${className} customInput`}
			type="text"
			placeholder={placeHolder ? placeHolder : 'Descrição'}
			onBlur={onBlur}
		/>
	);
}
