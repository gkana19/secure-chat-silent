const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running Successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Proxy configuration
app.use("/api", (req, res) => {
  // Forward the request to the backend server
  req
    .pipe(
      request("https://secure-backend-production.up.railway.app/" + req.url)
    )
    .pipe(res);
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://mellifluous-meerkat-c576c7.netlify.app",
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
