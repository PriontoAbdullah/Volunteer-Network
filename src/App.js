import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import EventTasks from './components/Events/EventTasks';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
	const [ loggedInUser, setLoggedInUser ] = useState({});
	const [ mainData, setMainData ] = useState([]);

	// Get All Volunteer Tasks
	useEffect(() => {
		fetch('http://localhost:5000/volunteerTasks').then((res) => res.json()).then((data) => {
			setMainData(data);
		});
	}, [mainData.length]);

	const globalStates = {
		user: [ loggedInUser, setLoggedInUser ],
		data: [ mainData, setMainData ]
	};

	return (
		<UserContext.Provider value={globalStates}>
			<Router>
				<Header />
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
					<PrivateRoute path="/events/:id">
						<Register />
					</PrivateRoute>
					<Route exact path="/events">
						<EventTasks />
					</Route>
				</Switch>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
