import React from 'react'
import {render} from '@testing-library/react'
import Header from "./header";
import mockUser from "../../../mock/mock-user";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const thunkLogOut = ()=> true
jest.mock('../../../hooks/use-thunk',() =>()=>({thunkLogOut}))

const appStateSelection = {
  isAuth() {
    return {
      now:true,
      user:mockUser
    }
  }
}
jest.mock("../../../redux/selectors/app-state", ()=>appStateSelection)

test(`header block component test`, () => {
  const history = createMemoryHistory()
  const header = render(
    <Router history={history}>
      <Header/>
    </Router>
  )
  expect(header).toMatchSnapshot()
})
