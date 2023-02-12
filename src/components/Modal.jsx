import { useState } from 'react';

import LLP from './LLP';
import IE from './IE';
import Others from './Others';

import closeModal from '../assets/icons/close.png';

export default function Modal(props) {
	const [options, setOptions] = useState(
		{
			name: 'ТОО',
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
			<div className='modal'>
				<img
					className='modal-close'
					src={closeModal}
					alt='закрыть модальное окно'
					onClick={() => props.closeModal()}
				/>

				{props.isEditModal ? (
					<h2>Редактировать данные организации</h2>
				) : (
					<>
						<h2 className='modal__delete-title'>Удаление организации</h2>
						<p className='modal__delete-warning'>
							Вы уверены, что хотите удалить организацию из списка?
						</p>
						<div>
							<button onClick={props.closeModal}>Отменить</button>
							<button>Удалить</button>
						</div>
					</>
				)}
			</div>
			<div className='overlay'></div>
		</>
	);
}
