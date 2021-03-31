import React, { FC, useEffect, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import leaflet, {Map} from "leaflet"

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

const MAP_ID = `map`;

const MapFc: FC<{ hotels: Array<hotel>, activeId?: number }> = ({hotels, activeId = -1}) => {
  const city = hotels[0].city.location
  const mapRef = useRef<null | Map>();
  useEffect(() => {
    mapRef.current = leaflet.map(MAP_ID, {
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
      mapRef.current?.remove()
    }
  }, [hotels, mapRef.current]);


  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    let active = true
    const marker = hotels.map((hotels) => {
      let activeIcon = markerSVG.inactive
      if (hotels.id === activeId) {
        activeIcon = markerSVG.active
        active = false
        mapRef.current?.flyTo([hotels.location.latitude, hotels.location.longitude], hotels.location.zoom)
      }
      const link = `/offer/${hotels.id}`
      const tempMarker = leaflet.marker({
          lat: hotels.location.latitude,
          lng: hotels.location.longitude
        },
        {
          icon: customIcon(activeIcon)
        })
        .addTo(mapRef.current as Map)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on('click', (e:any) => { // TODO mentor
          mapRef.current?.flyTo([hotels.location.latitude, hotels.location.longitude], hotels.location.zoom)
          tempMarker.setIcon(customIcon(markerSVG.active))
          leaflet.popup()
            .setLatLng(e.latlng)
            .setContent(renderToString((
              <>
                <img
                  src={hotels.preview_image}
                  style={{height: 100}}
                  alt={hotels.title}
                />
                <br />
                <b>{hotels.title}</b>
                <br />
                <b>prise &euro;{hotels.price}:</b>
                <a href={link}>offer link</a>
              </>
            )))
            .on('remove', () => {
              mapRef.current?.flyTo([city.latitude, city.longitude], city.zoom)
              tempMarker.setIcon(customIcon(markerSVG.inactive))
            })
            .openOn(mapRef.current as Map)
        })

      return tempMarker
    });
    if(active){
      mapRef.current?.flyTo([city.latitude, city.longitude], city.zoom)
    }
    return () => {
      marker.forEach((obj) => obj.remove())
    }
  }, [activeId, hotels, mapRef.current])

  return (
    <div id={MAP_ID} style={{height: `100%`}} ref={mapRef as any} />
  );
}


export default MapFc
