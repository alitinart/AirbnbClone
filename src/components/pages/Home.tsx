import * as React from "react";
import Listing from "../../models/listing.model";
import ListingCard from "../elements/ListingCard";

import FilterOption from "../elements/FilterOption";
import { requests } from "../../services/request.provider";
import Loader from "../elements/Loader";
import { toast } from "react-toastify";

export default function Home() {
  const [listings, setListings] = React.useState<Listing[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await requests.listingRequests.getAllListings();
        setLoading(false);
        setListings(res.data.listings);
        console.log(res);
      } catch (e) {
        toast.error("Could not fetch listings. Check your internet connection");
      }
    };

    fetchListings();
  }, []);

  return (
    <div
      className="section home"
      style={{
        paddingTop: listings.length > 5 ? "9rem" : "",
      }}
    >
      <div className="filters">
        <FilterOption text="Trending" queryParam="none" icon="bar-chart-fill" />
        <FilterOption
          text="National Parks"
          queryParam="national"
          icon="flag-fill"
        />
        <FilterOption
          text="Historical Homes"
          queryParam="historical"
          icon="hourglass-split"
        />
        <FilterOption text="Islands" queryParam="islands" icon="globe" />
        <FilterOption
          text="Beach"
          queryParam="beach"
          icon="brightness-high-fill"
        />
        <FilterOption
          text="Cabins"
          queryParam="cabins"
          icon="house-door-fill"
        />
        <FilterOption text="Design" queryParam="design" icon="brush-fill" />
        <FilterOption text="Arctic" queryParam="arctic" icon="snow2" />
        <FilterOption text="Tiny Homes" queryParam="tiny" icon="house-fill" />
      </div>
      {listings.length > 0 ? (
        <div className="cards">
          {listings.map((listing) => {
            return <ListingCard key={listing.locationName} {...listing} />;
          })}
        </div>
      ) : loading ? (
        <Loader />
      ) : (
        <h1 className="page_title text_center">
          No current <span className="primary_color">listings</span> found
        </h1>
      )}
    </div>
  );
}
