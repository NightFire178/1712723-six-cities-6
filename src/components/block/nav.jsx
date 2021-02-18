import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Nav = (props) => {
	const {city} = props;
	const cityes = [
		`Paris`,
		`Cologne`,
		`Brussels`,
		`Amsterdam`,
		`Hamburg`,
		`Dusseldorf`,
	];
	return (
		<>
			<div className="tabs">
				<section className="locations container">
					<ul className="locations__list tabs__list">
						{cityes.map((place, i) => (
							<Fragment key={i + place}>
								<li className="locations__item">
									<Link to={`/main/${place}`}>
										<div
											className={`locations__item-link tabs__item ${
												city === place && `tabs__item--active`
											}`}
										>
											<span>{place}</span>
										</div>
									</Link>
								</li>
							</Fragment>
						))}
					</ul>
				</section>
			</div>
		</>
	);
};

Nav.propTypes = {
	city: PropTypes.string,
};

export default Nav;
