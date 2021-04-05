import React, {Fragment, FC} from "react";
import {useDispatch} from "react-redux";
import cityes from "../../data/cityes";
import {appStateAction} from "../../redux/reducer/types/app-state";
import appStateSelection from "../../redux/selectors/app-state";

const Nav: FC = () => {
  const city = appStateSelection.cityNow()
  const dispatch = useDispatch();
  const onClick = (evt:React.MouseEvent<HTMLAnchorElement>) => {
    const temp = evt.currentTarget;
    dispatch({type: appStateAction.CITY_SET, payload: temp.textContent});
  };
  return (
    <>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cityes.map((place, i) => (
              <Fragment key={i + place}>
                <a onClick={onClick}>
                  <li className="locations__item">
                    <div
                      className={`locations__item-link tabs__item ${
                        city === place && `tabs__item--active`
                      }`}
                    >
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
