import {StoreType} from '../redux/reducer/reducer'
import {TypedUseSelectorHook, useSelector} from 'react-redux'

const useTypedSelector: TypedUseSelectorHook<StoreType> = useSelector
export default useTypedSelector
