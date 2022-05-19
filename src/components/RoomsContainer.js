import React, { useContext } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

const RoomContainer = () => {
  const context = useContext(RoomContext);

  const { loading, sortedRooms, rooms } = context;

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </>
  );
};

export default RoomContainer;
