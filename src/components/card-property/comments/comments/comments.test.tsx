import React, {useRef} from 'react'
import {render} from '@testing-library/react'
import Comments from "./comments";
import {mockArrayComments} from "../../../../mock/mock-comment";

jest.mock('react', () => {
  const originReact = jest.requireActual('react');
  const mUseRef = jest.fn();
  return {
    ...originReact,
    useRef: mUseRef,
  };
});

const thunkPostComment =()=>true
//eslint-disable-next-line
const handleSubmit = ()=> useRef()
const register = useRef()
const useForm = ()=>({register, handleSubmit, reset:3, control:4})
jest.mock(`react-hook-form`, ()=>({useForm, Control:3}))
jest.mock('../../../../hooks/use-thunk',() =>()=>({thunkPostComment}))
//eslint-disable-next-line
jest.mock("../button/button", ()=>()=>(<div>button component</div>))
test(`comments card-property comments component block test`, ()=>{
  const comments = JSON.parse(JSON.stringify(mockArrayComments))
  //eslint-disable-next-line
  // @ts-ignore
  const {container} = render(<Comments id={10} cardCommentsState={comments} isAuth={true} />)
  expect(container).toMatchSnapshot()
})
