import items from "./localdata";
import React, { useEffect, useState } from "react";
const RoomContext = React.createContext();

const RoomProvider = (props) => {
  const [state, setState] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  });

  function formatData(items) {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  function getRoom(slug) {
    let tempRooms = [...state.rooms];
    const room = tempRooms.find((room) => room.slug === slug);
    return room;
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setState({
      ...state,
      [name]: value,
    });
  }

  useEffect(() => {
    let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } =
      state;

    let tempRooms = [...rooms];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type);
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }
    // filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);

    //filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true);
    }
    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true);
    }

    setState({
      ...state,
      sortedRooms: tempRooms,
    });
    // eslint-disable-next-line
  }, [
    state.type,
    state.capacity,
    state.price,
    state.maxSize,
    state.minSize,
    state.breakfast,
    state.pets,
  ]);

  useEffect(() => {
    let rooms = formatData(items);
    let featuredRooms = rooms.filter((room) => room.featured === true);
    //
    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));
    setState({
      ...state,
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <RoomContext.Provider
      value={{
        ...state,
        getRoom: getRoom,
        handleChange: handleChange,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};

export { RoomProvider, RoomContext };
