export default function DeleteModal(props) {
	return (
		<>
			<div className='modal'>
				<span className='modal-close' onClick={props.closeModal}>
					x
				</span>
				<h2>Удаление организации</h2>
				<p>Вы уверены, что хотите удалить организацию из списка?</p>
				<div>
					<button>Отменить</button>
					<button>Удалить</button>
				</div>
			</div>
			<div className='overlay'></div>
		</>
	);
}
gi;
