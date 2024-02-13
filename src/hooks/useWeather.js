import { useContext, useEffect, useState } from "react";
import { LocationContext } from "../context";


const useWeather = () => {
    const [weatherData, setWeatherData] = useState({
        location: '',
        climate: '',
        temparature: '',
        maxTemparature: '',
        minTemparature:'',
        humidity: '',
        cloudPercentage: '',
        wind: '',
        time: '', 
        longitude: '',
        latitude: ''
    })
    const [loading, setLoading] = useState({
        state: false,
        message: ''
    })

    const [error, setError] = useState(null)

    const {selectedLocation} = useContext(LocationContext);

    const fetchWeatherData = async (latitude, longitude) => {
        try {
            setLoading({
                ...loading,
                state: true,
                message: 'Fetching weather data...'
            })
            
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
                import.meta.env.VITE_WEATHER_API_KEY
              }&units=metric`
            );
            if(!response.ok) {
                const errorMessage = `Fetching weather data failed: ${response.status}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();

            const updateWeatherData = {
              ...weatherData,
              location: data.name,
              climate: data.weather[0].main,
              temparature: data.main.temp,
              maxTemparature: data.main.temp_max,
              minTemparature: data.main.temp_min,
              humidity: data.main.humidity,
              cloudPercentage: data.clouds.all,
              wind: data.wind.speed,
              time: data.dt,
              longitude: longitude,
              latitude: latitude
            };

            setWeatherData(updateWeatherData);

        } catch (error) {
            setError(error)
        } finally {
            setLoading({
                ...loading,
                state: false,
                message: ''
            })
        }
    };

    useEffect(() => {
        setLoading({
            ...loading,
            state: true,
            message: 'Finding location...'
        });

        if(selectedLocation.latitude && selectedLocation.longitude) {
            fetchWeatherData(selectedLocation.latitude, selectedLocation.longitude)
        } else {
                navigator.geolocation.getCurrentPosition((position) => {
                fetchWeatherData(position.coords.latitude, position.coords.longitude);
            })
        }
    }, [selectedLocation.latitude, selectedLocation.longitude])

    return {
        weatherData, 
        error,
        loading
    };
}

export default useWeather;