import User from "./user"
export default interface Comment {
	comment:string,
	date: string,
	id: number,
	rating: number,
	user:User,
}
