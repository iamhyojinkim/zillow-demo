import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";

export default function Nearby({ property, properties }) {
  const mainLat = property.location.latitude;
  const filteredProperties = properties.filter(
    (itm) =>
      itm.location.latitude >= mainLat - 5 &&
      itm.location.latitude <= mainLat + 5 &&
      itm.location.latitude !== mainLat
  );

  return (
    <>
      <div className="nearby">
        <h3 className="nearby-title">Nearby Homes</h3>
        <div className="filtered-containers">
          {filteredProperties.map((p, idx) => (
            <div className="filtered-cards" key={idx}>
              <Link to={`/detail/${p.slug}`}>
                <ImageCard description={p.description} images={p.images[0]} />
              </Link>
              {p.name}
              <div style={{ fontWeight: "bold" }}>${p.rentalPrice}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
