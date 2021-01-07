import React, { useContext } from 'react';
import { UserContext } from '../../App';
import volunteerTasks from '../../fakeData/volunteerTasks';
import Card from './Card';
import './Home.css';

const Home = () => {
	const { user, data } = useContext(UserContext);
	const [ mainData, setMainData ] = data;

	setMainData(volunteerTasks);

	return (
		<main className="vn-home pt-5 mt-2">
			<div className="container text-center">
				<div className="vn-works-search">
					<h2 className="display-5 mb-4">I grow by helping people in need.</h2>
					<div className="form-group">
						<input type="search" placeholder="Search ... " className="form-control" />
						<button className="btn btn-primary" type="button" id="button-addon2">
							Search
						</button>
					</div>
				</div>
				<div className="vn-works py-5 mt-2">
                {mainData.length ? (
						<div className="row">
							{mainData.map((task) => (
								<Card task={task} key={Math.random()}></Card>
							))}
						</div>
					) : (
						<div style={{ maxWidth: "400px", margin: "auto" }}>
							
						</div>
					)}
				</div>
			</div>
		</main>
	);
};

export default Home;
