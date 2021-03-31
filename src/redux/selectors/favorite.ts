import {TFavorite} from "../reducer/types/favorite";
import useTypedSelector from "../../hooks/use-selector-type";

interface IFavorite{
  favorite():TFavorite
}

export default class favoriteSelection implements IFavorite{
  favorite(): TFavorite {
    return useTypedSelector(({favorite})=>favorite)
  }
}
