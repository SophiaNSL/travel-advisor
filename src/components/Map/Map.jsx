import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import {LocationOnOutlined } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';
import {mapStyles} from './mapStyles';

const Map = ({ setCoordinates, setBounds, coordinates, places,setChildClicked, weatherData }) => {
    const classes = useStyles();
    const isDesktop = useMediaQuery('(min-width:600px)');
   

    return ( 
        <div className={classes.mapContainer}>
            <GoogleMapReact
               bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
               defaultCenter={coordinates}
               center={coordinates}
               defaultZoom={14}
               margin={[50, 50, 50, 50]}
               options={{
                   disableDefaultUI: true,
                   zoomControl: true,
                   styles: mapStyles,
               }}
               onChange={(e) => {
                  console.log(e);
                   setCoordinates({ lat: e.center.lat, lng: e.center.lng});
                   setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw });

               }}
               onChildClick={ (child) => setChildClicked(child)}

            >
            {places?.map( (place,i) => (
                <div 
                    key={i}
                    className={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                >
                    {isDesktop? (
                        <Paper elevation={3} className={classes.paper}>
                            <Typography gutterBottom vatiant="subtitle2" >{place.name}</Typography>
                            <img 
                              className={classes.pointer}
                              src={place.photo ? place.photo.images.large.url : '/dummypic.jpg'}
                              alt={place.name}
                            />

                            <Rating size="small" value={Number(place.rating)} readOnly/>
                        </Paper>
                    )
                    :(
                        <LocationOnOutlined color="primary" fontSize="large"/>
                    )
                    
                    }

                </div>

            ))}

           
            {/* {weatherData && (
                <div  lat={weatherData.coord.lat} lng={weatherData.coord.lon} >
                     <Paper elevation={3} className={classes.paper}>
                    <Typography variant="h1">WeatherIcon</Typography>
                    <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="100" alt="cloud"/>
                    <img src='/dummypic.jpg' height="100" alt="cloud"/>
                    </Paper>
                </div>
            )} */}



            </GoogleMapReact>

        </div>
     );
}
 
export default Map;