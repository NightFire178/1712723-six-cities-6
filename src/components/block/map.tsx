import React, { FC, useEffect, useRef } from "react"
import leaflet from "leaflet"
import hotel from '../../template/hotel'
import "leaflet/dist/leaflet.css"
type pink = {
	latitude: number,
	longitude: number,
	zoom: number
}
const Map: FC<{ hotels: Array<hotel>, pink?: pink&boolean }> = ({ hotels, pink=false }) => {
	console.log('map');
  let city:any = hotels[0].city.location
  if(pink){
    city =  pink
  }
	const mapRef: any = useRef();
	useEffect(() => {
		mapRef.current = leaflet.map(`map`, {
			center: {
				lat: city.latitude,
				lng: city.longitude
			},
			zoom: city.zoom,
			zoomControl: false
		});

		leaflet
			.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
				attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
			})
			.addTo(mapRef.current);
      const customIcon = leaflet.icon({
        iconUrl: `./img/pin.svg`,
        iconSize: [27, 39]
      });
		if (!pink) {
			hotels.forEach((hotels) => {
				leaflet.marker({
					lat: hotels.location.latitude,
					lng: hotels.location.longitude
				},
					{
						icon: customIcon
					})
					.addTo(mapRef.current)
					.bindPopup(hotels.title)
					.on('click', (evt: any) => {
						console.log(evt)
						mapRef.current.flyTo([hotels.location.latitude, hotels.location.longitude], hotels.location.zoom)
					})
					.on('popupclose', ()=>{
						mapRef.current.flyTo([city.latitude, city.longitude], city.zoom)
					})
			});
		} else {
      leaflet.marker({
        lat: city.latitude,
        lng: city.longitude
      },
        {
          icon: customIcon
        })
        .addTo(mapRef.current)
        .bindPopup(hotels[0].title)
    }
		return () => { mapRef.current.remove() }
	});

	return (
		<div id="map" style={{ height: `100%` }} ref={mapRef}></div>
	);
}


export default Map