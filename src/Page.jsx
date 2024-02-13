import React, { useContext, useEffect, useState } from "react";
import Header from "./components/header/Header";
import WeatherBoard from "./components/weather/WeatherBoard";
import { WeatherContext } from "./context";

import ClearSky from "./assets/backgrounds/clear-sky.jpg";
import FewClouds from "./assets/backgrounds/few-clouds.jpg";
import Mist from "./assets/backgrounds/mist.jpeg";
import RainyDay from "./assets/backgrounds/rainy-day.jpg";
import ScatteredClouds from "./assets/backgrounds/scattered-clouds.jpg";
import Snow from "./assets/backgrounds/snow.jpg";
import ThunderStorm from "./assets/backgrounds/thunderstorm.jpg";
import Winter from "./assets/backgrounds/winter.jpg";

function Page() {
  const { weatherData, loading } = useContext(WeatherContext);
  const [climateImage, setClimateImage] = useState("");

  function getBackgroundImage(climate) {
    switch (climate) {
      case "Rain":
        return RainyDay;
      case "Clouds":
        return ScatteredClouds;
      case "Clear":
        return ClearSky;
      case "Snow":
        return Snow;
      case "Thunder":
        return ThunderStorm;
      case "Fog":
        return Winter;
      case "Haze":
        return FewClouds;
      case "Mist":
        return Mist;
      default:
        return ClearSky;
    }
  }
  useEffect(() => {
    const bgImage = getBackgroundImage(weatherData.climate);
    setClimateImage(bgImage);
  }, [weatherData.climate]);
  return (
    <>
      {loading.state ? (
        <div className="flex bg-gray-200 rounded-md w-96 p-8 mt-14 mx-auto">
          <p className="text-center text-3xl text-black"> {loading.message}</p>
        </div>
      ) : (
        <div
          style={{ backgroundImage: `url('${climateImage}')` }}
          className="grid place-items-center h-screen bg-no-repeat bg-cover"
        >
          <Header />
          <main className="mt-10">
            <section>
              <WeatherBoard />
            </section>
          </main>
        </div>
      )}
    </>
  );
}

export default Page;
