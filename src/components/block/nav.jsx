import React, {Fragment, useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";

const Nav = () => {
	const cityes = [
		`Paris`,
		`Cologne`,
		`Brussels`,
		`Amsterdam`,
		`Hamburg`,
		`Dusseldorf`,
	];
	const city = useSelector((state) => state.appState.cityNow);
	const dispatch = useDispatch();
	const [menu, setMenu] = useState();
	useEffect(() => {
		setMenu(
			cityes.map((place, i) => (
				<Fragment key={i + place}>
					<a onClick={click}>
						<li className="locations__item">
							<div
								className={`locations__item-link tabs__item ${
									city === place && `tabs__item--active`
								}`}
							>
								<span>{place}</span>
							</div>
						</li>
					</a>
				</Fragment>
			))
		);
	}, [city]);
	const click = (evt) => {
		dispatch({type: `CITY_SET`, payload: evt.target.textContent});
	};
	return (
		<>
			<div className="tabs">
				<section className="locations container">
					<ul className="locations__list tabs__list">{menu}</ul>
				</section>
			</div>
		</>
	);
};

Nav.propTypes = {
	city: PropTypes.string,
};

export default Nav;
// connect(
// 	(state) => ({
// 		city: state.appState.cityNow,
// 	}),
// 	(dispatch) => ({
// 		setCityNow: (citySort) => {
// 			dispatch({ type: `CITY_SET`, payload: citySort });
// 		},
// 	})
// )(Nav);
