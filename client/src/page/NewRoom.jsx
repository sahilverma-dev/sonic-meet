import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import MeetGridCard from "../components/MeetGridCard";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { MdClear } from "react-icons/md";
import { CgArrowsExchangeAlt } from "react-icons/cg";

// fake mesages data
const fakeMessages = [
  {
    name: "John Doe",
    message: "Hello, how are you?",
  },
  {
    name: "John Doe",
    message: "Hello, how are you?",
  },
  {
    name: "John Doe",
    message: "Hello, how are you?",
  },
];

const Message = ({ name, message }) => {
  return (
    <div
      className={`flex w-full ${
        Math.random() * 4 >= 2 ? " justify-end text-right" : ""
      }`}
    >
      <div className="w-4/5 p-2 bg-slate-300 rounded ">{message}</div>
    </div>
  );
};

const Room = () => {
  const [peers, setPeers] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const router = useParams();
  const roomID = router.roomId;

  const { user } = useAuth();

  useEffect(() => {
    const unsub = () => {
      socketRef.current = io.connect("http://localhost:5000/");
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          // audio: true,
        })
        .then((stream) => {
          userVideo.current.srcObject = stream;
          socketRef.current.emit("join room", roomID);
          socketRef.current.on("all users", (users) => {
            console.log(users);
            const peers = [];
            users.forEach((userID) => {
              const peer = createPeer(userID, socketRef.current.id, stream);
              peersRef.current.push({
                peerID: userID,
                peer,
              });
              peers.push({
                peerID: userID,
                peer,
              });
            });
            setPeers(peers);
          });

          socketRef.current.on("user joined", (payload) => {
            // console.log(payload);
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });

            const peerObj = {
              peerID: payload.callerID,
              peer,
            };

            setPeers((users) => [...users, peerObj]);
          });

          socketRef.current.on("receiving returned signal", (payload) => {
            const item = peersRef.current.find((p) => p.peerID === payload.id);
            item.peer.signal(payload.signal);
          });

          socketRef.current.on("user left", (id) => {
            console.log(id);
            const peerObj = peersRef.current.find((p) => p.peerID === id);
            if (peerObj) peerObj.peer.destroy();
            const peers = peersRef.current.filter((p) => p.peerID !== id);
            peersRef.current = peers;
            setPeers((users) => users.filter((p) => p.peerID !== id));
          });
        });
    };
    return unsub();
  }, [roomID]);

  const formSubmit = (e) => {
    e.preventDefault();
    socketRef.current.emit("send message", messageInput);
    socketRef.current.on("receive message", (data) => {
      console.log(data);
    });

    setMessageInput("");
  };

  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });
    peer.signal(incomingSignal);
    return peer;
  };

  return (
    <div className="p-3">
      <div className="flex w-full h-screen gap-3">
        <div className="grid flex-grow grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3">
          <AnimatePresence>
            <motion.div
              layout
              className={`relative bg-lightGray rounded-lg aspect-video overflow-hidden `}
            >
              <video
                ref={userVideo}
                autoPlay
                muted
                controls={false}
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4">
                <div className="bg-slate-800/70 backdrop-blur border-gray border-2  py-1 px-3 cursor-pointer rounded-md text-white text-xs">
                  Sahil Verma
                </div>
              </div>
            </motion.div>
            )
            {peers.map((peer) => {
              console.log(peer);
              return <MeetGridCard key={peer.peerID} peer={peer.peer} />;
            })}
          </AnimatePresence>
        </div>
        <div className="flex h-full max-h-screen w-[300px] flex-shrink-0 gap-3">
          <div className="border-2 rounded w-full h-full overflow-hidden flex flex-col justify-between">
            <div className="p-3 border-b">Chatting</div>
            <div className="p-3 flex flex-col gap-3 h-full w-full overflow-y-scroll">
              {fakeMessages.map((message, i) => (
                <Message
                  name={message.name}
                  key={i}
                  message={message.message}
                />
              ))}
            </div>
            <div className="p-3 border-t">
              <form onSubmit={formSubmit}>
                <div className="flex items-center gap-2">
                  <div className="relative w-full">
                    <input
                      className="w-full h-full p-3 outline-none border rounded"
                      type="text"
                      placeholder="Type your message"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                    {messageInput && (
                      <button className="absolute top-0 right-0 aspect-square active:scale-75 h-full flex items-center justify-center ">
                        <MdClear size={23} />
                      </button>
                    )}
                  </div>
                  <button className="aspect-square flex items-center active:bg-slate-400 justify-center h-11 bg-sky-500 text-white rounded">
                    <FiSend />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
