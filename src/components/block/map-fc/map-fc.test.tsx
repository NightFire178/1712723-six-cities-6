import  React from 'react'
import {render} from '@testing-library/react'
import MapFc from "./map-fc";
import {mockArrayHotels} from "../../../mock/mock-hotels";


test(`mapFC component block test`, ()=>{
  const hotels = JSON.parse(JSON.stringify(mockArrayHotels))
  const {container} = render(<MapFc hotels={hotels} />)
  expect(container).toMatchSnapshot()
})
