import React from 'react'

interface SimpleInputProps {
	onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
	value: string;
}
export default function SimpleInput({ onChange, value }: SimpleInputProps) {
	return (
		<input
			onChange={onChange}
			value={value}
			className="customInput"
			type="text"
			placeholder="Descrição"
		/>
	)
}
