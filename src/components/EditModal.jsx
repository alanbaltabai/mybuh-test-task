import LLP from './LLP';
import IE from './IE';
import Others from './Others';
import { useState } from 'react';

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
				<span className='modal-close' onClick={props.closeModal}>
					x
				</span>
				<h2>Редактировать данные организации</h2>
			</div>
			<div className='overlay'></div>
		</>
	);
}
