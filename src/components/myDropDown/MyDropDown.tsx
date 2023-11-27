import { BsGrid3X3Gap, BsViewStacked } from 'react-icons/bs';

import { useApp } from '../../hooks/useApp';
import './MyDropDown.css';

interface MyDropDownProps {
	isOpen: boolean;
}
export default function MyDropDown({ isOpen }: MyDropDownProps) {
	const { gridType, setGridType } = useApp();

	return (
		<div className="dropdown">
			{isOpen && (
				<div className="dropdown-content">
					<p
						className={`pTypeGrid ${gridType && 'gridSelected'}`}
						onClick={() => setGridType(true)}
					>
						<BsViewStacked /> Visualizar por lista
					</p>
					<div className="line" />
					<p
						className={`pTypeGrid ${!gridType && 'gridSelected'}`}
						onClick={() => setGridType(false)}
					>
						<BsGrid3X3Gap /> Visualizar por galeria
					</p>
				</div>
			)}
		</div>
	);
}
