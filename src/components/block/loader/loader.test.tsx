import  React from 'react'
import {render} from '@testing-library/react'
import Loader from './loader'

test(`loader component block test`, ()=>{
  const {container} = render(<Loader />)
  expect(container).toMatchSnapshot()
})
