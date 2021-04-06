import React from 'react'
import {render} from '@testing-library/react'
import Header from "./header";
import mockUser from "../../../mock/mock-user";
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

const thunkLogOut = ()=> true
jest.mock('../../../hooks/use-thunk',() =>()=>({thunkLogOut}))

const useAppStateSelection = {
  isAuth() {
    return {
      now:true,
      user:mockUser
    }
  }
}
jest.mock("../../../hooks/use-selectors-state/use-app-state", ()=>useAppStateSelection)

test(`header block component test`, () => {
  const history = createMemoryHistory()
  const header = render(
    <Router history={history}>
      <Header/>
    </Router>
  )
  expect(header).toMatchSnapshot()
})
