import { Link } from "react-router-dom";

export default function Exhibitions() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">🖼️ Exhibitions</h1>

      <div className="space-y-4">
        <Link
          to="/exhibitions/heads-of-state"
          className="block p-4 border border-white rounded hover:bg-white hover:text-black transition"
        >
          🧠 Heads of State — A Timeline of Power and Parody
        </Link>

        <Link
          to="/exhibitions/badger"
          className="block p-4 border border-white rounded hover:bg-white hover:text-black transition"
        >
          🦡 The Badger Scroll — Upcoming Auction Drop
        </Link>
      </div>
    </div>
  );
}
