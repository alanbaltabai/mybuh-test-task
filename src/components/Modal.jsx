export default function Modal(props) {
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
