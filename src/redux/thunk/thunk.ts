import * as comment from './comments'
import * as favorites from './favorites'
import  * as hotelInfo from './hotel-info'
import  * as login from './login'
import  * as hotelUpDate from './hotels-up-date'

export default {
  ...comment,
  ...favorites,
  ...hotelInfo,
  ...login,
  ...hotelUpDate
}
