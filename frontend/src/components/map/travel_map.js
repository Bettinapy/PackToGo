import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, Marker, Polyline} from 'react-google-maps';
import mapStyles from './mapStyles';
import Geocode from 'react-geocode';



Geocode.setApiKey("AIzaSyBgZwPFmsA5rBuz8-tEAtINupHZ8W4fEYo");

const Map = (props) => {
    // const [centerLat, setCenterLat] = useState(39.833333);
    // const [centerLng, setCenterLng] = useState(-98.584052);

    const lineCoordinates = props.linepath;
    
    return(
      <GoogleMap
        zoom ={props.mapZoom}
        center={props.mapCenter}
        defaultOptions={{styles: mapStyles,
                        streetViewControl:false,
                        mapTypeControl: false,
                        fullscreenControl: false}}>
          <Marker position={props.originPosition}
                icon={{
                    url: "https://minicram-dev.s3.amazonaws.com/images/rocket.svg",
                    scaledSize: new window.google.maps.Size(35,35)
                }}/>
          <Marker position={props.destinationPosition}
                icon={{
                    url: "https://minicram-dev.s3.amazonaws.com/images/start.svg",
                    scaledSize: new window.google.maps.Size(35,35)
                }}/>
          <Polyline options={{
            path: lineCoordinates,
            strokeColor: '#FF69B4',
            strokeOpacity: 1,
            strokeWeight: 6 }}
          />
      </GoogleMap>
    )
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

class TravelMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          mapOrigin: '',
          mapDestination: '',
          originPosition: {},
          destinationPosition: {},
          linepath: [],
          mapCenter: {lat:39.833333, lng: -98.584052},
          mapZoom: 3
        }
        this.timerId = null;
        this.routepath = [];
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mapOrigin !== this.props.mapOrigin) {
            this.debouncedSetOrigin();
        }
        if (prevProps.mapDestination !== this.props.mapDestination) {
            this.debouncedSetDestination();
        }
        if (this.routepath.length === 2) {
            this.setState({linepath: this.routepath});
            this.routepath = [];
        }
        
    }

    determineZoom(coor1, coor2) {
        const GLOBE_WIDTH = 256; // a constant in Google's map projection
        let west = coor1.lng;
        let east = coor2.lng;
        let angle = Math.abs(east - west);
        if (angle < 0) {
            angle += 360;
            }
        let zoom = Math.round(Math.log(460 * 360 / angle / GLOBE_WIDTH) / Math.LN2)-1;
        return zoom;
    }
    
    debouncedSetOrigin() {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(() => {
            this.setState({mapOrigin: this.props.mapOrigin});
            if (this.state.mapOrigin.length > 2) {
                this.geocodeOrigin(this.state.mapOrigin);
            }
        },1000)
    }

    debouncedSetDestination() {
        if (this.timerId) {
            clearTimeout(this.timerId);
        }
        this.timerId = setTimeout(() => {
            this.setState({mapDestination: this.props.mapDestination});
            if (this.state.mapDestination.length > 2) {
                this.geocodeDestination(this.state.mapDestination);
            }
        },1000)
    }

    geocodeOrigin(addressString) {
        Geocode.fromAddress(addressString).then(
          response => {
            //this.routepath = [];
            const {lat, lng} = response.results[0].geometry.location;
            const result = {lat: lat, lng: lng};
            this.routepath.push(result);
            this.routepath.push(this.state.destinationPosition);
            if (Object.keys(this.state.destinationPosition).length === 0) {
                this.setState({mapCenter: result, mapZoom: 8})
            } else {
                let centerLat = (result.lat + this.state.destinationPosition.lat) / 2;
                let centerLng = (result.lng + this.state.destinationPosition.lng) / 2;
                let newCenter = {lat: centerLat, lng: centerLng};
                let newZoom = this.determineZoom(result,this.state.destinationPosition);
                this.setState({mapCenter: newCenter, mapZoom: newZoom});
            }
            this.setState({originPosition: result})
          }
        )
      }
    
      geocodeDestination(addressString) {
        Geocode.fromAddress(addressString).then(
          response => {
            //this.routepath = [];
            const {lat, lng} = response.results[0].geometry.location;
            const outcome = {lat: lat, lng: lng};
            this.routepath.push(this.state.originPosition);
            this.routepath.push(outcome);
            if (Object.keys(this.state.originPosition).length === 0) {
                this.setState({mapCenter: outcome, mapZoom: 8})
            } else {
                let centerLat = (outcome.lat + this.state.originPosition.lat) / 2;
                let centerLng = (outcome.lng + this.state.originPosition.lng) / 2;
                let newCenter = {lat: centerLat, lng: centerLng};
                let newZoom = this.determineZoom(outcome,this.state.originPosition);
                this.setState({mapCenter: newCenter, mapZoom: newZoom});
            }
            this.setState({destinationPosition: outcome})
          }
        )
      }

    render(){
        return (
            <>
                {/* <div className="test-points-container">
                    <div>{this.state.mapOrigin}</div>
                    <div>{this.state.mapDestination}</div>
                </div> */}
                <WrappedMap 
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA1jEmFI1Um5tjuCREU9MsvY8vv_wbhjNs`}
                    loadingElement={<div style={{height: "100%" }}/>}
                    containerElement={<div style={{height: "100%" }}/>}
                    mapElement={<div style={{height: "100%" }}/>}
                    originPosition = {this.state.originPosition}
                    destinationPosition = {this.state.destinationPosition}
                    linepath = {this.state.linepath}
                    mapCenter = {this.state.mapCenter}
                    mapZoom = {this.state.mapZoom}
                />
            </>
        );
    }

}

export default TravelMap;