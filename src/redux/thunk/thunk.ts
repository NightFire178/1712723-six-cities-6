import * as comment from './comments/comments'
import * as favorites from './favorites/favorites'
import  * as hotelInfo from './hotel-info/hotel-info'
import  * as login from './login/login'
import  * as hotelUpDate from './hotels-up-date/hotels-up-date'

export default {
  ...comment,
  ...favorites,
  ...hotelInfo,
  ...login,
  ...hotelUpDate
}
