import { FavouriteContext } from "../context";
import { useLocalStorage } from "../hooks";
const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

  const addToFavourite = (latitude, longitude, location) => {
    setFavourites([...favourites, { latitude, longitude, location }]);
  };

  const removeFromFavourite = (location) => {
    const restFavourites = favourites.filter(
      (fav) => fav.location !== location
    );
    setFavourites(restFavourites);
  };
  return (
    <FavouriteContext.Provider
      value={{ addToFavourite, removeFromFavourite, favourites }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteProvider;
