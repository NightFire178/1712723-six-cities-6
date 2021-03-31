import User from "./user"

export default interface Hotel {
	bedrooms: number,
	city: {
		location: location,
		name: string
	},
	description: string,
	goods: Array<string>,
	host: User,
	id: number,
	images: Array<string>,
	is_favorite: boolean,
	is_premium: boolean,
	location: location,
	max_adults: number,
	preview_image: string,
	price: number,
	rating: number,
	title: string,
	type: string,
}

type location = {
	latitude: number,
	longitude: number,
	zoom: number
}