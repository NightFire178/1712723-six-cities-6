 export default {
   hotels: ():string=>(`/hotels`),
   hotelsId:(id:number):string =>(`/hotels/${id}`),
   hotelsIdNearby:(id:number):string =>(`/hotels/${id}/nearby`),
   favorite:():string=>(`/favorite`),
   favoriteIdStatus:(id:number, status:boolean):string =>(`/favorite/${id}/${+status}`),
   comments: (id:number):string =>(`/comments/${id}`),
   login: ():string => (`/login`),
   logOut:  ():string => (`/logout`)
 }
