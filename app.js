const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const PORT = 3000;

// 🔹 Middleware para JSON
app.use(express.json());

// 🔹 Configuración de CORS (añadido para WebSockets)
const corsOptions = {
    origin: "http://127.0.0.1:5500", // 🔥 Permitir conexión desde tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
};
app.use(cors(corsOptions));

// 🔹 Crear servidor HTTP
const server = http.createServer(app);

// 🔹 Inicializar `Socket.IO` correctamente
const io = new Server(server, {
    cors: { origin: "*" } // 🔥 Permitir conexiones WebSocket desde cualquier origen
});

// 🔹 Servir archivos estáticos desde `public/`
app.use(express.static("public"));

// 🔹 Manejo de conexión con WebSockets
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado:", socket.id);

    socket.on("mensaje", (data) => {
        console.log("Mensaje recibido:", data);
        io.emit("mensaje", data); // 🔥 Enviar el mensaje a todos los usuarios conectados
    });

    socket.on("disconnect", () => {
        console.log("Usuario desconectado:", socket.id);
    });
});

// 🔹 Ruta básica de prueba
app.get("/", (req, res) => {
    res.send("🔥 Servidor activo y funcionando!");
});

// Rutas 

//Usuarios
const usuarioRoutes = require("./routes/usuarioRoutes.js");
app.use("/usuarios", usuarioRoutes);
//Chat
const chatRoutes = require("./routes/chatRoutes.js");
app.use("/chat", chatRoutes);
//Likes
const likeRoutes = require("./routes/likeRoutes.js");
app.use("/likes", likeRoutes);


server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
