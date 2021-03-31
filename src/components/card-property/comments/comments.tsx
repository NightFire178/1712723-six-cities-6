import React, {FunctionComponent, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import comment, {IPostComment} from '../../../types/comment'
import {thunkPostComment} from "../../../redux/thunk/comments";
import starWidth from "../../../utils/star-width"
import ComponentButton from "./button"

interface OwnProps {
  cardCommentsState: Array<comment>
  isAuth: boolean,
  id: number
}

type Props = OwnProps;

const Comments: FunctionComponent<Props> = ({id, cardCommentsState, isAuth}) => {
  const dispatch = useDispatch()
  const {register, handleSubmit, reset, control} = useForm()
  const [hotelMaxComment, setHotelMaxComment] = useState(10)
  const [activeForm , setActiveFrom] = useState(false)
  const comments = useMemo(() => cardCommentsState.slice().sort((a, b) => (new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1)), [cardCommentsState]);
  const onSubmitHandle = async (data: IPostComment) => {
    setActiveFrom(true)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore pormise<bolean>
    const res:boolean = await dispatch(thunkPostComment(id, data)) 
    if(res===true){
      setActiveFrom(false)
      reset()
    } else{
      setActiveFrom(false)
    }
  }
  const addMaxCommentHandle = ()=>{
    setHotelMaxComment(hotelMaxComment+10)
  }

  return (<section className="property__reviews reviews">
    <h2 className="reviews__title">
      Reviews ·
      <span className="reviews__amount">
                        {comments.length}
                      </span>
    </h2>
    <ul className="reviews__list">
      {comments.map((comment: comment, index: number) => {
        if (index < hotelMaxComment) {
          return (
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
                      <span style={{width: starWidth(comment.rating)}}/>
                      <span className="visually-hidden">Rating</span>
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
          )
        }
      })}
    </ul>
    {comments.length>hotelMaxComment&&<button onClick={addMaxCommentHandle} style={{
      width: `100%`,
      border: `1px solid grey`,
      borderRadius: `5px`,
      margin: `20px 0`,
      padding: `5px`,
      background: `inherit`
    }}>get more comments</button>}
    {isAuth && <form
      style={activeForm?{pointerEvents: "none"}:{}}
      className="reviews__form form"
      onSubmit={handleSubmit(onSubmitHandle)}>
      <label
        className="reviews__label form__label"
        htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
          ref={register}/>
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect">
          <svg
            className="form__star-image"
            width={37}
            height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
          ref={register}/>
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good">
          <svg
            className="form__star-image"
            width={37}
            height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
          ref={register}/>
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad">
          <svg
            className="form__star-image"
            width={37}
            height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
          ref={register}/>
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly">
          <svg
            className="form__star-image"
            width={37}
            height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
          ref={register}/>
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly">
          <svg
            className="form__star-image"
            width={37}
            height={33}>
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue=""
        ref={register}/>
      <ComponentButton control={control}/>
    </form>}
  </section>);
};

export default Comments;
