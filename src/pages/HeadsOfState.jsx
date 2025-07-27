import React from 'react';
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
const leaders = [
  {
    name: "Abubakar Tafawa Balewa",
    title: "Prime Minister of Nigeria",
    term: "1960–1966",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Tafawa_Balewa.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Tafawa_Balewa.jpg", // Using Wikimedia as fallback
    highlights: [
      "Nigeria's first and only Prime Minister",
      "Led Nigeria through independence in 1960",
      "Assassinated in the January 1966 coup"
    ],
    quote: "He spoke like scripture, but was buried like a rumor.",
    magazineContent: {
      artImage: "https://i.imgur.com/JQ6pM5N.jpg", // Placeholder art
      narrative: `In the heart of a desert farm…symbol of dignity and humility…`
    }
  },
  {
    name: "Nnamdi Azikiwe",
    title: "Governor-General & Ceremonial President",
    term: "1960–1966",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Nnamdi_Azikiwe_1963.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Nnamdi_Azikiwe_1963.jpg",
    highlights: [
      "Nigeria's first Governor-General and first President when republic formed",
      "Symbolic head during Balewa's premiership",
      "Deposed in the 1966 coup"
    ],
    quote: "The eagle that soared in silence.",
    magazineContent: {
      artImage: "https://i.imgur.com/Lk0mW9x.jpg",
      narrative: `The scholar-president stands with his glasses reflecting the fractured vision…`
    }
  },
  {
    name: "Johnson Aguiyi-Ironsi",
    title: "Military Head of State",
    term: "Jan–July 1966",
    image: "", 
    portraitImage: "",
    highlights: [
      "First military ruler of Nigeria",
      "Came to power after first coup",
      "Assassinated in July 1966 counter-coup"
    ],
    quote: "Silence before chaos.",
    magazineContent: {
      artImage: "https://i.imgur.com/p6mQsUv.jpg",
      narrative: `A general who inherited a fractured polity…a pause before the storm.`
    }
  },
  {
    name: "Yakubu Gowon",
    title: "Military Head of State",
    term: "1966–1975",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Yakubu_Gowon_1970.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Yakubu_Gowon_1970.jpg",
    highlights: [
      "Longest-serving military head of state (nearly 9 years)",
      "Led during Nigerian Civil War",
      "Deposed in July 1975 coup"
    ],
    quote: "A bridge between war and peace.",
    magazineContent: {
      artImage: "https://i.imgur.com/YmZQ2aA.jpg",
      narrative: `In the aftermath of civil conflict…trying to hold a nation together…`
    }
  },
  {
    name: "Murtala Muhammed",
    title: "Military Head of State",
    term: "1975–1976",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Murtala_Muhammed_1975.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Murtala_Muhammed_1975.jpg",
    highlights: [
      "Radical reformer in short tenure",
      "Initiated major administrative changes",
      "Assassinated in office in 1976"
    ],
    quote: "Speed is integrity.",
    magazineContent: {
      artImage: "https://i.imgur.com/p6mQsUv.jpg",
      narrative: `He came like a hurricane—a whirlwind of reform in a slow-moving system…`
    }
  },
  {
    name: "Olusegun Obasanjo",
    title: "Military Head of State / President",
    term: "1976–1979 (military), 1999–2007 (civilian)",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Olusegun_Obasanjo_2015.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Olusegun_Obasanjo_2015.jpg",
    highlights: [
      "Oversaw transition to Second Republic in 1979",
      "Returned as democratically elected president in Fourth Republic",
      "Served two civilian terms"
    ],
    quote: "Peace is better than war; let's keep walking.",
    magazineContent: {
      artImage: "https://i.imgur.com/JQ6pM5N.jpg",
      narrative: `The general-turned-statesman…two eras bridged by a single personality…`
    }
  },
  {
    name: "Shehu Shagari",
    title: "President of Nigeria",
    term: "1979–1983",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Shehu_Shagari.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Shehu_Shagari.jpg",
    highlights: [
      "First democratically elected president after military rule",
      "Led Second Republic",
      "Overthrown in 1983 coup"
    ],
    quote: "Soft power needs backbone.",
    magazineContent: {
      artImage: "https://i.imgur.com/Lk0mW9x.jpg",
      narrative: `An elder statesman in civilian garb struck by the weight of economic crisis…`
    }
  },
  {
    name: "Muhammadu Buhari",
    title: "Military Head of State / President",
    term: "1983–1985 (military), 2015–2023 (civilian)",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Muhammadu_Buhari.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Muhammadu_Buhari.jpg",
    highlights: [
      "Led second major military coup in 1983",
      "Served as democratically elected president decades later",
      "Focused on anti-corruption and security"
    ],
    quote: "Discipline conquers chaos.",
    magazineContent: {
      artImage: "https://i.imgur.com/p6mQsUv.jpg",
      narrative: `The former general returned—from uniform to suit—still with a campaign against rot…`
    }
  },
  {
    name: "Ibrahim Babangida",
    title: "Military Head of State",
    term: "1985–1993",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Ibrahim_Babangida.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Ibrahim_Babangida.jpg",
    highlights: [
      "Staged palace coup against Buhari",
      "Introduced economic reforms (SAP)",
      "Resigned after annulment of 1993 election"
    ],
    quote: "Power—and the unpredictable.",
    magazineContent: {
      artImage: "https://i.imgur.com/JQ6pM5N.jpg",
      narrative: `A military strongman whose most lasting act was to cancel a popular vote…`
    }
  },
  {
    name: "Ernest Shonekan",
    title: "Interim President",
    term: "Aug–Nov 1993",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Ernest_Shonekan.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Ernest_Shonekan.jpg",
    highlights: [
      "Headed short-lived Interim National Government",
      "Appointed after Babangida resigned",
      "Deposed by Sani Abacha in November 1993"
    ],
    quote: "A caretaker in a storm.",
    magazineContent: {
      artImage: "https://i.imgur.com/Lk0mW9x.jpg",
      narrative: `Installed to placate public outrage…he lasted only months before another takeover…`
    }
  },
  {
    name: "Sani Abacha",
    title: "Military Head of State",
    term: "1993–1998",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Sani_Abacha.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Sani_Abacha.jpg",
    highlights: [
      "Ruled with an iron fist",
      "Died in office in 1998",
      "Human rights abuses and corruption"
    ],
    quote: "Fear was his currency.",
    magazineContent: {
      artImage: "https://i.imgur.com/p6mQsUv.jpg",
      narrative: `He centralized power through fear—a black cloak over national ambition…`
    }
  },
  {
    name: "Abdulsalami Abubakar",
    title: "Military Head of State",
    term: "1998–1999",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Abdulsalami_Abubakar.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Abdulsalami_Abubakar.jpg",
    highlights: [
      "Succeeded Abacha after his death",
      "Transitioned Nigeria back to civilian rule in 1999"
    ],
    quote: "Exit with dignity.",
    magazineContent: {
      artImage: "https://i.imgur.com/JQ6pM5N.jpg",
      narrative: `A transitional hand extended toward democracy after years in shadows…`
    }
  },
  {
    name: "Umaru Musa Yar'Adua",
    title: "President of Nigeria",
    term: "2007–2010",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Umaru_Yar%27Adua.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Umaru_Yar%27Adua.jpg",
    highlights: [
      "Elected president in Fourth Republic",
      "Died in office in 2010",
      "Advocated rule-of-law and anti-corruption"
    ],
    quote: "Let justice be done.",
    magazineContent: {
      artImage: "https://i.imgur.com/Lk0mW9x.jpg",
      narrative: `The quieter reformer, fighting illness while pushing for constitutional reforms…`
    }
  },
  {
    name: "Goodluck Jonathan",
    title: "President of Nigeria",
    term: "2010–2015",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Goodluck_Jonathan.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Goodluck_Jonathan.jpg",
    highlights: [
      "Succeeded Yar'Adua as vice-president",
      "Elected in his own right in 2011",
      "Lost 2015 election—first democratic transition to opposition party"
    ],
    quote: "Adversity defines leadership.",
    magazineContent: {
      artImage: "https://i.imgur.com/p6mQsUv.jpg",
      narrative: `From quiet deputy to headline-making transition…a presidency of crisis and calm…`
    }
  },
  {
    name: "Bola Ahmed Tinubu",
    title: "President of Nigeria",
    term: "2023–present",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Bola_Tinubu_2023.jpg",
    portraitImage: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Bola_Tinubu_2023.jpg",
    highlights: [
      "Elected in May 2023",
      "Former governor of Lagos State and political strategist",
      "Pioneered fuel subsidy removal and reform agendas"
    ],
    quote: "Vision without action is illusion.",
    magazineContent: {
      artImage: "https://i.imgur.com/JQ6pM5N.jpg",
      narrative: `A political kingmaker who claimed the crown…leading reform amid expectation and resistance…`
    }
  }
];

