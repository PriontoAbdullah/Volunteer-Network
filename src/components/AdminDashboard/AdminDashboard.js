import React, { useEffect, useState } from 'react';
import plus from '../../images/logos/plus.png';
import user from '../../images/logos/users-alt.png';
import AddEvent from './AddEvent';
import './AdminDashboard.css';
import VolunteerList from './VolunteerList';

const AdminDashboard = () => {
	const [ volunteerList, setVolunteerList ] = useState([]);
	const [ show, setShow ] = useState(false);

	const [ toggleView, setToggleView ] = useState({
		showList: true,
		showAddEvent: false
	});

	// Get register users data and update volunteerList
	useEffect(
		() => {
			if (toggleView.showList) {
				fetch('http://localhost:5000/loadVolunteerList')
					.then((res) => res.json())
					.then((data) => setVolunteerList(data));
			}
		},
		[ toggleView.showList ]
	);

	// Delete a registered user
	const handleDeleteEvent = (id) => {
		console.log('delete clicked', id);
		fetch(`http://localhost:5000/admin/deleteTask/${id}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result, 'Task deleted');
				if (result) {
					const newVolList = volunteerList.filter((task) => task._id !== id);
					setVolunteerList(newVolList);
				}
			});
		setShow(false);
	};

	// Toggle admin menu
	const handleListView = () => {
		setToggleView({
			...toggleView,
			showList: true,
			showAddEvent: false
		});
	};

	const handleAddEventView = () => {
		setToggleView({
			...toggleView,
			showList: false,
			showAddEvent: true
		});
	};

	const style = {
		primary: {
			color: '#3f90fc'
		},
		default: {
			color: '#000000'
		}
	};

	return (
		<div className="container-fluid">
			<div className="vn-admin-dashboard px-lg-5 px-0">
				<div className="row">
					<div className="col-lg-3">
						<div className="admin-controls py-3 d-flex flex-lg-column">
							<button
								className="btn"
								onClick={handleListView}
								style={toggleView.showList ? style.primary : style.default}
							>
								<img src={user} style={{ maxWidth: '17px' }} alt="" />
								<span>Volunteer register list</span>
							</button>
							<button
								className="btn"
								onClick={handleAddEventView}
								style={toggleView.showAddEvent ? style.primary : style.default}
							>
								<img src={plus} style={{ maxWidth: '17px' }} alt="" />
								<span>Add event</span>
							</button>
						</div>
					</div>
					<div className="col-lg-9">
						{toggleView.showList && (
							<VolunteerList
								tasks={volunteerList}
								deleteHandler={handleDeleteEvent}
								show={show}
								setShow={setShow}
							>
								{' '}
							</VolunteerList>
						)}
						{toggleView.showAddEvent && <AddEvent />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
