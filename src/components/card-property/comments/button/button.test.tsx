import  React from 'react'
import {render} from '@testing-library/react'
import ComponentButton from "./button";

jest.mock(`react-hook-form`)
test(`button card-property comments component block test`, ()=>{
  const mockControl = jest.fn()
  //eslint-disable-next-line
  // @ts-ignore
  const {container} = render(<ComponentButton control={mockControl}/>)
  expect(container).toMatchSnapshot()
})
