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
				setOrganizations(
					data.map((item, i) => ({
						...item,
						isSelected: false,
						logo: placeLogos(data, logo1, logo2, logo3).at(i),
						key: crypto.randomUUID(),
					}))
				);
			});

		fetch(
			'https://raw.githubusercontent.com/arkdich/mybuh-frontend-test/main/tax-systems.json'
		)
			.then((response) => response.json())
			.then((data) => (taxations.current = data));
	}, []);

	function placeLogos(data, ...params) {
		const logos = [];
		for (let i = 0, n = 0; i < data.length; i++, n++) {
			logos.push(params.at(n));
			if (n === params.length - 1) n = -1;
		}

		return logos;
	}

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

	function saveEdits(name, tin, id) {
		setOrganizations((prev) =>
			prev.map((item) => {
				if (item.isSelected) {
					if (name === '') name = item.company_name;
					if (tin === '') tin = item.company_tin;
					return {
						...item,
						company_name: name,
						company_tin: tin,
						company_id: id,
					};
				} else return item;
			})
		);
		closeModal();
	}

	function deleteOrg(id) {
		setIsDeleteModal(false);
		setOrganizations(organizations.filter((item) => item.company_id !== id));
	}

	const organizationsDivs = organizations.map((organization, i) => (
		<Organization
			{...organization}
			key={crypto.randomUUID()}
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
					ownerships={ownerships.current}
					company_id={organizations.find((item) => item.isSelected).company_id}
					closeModal={closeModal}
					deleteOrg={deleteOrg}
					saveEdits={saveEdits}
				/>
			)}
		</div>
	);
}
