import React, { useContext } from "react";
import Title from "./Title";
import { RoomContext } from "../context";
import Room from "./Room";
import Loading from "./Loading";

const FeaturedRooms = () => {
  const context = useContext(RoomContext);

  const { loading, rooms } = context;

  return (
    <section className="featured-rooms">
      <Title title="featured rooms" />
      <div className="featured-rooms-center">
        {loading ? (
          <Loading />
        ) : (
          rooms.map((room) => {
            return <Room key={room.id} room={room} />;
          })
        )}
      </div>
    </section>
  );
};

export default FeaturedRooms;
