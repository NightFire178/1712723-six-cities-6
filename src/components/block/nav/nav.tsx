import React, {Fragment, FC} from "react";
import {useDispatch} from "react-redux";
import Cityes from "../../../data/cityes";
import {appStateActionCreators} from "../../../redux/reducer/types-action-creators/app-state";
import useAppStateSelection from "../../../hooks/use-selectors-state/use-app-state";

const Nav: FC = () => {
  const city = useAppStateSelection.cityNow()
  const dispatch = useDispatch();
  const handleOnClick = (evt:React.MouseEvent) => {
    const temp = evt.currentTarget
    dispatch(appStateActionCreators.CITY_SET(temp.textContent as string));
  };
  return (
    <>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Cityes.map((place, i) => (
              <Fragment key={i + place}>
                <a onClick={handleOnClick}>
                  <li className="locations__item">
                    <div
                      className={`locations__item-link tabs__item ${
                        city === place && `tabs__item--active`
                      }`}>
                      <span>{place}</span>
                    </div>
                  </li>
                </a>
              </Fragment>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};



export default Nav;
