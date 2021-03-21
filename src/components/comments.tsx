import React, {FunctionComponent} from 'react';
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import comment from '../template/comment'
import {postComment} from "../redux/thunk/comments";

interface OwnProps {
  cardCommentsState: Array<comment>
  starWidth: (rating:number)=>(number),
  isAuth: boolean,
  id:number
}

type Props = OwnProps;
const schema = yup.object().shape({
  rating: yup.number().required().typeError(`rate the hotel`),
  comment: yup.string().required().min(2).max(5000)
})

const comments: FunctionComponent<Props> = ({id, cardCommentsState, starWidth, isAuth}) => {
  const dispatch = useDispatch()
  const {register, handleSubmit, errors, reset} = useForm({resolver: yupResolver(schema)})
  const onSubmit = (data:any)=>{// TODO data
    dispatch(postComment(id, data))
    reset()
  }
  return (<section className="property__reviews reviews">
    <h2 className="reviews__title">
      Reviews ·
      <span className="reviews__amount">
                        {cardCommentsState.length}
                      </span>
    </h2>
    <ul className="reviews__list">
      {cardCommentsState.map((comment: comment) => (
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
              <span className="reviews__user-name">
                                {comment.user.name}
                              </span>
            </div>
            <div className="reviews__info">
              <div className="reviews__rating rating">
                <div className="reviews__stars rating__stars">
                                  <span
                                    style={{width: starWidth(comment.rating)}}
                                  />
                  <span className="visually-hidden">
                                    Rating
                                  </span>
                </div>
              </div>
              <p className="reviews__text">{comment.comment}</p>
              <time
                className="reviews__time"
                dateTime={comment.date.split(`T`)[0]}
              >
                {new Date(comment.date).toLocaleString(`en-US`, {year: `numeric`, month: `long`})}
              </time>
            </div>
          </li>
        </React.Fragment>
      ))}
    </ul>
    {isAuth&&<form
      className="reviews__form form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label
        className="reviews__label form__label"
        htmlFor="review"
      >
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
          ref={register}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg
            className="form__star-image"
            width={37}
            height={33}
          >
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
          ref={register}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg
            className="form__star-image"
            width={37}
            height={33}
          >
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
          ref={register}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg
            className="form__star-image"
            width={37}
            height={33}
          >
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
          ref={register}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg
            className="form__star-image"
            width={37}
            height={33}
          >
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
          ref={register}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg
            className="form__star-image"
            width={37}
            height={33}
          >
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      {errors[`rating`] &&
      <p style={{color: `red`, fontSize: '15px', textAlign: `center`}}>{errors[`rating`].message}</p>}
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue=""
        ref={register}
      />
      {errors[`review`] &&
      <p style={{color: `red`, fontSize: '15px', textAlign: `center`}}>{errors[`review`].message}</p>}
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and
          describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>}
  </section>);
};

export default comments;