const ReliableImage = ({ src, alt, fallbackName, className, initial, animate, transition }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setLoaded(false);
  }, [src]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={alt}
          className={`w-full h-full object-cover ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setImgSrc('')}
        />
      ) : (
        <div className="w-full h-full bg-black flex items-center justify-center">
          <div className="text-white text-center p-4">
            <div className="text-4xl font-bold mb-2">
              {fallbackName.split(' ').map(n => n[0]).join('')}
            </div>
            <p className="text-sm opacity-80">{fallbackName}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
const HeadsOfState = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerHeight = container.clientHeight;
      const scrollPosition = container.scrollTop + (containerHeight / 2);
      const currentIndex = Math.floor(scrollPosition / containerHeight);
      setActiveIndex(currentIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleAudio = async () => {
      try {
        if (audioEnabled) {
          await audioElement.play();
        } else {
          audioElement.pause();
        }
      } catch (error) {
        console.error("Audio error:", error);
      }
    };

    handleAudio();

    return () => {
      audioElement.pause();
    };
  }, [audioEnabled]);

  if (showIntro) {
    return (
      <div className="bg-black text-white relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero-bg.jpg"
            alt="Heads of State Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-300">
              The First Dynasty
            </span>
          </motion.h1>
          <motion.p
            className="text-sm md:text-lg max-w-xl text-center text-[#e3d7b2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            A scroll-driven journey through the faces and fates of Nigeria's rulers — from Tafawa Balewa to Tinubu.
          </motion.p>
          <motion.button
            className="mt-10 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-8 py-3 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowIntro(false)}
          >
            Begin Timeline
          </motion.button>
          <motion.div 
            className="absolute bottom-8 text-neutral-400 text-xs animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Scroll to explore
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white relative w-full h-screen overflow-hidden">
      <audio ref={audioRef} loop src="/audio/ambient.mp3" />

      <button
        onClick={() => setAudioEnabled((prev) => !prev)}
        className="fixed top-4 right-4 z-50 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-4 py-2 rounded-full text-sm shadow-lg hover:shadow-xl transition-all"
        style={{ backdropFilter: 'blur(10px)' }}
      >
        {audioEnabled ? "🔇 Mute" : "🔊 Play Sound"}
      </button>

      <div
        ref={scrollContainerRef}
        className="scroll-container snap-y snap-mandatory scroll-smooth"
        style={{
          scrollSnapType: 'y mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Political Pen Intro Section */}
        <section className="h-screen w-full snap-start flex-shrink-0 bg-white text-gray-800 font-serif px-6 md:px-20 py-16 flex flex-col justify-center items-center">
          <img
            src="/assets/political-pen.jpg"
            alt="Symbolic Artifact"
            className="w-[700px] md:w-[400px] mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl text-lg md:text-xl leading-relaxed">
            <p className="text-justify">
              <span className="text-[3.8rem] md:text-[5rem] text-[#8B6C2D] font-bold float-left leading-none pr-4">W</span>
              hat happens when history is retold with a smirk? Heads of State fuses satire with fine art, exploring the untold stories and pivotal moments in Nigeria’s political history. From the mysterious final moments of MKO Abiola to Dele Giwa’s shocking assassination, and even the high-stakes political manoeuvring that shaped Nigeria’s democracy, each piece blends humour, symbolism, and brutal honesty.
<br /><span className="block mt-2" />This isn’t just art—it’s a visual reckoning. A mirror to power. A satire of history.
Beyond the Canvas: Art You Can Hold, Wear, and Collect
The Heads of State experience extends beyond the digital realm, bringing history into tangible forms: </p>
            <p className="text-justify">
            Each Heads of State exhibition will feature a live auction, 
            where collectors and art enthusiasts can own exclusive pieces from the collection. 
            Every artwork is a conversation—about where we’ve been, 
            where we are, and where we’re headed.
            <br /><span className='block mt-2' />

3D-printed life sculptures as limited-edition collectibles
<br /><span className='block mt-2' />
Neck pendants, fashion prints, and emblems, designed for those who want to carry a piece of history with them
<br /><span className='block mt-2' />
The unveiling of the custom-designed Nigerian Presidential Truck, a military-inspired masterpiece by LUVPOTION


            </p>
          </div>
        </section>

        {/* Leader Sections */}
        {leaders.map((leader, index) => (
          <React.Fragment key={index}>
            {/* Portrait + Key Facts */}
            <section className="h-screen w-full snap-start flex relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30 z-0" />
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
              
              <div className="w-1/2 h-full flex flex-col justify-center items-center p-8 md:p-12 border-r border-neutral-800 relative z-10">
  <ReliableImage
    src={leader.portraitImage || leader.image}
    alt={leader.name}
    fallbackName={leader.name}
    className="w-full max-w-md h-[500px] rounded-lg shadow-2xl mb-6 border-2 border-neutral-800"
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  />
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <span className="bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
                    {leader.name}
                  </span>
                </motion.h2>
              </div>

              <div className="w-1/2 h-full flex flex-col justify-center p-8 md:p-12 relative z-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div>
                    <p className="text-neutral-400 text-sm">Term in Office</p>
                    <p className="text-xl md:text-2xl text-rose-400">{leader.term}</p>
                  </div>

                  <div>
                    <p className="text-neutral-400 text-sm">Key Moments</p>
                    <ul className="mt-2 space-y-2">
                      {leader.highlights.map((item, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start text-sm md:text-base"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        >
                          <span className="text-rose-400 mr-2">•</span>
                          <span className="text-neutral-300">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-neutral-800">
                    <motion.p 
                      className="text-neutral-400 italic"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <span className="text-rose-400">"</span>
                      {leader.quote}
                      <span className="text-rose-400">"</span>
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Magazine Section */}
            <section className="h-screen w-full snap-start relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-0" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30 z-0" />

              <div className="relative z-10 h-full flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-6 md:p-12">
                <motion.div 
  className="relative group w-full max-w-2xl"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
>
  <ReliableImage
    src={leader.magazineContent.artImage}
    alt={`Artistic interpretation of ${leader.name}`}
    fallbackName={leader.name}
    className="w-full h-[400px] md:h-[500px] rounded-lg shadow-2xl border-2 border-neutral-800"
  />
</motion.div>
                </div>

                <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-center p-6 md:p-12 overflow-y-auto">
                  <motion.div
                    className="w-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    {leader.magazineContent.narrative.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-4 md:mb-6 text-neutral-300 leading-relaxed text-sm md:text-base">
                        {paragraph}
                      </p>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HeadsOfState;
