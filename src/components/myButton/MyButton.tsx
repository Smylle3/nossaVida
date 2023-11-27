import "./MyButton.css"

interface MyButton {
	onClick?: () => void;
	onMouseDown?: () => void
	children?: string | React.ReactElement;
	className?: string;
	type?: "fixed" | "free" | "edge";
	position?: { top?: number, left?: number, bottom?: number, right?: number };
	formType?: "submit" | "button" | "reset";
}

export default function MyButton({ onClick, children, type, className, position, onMouseDown, formType }: MyButton) {
	switch (type) {
		case "fixed":
			return (
				<button type={formType} className="myButton fixedButton" onClick={onClick}>
					{children}
				</button>
			)
		case "free":
			return (
				<button type={formType} className={`myButton ${className}`} onClick={onClick}>
					{children}
				</button>
			)
		case "edge":
			return (
				<button
					type={formType}
					onMouseDown={onMouseDown}
					style={position && { top: position.top, left: position.left, right: position.right, bottom: position.bottom }}
					className={className + ' edgeButton'}
					onClick={onClick}>
					{children}
				</button>
			)
		default:
			break;
	}
}

