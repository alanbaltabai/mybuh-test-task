import { useState } from 'react';

export default function LLP(props) {
	const [isDropdown, setIsDropdown] = useState(false);
	const [formData, setFormData] = useState({
		taxation: props.taxations.at(0).full,
	});

	const dropdown = (
		<ul className='dropdown'>
			{props.taxations.map((item) => (
				<li
					taxation={item.full}
					className='dropdown__option'
					onClick={() => handleTaxOptionClick(item.full)}
					key={crypto.randomUUID()}
				>
					{item.full}
				</li>
			))}
		</ul>
	);

	function handleTaxOptionClick(full) {
		setFormData((prev) => ({ ...prev, taxation: full }));
		setIsDropdown(false);
	}

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
						{formData.taxation}
					</div>

					{isDropdown && dropdown}
				</div>
			</div>
		</>
	);
}
