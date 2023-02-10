export default function Modal(props) {
	return (
		<>
			<div className='modal'>
				<span className='modal-close' onClick={closeModal}>
					close
				</span>
				<p>{description}</p>
				<p>{api}</p>
				<p>
					<a href={link}>{link}</a>
				</p>
				<p>{category}</p>
			</div>
			<div className='overlay'></div>
		</>
	);
}
