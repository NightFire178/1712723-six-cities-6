import React from 'react'
import {render} from '@testing-library/react'
import FavoriteButton from "./favorite-button";
import mockUser from "../../../mock/mock-user";
import {PlaceFavoriteButtonEnum} from "../../../enum";

const useAppStateSelection = {
  isAuth:()=>({
    now:true,
    user:mockUser
  })
}

jest.mock("../../../hooks/use-selectors-state/use-app-state", ()=>useAppStateSelection)

const useHotelsSelection = {
  hotelFavorites: ()=>true
}

jest.mock("../../../hooks/use-selectors-state/use-hotels", ()=>useHotelsSelection)

const thunkButtonFavorites = ()=>true
jest.mock('../../../hooks/use-thunk',() =>()=>({thunkButtonFavorites}))

test(`favoriteButton component test`, () => {
  const mockId = 4
  const card = render(<FavoriteButton cardId={mockId} buttonPlace={PlaceFavoriteButtonEnum.card}/>)
  expect(card).toMatchSnapshot()
  const property = render(<FavoriteButton cardId={mockId} buttonPlace={PlaceFavoriteButtonEnum.property}/>)
  expect(property).toMatchSnapshot()
})
