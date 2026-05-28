const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')

const { connectDB } = require('./utils/database')

const authRouter = require('./routes/auth/auth-routes')
const adminProductsRouter = require('./routes/admin/products-routes')
const shopProductsRouter = require('./routes/shop/products-routes')
const shopCartRouter = require('./routes/shop/cart-routes')
const shopAddressRouter = require('./routes/shop/address-routes')
const shopOrderRouter = require('./routes/shop/order-routes')
const shopwishlistRouter = require('./routes/shop/wishlist-routes')
const adminOrderRouter = require('./routes/admin/orders-routes')
const shopReviewRouter = require('./routes/shop/product-reviews')
const dashboardRouter = require('./routes/admin/dashboard-routes')

const app = express()

// env
dotenv.config({ path: './server/.env' })

// DB
connectDB()

// middleware
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ]
    })
)

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/admin/orders', adminOrderRouter)

app.use('/api/shop/products', shopProductsRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order', shopOrderRouter)
app.use('/api/shop/review', shopReviewRouter)
app.use('/api/shop/wishlist', shopwishlistRouter)

app.use('/api/admin/dashboard', dashboardRouter)

// frontend deploy
const _dirname = path.resolve()

app.use(express.static(path.join(_dirname, 'client/dist')))

app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'dist', 'index.html'))
})

// create server
const server = http.createServer(app)

// socket setup
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
})

// socket connection
io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id)

    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id)
    })
})

// global use
app.set('io', io)

// server start
const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`)
})