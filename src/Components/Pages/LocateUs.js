
import React, { Component } from 'react'
import { Map, GoogleApiWrapper,Marker } from 'google-maps-react';

const mapStyles = {
    width: '70%',
    height: '80%',
};
 class LocateUs extends Component {

    render() {
        return (
            <div>
                
                <div style={{ height: "500px", width: "100%" ,margin:"5% 15%" } } > 
                <Map
                
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{lat:19.146332,lng:73.008058}}
                >
                    <Marker position={{ lat: 18.5790120, lng: 73.7399335}} />
                    <Marker position={{lat:19.146332,lng:73.008058}} />
                    <Marker position={{lat:19.02456,lng:72.843286}} />
                    </Map>
                </div>
            </div>

        );
    }
}

export default GoogleApiWrapper({ apiKey: 'AIzaSyCldqThJjAdICVbx8byIdqOHQzE2D0K2Mw'})(LocateUs);