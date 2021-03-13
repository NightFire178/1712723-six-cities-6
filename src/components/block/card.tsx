import React from "react";
import {Link} from "react-router-dom";
import hotel from "../../template/hotel"

const Card:React.FC<{objCard:hotel , isNear?:boolean}> = ({objCard, isNear = false}) => {
	const {
		id,
		rating,
		is_premium: premium,
		price,
		type,
		title,
		is_favorite: isFavorite,
		preview_image: previewImage,
	} = objCard;
	let starWidth = ``;
	{
		let temp = Math.floor(rating);
		starWidth = `${(rating - temp) * 10 >= 5 ? temp * 20 + 20 : temp * 20}%`;
	}
	return (
		<>
			<article
				className={`${
					isNear ? `near-places__card` : `cities__place-card`
				} place-card`}
			>
				{premium && (
					<div className="place-card__mark">
						<span>Premium</span>
					</div>
				)}
				<div
					className={`${
						isNear ? `near-places__image-wrapper` : `cities__image-wrapper`
					}place-card__image-wrapper`}
				>
					<Link to={`/offer/${id}`}>
						<img
							className="place-card__image"
							src={previewImage}
							width={260}
							height={200}
							alt="Place image"
						/>
					</Link>
				</div>
				<div className="place-card__info">
					<div className="place-card__price-wrapper">
						<div className="place-card__price">
							<b className="place-card__price-value">€{price}</b>
							<span className="place-card__price-text">/&nbsp;night</span>
						</div>
						<button
							className={
								isFavorite
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
							<span style={{width: starWidth}} />
							<span className="visually-hidden">Rating</span>
						</div>
					</div>
					<h2 className="place-card__name">
						<Link to={`/offer/${id}`}>{title}</Link>
					</h2>
					<p className="place-card__type">{type}</p>
				</div>
			</article>
		</>
	);
};


export default Card;
