import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";


export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
	const [mainData, setMainData] = useState([]);

	const globalStates = {
		user: [loggedInUser, setLoggedInUser],
		data: [mainData, setMainData],
	};


  return (
<UserContext.Provider value={globalStates}>
			<Router>
				<Header></Header>
				<Switch>
					<Route exact path="/">
					<Home />
					</Route>
				
				</Switch>
			</Router>
      </UserContext.Provider>
  );
}

export default App;
