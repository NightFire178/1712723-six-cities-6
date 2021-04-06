import React from 'react'
import {render} from '@testing-library/react'
import Nav from "./nav";
import cityes from "../../../data/cityes";

const useAppStateSelection = {
  cityNow(): string {
    return cityes[0]
  }
}
const useDispatch = ()=>(jest.fn())
jest.mock("../../../hooks/use-selectors-state/use-app-state", ()=>useAppStateSelection )

jest.mock(`react-redux`, ()=>({useDispatch}))
test(`nav block component test`, () => {
  const header = render(<Nav/>)
  expect(header).toMatchSnapshot()
})
