import React, {FunctionComponent, useState} from 'react';
import {useWatch} from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  rating: yup.number().required(),
  comment: yup.string().required().min(50).max(300)
})

const ComponentButton: FunctionComponent<{ control: any }> = ({control}) => {
  const [buttonActive, setButtonActive] = useState(false)
  const formInputs = useWatch({control});
  schema.isValid(formInputs)
    .then((tempValid)=>{
      setButtonActive(tempValid)
    })
  if (buttonActive) {
    return (<div className="reviews__button-wrapper">
      <button
        className="reviews__submit form__submit button"
        type="submit">
        Submit
      </button>
    </div>)
  }
  return (
    <div className="reviews__button-wrapper">
      <p className="reviews__help">
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
        with at least <b className="reviews__text-amount">50 characters</b>.
      </p>
      <button className="reviews__submit form__submit button" style={{pointerEvents: "none"}} disabled>Submit</button>
    </div>)


}

export default ComponentButton
