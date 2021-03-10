import User from "./user"
export default interface Comment{
	comment:string,
	data: string,
	id: number,
	rating: number,
	user:User,
}