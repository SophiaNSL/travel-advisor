import React from 'react';
import { CssBaseline, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react'; 

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import { getPlacesData, getWeatherData } from './api/index';


const App = () => {

    const [places, setPlaces] = useState([]);

    const [weatherData, setWeatherData] = useState([]);
    
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    const [coordinates, setCoordinates] = useState({});

    const [bounds, setBounds] = useState({});

    const [childClicked, setChildClicked]= useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [type,setType] = useState('restaurant');
    const [rating, setRating] = useState(0);

    
    useEffect( () => {
      navigator.geolocation.getCurrentPosition( ({coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude});
      }); 

    },[]);

    useEffect( ()=> {
        const filteredPlaces = places.filter( (place) => Number(place.rating) > rating );

        setFilteredPlaces(filteredPlaces);


    },[rating,places]);
    
    useEffect( () => {
        // console.log(coordinates, bounds);
        if (bounds.sw && bounds.ne) 
        {
        setIsLoading(true);

        getWeatherData(coordinates.lat, coordinates.lng)
          .then((data)=> {
              console.log(data);
              setWeatherData(data);
            
            });

        getPlacesData(type, bounds.sw,bounds.ne)
            .then( (data) => {
                setPlaces(data.filter( (place) => place.name && place.num_reviews >0 ));
                setFilteredPlaces([]);
                setIsLoading(false);
            });
        }

    }, [bounds, type]);

    

    return(
        <>
          <CssBaseline />
          <Header setCoordinates={setCoordinates}/>
          <Grid container spacing={3} style={{width: '100%'}}>
              <Grid item xs={12} md={4}>
                  <List 
                    places={filteredPlaces.length? filteredPlaces: places}
                    childClicked={childClicked}
                    isLoading={isLoading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                  
                  />
              </Grid>

              <Grid item xs={12} md={8}>
                  <Map 
                     setCoordinates={setCoordinates}
                     setBounds={setBounds}
                     coordinates={coordinates}
                     places={filteredPlaces.length? filteredPlaces: places}
                     setChildClicked={setChildClicked}
                     weatherData={weatherData}
                  
                  />

              </Grid>

          </Grid>
          
        </>
    )
}

export default App;


