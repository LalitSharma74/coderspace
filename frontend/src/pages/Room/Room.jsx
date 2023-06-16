import React, { useState } from "react";
import { useWebRTC } from "../../hooks/useWebRTC";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Room.module.css";
const Room = () => {
  const { id: roomId } = useParams();
  const { user } = useSelector((state) => state.auth); //taking user from global state

  const { clients, provideRef } = useWebRTC(roomId, user);

  return (
    <div>
      <h1>All Connected clients</h1>
      {clients.map((client) => {
        return (
          <div className={styles.userHead} key={client.id}>
            <audio
              ref={(instance) => provideRef(instance, client.id)} //ref attribute is used to create a reference to the rendered <audio> element. This reference can then be used to interact with or manipulate the <audio> element programmatically.
              // controls
              autoPlay
            ></audio>
            <img className={styles.avatar} src={client.avatar} alt="avatar" />
            <h4>{client.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Room;
