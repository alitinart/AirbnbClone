import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    console.log(rooms);
  };

  const remove = (index: number) => {
    let roomsChanged = rooms.slice();
    if (roomsChanged[index].count === 0) {
      return;
    }
    roomsChanged[index].count--;
    setRooms(roomsChanged);
    console.log(rooms);
  };

  const nav = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      nav("/login");
    }
  }, []);

  const onSubmit = async (data: any) => {
    console.log(data);
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
            {...register("name")}
            placeholder="Location Name"
          />
          <textarea
            className="form_control"
            cols={20}
            rows={12}
            {...register("description")}
            placeholder="Description"
          ></textarea>
          <div className="price_input">
            <input
              type="number"
              className="form_control"
              placeholder="Price per night"
              {...register("price")}
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
              />
            </div>
            <div className="form_control__item">
              <label htmlFor="endDate">Available End Dates</label>
              <input
                id="endDate"
                className="form_control"
                {...register("endDate")}
                type={"date"}
              />
            </div>
          </div>
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
              {...register("image")}
              accept="image/png, image/gif, image/jpeg"
              hidden
              onChange={imageUpload}
              id="file_upload"
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
