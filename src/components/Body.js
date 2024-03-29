import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { filterData } from "../utils/helper";
import { RESTAURANTS_URL } from "../constants";
import { ImSearch } from "react-icons/im";

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(RESTAURANTS_URL);
    const json = await data.json();
    setAllRestaurants(json?.data?.cards?.[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards?.[2]?.data?.data?.cards);
  }

  if (!allRestaurants) return null;

  return (
    <>
      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <>
          <div className="w-full h-12 flex justify-center mt-4">
            <div className="w-[90%] pr-4 flex items-center border-solid border  rounded-md lg:w-[60%]">
              <div className="flex-1 py-0 px-4">
                <input
                  type="text"
                  className="w-full h-full outline-0 border-none overflow-hidden text-ellipsis align-middle font-mono font-medium"
                  placeholder="Search for restaurants and food..."
                  value={searchText}
                  onChange={(e) => {
                    if (!e.target.value) {
                      setSearchText(e.target.value);
                      setFilteredRestaurants(allRestaurants);
                      return;
                    }
                    setSearchText(e.target.value);
                    const data = filterData(searchText, allRestaurants);
                    setFilteredRestaurants(data);
                  }}
                />
              </div>
              <ImSearch fontSize="large" />
            </div>
          </div>

          {filteredRestaurants?.length > 0 ? (
            <div
              className="flex flex-wrap justify-center max-w-[1200px] w-full my-0 mx-auto"
            >
              {filteredRestaurants.map((restaurant) => (
                <Link
                  to={`/restaurant/${restaurant.data.id}`}
                  key={restaurant.data.id}
                >
                  <RestaurantCard {...restaurant.data} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-1 justify-center items-center font-mono text-lg">
              Oops, No restaurant found !!!
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Body;
