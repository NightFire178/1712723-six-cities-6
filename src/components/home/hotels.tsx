import React, {FunctionComponent, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux'
import Hotel from "../../types/hotel";
import Loader from "../block/loader"
import Card from "../block/card";
import appStateSelection from "../../redux/selectors/app-state";
import {appStateAction} from "../../redux/reducer/types/app-state";

interface OwnProps {
  hotels: Array<Hotel>,
  setActiveId?: React.Dispatch<React.SetStateAction<number>>
}
// TODO mentor
const sortMap = new Map([
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [`Popular`, (_a: Hotel, _b: Hotel) => 0],
  [`Price: low to high`, (a: Hotel, b: Hotel) => (a.price > b.price ? 1 : -1)],
  [`Price: high to low`, (a: Hotel, b: Hotel) => (a.price > b.price ? -1 : 1)],
  [`Top rated first`, (a: Hotel, b: Hotel) => (a.rating > b.rating ? -1 : 1)]
])
type Props = OwnProps;

const Hotels: FunctionComponent<Props> = ({hotels, setActiveId}) => {
  const sortState = appStateSelection.sort()
  const [sortOpen, setSortOpen] = useState(false)
  const [renderHotels, setRenderHotels] = useState<any>() // TODO ME
  const dispatch = useDispatch()
  useEffect(() => {
    const sort = hotels.slice().sort(sortMap.get(sortState))
    setRenderHotels(sort.map(obj=>(<Card key={obj.id} objCard={obj} cardPlace={`cities`} setActiveId={setActiveId}/>)))
  }, [hotels, sortState])
  const clickSortHandler = (evt:React.MouseEvent) => {
    const target = evt.target as HTMLElement
    if (sortOpen) {
      if (target.classList.contains(`places__option`)) {
        dispatch({type: appStateAction.SORT_SET, payload: target.textContent});
      }
      setSortOpen(!sortOpen);
    } else if (
      sortOpen ||
      target.classList.contains(`places__sorting-type`)
    ) {
      setSortOpen(!sortOpen);
    }
  };
  return (<section className="cities__places places">
    <h2 className="visually-hidden">Places</h2>
    <b className="places__found">
      {hotels.length} places to stay in {hotels[0].city.name}
    </b>
    <form
      onClick = {clickSortHandler}
      className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
                      {sortState}
        <div>
                        <svg
                          className="places__sorting-arrow"
                          width={7}
                          height={4}
                        >
                          <use xlinkHref="#icon-arrow-select"/>
                        </svg>
                      </div>
                    </span>
      <ul
        className={`places__options places__options--custom ${
          sortOpen && `places__options--opened`
        }`}
      >
        <li
          className="places__option places__option--active"
          tabIndex={0}
          value={0}
          onClick={clickSortHandler}
        >
          Popular
        </li>
        <li
          className="places__option"
          tabIndex={0}
          value={1}
          onClick={clickSortHandler}
        >
          Price: low to high
        </li>
        <li
          className="places__option"
          tabIndex={0}
          value={2}
          onClick={clickSortHandler}
        >
          Price: high to low
        </li>
        <li
          className="places__option"
          tabIndex={0}
          value={3}
          onClick={clickSortHandler}
        >
          Top rated first
        </li>
      </ul>
    </form>
    <div className="cities__places-list places__list tabs__content">
      {renderHotels ? renderHotels : <Loader/>}
    </div>
  </section>);
};

export default Hotels;
