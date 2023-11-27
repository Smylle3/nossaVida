import "./CustomInput.css"

interface CustomInputProps {
	onChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
	value: string | number | readonly string[] | undefined
}
export default function CustomInput({ onChange, value }: CustomInputProps) {
	return (
		<input
			type="text"
			className="customInput"
			onChange={onChange}
			value={value}
			autoFocus
		/>
	)
}
