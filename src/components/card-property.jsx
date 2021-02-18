import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import Header from "./block/header";
import PropTypes from "prop-types";
import axios from "../utils/axios";
import Loader from "./block/loader";
import Card from "./block/card";

const CardProperty = (props) => {
	const monthNames = [
		`January`,
		`February`,
		`March`,
		`April`,
		`May`,
		`June`,
		`July`,
		`August`,
		`September`,
		`October`,
		`November`,
		`December`,
	];
	const cardId = props.match.params.id;
	// мог бы использовать переменные везде кроме dataState, но сделал так на случай расширения функционала работы с сервером
	const [cardState, setCardState] = useState();
	const [cardNearbyState, setCardNearbyState] = useState();
	const [cardCommentsState, setCardCommentsState] = useState();
	const [dataState, setDataState] = useState();
	useEffect(() => {
		let h = axios(`${process.env.SERVER_URL}/hotels/${cardId}`).then((res) => {
			setCardState(res.data);
		});
		let n = axios(`${process.env.SERVER_URL}/hotels/${cardId}/nearby`).then(
			(res) => {
				setCardNearbyState(res.data);
			}
		);
		let c = axios(`${process.env.SERVER_URL}/comments/${cardId}`).then((res) => {
			setCardCommentsState(res.data);
		});
		Promise.all([h, n, c])
			.then(() => {
				setDataState(true);
			})
			.catch(() => setDataState(false));
		window.scrollTo(0, 0);
	}, [cardId]);
	if (dataState) {
		const starWidth = (rating) => {
			let temp = Math.floor(rating);
			return `${(rating - temp) * 10 >= 5 ? temp * 20 + 20 : temp * 20}%`;
		};
		return (
			<div>
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
				<div className="page">
					<Header />
					<main className="page__main page__main--property">
						<section className="property">
							<div className="property__gallery-container container">
								<div className="property__gallery">
									{cardState.images.map((img, i) => {
										if (i < 6) {
											return (
												<React.Fragment key={img + i}>
													<div className="property__image-wrapper">
														<img className="property__image" src={img} alt="Photo studio" />
													</div>
												</React.Fragment>
											);
										} else {
											return null;
										}
									})}
								</div>
							</div>
							<div className="property__container container">
								<div className="property__wrapper">
									{cardState.is_premium && (
										<div className="property__mark">
											<span>Premium</span>
										</div>
									)}
									<div className="property__name-wrapper">
										<h1 className="property__name">{cardState.title}</h1>
										<button className="property__bookmark-button button" type="button">
											<svg className="property__bookmark-icon" width={31} height={33}>
												<use xlinkHref="#icon-bookmark" />
											</svg>
											<span className="visually-hidden">To bookmarks</span>
										</button>
									</div>
									<div className="property__rating rating">
										<div className="property__stars rating__stars">
											<span style={{width: starWidth(cardState.rating)}} />
											<span className="visually-hidden">Rating</span>
										</div>
										<span className="property__rating-value rating__value">
											{cardState.rating}
										</span>
									</div>
									<ul className="property__features">
										<li className="property__feature property__feature--entire">
											{cardState.type}
										</li>
										<li className="property__feature property__feature--bedrooms">
											{cardState.bedrooms} Bedrooms
										</li>
										<li className="property__feature property__feature--adults">
											Max {cardState.max_adults} adults
										</li>
									</ul>
									<div className="property__price">
										<b className="property__price-value">€{cardState.price}</b>
										<span className="property__price-text">&nbsp;night</span>
									</div>
									<div className="property__inside">
										<h2 className="property__inside-title">What`s inside</h2>
										<ul className="property__inside-list">
											{cardState.goods.map((goods, i) => (
												<React.Fragment key={goods + i}>
													<li className="property__inside-item">{goods}</li>
												</React.Fragment>
											))}
										</ul>
									</div>
									<div className="property__host">
										<h2 className="property__host-title">Meet the host</h2>
										<div className="property__host-user user">
											<div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
												<img
													className="property__avatar user__avatar"
													src={cardState.host.avatar_url}
													width={74}
													height={74}
													alt="Host avatar"
												/>
											</div>
											<span className="property__user-name">{cardState.host.name}</span>
										</div>
										<div className="property__description">
											{cardState.description.split(`.`).map((item, i) => (
												<React.Fragment key={item + i}>
													<p className="property__text">{item}.</p>
												</React.Fragment>
											))}
										</div>
									</div>
									<section className="property__reviews reviews">
										<h2 className="reviews__title">
											Reviews ·
											<span className="reviews__amount">{cardCommentsState.length}</span>
										</h2>
										<ul className="reviews__list">
											{cardCommentsState.map((comment) => (
												<React.Fragment key={comment.id}>
													<li className="reviews__item">
														<div className="reviews__user user">
															<div className="reviews__avatar-wrapper user__avatar-wrapper">
																<img
																	className="reviews__avatar user__avatar"
																	src={comment.user.avatar_url}
																	width={54}
																	height={54}
																	alt="Reviews avatar"
																/>
															</div>
															<span className="reviews__user-name">{comment.user.name}</span>
														</div>
														<div className="reviews__info">
															<div className="reviews__rating rating">
																<div className="reviews__stars rating__stars">
																	<span style={{width: starWidth(comment.rating)}} />
																	<span className="visually-hidden">Rating</span>
																</div>
															</div>
															<p className="reviews__text">{comment.comment}</p>
															<time
																className="reviews__time"
																dateTime={comment.date.split(`T`)[0]}
															>
																{`${monthNames[new Date(comment.date).getMonth()]}`}
																{new Date(comment.date).getFullYear()}
															</time>
														</div>
													</li>
												</React.Fragment>
											))}
										</ul>
										<form className="reviews__form form" action="#" method="post">
											<label className="reviews__label form__label" htmlFor="review">
												Your review
											</label>
											<div className="reviews__rating-form form__rating">
												<input
													className="form__rating-input visually-hidden"
													name="rating"
													defaultValue={5}
													id="5-stars"
													type="radio"
												/>
												<label
													htmlFor="5-stars"
													className="reviews__rating-label form__rating-label"
													title="perfect"
												>
													<svg className="form__star-image" width={37} height={33}>
														<use xlinkHref="#icon-star" />
													</svg>
												</label>
												<input
													className="form__rating-input visually-hidden"
													name="rating"
													defaultValue={4}
													id="4-stars"
													type="radio"
												/>
												<label
													htmlFor="4-stars"
													className="reviews__rating-label form__rating-label"
													title="good"
												>
													<svg className="form__star-image" width={37} height={33}>
														<use xlinkHref="#icon-star" />
													</svg>
												</label>
												<input
													className="form__rating-input visually-hidden"
													name="rating"
													defaultValue={3}
													id="3-stars"
													type="radio"
												/>
												<label
													htmlFor="3-stars"
													className="reviews__rating-label form__rating-label"
													title="not bad"
												>
													<svg className="form__star-image" width={37} height={33}>
														<use xlinkHref="#icon-star" />
													</svg>
												</label>
												<input
													className="form__rating-input visually-hidden"
													name="rating"
													defaultValue={2}
													id="2-stars"
													type="radio"
												/>
												<label
													htmlFor="2-stars"
													className="reviews__rating-label form__rating-label"
													title="badly"
												>
													<svg className="form__star-image" width={37} height={33}>
														<use xlinkHref="#icon-star" />
													</svg>
												</label>
												<input
													className="form__rating-input visually-hidden"
													name="rating"
													defaultValue={1}
													id="1-star"
													type="radio"
												/>
												<label
													htmlFor="1-star"
													className="reviews__rating-label form__rating-label"
													title="terribly"
												>
													<svg className="form__star-image" width={37} height={33}>
														<use xlinkHref="#icon-star" />
													</svg>
												</label>
											</div>
											<textarea
												className="reviews__textarea form__textarea"
												id="review"
												name="review"
												placeholder="Tell how was your stay, what you like and what can be improved"
												defaultValue=""
											/>
											<div className="reviews__button-wrapper">
												<p className="reviews__help">
													To submit review please make sure to set
													<span className="reviews__star">rating</span> and describe your
													stay with at least
													<b className="reviews__text-amount">50 characters</b>.
												</p>
												<button
													className="reviews__submit form__submit button"
													type="submit"
													disabled
												>
													Submit
												</button>
											</div>
										</form>
									</section>
								</div>
							</div>
							<section className="property__map map" />
						</section>
						<div className="container">
							<section className="near-places places">
								<h2 className="near-places__title">
									Other places in the neighbourhood
								</h2>
								<div className="near-places__list places__list">
									{cardNearbyState.map((obj) => {
										return <Card key={obj.id} objCard={obj} isNear={true} />;
									})}
								</div>
							</section>
						</div>
					</main>
				</div>
			</div>
		);
	} else if (dataState === false) {
		return (
			<>
				<Redirect to={`/404`} />
			</>
		);
	} else {
		return <Loader />;
	}
};

CardProperty.propTypes = {
	params: PropTypes.object,
	match: PropTypes.object,
	id: PropTypes.number,
};

export default CardProperty;
