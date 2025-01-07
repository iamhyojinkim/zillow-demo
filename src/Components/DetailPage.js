import { useParams } from "react-router-dom";
import { useProperty } from "./api/Context";
import Actions from "./Actions";
import Info from "./Info";
import Nearby from "./Nearby";

export default function DetailPage() {
  const { slug } = useParams();
  const pro = useProperty();
  const properties = pro.pro;
  const property = properties.find((item) => item.slug === slug);
  if (!property) return <p>data not found</p>;

  return (
    <>
      <div className="details">
        <img src={property.images[1].url} alt={property.name} />
        <h3>{property.name}</h3>
        <Actions itemId={property.id} />
        <h3 className="badges">
          {property.parking && <span className="badge">Parking</span>}
          {property.petFriendly && <span className="badge">Pet Friendly</span>}
          {property.pool && <span className="badge">Pool</span>}
        </h3>
        <p>{property.description}</p>
        <h3>${property.rentalPrice}</h3>
        <div className="broker-info">
          {property.managingBroker.name} | {property.managingBroker.phoneNumber}
        </div>
        <Info name={property.name} />
      </div>
      <Nearby property={property} properties={properties} />
    </>
  );
}
