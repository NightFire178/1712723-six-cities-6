import React from "react";
import PropTypes from "prop-types";

const Card = (props) => {
	const objCard = props.objCard;
	return (
		<>
			<article className="cities__place-card place-card">
				{objCard.premium && (
					<div className="place-card__mark">
						<span>Premium</span>
					</div>
				)}
				<div className="cities__image-wrapper place-card__image-wrapper">
					<a href="#">
						<img
							className="place-card__image"
							src={objCard.srcIMG}
							width={260}
							height={200}
							alt="Place image"
						/>
					</a>
				</div>
				<div className="place-card__info">
					<div className="place-card__price-wrapper">
						<div className="place-card__price">
							<b className="place-card__price-value">€{objCard.price}</b>
							<span className="place-card__price-text">/&nbsp;night</span>
						</div>
						<button
							className={
								objCard.button
									? `place-card__bookmark-button place-card__bookmark-button--active button`
									: `place-card__bookmark-button button`
							}
							type="button"
						>
							<svg className="place-card__bookmark-icon" width={18} height={19}>
								<use xlinkHref="#icon-bookmark" />
							</svg>
							<span className="visually-hidden">To bookmarks</span>
						</button>
					</div>
					<div className="place-card__rating rating">
						<div className="place-card__stars rating__stars">
							<span style={{width: objCard.starWidth}} />
							<span className="visually-hidden">Rating</span>
						</div>
					</div>
					<h2 className="place-card__name">
						<a href="#">{objCard.comment}</a>
					</h2>
					<p className="place-card__type">{objCard.typeRoom}</p>
				</div>
			</article>
		</>
	);
};

Card.propTypes = {
	objCard: PropTypes.shape({
		premium: PropTypes.bool.isRequired,
		srcIMG: PropTypes.string.isRequired,
		price: PropTypes.string.isRequired,
		starWidth: PropTypes.string.isRequired,
		button: PropTypes.bool.isRequired,
		comment: PropTypes.string.isRequired,
		typeRoom: PropTypes.string.isRequired,
	}),
};

export default Card;
