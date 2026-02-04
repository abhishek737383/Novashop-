// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const settingRoutes = require("./routes/settingRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend-domain.com'] // Add your frontend domain
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json());

// Basic health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// Keep-alive endpoint
app.get("/api/keep-alive", (req, res) => {
  res.json({ 
    status: "awake", 
    message: "Server is running",
    uptime: process.uptime()
  });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/settings", settingRoutes);

// Simple error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
      
      // Start keep-alive for Render
      startKeepAlive();
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('👋 Shutting down gracefully...');
      server.close(() => {
        mongoose.connection.close();
        console.log('✅ Server closed');
        process.exit(0);
      });
    });
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Keep-alive function for Render
function startKeepAlive() {
  const RENDER_URL = "https://novashop-f3gt.onrender.com";
  const LOCAL_URL = `http://localhost:${process.env.PORT || 5000}`;
  const url = process.env.NODE_ENV === 'production' ? RENDER_URL : LOCAL_URL;
  
  const pingInterval = 14 * 60 * 1000; // 14 minutes
  
  console.log(`🔄 Keep-alive enabled for: ${url}`);
  console.log(`⏰ Pinging every: ${pingInterval / 1000} seconds`);
  
  // Initial ping
  pingServer(url);
  
  // Regular pings
  setInterval(() => {
    pingServer(url);
  }, pingInterval);
  
  // More frequent pings in development
  if (process.env.NODE_ENV !== 'production') {
    setInterval(() => {
      pingServer(LOCAL_URL);
    }, 30000); // 30 seconds in development
  }
}

function pingServer(url) {
  const pingUrl = `${url}/api/keep-alive`;
  const timestamp = new Date().toLocaleTimeString();
  
  axios.get(pingUrl, { timeout: 10000 })
    .then(response => {
      console.log(`✅ [${timestamp}] Ping successful: ${response.data.message}`);
    })
    .catch(error => {
      console.log(`⚠️ [${timestamp}] Ping failed for ${url}:`, error.message);
    });
}