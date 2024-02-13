import { useContext, useEffect, useState } from "react";
import RedHeart from "../../assets/heart-red.svg";
import heart from "../../assets/heart.svg";
import { FavouriteContext, WeatherContext } from "../../context";

function AddToFavorite() {
  const { addToFavourite, removeFromFavourite, favourites } =
    useContext(FavouriteContext);
  const [isFavourite, toggleFavourite] = useState(false);

  const { weatherData } = useContext(WeatherContext);
  const { latitude, longitude, location } = weatherData;

  useEffect(() => {
    const found = favourites.find((fav) => fav.location === location);
    toggleFavourite(found);
  }, []);

  function handleFavorites() {
    const found = favourites.find((fav) => fav.location === location);
    if (!found) {
      addToFavourite(latitude, longitude, location);
    } else {
      removeFromFavourite(location);
    }
    toggleFavourite(!isFavourite);
  }
  return (
    <div className="md:col-span-2">
      <div className="flex items-center justify-end space-x-6">
        <button
          onClick={handleFavorites}
          className="text-sm md:text-base inline-flex items-center space-x-2 px-3 py-1.5 rounded-md bg-[#C5C5C54D]"
        >
          <span>Add to Favourite</span>
          <img src={isFavourite ? RedHeart : heart} alt="heart" />
        </button>
      </div>
    </div>
  );
}

export default AddToFavorite;
