import mockUser from "./mock-user";
import comment from '../types/comment'

const mockComment:comment = {
  comment: `Beautiful space, fantastic location and atmosphere,
  really a wonderful place to spend a few days. Will be back.`,
  date: `2021-03-07T08:04:28.647Z`,
  id: 10,
  rating: 4,
  user: mockUser
}
export default mockComment

export const mockArrayComments:Array<comment> =[
  {
    comment: `Beautiful space, fantastic location and atmosphere,
  really a wonderful place to spend a few days. Will be back.`,
    date: `2021-03-07T08:04:28.647Z`,
    id: 15,
    rating: 3,
    user: mockUser
  },
  {
    comment: `Beautiful space, fantastic location and atmosphere,
  really a wonderful place to spend a few days. Will be back.`,
    date: `2021-03-07T08:04:28.647Z`,
    id: 13,
    rating: 5,
    user: mockUser
  },
  {
    comment: `What an amazing view! The house is stunning and in
    an amazing location. The large glass wall had an amazing view of the river!`,
    date: `2021-03-07T08:04:28.647Z`,
    id: 10,
    rating: 4,
    user: mockUser
  }
]
