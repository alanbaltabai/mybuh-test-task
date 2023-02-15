import { useState } from 'react';

export default function Others(props) {
	const [isDropdown, setIsDropdown] = useState(false);
	const [formData, setFormData] = useState({
		taxation: props.taxations.at(0).full,
		tinInput: '',
		orgnameInput: '',
		subtype: 'Юридические лица',
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

	function returnShortForm() {
		return formData.subtype
			.split(' ')
			.map((item) => item[0].toUpperCase())
			.join('');
	}

	return (
		<>
			<div className='form-radios-div'>
				<div className='div-radio-cash radio-checkout'>
					<input
						type='radio'
						name='subtype'
						id='radio-juridical-person'
						className='radio-juridical-person'
						value='Юридические лица'
						onChange={handleInputChange}
						checked={formData.subtype === 'Юридические лица'}
						required
					/>
					<span className='radio-circle'></span>
					<label
						className='radio-label'
						htmlFor='radio-juridical-person'
						id='label-radio-cash'
					>
						Юридические лица
					</label>
				</div>

				<div className='div-radio-card radio-checkout'>
					<input
						type='radio'
						name='subtype'
						id='radio-private-practice'
						className='radio-input'
						value='Частная практика'
						onChange={handleInputChange}
						checked={formData.subtype === 'Частная практика'}
						required
					/>
					<span className='radio-circle'></span>
					<label
						className='radio-label'
						htmlFor='radio-private-practice'
						id='label-radio-card'
					>
						Частная практика
					</label>
				</div>

				<div className='div-radio-card radio-checkout'>
					<input
						type='radio'
						name='subtype'
						id='radio-natural-person'
						className='radio-input'
						value='Физические лица'
						onChange={handleInputChange}
						checked={formData.subtype === 'Физические лица'}
						required
					/>
					<span className='radio-circle'></span>
					<label
						className='radio-label'
						htmlFor='radio-natural-person'
						id='label-radio-card'
					>
						Физические лица
					</label>
				</div>
			</div>

			<div className='taxation-input-label-container'>
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
					<span className='orgname-orgform'>{returnShortForm()}</span>
					<input
						className='orgname-input'
						id='orgname-input'
						value={formData.orgnameInput}
						name='orgnameInput'
						onChange={handleInputChange}
					/>
				</div>
			</div>

			<button
				className='modal__button-save'
				onClick={() =>
					props.saveEdits(formData.orgnameInput, formData.tinInput, 14)
				}
			>
				Сохранить
			</button>
		</>
	);
}
