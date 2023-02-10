import edit_icon from '../assets/icons/edit_icon.png';
import delete_icon from '../assets/icons/delete_icon.png';

export default function Organization(props) {
	const ownership = props.ownerships.find(
		(ownership) => ownership.id === props.form_id
	);

	return (
		<div
			className={props.isSelected ? 'organization-selected' : 'organization'}
		>
			<div className='logo-container'>
				<img src={props.logo} alt='лого организации' />
			</div>

			<div className='name-and-tin'>
				<p>
					<span>{ownership.short} </span>
					{props.company_name}
				</p>
				<p className='tin-container'>
					<span className='tin'>ИИН/БИН</span>
					<span>{props.company_tin}</span>
				</p>
			</div>

			<div className='action-buttons'>
				<img
					src={edit_icon}
					alt='редактировать'
					onClick={() => props.editOrg(props.company_id)}
				/>
				<img
					src={delete_icon}
					alt='удалить'
					onClick={() => props.deleteOrg(props.company_id)}
				/>
			</div>
		</div>
	);
}
