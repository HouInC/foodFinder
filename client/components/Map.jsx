import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

function image(rating) {
    const num = Math.floor(rating);
    if (rating.toString().length === 1) {
        return (<img src={`./regular_${num}.png`} />)
    } else {
        return (<img src={`./regular_${Math.floor(num)}_half.png`} />)
    }
}

const StartGoogleMap = withGoogleMap(props => (
    <GoogleMap
        defaultZoom={15}
        defaultCenter={props.center}
        options={{ streetViewControl: false, mapTypeControl: false }}>
        <Marker position={props.center} icon={`https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png`} />
        {props.marker.map((eachRestaurant, index) => {
            return (
                <Marker
                    key={index}
                    position={{ lat: eachRestaurant.coordinates.latitude, lng: eachRestaurant.coordinates.longitude }}
                    onClick={() => { props.handleSubmit(eachRestaurant) }}>
                    {(Object.keys(props.selectMarker).length > 0 && props.selectMarker.name === eachRestaurant.name) && <InfoWindow onCloseClick={props.close}>
                        <div>
                            <label> name :
                            {eachRestaurant.name}
                            </label>
                            <label> rating :
                            {image(eachRestaurant.rating)}
                            </label>
                            <label> address :
                            {eachRestaurant.location.display_address.join()}
                            </label>
                            <label>
                                phone#:
                                {eachRestaurant.display_phone}
                            </label>
                            <label>
                                from :
                                <a href={eachRestaurant.url}> <img src={'./Yelp.png'} style={{ height: `10vh`, width: `10vw` }} />
                                </a>
                            </label>
                        </div>
                    </InfoWindow>}
                </Marker>)
        })}
    </GoogleMap>
))

const Map = props => {
    return (
        <div style={{ height: `80vh`, width: `100vw` }}>
            <StartGoogleMap
                containerElement={<div style={{ height: `500px` }} />}
                mapElement={<div style={{ height: `100%`, width: `100%` }} />}
                center={props.center}
                marker={props.marker}
                handleSubmit={props.handleSubmit}
                close={props.emptyMarker}
                selectMarker={props.selectMarker}
            />
        </div>
    )
}

export default Map;
