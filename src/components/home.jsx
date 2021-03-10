import React, {useEffect, useState} from "react";
import Loader from "./block/loader";
import {useSelector} from "react-redux";
import Card from "./block/card";
import Header from "./block/header";
import Nav from "./block/nav";
import PropTypes from "prop-types";

const HomeComponents = () => {
	const {city, hotels, load} = useSelector((state) => ({
		hotels: state.hotels,
		city: state.appState.cityNow,
		load: state.appState.load,
	}));
	// state output for user (city)
	const [renderCityesState, setRenderCityesState] = useState();
	// number of places
	const [placesState, setPlacesState] = useState(0);
	// state output for user
	const [sortState, setSortState] = useState(`Popular`);
	// Open Close sort panel
	const [sortOpenState, setSortOpenState] = useState(false);
	// sort value
	const [sortValueState, setSortValueState] = useState(0);
	// SET SITY (user)
	function setSity(cityes) {
		let i = 0;
		setRenderCityesState(
			cityes.map((obj) => {
				i++;
				return <Card key={obj.id} objCard={obj} />;
			})
		);
		return i;
	}
	useEffect(()=>{console.log("use")})
	// SORTCITY + SET(user)
	const sortAndSetCityes = (value, cityes) => {
		let i = 0;
		switch (value) {
		case 0:
			i = setSity(cityes);
			break;
		case 1:
			cityes.sort((a, b) => (a.price > b.price ? 1 : -1));
			i = setSity(cityes);
			break;
		case 2:
			cityes.sort((a, b) => (a.price > b.price ? -1 : 1));
			i = setSity(cityes);
			break;
		case 3:
			cityes.sort((a, b) => (a.rating > b.rating ? -1 : 1));
			i = setSity(cityes);
			break;
		}
		return i;
	};

	// SORT + SET CITY(user)
	const clickSort = (evt) => {
		if (sortOpenState) {
			if (evt.target.classList.contains(`places__option`)) {
				setSortState(evt.target.textContent);
				setSortValueState(evt.target.value);
			}
			setSortOpenState(!sortOpenState);
		} else if (
			sortOpenState ||
			evt.target.classList.contains(`places__sorting-type`)
		) {
			setSortOpenState(!sortOpenState);
		}
	};
	// receiving data(city) from the server, sort by city, sort by userSort, sending to the user
	useEffect(() => {
		let cityes = hotels.filter((obj) => obj.city.name === city).slice();
		let i = sortAndSetCityes(sortValueState, cityes);
		setPlacesState(i);
		if (i <= 0) {
			setRenderCityesState(<div>В городе {city} нет комнат</div>);
		}
	}, [city, hotels, sortValueState]);


	return load ? (
		<>
			<div onClick={clickSort}>
				<div style={{display: `none`}}>
					<svg xmlns="http://www.w3.org/2000/svg">
						<symbol id="icon-arrow-select" viewBox="0 0 7 4">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"
							/>
						</symbol>
						<symbol id="icon-bookmark" viewBox="0 0 17 18">
							<path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z" />
						</symbol>
						<symbol id="icon-star" viewBox="0 0 13 12">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"
							/>
						</symbol>
					</svg>
				</div>
				<div className="page page--gray page--main">
					<Header isMain={true} />
					<main className="page__main page__main--index">
						<h1 className="visually-hidden">Cities</h1>
						<Nav />
						<div className="cities">
							<div className="cities__places-container container">
								<section className="cities__places places">
									<h2 className="visually-hidden">Places</h2>
									<b className="places__found">
										{placesState} places to stay in {city}
									</b>
									<form className="places__sorting" action="#" method="get">
										<span className="places__sorting-caption">Sort by</span>
										<span
											className="places__sorting-type"
											tabIndex={0}
											onClick={clickSort}
										>
											{sortState}
											<svg className="places__sorting-arrow" width={7} height={4}>
												<use xlinkHref="#icon-arrow-select" />
											</svg>
										</span>
										<ul
											className={`places__options places__options--custom ${
												sortOpenState && `places__options--opened`
											}`}
										>
											<li
												className="places__option places__option--active"
												tabIndex={0}
												value={0}
												onClick={clickSort}
											>
												Popular
											</li>
											<li
												className="places__option"
												tabIndex={0}
												value={1}
												onClick={clickSort}
											>
												Price: low to high
											</li>
											<li
												className="places__option"
												tabIndex={0}
												value={2}
												onClick={clickSort}
											>
												Price: high to low
											</li>
											<li
												className="places__option"
												tabIndex={0}
												value={3}
												onClick={clickSort}
											>
												Top rated first
											</li>
										</ul>
									</form>
									<div className="cities__places-list places__list tabs__content">
										{renderCityesState ? renderCityesState : <Loader />}
									</div>
								</section>
								<div className="cities__right-section">
									<section className="cities__map map" />
								</div>
							</div>
						</div>
					</main>
				</div>
			</div>
		</>
	) : (
		<Loader />
	);
};

HomeComponents.propTypes = {
	params: PropTypes.object,
	match: PropTypes.object,
	city: PropTypes.string,
};

export default HomeComponents;
