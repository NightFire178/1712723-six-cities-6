import {IInfoState, THotelInfo} from "../reducer/types/hotel-info";
import useTypedSelector from "../../hooks/use-selector-type";
import comments from "../../types/comment";
import Hotel from "../../types/hotel";

interface IHotelInfo {
  hotelsInfo(): THotelInfo,

  hotelInfoId(id: number): IInfoState | undefined,

  hotelInfoNearby(id: number): Array<Hotel> | undefined,

  hotelInfoComment(id: number): Array<comments> | undefined
}

export default class hotelInfoSelection implements IHotelInfo {
  hotelsInfo(): THotelInfo {
    return useTypedSelector(({hotelInfo}) => hotelInfo)
  }

  hotelInfoId(id: number): IInfoState | undefined {
    return useTypedSelector(({hotelInfo}) => hotelInfo.find((obj) => obj.id === id))
  }

  hotelInfoComment(id: number): Array<comments> | undefined {
    return useTypedSelector(({hotelInfo}) => {
      const temp = hotelInfo.find((obj) => obj.id === id)
      if (temp) {
        return temp.comment
      }
      return undefined
    })
  }

  hotelInfoNearby(id: number): Array<Hotel> | undefined {
    return useTypedSelector(({hotelInfo, hotels}) => {
      const temp = hotelInfo.find((obj) => obj.id === id)
      if (temp && hotels) {
        const one = hotels.find(obj => obj.id === temp.nearbyID[0]),
          two = hotels.find(obj => obj.id === temp.nearbyID[1]),
          three = hotels.find(obj => obj.id === temp.nearbyID[2])
        if (one && two && three) {
          return [one, two, three]
        }
      }
      return undefined
    })

  }
}
