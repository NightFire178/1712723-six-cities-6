import React from 'react'
import {render} from '@testing-library/react'
import CardProperty from './card-property'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import mockOneHotel, {mockArrayHotels} from "../../../mock/mock-hotels";
import {mockArrayComments} from "../../../mock/mock-comment";
import mockUser from "../../../mock/mock-user";

const useHotelsSelection = {
  oneHotel() {
    return mockOneHotel
  }
}

jest.mock("../../../hooks/use-selectors-state/use-hotels", ()=>useHotelsSelection)
const  useHotelInfoSelection = {
  hotelInfoNearby()  {
    return [mockArrayHotels[0], mockArrayHotels[1], mockArrayHotels[2]]
  },
  hotelInfoComment() {
    return mockArrayComments
  }
}
jest.mock("../../../hooks/use-selectors-state/use-hotel-info", ()=>useHotelInfoSelection)
const useAppStateSelection = {
  isAuth() {
    return {
      now:true,
      user:mockUser
    }
  }
}
const thunkHotelInfo =()=> new Promise((resolve)=>{resolve(200)})
jest.mock('../../../hooks/use-thunk',() =>()=>({thunkHotelInfo}))
jest.mock("../../../hooks/use-selectors-state/use-app-state", ()=>useAppStateSelection)
// eslint-disable-next-line
jest.mock("../../block/favorite-button/favorite-button", ()=>()=><div>FavoriteButton</div>)
// eslint-disable-next-line
jest.mock("../comments/comments/comments", ()=>()=><div>Comments</div>)
// eslint-disable-next-line
jest.mock("../../block/card/card", ()=>()=><div>Card</div>)
// eslint-disable-next-line
jest.mock("../../block/header/header", ()=>()=><div>Header</div>)
test(`card-property component test`, () => {
  window.scrollTo = jest.fn()
  const history = createMemoryHistory()
  const match = {params: {id: `2`}}
  const city = render(
    <Router history={history}>
      <CardProperty match={match}/>
    </Router>
  )
  expect(city).toMatchSnapshot()
})
