import { useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
// const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();
        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }
        setAvailablePlaces(resData);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places,please try again later.",
        });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);
  if (error) {
    return <Error title="An error occured!!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
