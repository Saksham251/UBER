// const { Server } = require("socket.io");
// const userModel  = require("./models/user.model");
// const captainModel = require("./models/captain.model");

// let io = null;
// function initializeSocket(server) {
//   if (io) {
//     return io;
//   }
//   io = new Server(server, {
//     cors: {
//       origin: ["*"],
//       credentials: true,
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log(`Client connected: ${socket.id}`);

//     socket.on("disconnect", async () => {
//       console.log(`Client disconnected: ${socket.id}`);
//       await userModel.updateOne({ socketId: socket.id }, { socketId: null });
//       await captainModel.updateOne({ socketId: socket.id }, { socketId: null });
//     });

//     socket.on("join", async (data) => {
//       try {
//         const { userType, userId } = data;
//         console.log(`${userType} - ${userId}`);
//         if (userType == "user") {
//           await userModel.findByIdAndUpdate(userId, {
//             socketId: socket.id,
//           });
//         } else if (userType == "captain") {
//           await captainModel.findByIdAndUpdate(userId, {
//             socketId: socket.id,
//           });
//         }
//       } catch (error) {
//         console.error("Error updating socketId:", error);
//       }
//     });

//     socket.on("update-location-captain",async (data)=>{
//       const {userId,location} = data;
//       if(!location || !location.ltd || !location.lng){
//         return socket.emit("error",{message:"Invalid location data"});
//       }
//       console.log(`Captain with Id: ${userId} updated to`, location);
//       await captainModel.findByIdAndUpdate(userId, {
//         location:{
//           ltd:location.ltd,
//           lng:location.lng
//         }
//       });
//     });
//   });
//   return io;
// }

// function sendMessagesToSocketId(socketId, message) {
//   if (io) {
//     io.to(socketId).emit("message", message);
//   } else {
//     throw new Error("Socket not initialized! Call initializeSocket first.");
//   }
// }

// module.exports = { initializeSocket, sendMessagesToSocketId };


const { Server } = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io = null;

function initializeSocket(server) {
  if (io) return io;

  io = new Server(server, {
    cors: {
      origin: ["*"],
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Disconnect handler
    socket.on("disconnect", async () => {
      console.log(`Client disconnected: ${socket.id}`);
      await userModel.updateOne({ socketId: socket.id }, { socketId: null });
      await captainModel.updateOne({ socketId: socket.id }, { socketId: null });
    });

    // Join room / update socketId
    socket.on("join", async (data) => {
      try {
        const { userType, userId } = data;
        console.log(`${userType} - ${userId}`);
        if (userType === "user") {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === "captain") {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
      } catch (error) {
        console.error("Error updating socketId:", error);
      }
    });

    // Update captain location (GeoJSON-compatible)
    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;

      // Validate GeoJSON
      if (
        !location ||
        location.type !== "Point" ||
        !Array.isArray(location.coordinates) ||
        location.coordinates.length !== 2
      ) {
        return socket.emit("error", { message: "Invalid location data" });
      }

      console.log(`Captain with Id: ${userId} updated to`, location);

      try {
        await captainModel.findByIdAndUpdate(
          userId,
          { location }, 
          { new: true }
        );
      } catch (error) {
        console.error("Error updating captain location:", error.message);
      }
    });
  });

  return io;
}

// Utility to send message to specific socket
function sendMessagesToSocketId(socketId, messageObject) {
  console.log(`Sending message to ${socketId} `,messageObject);
  if (!io) throw new Error("Socket not initialized! Call initializeSocket first.");
  io.to(socketId).emit(messageObject.event, messageObject.data);
}

module.exports = { initializeSocket, sendMessagesToSocketId };
