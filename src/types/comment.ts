import User from "./user"

export default interface IComment {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
}

export interface IPostComment {
  comment: string,
  rating: number
}
