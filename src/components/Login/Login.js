import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logos/google.png";
import firebaseConfig from "./firebaseConfig";
import './Login.css';

const Login = () => {
    const { user, data } = useContext(UserContext);
	const [loggedInUser, setLoggedInUser] = user;

	const [alert, setAlert] = useState({
		success: false,
		error: "",
	});

	const history = useHistory();
	const location = useLocation();
	const { from } = location.state || { from: { pathname: "/events" } };

	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	}
	const handleGoogleSignIn = () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				const { displayName, email } = result.user;
				const newUser = {
					isLoggedIn: true,
					name: displayName,
					email: email,
				};
				setLoggedInUser(newUser);
				history.replace(from);

				const newAlert = { ...alert };
				newAlert.success = true;
				newAlert.error = "";
				setAlert(newAlert);
			})
			.catch((error) => {
				const newAlert = { ...alert };
				newAlert.error = error.message;
				setAlert(newAlert);
			});
	};

	return (
		<div className="container d-flex align-items-center justify-content-center py-5 my-5">
			<div className="vn-login-register login p-md-5 p-3">
				{alert.error.length > 0 && <div className="alert alert-danger text-center">{alert.error}</div>}

				<h4 className="mb-5">Login With</h4>
				<button className="btn btn-outline-secondary social-login" onClick={handleGoogleSignIn}>
					<img src={logo} alt="" />
					Continue with Google
				</button>
				<h5 className="mt-3">
					<span>Don’t have an account?</span>
					<Link to="/login">Create an account</Link>
				</h5>
			</div>
		</div>
	);
};

export default Login;
