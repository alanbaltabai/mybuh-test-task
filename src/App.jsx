import { useEffect, useRef, useState } from 'react';

import Organization from './components/Organization';
import Modal from './components/Modal';

import logo1 from './assets/logos/logo1.png';
import logo2 from './assets/logos/logo2.png';
import logo3 from './assets/logos/logo3.png';

export default function App() {
	const [organizations, setOrganizations] = useState([]);
	const [isEditModal, setIsEditModal] = useState(false);
	const [isDeleteModal, setIsDeleteModal] = useState(false);

	const ownerships = useRef([]);
	const taxations = useRef([]);

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
			.then((data) => {
				const logos = [];
				for (let i = 0, n = 0; i < data.length; i++, n++) {
					if (n === 0) logos.push(logo1);
					else if (n === 1) logos.push(logo2);
					else if (n === 2) {
						logos.push(logo3);
						n = -1;
					}
				}

				setOrganizations(
					data.map((item, i) => ({
						...item,
						isSelected: false,
						logo: logos.at(i),
					}))
				);
			});

		fetch(
			'https://raw.githubusercontent.com/arkdich/mybuh-frontend-test/main/tax-systems.json'
		)
			.then((response) => response.json())
			.then((data) => (taxations.current = data));
	}, []);

	function openEditModal(id) {
		setIsEditModal(true);
		setOrganizations((prev) =>
			prev.map((item) =>
				item.company_id === id ? { ...item, isSelected: true } : item
			)
		);
	}

	function openDeleteModal(id) {
		setIsDeleteModal(true);
		setOrganizations((prev) =>
			prev.map((item) =>
				item.company_id === id ? { ...item, isSelected: true } : item
			)
		);
	}

	function closeModal() {
		if (isEditModal) setIsEditModal(false);
		if (isDeleteModal) setIsDeleteModal(false);
		setOrganizations((prev) =>
			prev.map((item) =>
				item.isSelected ? { ...item, isSelected: false } : item
			)
		);
	}

	function deleteOrg(id) {
		setIsDeleteModal(false);
		setOrganizations(organizations.filter((item) => item.company_id !== id));
	}

	const organizationsDivs = organizations.map((organization, i) => (
		<Organization
			{...organization}
			key={organization.company_id}
			ownerships={ownerships.current}
			openEditModal={openEditModal}
			openDeleteModal={openDeleteModal}
		/>
	));

	return (
		<div className='main'>
			<h1 className='main__title'>Мои организации</h1>
			<div className='organizations'>{organizationsDivs}</div>
			{(isEditModal || isDeleteModal) && (
				<Modal
					isEditModal={isEditModal}
					taxations={taxations.current}
					company_id={organizations.find((item) => item.isSelected).company_id}
					closeModal={closeModal}
					deleteOrg={deleteOrg}
				/>
			)}
		</div>
	);
}
