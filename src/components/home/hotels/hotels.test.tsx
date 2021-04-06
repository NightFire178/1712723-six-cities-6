import React from 'react'
import {render} from '@testing-library/react'
import Hotels, {SortName} from "./hotels";
import {mockArrayHotels} from '../../../mock/mock-hotels'


const useDispatch = ()=>(jest.fn())

jest.mock(`react-redux`, ()=>({useDispatch}))

const useAppStateSelection = {
  sort: ()=>SortName.popular
}

jest.mock("../../../hooks/use-selectors-state/use-app-state", ()=>useAppStateSelection)

//eslint-disable-next-line
jest.mock(`../../block/card/card`, ()=>()=><div>Card</div>)

test(`hotels home component test`, () => {
  const hotels = JSON.parse(JSON.stringify(mockArrayHotels))
  const header = render(<Hotels hotels={hotels} /> )
  expect(header).toMatchSnapshot()
})
