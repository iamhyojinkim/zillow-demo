import { useState, useEffect } from "react";
import { useProperty } from "./api/Context";
import Map from "./Map";
import Card from "./Card";
import { ImSearch } from "react-icons/im";

export default function Grid() {
  const { pro } = useProperty();
  const [input, setInput] = useState("");
  const [houses, setHouses] = useState(pro);
  const [locations, setLocations] = useState(pro.map((p) => p.location));

  useEffect(() => {
    if (input === "") {
      setHouses(pro);
      setLocations(pro.map((p) => p.location));
    } else {
      const filteredHouses = pro.filter((pr) =>
        pr.name.toLowerCase().includes(input.toLowerCase())
      );
      setHouses(filteredHouses);
      setLocations(filteredHouses.map((p) => p.location));
    }
  }, [input, pro]);

  const setInputAndMapLoc = (value) => {
    setInput(value);
  };

  return (
    <>
      <div className="layout">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setInputAndMapLoc(e.target.value)}
            value={input}
          />
          <button className="button">
            <ImSearch />
          </button>
        </div>
        <div>
          <div className="content">
            <article className="map-section">
              <Map locations={locations} houses={houses} />
            </article>
            <article className="listings">
              <div className="header">
                <h2>Rental Listings</h2>
              </div>
              <div className="containers">
                {houses.map((house) => (
                  <Card
                    key={house.id}
                    input={input}
                    house={house}
                    image={house.images}
                  />
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
