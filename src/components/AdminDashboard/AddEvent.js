import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddEvent = () => {
	const history = useHistory();

	const [ status, setStatus ] = useState(false);

	const [ addTask, setTask ] = useState({
		taskId: Math.round(Math.random() * 100 + 20),
		title: '',
		date: '',
		description: '',
		img: 'https://i.imgur.com/uXa96q9.png'
	});

	// Add an event task
	const handleAddEvent = (e) => {
		e.preventDefault();
		fetch('http://localhost:5000/admin/addEvent', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(addTask)
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setStatus(!status);
			})
			.catch((err) => console.log(err));

		history.push('/');
	};

	// Input fields handler
	const handleInputValues = (e) => {
		if (e.target.value.trim().length > 0) {
			const newTask = { ...addTask };
			newTask[e.target.name] = e.target.value;
			setTask(newTask);
		}
	};

	return (
		<div className="admin-add-event">
			<h5 className="display-5 py-md-4 py-0">Add event</h5>
			{status && (
				<div className="alert alert-success text-center" role="alert">
					New task added successfully
				</div>
			)}
			<div className="admin-content">
				<form action="/addEvent" onSubmit={handleAddEvent}>
					<div className="row">
						<div className="col-md-6">
							<div className="form-group">
								<label>Enter title</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter title"
									name="title"
									onChange={handleInputValues}
									required={true}
									minLength="5"
								/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label>Event Date</label>
								<input
									type="date"
									className="form-control"
									placeholder="Event Date"
									name="date"
									onChange={handleInputValues}
									required={true}
								/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label>Description</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter Description"
									name="description"
									onChange={handleInputValues}
									required={true}
									minLength="5"
								/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="form-group">
								<label>Banner</label>
								<input
									type="url"
									className="form-control"
									placeholder="Upload Banner link"
									name="img"
									onChange={handleInputValues}
								/>
							</div>
						</div>
						<div className="col-md-12 col-md-12 text-right">
							<button type="submit-" className="btn btn-primary">
								submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddEvent;
