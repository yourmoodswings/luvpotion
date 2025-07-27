import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// ✅ VIP Memory
const vipUsers = new Set();

// ✅ Upload Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(process.cwd(), "receipts");
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

app.post("/api/vip-verify", (req, res) => {
    const { userId } = req.body;
    res.json({ success: vipUsers.has(userId) });
});

app.post("/api/vip-upload", upload.single("receipt"), (req, res) => {
    const { userId } = req.body;
    if (!req.file) return res.status(400).json({ success: false });
    vipUsers.add(userId);
    console.log(`✅ VIP Approved: ${userId}`);
    res.json({ success: true });
});

// 🧠 Auction State
let currentBid = 2000;
let topBidder = "None";
let bidHistory = [];
let auctionStart = null;
let auctionEnd = null;
let fomoInterval = null;

function startFomoBot() {
    if (fomoInterval) clearInterval(fomoInterval);
    fomoInterval = setInterval(() => {
        const now = Date.now();
        if (!auctionStart || now < auctionStart || now > auctionEnd) return;
        const amount = currentBid + Math.floor(Math.random() * 100 + 25);
        const timestamp = new Date().toISOString();
        topBidder = "Anonymous 🥷";
        currentBid = amount;
        bidHistory.push({ bidder: topBidder, amount, timestamp });
        io.emit("bid_update", { currentBid, topBidder });
        io.emit("bid_history", bidHistory);
    }, 15000);
}

function broadcastState() {
    io.emit("auction_times", { start: auctionStart, end: auctionEnd });
    io.emit("bid_update", { currentBid, topBidder });
    io.emit("bid_history", bidHistory);
}

function runAuctionCycle() {
    currentBid = 2000;
    topBidder = "None";
    bidHistory = [];

    auctionStart = Date.now();
    auctionEnd = auctionStart + 180000; // 3 minutes

    io.emit("auction_reset", { start: auctionStart, end: auctionEnd });
    broadcastState();
    startFomoBot();

    console.log("🎬 Auction started");

    // ⏲ Check every second until auction should end
    const interval = setInterval(() => {
        if (Date.now() >= auctionEnd) {
            clearInterval(interval);
            clearInterval(fomoInterval);

            io.emit("auction_winner", {
                winner: topBidder,
                finalBid: currentBid,
            });

            console.log(`🔒 Auction ended. Winner: ${topBidder}, $${currentBid}`);

            const delay = 60000; // 60 seconds
            io.emit("next_auction_in", { countdown: delay });

            setTimeout(() => {
                runAuctionCycle(); // 🔁 Start again
            }, delay);
        }
    }, 1000);
}

io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);
    socket.emit("auction_times", { start: auctionStart, end: auctionEnd });
    socket.emit("bid_update", { currentBid, topBidder });
    socket.emit("bid_history", bidHistory);

    socket.on("new_bid", ({ amount, bidder }) => {
        const now = Date.now();
        if (!auctionStart || now < auctionStart || now > auctionEnd) {
            return socket.emit("bidRejected", { reason: "Auction not active" });
        }

        if (amount > currentBid) {
            currentBid = amount;
            topBidder = bidder;
            const timestamp = new Date().toISOString();
            bidHistory.push({ bidder, amount, timestamp });
            io.emit("bid_update", { currentBid, topBidder });
            io.emit("bid_history", bidHistory);
        } else {
            socket.emit("bidRejected", { reason: "Bid must be higher than current" });
        }
    });

    socket.on("disconnect", () => {
        console.log("❌ User disconnected:", socket.id);
    });
});

server.listen(3001, () => {
    console.log("🚀 Auction server running at http://localhost:3001");
    runAuctionCycle(); // 🟢 Begin
});