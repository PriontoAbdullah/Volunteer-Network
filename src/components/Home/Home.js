import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Card from './Card';
import './Home.css';

const useStyles = makeStyles({
	root: {
		width: 1000
	}
});

const Home = () => {
	const classes = useStyles();

	const { user, data } = useContext(UserContext);
	const [ mainData, setMainData ] = data;
	const [ filter, setFilter ] = useState('');

	// Get All Volunteer Tasks
	useEffect(
		() => {
			fetch('https://volunteer-network-71.herokuapp.com/volunteerTasks')
				.then((res) => res.json())
				.then((data) => {
					setMainData(data);
				});
		},
		[ setMainData ]
	);

	// Get Search Query Tasks
	useEffect(
		() => {
			fetch('https://volunteer-network-71.herokuapp.com/tasks?filter=' + filter)
				.then((res) => res.json())
				.then((data) => {
					setMainData(data);
				});
		},
		[ filter, setMainData ]
	);

	const getQuery = (e) => setFilter(e.target.value);

	return (
		<main className="vn-home pt-5 mt-2">
			<div className="container text-center">
				<div className="vn-works-search">
					<h2 className="display-5 mb-4">I grow by helping people in need.</h2>
					<div className="form-group">
						<input
							id="query"
							onChange={getQuery}
							type="search"
							placeholder="Search ... "
							className="form-control"
						/>
						<button className="btn btn-primary" type="button" id="button-addon2">
							Search
						</button>
					</div>
				</div>
				<div className="vn-works py-5 mt-2">
					{mainData.length ? (
						<div className="row">{mainData.map((task) => <Card task={task} key={Math.random()} />)}</div>
					) : (
						<div className={classes.root}>
							<div className="row">
								<div className="col-lg-3 col-sm-6 ">
									<Skeleton variant="rect" height={250} animation="wave" />
									<Skeleton variant="text" height={30} animation="wave" />
								</div>
								<div className="col-lg-3 col-sm-6">
									<Skeleton variant="rect"  height={250} animation="wave" />
									<Skeleton variant="text" height={30} animation="wave" />
								</div>
								<div className="col-lg-3 col-sm-6 ">
									<Skeleton variant="rect"  height={250} animation="wave" />
									<Skeleton variant="text" height={30} animation="wave" />
								</div>
								<div className="col-lg-3 col-sm-6">
									<Skeleton variant="rect"  height={250} animation="wave" />
									<Skeleton variant="text" height={30} animation="wave" />
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Home;
