import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState, useEffect, useCallback } from "react";

export default function Map({ locations, houses }) {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [toggle, setToggle] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "90%",
  };

  const image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCxgfKH73ypUuMLgUSAOZkRG1wCCHpQ-ko",
  });

  const onLoad = useCallback(
    (map) => {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach((loc) => {
        bounds.extend(
          new window.google.maps.LatLng(loc.latitude, loc.longtitude)
        );
      });
      map.setZoom(30);
      map.fitBounds(bounds);
    },
    [locations]
  );

  const onUnmount = useCallback(() => {}, []);
  const handleMarkerClick = (house) => {
    setSelectedHouse(house);
    setToggle((prevToggle) => !prevToggle);
  };
  useEffect(() => {
    if (
      selectedHouse &&
      selectedHouse.images &&
      selectedHouse.images.length > 0
    )
      console.log(selectedHouse);
  }, [selectedHouse]);

  return (
    <>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {locations.map((loc, _idx) => {
              const house = houses.find(
                (h) =>
                  h.location.latitude === loc.latitude &&
                  h.location.longtitude === loc.longtitude
              );

              return (
                <Marker
                  key={_idx}
                  position={{
                    lat: loc.latitude,
                    lng: loc.longtitude,
                  }}
                  onClick={() => handleMarkerClick(house)}
                  icon={{
                    url: image,
                    anchor: new window.google.maps.Point(8, 16),
                    scaledSize: new window.google.maps.Size(16, 32),
                  }}
                />
              );
            })}

            {selectedHouse && toggle && (
              <Marker
                position={{
                  lat: selectedHouse.location.latitude,
                  lng: selectedHouse.location.longtitude,
                }}
                icon={{
                  url: selectedHouse.images?.[0]?.url || image,
                  anchor: new window.google.maps.Point(90, 40),
                  scaledSize: new window.google.maps.Size(70, 70),
                }}
                onClick={() => {
                  window.location.href = `/detail/${selectedHouse.slug}`;
                }}
              />
            )}
          </GoogleMap>
        </>
      ) : (
        ""
      )}
    </>
  );
}
