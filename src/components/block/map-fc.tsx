import React, {FC, useEffect, useRef} from "react"
import leaflet from "leaflet"
import hotel from '../../types/hotel'
import "leaflet/dist/leaflet.css"

const markerSVG = {
  inactive: `img/pin.svg`,
  active: `img/pin-active.svg`
};

const customIcon = (img: string) => (leaflet.icon({
  iconUrl: img,
  iconSize: [27, 39]
}))

const MapFc: FC<{ hotels: Array<hotel>, activeId?: number }> = ({hotels, activeId = -1}) => {
  const city = hotels[0].city.location
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef:any = useRef(); // TODO ментор
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
    return () => {
      mapRef.current.remove()
    }
  }, [hotels]);


  useEffect(() => {
    let active = true
    const marker = hotels.map((hotels) => {
      let activeIcon = markerSVG.inactive
      if (hotels.id === activeId) {
        activeIcon = markerSVG.active
        active = false
        mapRef.current.flyTo([hotels.location.latitude, hotels.location.longitude], hotels.location.zoom)
      }
      const link = `/offer/${hotels.id}`
      const tempMarker = leaflet.marker({
          lat: hotels.location.latitude,
          lng: hotels.location.longitude
        },
        {
          icon: customIcon(activeIcon)
        })
        .addTo(mapRef.current)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on('click', (e:any) => { // TODO mentor
          mapRef.current.flyTo([hotels.location.latitude, hotels.location.longitude], hotels.location.zoom)
          tempMarker.setIcon(customIcon(markerSVG.active))
          leaflet.popup()
            .setLatLng(e.latlng)
            .setContent( `<img
                src="${hotels.preview_image}"
                style="height: 100px"
                alt="${hotels.title}"
              /><br>
              <b>${hotels.title}</b><br>
              <b>prise &euro;${hotels.price}:</b>
               <a href=${link}>offer link</a>`)
            .on('remove', () => {
              mapRef.current.flyTo([city.latitude, city.longitude], city.zoom)
              tempMarker.setIcon(customIcon(markerSVG.inactive))
            })
            .openOn(mapRef.current)
        })

      return tempMarker
    });
    if(active){
      mapRef.current.flyTo([city.latitude, city.longitude], city.zoom)
    }
    return () => {
      marker.forEach((obj) => obj.remove())
    }
  }, [activeId, hotels])

  return (
    <div id="map" style={{height: `100%`}} ref={mapRef}/>
  );
}


export default MapFc
