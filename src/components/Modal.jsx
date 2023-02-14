import { useState, createElement } from 'react';

import Form from './Form';
import LLP from './LLP';
import IE from './IE';
import Others from './Others';

import closeModal from '../assets/icons/close.png';

export default function Modal(props) {
	const [options, setOptions] = useState([
		{
			name: 'ТОО',
			component: LLP,
			isSelected: true,
		},
		{
			name: 'ИП',
			component: IE,
			isSelected: false,
		},
		{
			name: 'Прочие',
			component: Others,
			isSelected: false,
		},
	]);

	const [currentIndex, setCurrentIndex] = useState(0);

	function toggleForm(i) {
		setCurrentIndex(i);

		setOptions((prev) =>
			prev.map((item, index) =>
				index === i
					? { ...item, isSelected: true }
					: { ...item, isSelected: false }
			)
		);
	}

	return (
		<>
			<div
				className={`modal ${props.isEditModal ? `modal-edit` : `modal-delete`}`}
			>
				<img
					className={`modal__close ${
						props.isEditModal ? `modal__close-edit` : `modal__close-delete`
					}`}
					src={closeModal}
					alt='закрыть модальное окно'
					onClick={() => props.closeModal()}
				/>

				{props.isEditModal ? (
					<div className='modal__container-without-close-edit'>
						<h2 className='modal__edit-title'>
							Редактировать данные организации
						</h2>
						<div className='modal__edit-form-container'>
							{options.map((item, i) => (
								<button
									className={`modal__button-org ${
										item.isSelected
											? `modal__button-org-selected`
											: `modal__button-org-unselected`
									}`}
									key={crypto.randomUUID()}
									onClick={() => toggleForm(i)}
									id={i}
								>
									{item.name}
								</button>
							))}
							<Form currentIndex={currentIndex}>
								{options.map((item) => (
									<div className='modal__edit-form' key={crypto.randomUUID()}>
										{createElement(item.component, {
											taxations: props.taxations,
											ownerships: props.ownerships,
											saveEdits: props.saveEdits,
										})}
									</div>
								))}
							</Form>
						</div>
					</div>
				) : (
					<div className='modal__container-without-close'>
						<h2 className='modal__delete-title'>Удаление организации</h2>
						<p className='modal__delete-warning'>
							Вы уверены, что хотите удалить организацию из списка?
						</p>
						<div className='modal__delete-buttons'>
							<button
								onClick={props.closeModal}
								className='modal__button-cancel'
							>
								Отменить
							</button>
							<button
								className='modal__button-delete'
								onClick={() => props.deleteOrg(props.company_id)}
							>
								Удалить
							</button>
						</div>
					</div>
				)}
			</div>
			<div className='overlay'></div>
		</>
	);
}
