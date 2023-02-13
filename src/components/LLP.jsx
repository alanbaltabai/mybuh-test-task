import { useState } from 'react';

export default function LLP(props) {
	const [isDropdown, setIsDropdown] = useState(false);

	const taxationsCopy = props.taxations.filter((item, i) => i !== 0);

	const dropdown = (
		<ul className='dropdown'>
			{taxationsCopy.map((item) => (
				<li className='dropdown__option' key={crypto.randomUUID()}>
					{item.full}
				</li>
			))}
		</ul>
	);

	return (
		<>
			<div>
				<label className='label-taxation' htmlFor='taxation'>
					Выберите систему налогообложения
				</label>
				<div className='select-container'>
					<div
						className='taxation'
						onClick={() => setIsDropdown((prev) => !prev)}
						id='taxation'
					>
						{props.taxations.at(0).full}
					</div>

					{isDropdown && dropdown}
				</div>
			</div>
		</>
	);
}
