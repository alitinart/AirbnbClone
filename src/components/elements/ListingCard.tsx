import Listing from "../../models/listing.model";
import Star from "/src/assets/images/icons/Star.svg";

export default function ListingCard({
  name,
  image,
  location,
  availableDays,
  price,
  ratings,
}: Listing) {
  const sum = ratings.reduce((partialSum, a) => partialSum + a, 0);
  const rating = Math.round((sum / ratings.length) * 10) / 10;

  return (
    <div className="listing_card">
      <img src={image} alt={`${name} Image`} className="listing_card__image" />
      <h1 className="listing_card__name">{name}</h1>
      <p className="listing_card__location">{location}</p>
      <p className="listing_card__availableDays">{availableDays}</p>
      <div className="listing_card__price_rating">
        <p className="listing_card__price_rating__price">
          {price}$ <span>night</span>
        </p>
        <p className="listing_card__price_rating__rating">
          <img src={Star} alt="Rating" />
          {rating}
        </p>
      </div>
    </div>
  );
}
