import * as React from "react";
import Listing from "../../models/listing.model";
import ListingCard from "../elements/ListingCard";

import { useLocation } from "react-router-dom";
import FilterOption from "../elements/FilterOption";

export default function Home() {
  const [listings, setListings] = React.useState<Listing[]>([
    {
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-3524556/original/24e9b114-7db5-4fab-8994-bc16f263ad1d.jpeg?im_w=720",
      name: "El Port de la Selva, Spain",
      location: "1,500 kilometers",
      availableDates: "Oct 25 - 26",
      price: 250,
      ratings: [4.3, 5.0, 4.5],
      description: "",
      author: "",
    },
    {
      image:
        "https://a0.muscache.com/im/pictures/be42241a-5346-4745-a2ef-8cf7576f88b8.jpg?im_w=720",
      name: "Haringlen, Netherlands",
      location: "1,701 kilometers",
      availableDates: "Oct 27 - 29",
      price: 371,
      ratings: [4.3, 5.0, 4.5],
      description: "",
      author: "",
    },
    {
      image:
        "https://a0.muscache.com/im/pictures/22f86e64-0d34-4237-b47c-d41aff588de0.jpg?im_w=720",
      name: "Amsterdam, Netherlands",
      location: "1,501 kilometers",
      availableDates: "Oct 25 - 26",
      price: 155,
      ratings: [4.3, 5.0, 4.5],
      description: "",
      author: "",
    },
    {
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-610511843622686196/original/253bfa1e-8c53-4dc0-a3af-0a75728c0708.jpeg?im_w=720",
      name: "Jonchery, Frace",
      location: "1,226 kilometers",
      availableDates: "Oct 16 - 21",
      price: 240,
      ratings: [4.3, 5.0, 4.5],
      description: "",
      author: "",
    },
    {
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-24598097/original/91290830-0db6-40c0-a23b-86a904ee5239.jpeg?im_w=720",
      name: "Guyonvelle, France",
      location: "1,328 kilometers",
      availableDates: "Dec 12 - 17 ",
      price: 110,
      ratings: [4.3, 5.0, 4.5],
      description: "",
      author: "",
    },
  ]);

  React.useEffect(() => {
    const fetchListings = async () => {
      return;
    };

    fetchListings();
  }, []);

  const { pathname } = useLocation();

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
      <div className="cards">
        {listings.map((listing) => {
          return <ListingCard key={listing.name} {...listing} />;
        })}
      </div>
    </div>
  );
}
