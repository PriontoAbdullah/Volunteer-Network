import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './EventTasks.css';
import Task from './Task';

const EventTasks = () => {
	const { user, data } = useContext(UserContext);
	const [ loggedInUser, setLoggedInUser ] = user;

	const [ userTasks, setUserTasks ] = useState([]);

	// Filtering tasks for an user
	useEffect(
		() => {
			fetch(`https://volunteer-network-71.herokuapp.com/events?email=${loggedInUser.email}`)
				.then((res) => res.json())
				.then((data) => {
					setUserTasks([ ...data ]);
				})
				.catch((err) => console.log(err));
		},
		[ loggedInUser.email ]
	);

	// Delete a task
	const deleteTask = (id) => {
		fetch(`https://volunteer-network-71.herokuapp.com/deleteTask/${id}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result, 'Task deleted');
				if (result) {
					const newTasks = [ ...userTasks ].filter((task) => task._id !== id);
					setUserTasks(newTasks);
				}
			});
	};

	return (
		<div className="container py-5 my-5">
			<div className="vn-event-tasks">
				<div className="row">
					{userTasks.length > 0 ? (
						userTasks.map((task) => <Task task={task} key={Math.random()} deleteTask={deleteTask} />)
					) : (
						<div style={{ maxWidth: '400px', margin: 'auto' }}>
							<div className="alert alert-danger text-center">
								No task found. Please login to add tasks.
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default EventTasks;
