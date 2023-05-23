const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const proxy = require("express-http-proxy");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");

dotenv.config();

connectDB();
const app = express();
app.use(
  cors({
    origin:
      "https://646d1f2c85e411000841f164--mellifluous-meerkat-c576c7.netlify.app",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running Successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin:
      "https://646d1993d06f2b000873ebba--mellifluous-meerkat-c576c7.netlify.app",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room:" + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });
});

server.listen(PORT, console.log(`Server Start on PORT ${PORT}`.yellow.bold));

app.use("/api", proxy("https://secure-backend-production.up.railway.app"));
