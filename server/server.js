const express = require('express')
const dotenv = require('dotenv')
const cookiparser = require('cookie-parser')
const cors = require('cors')
const http = require('http')              // ✅ ADD
const { Server } = require('socket.io')   // ✅ ADD

const { connectDB } = require('./utils/database')
const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes")
const shopAddressRouter = require("./routes/shop/address-routes")
const shopOrderRouter = require("./routes/shop/order-routes")
const shopwishlistRouter = require("./routes/shop/wishlist-routes");
const adminOrderRouter = require("./routes/admin/orders-routes")
const shopReviewRouter = require("./routes/shop/product-reviews");
const dashboardRouter = require("./routes/admin/dashboard-routes")

let app = express()

// env
dotenv.config()

// DB
connectDB()

// ✅ CREATE HTTP SERVER
const server = http.createServer(app)

// ✅ SOCKET SETUP
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

// ✅ SOCKET CONNECTION
io.on("connection", (socket) => {
    console.log("✅ Admin connected:", socket.id)

    socket.on("disconnect", () => {
        console.log("❌ Disconnected:", socket.id)
    })
})

// ✅ GLOBAL USE (IMPORTANT)
app.set("io", io)


// middleware
app.use(
    cors({
        origin : `http://localhost:5173`,
        credentials : true,
        methods:['GET','PUT','POST','DELETE'],
        allowedHeaders:[
            'Content-Type',
            'Authorization',
            'Cache-Control',
            "Expires",
            'Pragma'
        ]
    })
)

app.use(cookiparser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter)
app.use("/api/admin/orders", adminOrderRouter);
app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/wishlist", shopwishlistRouter);
app.use("/api/admin/dashboard", dashboardRouter);

// ❌ OLD (remove this)
// app.listen(...)

// ✅ NEW SERVER START
let port = process.env.PORT || 5000
server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
})