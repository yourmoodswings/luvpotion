import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const merchItems = [
  {
    name: "OBJ Medallion Pendant",
    price: "₦18,500",
    image: "/assets/1.png",
    link: "/shop/obj-medallion",
  },
  {
    name: "Jakande Tribute Shirt",
    price: "₦11,000",
    image: "/assets/2.png",
    link: "/shop/jakande-shirt",
  },
  {
    name: "Heads of State Vase",
    price: "₦25,000",
    image: "/assets/3.png",
    link: "/shop/hos-vase",
  },
  {
    name: "AfroAlchemy Candle",
    price: "₦7,500",
    image: "/assets/4.png",
    link: "/shop/alchemy-candle",
  },
];

const MuseumShopPreview = () => {
  return (
    <section className="font-serif py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Wear the Myth. Own the Memory.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {merchItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-black border border-neutral-800 rounded-xl overflow-hidden shadow-lg"
            >
              <Link to={item.link}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-[#FBEEC1] font-semibold">{item.name}</h3>
                  <p className="text-neutral-400 text-sm">{item.price}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link to="/shop">
          <button className="mt-10 px-6 py-3 bg-neutral-800 text-[#FBEEC1] font-semibold rounded-full hover:bg-black transition">
            Visit the Shop →
          </button>
        </Link>
      </div>
    </section>
  );
};

export default MuseumShopPreview;
