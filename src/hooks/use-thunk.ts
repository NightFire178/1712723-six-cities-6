import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import thunk from "../redux/thunk/thunk";

export default () =>{
  const dispatch = useDispatch()
  return bindActionCreators(thunk, dispatch)
}
