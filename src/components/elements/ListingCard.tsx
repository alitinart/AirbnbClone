import { RefObject, useEffect, useRef } from "react";
import Listing from "../../models/listing.model";
import Star from "/src/assets/images/icons/Star.svg";

export default function ListingCard({
  locationName,
  images,
  availableDates,
  price,
  ratings,
}: Listing) {
  const listingRef: RefObject<HTMLDivElement> = useRef(null);
  const imagesRef: RefObject<HTMLDivElement> = useRef(null);

  const sum =
    ratings?.length === 0
      ? ratings.reduce((partialSum, a) => partialSum + a, 0)
      : 0;
  const rating =
    ratings?.length === 0 ? Math.round((sum / ratings.length) * 10) / 10 : 0;

  useEffect(() => {
    listingRef.current?.addEventListener("mouseenter", () => {
      let firstImage: any = imagesRef.current?.children[0];
      let secondImage: any = imagesRef.current?.children[1];

      firstImage.classList.add("hidden");
      firstImage.classList.remove("visible");

      secondImage.classList.add("visible");
      secondImage.classList.remove("hidden");
    });

    listingRef.current?.addEventListener("mouseleave", () => {
      let firstImage: any = imagesRef.current?.children[0];
      let secondImage: any = imagesRef.current?.children[1];

      secondImage.classList.add("hidden");
      secondImage.classList.remove("visible");

      firstImage.classList.add("visible");
      firstImage.classList.remove("hidden");
    });
  }, []);

  return (
    <div ref={listingRef} className="listing_card">
      <div className="listing_card__images_container" ref={imagesRef}>
        {images.map((image) => {
          return (
            <img
              src={image}
              key={image}
              alt={`${locationName} Image`}
              className="listing_card__image"
            />
          );
        })}
      </div>
      <h1 className="listing_card__name">{locationName}</h1>
      <p className="listing_card__location">10 miles out</p>
      <p className="listing_card__availableDays">{availableDates}</p>
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
