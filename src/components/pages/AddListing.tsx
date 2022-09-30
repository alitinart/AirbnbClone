import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Listing from "../../models/listing.model";
import { requests } from "../../services/request.provider";
import AddRoom from "../elements/AddRoom";

export default function AddListing() {
  const { register, handleSubmit } = useForm();
  const [rooms, setRooms] = useState([
    { name: "Kitchens", count: 0 },
    { name: "Bedrooms", count: 0 },
    { name: "Bathrooms", count: 0 },
    { name: "Living Rooms", count: 0 },
    { name: "Balconies", count: 0 },
  ]);
  const [images, setImages] = useState<any>([]);
  const [imagesBlob, setImagesBlob] = useState<any>([]);

  const add = (index: number) => {
    let roomsChanged = rooms.slice();
    roomsChanged[index].count++;
    setRooms(roomsChanged);
  };

  const remove = (index: number) => {
    let roomsChanged = rooms.slice();
    if (roomsChanged[index].count === 0) {
      return;
    }
    roomsChanged[index].count--;
    setRooms(roomsChanged);
  };

  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/login");
    }
  }, []);

  const formatDate = (date: String) => {
    let dateData: any = date.split("-");
    let dateObject = new Date(dateData);

    let month = dateObject.toLocaleString("default", { month: "short" });
    let day = dateObject.toLocaleString("default", { day: "numeric" });

    return { month, day };
  };

  const onSubmit = async (data: any) => {
    console.log(data);

    let startDate = formatDate(data.startDate);
    let endDate = formatDate(data.endDate);

    let availableDates = `${startDate.month} ${startDate.day} - ${
      startDate.month === endDate.month
        ? endDate.day
        : `${endDate.month} ${endDate.day}}`
    }`;

    let roomsReturned = {
      bedrooms: rooms[0].count,
      kitchens: rooms[1].count,
      bathrooms: rooms[2].count,
      livingRooms: rooms[3].count,
      balconies: rooms[4].count,
    };

    const newListing: Listing = {
      availableDates,
      images,
      locationName: data.locationName,
      price: data.price,
      description: data.description,
      rooms: roomsReturned,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("No token provided");

      await requests.listingRequests.addListing(newListing, token);

      nav("/");
    } catch (e: any) {
      console.log(e);
      toast.error(e.message);
    }
  };

  const imageUpload = async (e: any) => {
    let filesObject = e.target.files;

    let files = Object.keys(filesObject).map((key) => filesObject[key]);
    setImagesBlob(files);

    files.map((file: any) => {
      let reader = new FileReader();
      let url = reader.readAsDataURL(file);

      reader.onloadend = (e) => {
        let imagesChanged = images.slice();
        imagesChanged.push(reader.result);

        setImages(imagesChanged);
      };
    });
  };

  const removeImage = (index: number) => {
    let imagesChanged = images.slice();
    imagesChanged.splice(index, 1);

    setImages(imagesChanged);
  };

  return (
    <div className="add_listing">
      <h1 className="page_title text_center">
        Add your own <span className="primary_color">Listing</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="add_listing__left">
          <input
            type="text"
            className="form_control"
            {...register("locationName")}
            placeholder="Location Name"
            required
          />
          <textarea
            className="form_control"
            cols={20}
            rows={12}
            {...register("description")}
            placeholder="Description"
            required
          ></textarea>
          <div className="price_input">
            <input
              type="number"
              className="form_control"
              placeholder="Price per night"
              {...register("price")}
              required
            />
            <i className="bi bi-currency-dollar"></i>
          </div>
          <div className="form_control__row">
            <div className="form_control__item">
              <label htmlFor="startDate">Available Start Date</label>
              <input
                id="startDate"
                className="form_control"
                {...register("startDate")}
                type={"date"}
                required
              />
            </div>
            <div className="form_control__item">
              <label htmlFor="endDate">Available End Dates</label>
              <input
                id="endDate"
                className="form_control"
                {...register("endDate")}
                type={"date"}
                required
              />
            </div>
          </div>
          {/* <input type="text" className="form_control" placeholder="Tags" /> */}
        </div>
        <div className="add_listing__right">
          <div className="add_rooms">
            {rooms.map((room, index) => {
              return (
                <AddRoom
                  key={index}
                  index={index}
                  add={add}
                  remove={remove}
                  name={room.name}
                  count={room.count}
                />
              );
            })}
          </div>
          <div className="form_control__file">
            <label htmlFor="file_upload">Upload Images</label>
            <input
              type="file"
              {...register("images")}
              accept="image/png, image/gif, image/jpeg"
              hidden
              onChange={imageUpload}
              id="file_upload"
              required
            />
          </div>
          <div className="listing_images">
            {images.map((image: any, index: number) => {
              return (
                <img
                  onClick={() => removeImage(index)}
                  key={index}
                  src={image}
                />
              );
            })}
          </div>
          <button className="form__submit">Save</button>
        </div>
      </form>
    </div>
  );
}
