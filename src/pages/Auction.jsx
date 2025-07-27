// FINAL UI-AWARE Auction.jsx - Instant End, Recap, Countdown to Next
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const socket = io("http://localhost:3001");

export default function Auction() {
  const [currentBid, setCurrentBid] = useState(2000);
  const [topBidder, setTopBidder] = useState("None");
  const [myBid, setMyBid] = useState("");
  const [isVIP, setIsVIP] = useState(false);
  const [auctionTimes, setAuctionTimes] = useState({ start: null, end: null });
  const [now, setNow] = useState(Date.now());
  const [nextAuctionIn, setNextAuctionIn] = useState(null);
  const [bidLog, setBidLog] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [winnerInfo, setWinnerInfo] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkVIP = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) return;
      const res = await fetch("http://localhost:3001/api/vip-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("isVIP", "true");
        setIsVIP(true);
      }
    };

    const vipStatus = localStorage.getItem("isVIP");
    if (vipStatus === "true") setIsVIP(true);
    else checkVIP();

    socket.on("auction_times", ({ start, end }) => {
      setAuctionTimes({ start, end });
    });
    socket.on("bid_update", ({ currentBid, topBidder }) => {
      setCurrentBid(currentBid);
      setTopBidder(topBidder);
      setBidLog((prev) => [
        { bidder: topBidder, amount: currentBid, timestamp: Date.now() },
        ...prev,
      ]);
    });
    socket.on("bid_history", (history) => {
      setBidLog(history.slice().reverse());
    });
    socket.on("next_auction_in", ({ countdown }) => {
      setNextAuctionIn(countdown);
    });
    socket.on("auction_reset", ({ start, end }) => {
      setAuctionTimes({ start, end });
      setNextAuctionIn(null);
      setWinnerInfo(null);
    });
    socket.on("auction_winner", ({ winner, finalBid }) => {
      setWinnerInfo({ winner, finalBid });
    });

    return () => {
      socket.off("auction_times");
      socket.off("bid_update");
      socket.off("bid_history");
      socket.off("next_auction_in");
      socket.off("auction_reset");
      socket.off("auction_winner");
    };
  }, []);

  const placeBid = () => {
    const userName = localStorage.getItem("username") || "You 💎";
    const numericBid = parseInt(myBid);
    if (
      numericBid > currentBid &&
      auctionTimes.start &&
      now >= auctionTimes.start &&
      now < auctionTimes.end
    ) {
      socket.emit("new_bid", {
        amount: numericBid,
        bidder: userName,
      });
      setMyBid("");
    }
  };

  const handleReceiptUpload = async () => {
    if (!receipt) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("receipt", receipt);
    formData.append("userId", localStorage.getItem("user_id") || "demo");
    const res = await fetch("http://localhost:3001/api/vip-upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("isVIP", "true");
      setIsVIP(true);
    } else {
      alert("Upload failed. Try again.");
    }
    setUploading(false);
  };

  const remaining = auctionTimes.end ? Math.max(0, Math.floor((auctionTimes.end - now) / 1000)) : 0;
  const auctionEnded = auctionTimes.end && now >= auctionTimes.end;

  const showNextTimer = nextAuctionIn && auctionEnded && !auctionTimes.start;

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-pink-500">🔥 Live Auction Room</h1>

      {showNextTimer ? (
        <div className="mb-6 flex flex-col items-center">
          <CountdownCircleTimer
            key={nextAuctionIn}
            isPlaying
            duration={nextAuctionIn / 1000}
            colors={["#10B981"]}
            size={100}
            strokeWidth={8}
          >
            {({ remainingTime }) => (
              <div className="text-yellow-300 text-xl font-mono">
                ⏳ {remainingTime}s
              </div>
            )}
          </CountdownCircleTimer>
          <p className="text-sm mt-2 text-yellow-400">Next auction starts soon</p>
        </div>
      ) : auctionTimes.end && remaining > 0 ? (
        <div className="mb-6 flex flex-col items-center">
          <CountdownCircleTimer
            key={auctionTimes.end}
            isPlaying
            duration={remaining}
            colors={["#10B981", "#F59E0B", "#EF4444"]}
            size={120}
            strokeWidth={10}
            trailColor="#1F2937"
          >
            {({ remainingTime }) => (
              <div className="text-white font-mono text-xl">{remainingTime}s</div>
            )}
          </CountdownCircleTimer>
          <p className="text-sm text-gray-400 mt-2">Time Remaining</p>
        </div>
      ) : null}

      {auctionEnded && winnerInfo && (
        <div className="bg-green-800/40 border border-green-500 p-4 rounded text-center mb-4">
          <p className="text-xl font-semibold text-green-300">🏁 Auction Ended</p>
          <p className="text-md">🏆 Winner: <strong>{winnerInfo.winner}</strong></p>
          <p className="text-md">💰 Final Bid: <strong>${winnerInfo.finalBid}</strong></p>
        </div>
      )}

      {!auctionEnded && (
        <>
          <p className="text-2xl mb-1">
            💰 Current Bid: <span className="text-green-400">${currentBid}</span>
          </p>
          <p className="mb-6">
            🧍 Top Bidder: <span className="text-yellow-300">{topBidder}</span>
          </p>
        </>
      )}

      {!isVIP ? (
        <div className="bg-white/5 border border-white p-6 rounded mb-6 max-w-md w-full">
          <p className="text-lg mb-4">🔐 VIP Access Required</p>
          <p className="text-sm mb-2 text-yellow-300">Send $2,000 USDT to:</p>
          <p className="text-sm font-mono mb-4 text-green-400">0xAABBCCDDEEFF001122334455</p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setReceipt(e.target?.files?.[0] || null)}
            className="text-white text-sm mb-2"
          />
          <button
            onClick={handleReceiptUpload}
            className={`bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition w-full ${
              uploading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Receipt & Verify"}
          </button>
        </div>
      ) : (
        !auctionEnded && (
          <div className="flex gap-3 mb-6">
            <input
              className="p-2 text-black rounded"
              type="number"
              placeholder="Enter bid"
              value={myBid}
              onChange={(e) => setMyBid(e.target.value)}
            />
            <button
              onClick={placeBid}
              className="bg-pink-600 px-4 py-2 rounded hover:bg-pink-700 transition"
            >
              Place Bid
            </button>
          </div>
        )
      )}

      {Array.isArray(bidLog) && bidLog.length > 0 && (
        <div className="mt-10 w-full max-w-xl">
          <h2 className="text-xl font-bold mb-2 text-white border-b border-white pb-2">
            📜 Bid History
          </h2>
          <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {bidLog.map((bid, index) => (
              <li
                key={index}
                className="flex justify-between text-sm text-gray-300 bg-white/5 px-3 py-2 rounded"
              >
                <span>{bid.bidder}</span>
                <span>${bid.amount}</span>
                <span className="text-xs">
                  {new Date(bid.timestamp).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
