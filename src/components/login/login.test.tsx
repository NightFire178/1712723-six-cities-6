import React, {useRef} from 'react'
import {render} from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Login from "./login";
jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = jest.fn();
  return {
    ...originReact,
    useRef: mUseRef,
  };
});
const appStateSelection = {
  isAuth:()=>({
    now:true
  })
}
jest.mock("../../redux/selectors/app-state", ()=> appStateSelection)
//eslint-disable-next-line
const handleSubmit = ()=> useRef()
const errors = ()=>[]
const register = useRef()
const useForm = ()=>({register, handleSubmit, errors})
jest.mock('react-hook-form', ()=>({useForm}))

//eslint-disable-next-line
jest.mock("../block/header/header", ()=>()=><div>Header</div>)

const thunkPostLogin =()=>true
jest.mock('../../hooks/use-thunk',() =>()=>({thunkPostLogin}))
const yupResolver = ()=>true
jest.mock('@hookform/resolvers/yup', ()=>({yupResolver}))
const yup = {
  object: ()=>({
    shape: ()=>true
  }),
  string: ()=>({
    required:()=>({
      email:()=>true,
      min: ()=>true
    })
  })
}
jest.mock(`yup`, ()=> (yup))

test(`login component block test`, ()=>{
  const history = createMemoryHistory()
  const {container} = render(
    <Router history={history}>
      <Login/>
    </Router>
  )
  expect(container).toMatchSnapshot()
})

