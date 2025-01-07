import { Link } from "react-router-dom";

import ImageCard from "./ImageCard";

export default function Card({ house }) {
  const houseArray = [house];

  return (
    <>
      <div className="containers">
        {houseArray.map((p, idx) => (
          <div className="cards" key={idx}>
            <Link to={`/detail/${p.slug}`}>
              <ImageCard description={p.description} images={p.images[0]} />
            </Link>
            {p.name}
            <div style={{ fontWeight: "bold" }}>${p.rentalPrice}</div>
          </div>
        ))}
      </div>
    </>
  );
}
