/* eslint-disable consistent-return */
import React, {useEffect, useState} from "react";
import Loader from "./block/loader";
import axios from "../utils/axios";
import Card from "./block/card";
import Header from "./block/header";
import Nav from "./block/nav";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";

const HomeComponents = (props) => {
	let city = props.match.params.city || `Amsterdam`;
	// arr citystate popular
	const [cityesPopularState, setCityesPopularState] = useState();
	// state output for user (city)
	const [renderCityesState, setRenderCityesState] = useState();
	// number of places
	const [placesState, setPlacesState] = useState(0);
	// state output for user
	const [sortState, setSortState] = useState(`Popular`);
	// arr citystate (clickSort is not required to update the data from the server)
	const [cityesState, setCityesState] = useState(0);
	// state sort value
	const [clickSortState, setClickSortState] = useState(0);
	// Open Close sort panel
	const [sortOpenState, setSortOpenState] = useState(false);

	// SET SITY (user)
	function setSity(cityes) {
		cityes = cityes || cityesState;
		let i = 0;
		setRenderCityesState(
			cityes.map((obj) => {
				i++;
				return <Card key={obj.id} objCard={obj} />;
			})
		);
		return i;
	}
	// SORTCITY + SET(user)
	const sortAndSetCityes = (value, cityes) => {
		let i = 0
		setClickSortState(value)
		switch (value) {
		case 0:
			i = setSity(cityesPopularState);
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
				let cityes = cityesState;
				sortAndSetCityes(evt.target.value, cityes);
			}
			setSortOpenState(!sortOpenState);
		} else if (
			sortOpenState ||
			evt.target.classList.contains(`places__sorting-type`)
		) {
			setSortOpenState(!sortOpenState);
		}
	};
	// Redirect on address error
	if (
		[
			`Paris`,
			`Cologne`,
			`Brussels`,
			`Amsterdam`,
			`Hamburg`,
			`Dusseldorf`,
		].indexOf(city) < 0
	) {
		return (
			<>
				<Redirect to={`/404`} />
			</>
		);
	}
	// receiving data(city) from the server, sort by city, sort by userSort, sending to the user
	useEffect(() => {
		axios(`${process.env.SERVER_URL}/hotels`)
			.then((res) => {
				let cityes = res.data.filter((obj) => obj.city.name === city);
				setCityesPopularState(cityes.slice())
				if (!clickSortState) {
					setCityesState(cityes.slice());
					let i = setSity(cityes);
					setPlacesState(i);
					if (i <= 0) {
						setRenderCityesState(<div>В городе {city} нет комнат</div>);
					}
				} else {
					sortAndSetCityes(clickSortState, cityes);
				}
			})
			.catch(()=>(setRenderCityesState(<div>Ошибка связи с сервером</div>)));
	}, [city]);
	return (
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
						<Nav city={city} />
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
	);
};

HomeComponents.propTypes = {
	params: PropTypes.object,
	match: PropTypes.object,
	city: PropTypes.string,
};

export default HomeComponents;
