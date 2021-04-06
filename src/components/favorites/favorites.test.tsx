import React from 'react'
import {render} from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Favorites from "./favorites";
import {mockArrayHotels} from "../../mock/mock-hotels";

const useFavoriteSelection = {
  hotelsFavorite: ()=>JSON.parse(JSON.stringify(mockArrayHotels))
}
jest.mock("../../hooks/use-selectors-state/use-favorite", ()=> useFavoriteSelection)

//eslint-disable-next-line
jest.mock("../block/header/header", ()=>()=><div>Header</div>)

//eslint-disable-next-line
jest.mock("../block/card/card", ()=>()=><div>Card</div>)

const thunkFavorites = ()=>true
jest.mock('../../hooks/use-thunk',() =>()=>({thunkFavorites}))

test(`favorites component`, () => {
  const history = createMemoryHistory()
  const favorites = render(
    <Router history={history}>
      <Favorites/>
    </Router>
  )
  expect(favorites).toMatchSnapshot()
})
