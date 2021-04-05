import React from 'react'
import {render} from '@testing-library/react'
import HomeComponents from "./home";
import cityes from "../../../data/cityes";
import {mockArrayHotels} from "../../../mock/mock-hotels";

//eslint-disable-next-line
jest.mock("../../block/header/header", ()=>()=><div>header</div>)

//eslint-disable-next-line
jest.mock("../../block/nav/nav", ()=>()=><div>nav</div>)

//eslint-disable-next-line
jest.mock("../hotels/hotels", ()=>()=><div>hotels</div>)

const appStateSelection = {
  cityNow:() =>(cityes[0])
}

jest.mock("../../../redux/selectors/app-state", ()=>appStateSelection)

const hotelSelection = {
  hotels: ()=>JSON.parse(JSON.stringify(mockArrayHotels))
}

jest.mock("../../../redux/selectors/hotels", ()=>hotelSelection)

test(`home home component test`, () => {
  const header = render(<HomeComponents/>)
  expect(header).toMatchSnapshot()
})
