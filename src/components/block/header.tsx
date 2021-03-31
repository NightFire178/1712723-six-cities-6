import React, {FC} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import {storeState} from "../../redux/reducer/reducer";
import {isAuth} from "../../redux/reducer/app-state";
import axios from "../../utils/axios";



const Header: FC<{ isMain?: boolean }> = ({isMain = false}) => {
  const {now, user}: isAuth = useSelector((state: storeState) => ({
    now: state.appState.isAuth.now,
    user: state.appState.isAuth.user
  }))
  const dispatch = useDispatch();
  const logOut = () => {
    axios(`${process.env.SERVER_URL}/logout`).then((res) => {
      console.log(res.data)
      dispatch({type: "LOG_OUT"})
    })
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              {isMain ? (
                <div className="header__logo-link header__logo-link--active">
                  <img
                    className="header__logo"
                    src="img/logo.svg"
                    alt="6 cities logo"
                    width={81}
                    height={41}
                  />
                </div>
              ) : (
                <Link to="/">
                  <div className="header__logo-link  ">
                    <img
                      className="header__logo"
                      src="img/logo.svg"
                      alt="6 cities logo"
                      width={81}
                      height={41}
                    />
                  </div>
                </Link>
              )}
            </div>
            <nav className="header__nav">
              {now ? (
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      <img className="property__avatar user__avatar" src={user.avatar_url}
                           alt="Host avatar"/>
                    </div>
                  </li>
                  <li className="header__nav-item user">
                    <div className="header__nav-link header__nav-link--profile" style={{pointerEvents:"none"}}>
                      <span className="header__user-name user__name">
                          {user.name}
                        </span>
                    </div>
                  </li>
                  <li className="header__nav-item user"  style={{marginLeft: "10px"}}>
                    <Link to="/favorites">
                      <div className="header__nav-link header__nav-link--profile">
                        <span className="header__login">favorites</span>
                      </div>
                    </Link>
                  </li>

                  <li className="header__nav-item user" style={{marginLeft: "10px"}}>
                    <a className="header__nav-link header__nav-link--profile" onClick={logOut}>
                      <div className="header__nav-link header__nav-link--profile">
                        <span className="header__login">logout</span>
                      </div>
                    </a>
                  </li>

                </ul>
              ) : (
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <Link to="/login">
                      <div className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                        </div>
                        <span className="header__login">Sign in</span>
                      </div>
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};


export default Header;
