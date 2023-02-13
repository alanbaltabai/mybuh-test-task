import { useState } from 'react';

export default function LLP(props) {
	const [isDropdown, setIsDropdown] = useState(false);
	const [formData, setFormData] = useState({
		taxation: props.taxations.at(0).full,
		tinInput: '',
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

	function handleTinInputChange(event) {
		setFormData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
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

			<div className='tin-input-label-container'>
				<label className='label-taxation' htmlFor='tin-input'>
					Введите ИИН/БИН
				</label>

				<div className='select-container'>
					<input
						className='tin-input'
						id='tin-input'
						value={formData.tinInput}
						name='tinInput'
						onChange={handleTinInputChange}
					/>
				</div>
			</div>
		</>
	);
}
