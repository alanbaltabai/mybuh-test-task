import { useState } from 'react';

import LLP from './LLP';
import IE from './IE';
import Others from './Others';

import closeModal from '../assets/icons/close.png';

export default function Modal(props) {
	const [options, setOptions] = useState(
		{
			name: 'LLP',
			component: LLP,
		},
		{
			name: 'IE',
			component: IE,
		},
		{
			name: 'Others',
			component: Others,
		}
	);

	return (
		<>
			<div className='modal modal-delete'>
				<img
					className='modal__close modal__close-delete modal__close-edit'
					src={closeModal}
					alt='закрыть модальное окно'
					onClick={() => props.closeModal()}
				/>

				{props.isEditModal ? (
					<h2>Редактировать данные организации</h2>
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
							<button className='modal__button-delete'>Удалить</button>
						</div>
					</div>
				)}
			</div>
			<div className='overlay'></div>
		</>
	);
}
