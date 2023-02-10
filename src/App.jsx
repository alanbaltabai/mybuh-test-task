import { useEffect, useRef, useState } from 'react';

import Organization from './components/Organization';
import Modal from './components/Modal';
import logo1 from './assets/logos/logo1.png';
import logo2 from './assets/logos/logo2.png';
import logo3 from './assets/logos/logo3.png';

export default function App() {
	const [organizations, setOrganizations] = useState([]);
	const ownerships = useRef([]);
	const [isModal, setIsModal] = useState(false);
	const logos = useRef([logo1, logo2, logo3]);

	useEffect(() => {
		fetch(
			'https://raw.githubusercontent.com/arkdich/mybuh-frontend-test/main/ownerships.json'
		)
			.then((response) => response.json())
			.then((data) => (ownerships.current = data));

		fetch(
			'https://raw.githubusercontent.com/arkdich/mybuh-frontend-test/main/companies.json'
		)
			.then((response) => response.json())
			.then((data) =>
				setOrganizations(data.map((item) => ({ ...item, isSelected: false })))
			);
	}, []);

	function editOrg(id) {
		setIsModal(true);
		setOrganizations((prev) =>
			prev.map((item) =>
				item.company_id === id ? { ...item, isSelected: true } : item
			)
		);
	}

	function giveLogo(i) {
		if (logos.current.length <= i && i % 3 === 0) return logos.current.at(0);
		if (logos.current.length <= i && i % 4 === 0) return logos.current.at(1);
		if (logos.current.length <= i && (i === 7 || i % 5 === 0))
			return logos.current.at(2);

		return logos.current.at(i);
	}

	function closeModal() {
		setIsModal(false);
		setOrganizations((prev) =>
			prev.map((item) =>
				item.isSelected ? { ...item, isSelected: false } : item
			)
		);
	}

	const organizationsDivs = organizations.map((organization, i) => (
		<Organization
			{...organization}
			key={organization.company_id}
			ownerships={ownerships.current}
			editOrg={editOrg}
			logo={giveLogo(i)}
		/>
	));

	return (
		<div className='main'>
			<h1 className='main__title'>Мои организации</h1>
			<div className='organizations'>{organizationsDivs}</div>
			{isModal && <Modal closeModal={closeModal} />}
		</div>
	);
}
