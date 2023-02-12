import { useState } from 'react';

import LLP from './LLP';
import IE from './IE';
import Others from './Others';

import close from '../assets/icons/close.png';

export default function EditModal(props) {
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
					src={close}
					alt=''
					onClick={() => props.closeModal()}
				/>

				<h2>Редактировать данные организации</h2>
			</div>
			<div className='overlay'></div>
		</>
	);
}
