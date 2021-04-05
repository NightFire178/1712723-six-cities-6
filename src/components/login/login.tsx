import React, {FC} from 'react'
import {Redirect} from 'react-router-dom'
import {Link} from "react-router-dom"
import Header from "../block/header/header";
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import useThunk from "../../hooks/use-thunk"
import appStateSelection from "../../redux/selectors/app-state";

type IFormObj = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

const formInput: Array<IFormObj> = [
  {
    label: `E-mail`,
    type: `email`,
    name: `email`,
    placeholder: `Email`
  }, {
    label: `Password`,
    type: `password`,
    name: `password`,
    placeholder: `Password`
  }
]
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(1)
})

const Login:FC = () => {
  const {register, handleSubmit, errors} = useForm({resolver: yupResolver(schema)})
  const {thunkPostLogin} = useThunk()
  const auth = appStateSelection.isAuth()?.now
  const onSubmit = (data: { email: string, password: string }) => {
    thunkPostLogin(data)
  }
  if (!auth) {
    return (<>
        <div style={{display: 'none'}}>
          <svg xmlns="http://www.w3.org/2000/svg">
            <symbol id="icon-arrow-select" viewBox="0 0 7 4">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"/>
            </symbol>
            <symbol id="icon-bookmark" viewBox="0 0 17 18">
              <path
                d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"/>
            </symbol>
            <symbol id="icon-star" viewBox="0 0 13 12">
              <path fillRule="evenodd" clipRule="evenodd"
                    d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"/>
            </symbol>
          </svg>
        </div>
        <div className="page page--gray page--login">
          <Header/>
          <main className="page__main page__main--login">
            <div className="page__login-container container">
              <section className="login">
                <h1 className="login__title">Sign in</h1>
                <form className="login__form form" onSubmit={handleSubmit(onSubmit)} noValidate>
                  {formInput.map((inp, i) => (
                    <div key={i} className="login__input-wrapper form__input-wrapper">
                      <label className="visually-hidden">{inp.label}</label>
                      <input style={{marginBottom: 0, marginTop: `24px`}} ref={register}
                             className="login__input form__input" type={inp.type} name={inp.name}
                             placeholder={inp.placeholder}/>
                      {errors[inp.name] &&
                      <p style={{color: `red`, fontSize: '15px', textAlign: `center`}}>{errors[inp.name].message}</p>}
                    </div>
                  ))}
                  <button style={{marginTop: `24px`}} className="login__submit form__submit button" type="submit">Sign
                    in
                  </button>
                </form>
              </section>
              <section className="locations locations--login locations--current">
                <div className="locations__item">
                  <Link to="/">
                    <div className="locations__item-link">
                      <span>Amsterdam</span>
                    </div>
                  </Link>
                </div>
              </section>
            </div>
          </main>
        </div>
      </>
    )
  }else {
    return (<Redirect to = '/'/>)
  }
}


export default Login
