const io = require("socket.io")(8900, {
  cors: {
    origin: ["http://localhost:3000", "https://sportify-test.netlify.app/"],
  },
});

let users = [];

const addUser = (userId, room) => {
  !users.some((user) => user.userId === userId) && users.push({ userId, room });
};

const removeUser = (room) => {
  users = users.filter((user) => user.room !== room);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("A user connected.");

  socket.on("join", (room) => {
    socket.join(room);
    console.log("Room Id: " + room);

    socket.on("addUser", (userId) => {
      addUser(userId, room);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, text }) => {
      io.to(room).emit("getMessage", {
        senderId,
        text,
      });
    });

    // When disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(room);
      io.emit("getUsers", users);
    });
  });
});

/*
    ======== WEBSOCKET CHEATSHEET ========
    1. Server Commands: 
    Send event to client: io
    Send event to every client: io.emit
    Send to one client: io.to(socketId).emit
    Take event from client: socket.on

    2. Client Commands:
    Send event to server: emit
    Take event from server: on 
*/
