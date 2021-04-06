import React from 'react'
import {render} from '@testing-library/react'
import HomeComponents from "./home";
import Cityes from "../../../data/cityes";
import {mockArrayHotels} from "../../../mock/mock-hotels";

//eslint-disable-next-line
jest.mock("../../block/header/header", ()=>()=><div>header</div>)

//eslint-disable-next-line
jest.mock("../../block/nav/nav", ()=>()=><div>nav</div>)

//eslint-disable-next-line
jest.mock("../hotels/hotels", ()=>()=><div>hotels</div>)

const useAppStateSelection = {
  cityNow:() =>(Cityes[0])
}

jest.mock("../../../hooks/use-selectors-state/use-app-state", ()=>useAppStateSelection)

const useHotelsSelection = {
  hotels: ()=>JSON.parse(JSON.stringify(mockArrayHotels))
}

jest.mock("../../../hooks/use-selectors-state/use-hotels", ()=>useHotelsSelection)

test(`home home component test`, () => {
  const header = render(<HomeComponents/>)
  expect(header).toMatchSnapshot()
})
