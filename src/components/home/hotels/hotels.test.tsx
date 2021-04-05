import React from 'react'
import {render} from '@testing-library/react'
import Hotels, {sortName} from "./hotels";
import {mockArrayHotels} from '../../../mock/mock-hotels'


const useDispatch = ()=>(jest.fn())

jest.mock(`react-redux`, ()=>({useDispatch}))

const appStateSelection = {
  sort: ()=>sortName.popular
}

jest.mock("../../../redux/selectors/app-state", ()=>appStateSelection)

//eslint-disable-next-line
jest.mock(`../../block/card/card`, ()=>()=><div>Card</div>)

test(`nav block component test`, () => {
  const hotels = JSON.parse(JSON.stringify(mockArrayHotels))
  const header = render(<Hotels hotels={hotels} /> )
  expect(header).toMatchSnapshot()
})
