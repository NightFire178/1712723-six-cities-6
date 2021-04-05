import {IInfoState, THotelInfo} from "../reducer/types-action-creators/hotel-info";
import useTypedSelector from "../../hooks/use-selector-type";
import comments from "../../types/comment";
import Hotel from "../../types/hotel";

type IHotelInfo = {
  hotelsInfo(): THotelInfo,

  hotelInfoId(id: number): IInfoState | undefined,

  hotelInfoNearby(id: number): Array<Hotel> | undefined,

  hotelInfoComment(id: number): Array<comments> | undefined
}

const hotelInfoSelection :IHotelInfo = {
  hotelsInfo(): THotelInfo {
    return useTypedSelector(({hotelInfo}) => hotelInfo)
  },

  hotelInfoId(id: number): IInfoState | undefined {
    return useTypedSelector(({hotelInfo}) => hotelInfo.find((obj) => obj.id === id))
  },

  hotelInfoComment(id: number): Array<comments> | undefined {
    return useTypedSelector(({hotelInfo}) => {
      const tempComments = hotelInfo.find((obj) => obj.id === id)
      if (tempComments) {
        return tempComments.comment
      }
      return undefined
    })
  },

  hotelInfoNearby(id: number): Array<Hotel> | undefined {
    return useTypedSelector(({hotelInfo, hotels}) => {
      const tempHotelInfo = hotelInfo.find((obj) => obj.id === id)
      if (tempHotelInfo && hotels) {
        const one = hotels.find(obj => obj.id === tempHotelInfo.nearbyID[0]),
          two = hotels.find(obj => obj.id === tempHotelInfo.nearbyID[1]),
          three = hotels.find(obj => obj.id === tempHotelInfo.nearbyID[2])
        if (one && two && three) {
          return [one, two, three]
        }
      }
      return undefined
    })

  }
}

export default hotelInfoSelection
