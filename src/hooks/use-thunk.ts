import {useDispatch} from 'react-redux'
import {bindActionCreators} from 'redux'
import thunk from "../redux/thunk/thunk";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default ():any =>{
  const dispatch = useDispatch()
  return bindActionCreators(thunk, dispatch)
}
