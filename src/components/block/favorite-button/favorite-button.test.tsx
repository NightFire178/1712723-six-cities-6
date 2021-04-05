import React from 'react'
import {render} from '@testing-library/react'
import FavoriteButton from "./favorite-button";
import mockUser from "../../../mock/mock-user";
import {placeFavoriteButtonEnum} from "../../../enum";

const appStateSelection = {
  isAuth:()=>({
    now:true,
    user:mockUser
  })
}

jest.mock("../../../redux/selectors/app-state", ()=>appStateSelection)

const hotelsSelection = {
  hotelFavorites: ()=>true
}

jest.mock("../../../redux/selectors/hotels", ()=>hotelsSelection)

const thunkButtonFavorites = ()=>true
jest.mock('../../../hooks/use-thunk',() =>()=>({thunkButtonFavorites}))

test(`favoriteButton component test`, () => {
  const mockId = 4
  const card = render(<FavoriteButton cardId={mockId} buttonPlace={placeFavoriteButtonEnum.card}/>)
  expect(card).toMatchSnapshot()
  const property = render(<FavoriteButton cardId={mockId} buttonPlace={placeFavoriteButtonEnum.property}/>)
  expect(property).toMatchSnapshot()
})
