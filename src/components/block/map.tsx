import React, { FC, useEffect, useRef } from "react"
import leaflet from "leaflet"
import hotel from '../../template/hotel'
import "leaflet/dist/leaflet.css"

const Map: FC<{ hotels: Array<hotel>}> = ({ hotels }) => {
	const city = hotels[0].city.location
	const mapRef: any = useRef();
	useEffect(() => {
		mapRef.current = leaflet.map(`map`, {
			center: {
				lat: city.latitude,
				lng: city.longitude
			},
			zoom: city.zoom
		});

		leaflet
			.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
				attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
			})
			.addTo(mapRef.current);
		if (hotels[0].location) {
			hotels.forEach((hotels) => {
				const customIcon = leaflet.icon({
					iconUrl: `./img/pin.svg`,
					iconSize: [27, 39]
				});

				leaflet.marker({
					lat: hotels.location.latitude,
					lng: hotels.location.longitude
				},
					{
						icon: customIcon
					})
					.addTo(mapRef.current)
					.bindPopup(hotels.title);
			});
		}
		return () => { mapRef.current.remove() }
	});

	return (
		<div id="map" style={{ height: `100%` }} ref={mapRef}></div>
	);
}


export default Map