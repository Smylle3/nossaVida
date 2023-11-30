import React from 'react';

interface SimpleInputProps {
	onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
	value?: string;
	className?: string;
	placeHolder?: string;
}
export default function SimpleInput({
	onChange,
	value,
	className,
	placeHolder,
}: SimpleInputProps) {
	return (
		<input
			onChange={onChange}
			value={value}
			className={`${className} customInput`}
			type="text"
			placeholder={placeHolder ? placeHolder : 'Descrição'}
		/>
	);
}
