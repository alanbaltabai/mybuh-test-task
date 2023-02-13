import { useState } from 'react';

export default function LLP(props) {
	const [isDropdown, setIsDropdown] = useState(false);
	const [formData, setFormData] = useState({
		taxation: props.taxations.at(0).full,
		tinInput: '',
		orgnameInput: '',
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

	function handleInputChange(event) {
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
						onChange={handleInputChange}
					/>
				</div>
			</div>

			<div className='orgname-input-label-container'>
				<label className='label-taxation' htmlFor='orgname-input'>
					Введите название компании
				</label>

				<div className='select-container orgname-container'>
					<span className='orgname-orgform'>ТОО</span>
					<input
						className='orgname-input'
						id='orgname-input'
						value={formData.orgnameInput}
						name='orgnameInput'
						onChange={handleInputChange}
					/>
				</div>
			</div>
		</>
	);
}
