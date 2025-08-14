import React from 'react';
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";

const gradientThemes = {
  desert: {
    background: "from-yellow-900 via-yellow-700 to-amber-500",
    text: "text-yellow-100"
  },
  blacksteel: {
    background: "from-[#242629] via-[#242629] to-[#242629]-500",
    text: "text-gray-200"
  },
  fire: {
    background: "from-red-900 via-red-700 to-orange-500",
    text: "text-red-100"
  },
  forest: {
    background: "from-green-900 via-green-700 to-lime-500",
    text: "text-lime-100"
  }
};

const ReliableImage = ({ src, alt, fallbackName, className, initial, animate, transition, isMobile }) => {
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
          loading="lazy"
          className={`
            w-full h-full
            ${isMobile ? 'object-cover' : 'object-contain'}
            ${loaded ? 'opacity-100' : 'opacity-0'}
          `}
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [expandedNarratives, setExpandedNarratives] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const audioRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const openLightbox = (leader) => {
    setSelectedLeader(leader);
    setLightboxOpen(true);
  };

  const toggleNarrative = (index) => {
    setExpandedNarratives(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
  
        artImage: "/assets/exhibitions/tafawa-mobile.png", // Placeholder art
        mobileArtImage: "/assets/exhibitions/tafawa-mobile.png",
        chapterTitle: "THE STORM RIDER",
  
        narrative: `Prime Minister of Nigeria, 1957–1966 In the heat of a desert storm, our first Prime Minister, Sir Abubakar Tafawa Balewa, rides against the winds of an uncertain nation. A symbol of dignity and humility, he clutches Nigeria’s newborn destiny—two white horses, fierce and untamed, tethered to a coat of arms still learning its weight. In his other hand, an eagle perches with the promise of pride, but its wings are restless. This is no ordinary ride—it is a metaphor for a foundation not yet solid. Nigeria, freshly carved and already cracking under the pressure of ambition, expectation, and division, placed its hopes in Balewa’s calm hands. From 1957 until his tragic assassination in 1966, he steered a fragile federation with quiet conviction, threading unity through a rising tide of regionalism and unrest. But the storm was faster than resolve, and louder than the silent patience he carried. He was taken from us in the midst of a riddle we are still trying to solve. What did he die for? This piece does not offer an answer—it mourns the question. Through this painting, we immortalize a man who bore the weight of a fragmented future too soon. It is not just history—it is a haunting reflection of what it means to lead a nation still finding its voice, and a reminder of the price of carrying it alone.`
  
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
  
        artImage: "", // Placeholder art
        mobileArtImage: "",
        chapterTitle: "THE SCHOLAR PRESIDENT",
  
        theme: "forest",
  
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
  
        artImage: "",
        mobileArtImage: "/assets/exhibitions/ironsi-mobile.png",
        chapterTitle: "SILENCE BEFORE CHAOS",
  
        theme: "blacksteel",
  
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
  
        artImage: "/assets/exhibitions/gowon-mobile.png",
        mobileArtImage: "/assets/exhibitions/gowon-mobile.png",
        chapterTitle: "LOVE IN UNIFORM",
  
        theme: "forest",
  
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
  
        artImage: "/assets/exhibitions/murtala.jpg",
        chapterTitle: "SPEED IS INTEGRITY",
        mobileArtImage: "/assets/exhibitions/murtala-mobile.png",
  
        theme: "fire",
  
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
  
        artImage: "",
        mobileArtImage: "/assets/exhibitions/obasanjo-mobile.png",
        chapterTitle: "THE GOD FATHER",
  
        theme: "forest",
  
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
  
        artImage: "",
        mobileArtImage: "/assets/exhibitions/shehu-mobile.png",
        chapterTitle: "SHEHU SHAGARI",
  
        theme: "desert",
  
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
  
        artImage: "/assets/exhibitions/buhari-mobile.png",
        mobileArtImage: "/assets/exhibitions/buhari-mobile.png",
        chapterTitle: "A QUIET EXIT",
        theme: "blacksteel",
  
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
  
        artImage: "/assets/exhibitions/babangida.png",
        mobileArtImage: "/assets/exhibitions/babangida-mobile.png",
        chapterTitle: "BROTHERS AT THE BARREL",
        theme: "blacksteel",
  
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
  
        artImage: "",
        mobileArtImage: "/assets/exhibitions/ernest-mobile.png",
        chapterTitle: "CARETAKER IN A STORM",
        theme: "gray",
  
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
  
        artImage: "/assets/exhibitions/abacha-mobile.png",
        mobileArtImage: "/assets/exhibitions/abacha-mobile.png",
        chapterTitle: "APPLE OF POWER",
  
        theme: "blacksteel",
  
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
  
        artImage: "",
        chapterTitle: "EXIT WITH DIGNITY",
        mobileArtImage: "/assets/exhibitions/abdulsalami-mobile.png",
        theme: "forest",
  
        narrative: `A transitional hand extended toward democracy after years in shadows…`
  
      }
  
    },
  
  
  
    {
  
      name: "Olusegun Obasanjo",
  
      title: "President of Nigeria",
  
      term: "1999–2007",
  
      image: "...",
  
      portraitImage: "...",
  
      highlights: [
  
        "Returned as democratically elected president",
  
        "Led Nigeria into the Fourth Republic",
  
        "Served two full civilian terms"
  
      ],
  
      quote: "The general returned—with ballots, not bullets.",
  
      magazineContent: {
  
        artImage: "/assets/exhibitions/obansanjo-mobile.png",
        chapterTitle: "WHEN PEANUTS MET AGBADA",
        mobileArtImage: "/assets/exhibitions/obansanjo-mobile.png",
  
        theme: "forest",
  
        narrative: `From prison to presidency, he became the bridge between eras...`
  
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
  
        artImage: "",
        mobileArtImage: "/assets/exhibitions/yaradua-mobile.png",
        chapterTitle: "UMARU YAR'ADUA",
        theme: "desert",
  
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
  
        artImage: "/assets/exhibitions/goodluck-mobile.png",
        mobileArtImage: "/assets/exhibitions/goodluck-mobile.png",
        chapterTitle: "GOODLUCK, GLASS RAISED",
        theme: "forest",
  
        narrative: `From quiet deputy to headline-making transition…a presidency of crisis and calm…`
  
      }
  
    },
  
  
  
    {
  
      name: "Muhammadu Buhari",
  
      title: "President of Nigeria",
  
      term: "2015–2023",
  
      image: "...",
  
      portraitImage: "...",
  
      highlights: [
  
        "Won democratic elections after 3 failed attempts",
  
        "Led with anti-corruption and national security focus",
  
        "Oversaw major reforms including cashless economy"
  
      ],
  
      quote: "The general wore a suit, but the stance remained.",
  
      magazineContent: {
  
        artImage: "/assets/exhibitions/buhari-mobile.png",
        mobileArtImage: "/assets/exhibitions/buhari-mobile.png",
        chapterTitle: "A Quiet Exit",
     
        theme: "desert",
  
        narrative: `A return that split opinions—hope for some, déjà vu for others...`
  
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
  
        artImage: "",
        mobileArtImage: "/assets/exhibitions/tinubu-mobile.png",
        chapterTitle: "TAFAWA BALEWA — THE STORM RIDER",
        theme: "fire",
  
        narrative: `A political kingmaker who claimed the crown…leading reform amid expectation and resistance…`
  
      }
  
    }
  
  ];
  

  const themeKeys = Object.keys(gradientThemes);
  const backgroundTheme = themeKeys.length
    ? gradientThemes[themeKeys[activeIndex % themeKeys.length]]?.background
    : "from-neutral-900 via-neutral-800 to-black";

  if (showIntro) {
    return (
      <div className="min-h-screen bg-cover bg-center text-black dark:text-white" style={{ backgroundImage: "url('/assets/hero-background.jpg')" }}>
        <Header />
        <section className="pt-64 md:pt-[35vh] pb-20 px-6 md:px-16 max-w-6xl mx-auto text-center">
          <motion.h1 className="text-4xl md:text-7xl font-bold mb-6 font-display">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-300">
              The First Dynasty
            </span>
          </motion.h1>
          <motion.p className="max-w-2xl mx-auto text-base md:text-lg text-neutral-800 dark:text-neutral-300">
            A scroll-driven journey through the faces and fates of Nigeria's rulers — from Tafawa Balewa to Tinubu.
          </motion.p>
          <motion.button
            onClick={() => setShowIntro(false)}
            className="mt-8 inline-flex items-center gap-2 border border-black dark:border-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
          >
            <span>Begin Timeline</span>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.75.75 0 0 1 .75-.75h11.19L10.22 4.28a.75.75 0 1 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06l2.72-2.72H1.75A.75.75 0 0 1 1 8Z" />
            </svg>
          </motion.button>
        </section>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-screen text-white bg-gradient-to-b ${backgroundTheme}`}>
      <audio ref={audioRef} loop src="/audio/ambient.mp3" />

      {/* Audio Bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-transparent text-white flex items-center justify-center px-4 py-3 gap-4 border-b border-white/10">
        <div className="text-left">
          <div className="text-sm font-semibold">THE HOS</div>
          <div className="text-xs text-white/50">SEASON 1</div>
        </div>
        <div className="flex-1 h-[6px] bg-white/10 rounded-full overflow-hidden max-w-sm">
          <div
            className={`h-full bg-white transition-all duration-300 ${audioEnabled ? 'w-3/4' : 'w-0'}`}
          ></div>
        </div>
        <button
          onClick={() => setAudioEnabled(p => !p)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white hover:bg-white/20 transition"
          aria-label="Toggle audio"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            {audioEnabled ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 5v14l11-7L8 5z" />
            )}
          </svg>
        </button>
      </div>

      {/* Lightbox Modal with Video */}
      {lightboxOpen && selectedLeader && (
        <div className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-[80vh] p-4">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-amber-400 transition z-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
              </svg>
            </button>
            <video
              src={`/videos/${selectedLeader.name.replace(/\s+/g, '').toLowerCase()}.mp4`}
              className="w-full h-full object-cover rounded-lg"
              controls
              autoPlay
            ></video>
          </div>
        </div>
      )}

      <div
        ref={scrollContainerRef}
        className="scroll-container snap-y snap-mandatory h-full overflow-y-scroll scroll-smooth"
      >
        {/* Political Pen Intro Section */}
        <section className="min-h-screen w-full snap-start flex-shrink-0 text-gray-800 dark:text-neutral-200 font-sans bg-white dark:bg-[#111] pt-24 md:pt-24 px-4 sm:px-3 md:px-20 flex flex-col justify-center items-center">
          <div className="flex flex-col grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl px-2 md:px-4 text-base md:text-lg leading-nodge tracking-normal text-neutral-800 dark:text-neutral-200">
            <div>
              <p className="text-justify first-letter:text-[3.8rem] first-letter:md:text-[5rem] first-letter:font-bold first-letter:float-left first-letter:leading-none first-letter:pr-4 first-letter:text-[#8B6C2D]">
                What happens when history is retold with a smirk? Heads of State fuses satire with fine art, exploring the untold stories and pivotal moments in Nigeria's political history.
              </p>
              <p className="text-justify mt-2">
                From the mysterious final moments of MKO Abiola to Dele Giwa's shocking assassination, and even the high-stakes political manoeuvring that shaped Nigeria's democracy, each piece blends humour, symbolism, and brutal honesty.
              </p>
              <p className="text-justify mt-2 font-semibold">
                This isn't just art—it's a visual reckoning. A mirror to power. A satire of history.
              </p>
              <p className="text-justify mt-2 font-bold text-lg">
                Beyond the Canvas: Art You Can Hold, Wear, and Collect
              </p>
              <p className="text-justify mt-2">
                The Heads of State experience extends beyond the digital realm, bringing history into tangible forms:
              </p>
            </div>

            <div>
              <p className="text-justify">
                Each Heads of State exhibition will feature a live auction,
                where collectors and art enthusiasts can own exclusive pieces from the collection.
                Every artwork is a conversation—about where we've been,
                where we are, and where we're headed.
              </p>
              <ul className="list-disc list-inside mt-2 space-y-3">
                <li>3D-printed life sculptures as limited-edition collectibles</li>
                <li>Neck pendants, fashion prints, and emblems, designed for those who want to carry a piece of history with them</li>
                <li>The unveiling of the custom-designed Nigerian Presidential Truck, a military-inspired masterpiece by LUVPOTION</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Leader Sections */}
        {leaders.map((leader, index) => (
          <React.Fragment key={index}>
            {/* Portrait + Key Facts */}
            <section
              className="h-screen w-full snap-start flex flex-col md:flex-row relative overflow-hidden"
              style={{
                backgroundImage: `url(${leader.portraitImage || leader.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/30 z-0" />
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />

              <div className="relative z-10 w-full h-full flex flex-col justify-center p-8 md:p-12 backdrop-blur-sm bg-black/60">
                <motion.h2
                  className="text-3xl md:text-5xl font-bold mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <span className="bg-gradient-to-r bg-clip-text text-white">
                    {leader.name}
                  </span>
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div>
                    <p className="text-neutral-400 text-sm">Term in Office</p>
                    <p className="text-xl md:text-2xl text-white">{leader.term}</p>
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
                          <span className="text-white mr-2">•</span>
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
                      <span className="text-white">"</span>
                      {leader.quote}
                      <span className="text-white">"</span>
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Magazine Section */}
            {(() => {
              const theme = leader.magazineContent.theme || 'blacksteel';
              const gradient = gradientThemes[theme] || gradientThemes['blacksteel'];
              const hasArt = leader.magazineContent.artImage && leader.magazineContent.artImage !== "";
              const fullText = leader.magazineContent.narrative?.trim() || "";
              const excerptText = isMobile
                ? fullText.slice(0, 63) + (fullText.length > 63 ? "..." : "")
                : fullText.slice(0, 580) + (fullText.length > 580 ? "..." : "");
              const isExpanded = expandedNarratives[index];
              const chapterTitle = leader.magazineContent.chapterTitle || `${leader.name}'s Reflection`;

              return (
                <section className={`h-screen w-full snap-start relative bg-gradient-to-br ${gradient.background}`}>
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-0" />
                  <div className="absolute inset-0 bg-black/40 z-0" />

                  <div className="relative z-10 h-full flex flex-col md:flex-row items-center p-4 md:p-12 gap-0 md:gap-8 transition-all duration-700">
                    {/* Art Section */}
                    <motion.div
                      className={`transition-all duration-700 ${
                        isExpanded && !isMobile ? 'hidden' : 'md:w-[70%]'
                      } w-full h-[70%] md:h-full mt-12 flex items-center justify-center`}
                    >
                      <div className="w-full max-w-[1080px] h-full aspect-[4/5] relative group md:mx-auto">
                        <div
                          className="relative h-full cursor-zoom-in md:cursor-default"
                          onClick={() => {
                            if (window.innerWidth < 768) {
                              const full = leader.magazineContent.artImage;
                              const newWindow = window.open(full, "_blank");
                              if (newWindow) newWindow.focus();
                            }
                          }}
                        >
                        {!hasArt ? (
  <div className={`relative w-full h-[95%] bg-[url('/assets/exhibitions/military-placeholder.jpg')] bg-cover bg-center rounded-lg shadow-2xl border border-neutral-800`}>
    <div className="absolute inset-0 bg-black/80 text-white flex flex-col items-center justify-center text-center rounded-lg z-10">
      <div className="text-4xl mb-2">🔒</div>
      <div className="text-lg font-semibold">Coming Soon</div>
      <p className="text-sm text-white/70 mt-1 px-4">
        The art and story for {leader.name} will be revealed soon.
      </p>
    </div>
  </div>
) : (
<div className="relative w-full h-[95%] max-w-[1080px] aspect-[4/5] cursor-pointer mx-auto">
  <div className="w-full h-full mt-4">
    <ReliableImage
      src={isMobile && leader.magazineContent.mobileArtImage 
           ? leader.magazineContent.mobileArtImage 
           : leader.magazineContent.artImage}
      alt={`Art of ${leader.name}`}
      fallbackName={leader.name}
      className="w-full h-full"
      isMobile={isMobile}
    />
  </div>

  {/* Price - shown on all devices */}
  <div className="absolute top-6 left-4 z-10 text-white  px-2 py-0 rounded-md text-xs font-medium backdrop-blur-sm">
    ₦345,000
  </div>

  {/* Viewers count - shown on all devices */}
  <div className="absolute top-6 right-4 z-10 text-white px-2 py-0.5 rounded-full text-[10px] font-semibold backdrop-blur-sm">
    23 people viewing
  </div>

  {/* Chapter title - only shown on mobile */}
  {isMobile && (
    <div className="absolute bottom-8 left-4 z-10 bg-black/70 px-3 py-1 rounded-md text-xs text-white font-medium">
      {leader.magazineContent.chapterTitle}
    </div>
  )}

  {/* Shop button */}
  <div className="absolute bottom-8 right-4 z-10">
    {isMobile ? (
      <a 
        href={`/drop/${leader.name.toLowerCase().replace(/\s+/g, '-')}`}
        onClick={(e) => e.stopPropagation()}
        className="p-2 bg-black/90 rounded-full flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
      </a>
    ) : (
      <a
        href={`/drop/${leader.name.toLowerCase().replace(/\s+/g, '-')}`}
        className="px-3 py-1 text-white text-[10px] font-bold uppercase rounded shadow hover:scale-105 transition backdrop-blur-sm"
      >
        Go to Shop
      </a>
    )}
  </div>

  <button
    onClick={(e) => {
      e.stopPropagation();
      openLightbox(leader);
    }}
    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/70 rounded-full flex items-center justify-center hover:bg-black/90 transition"
    aria-label="Play video"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
    </svg>
  </button>
</div>
)}
                        </div>
                      </div>
                    </motion.div>

                    {/* Book Spine Divider */}
                    {!isExpanded && (
                      <div className="hidden md:flex transition-all duration-700 h-[80%] w-[3px] rounded-full bg-gradient-to-b from-white/10 via-white/40 to-white/10 mx-2" />
                    )}

                    {/* Narrative (Excerpt View) */}
                    {!isExpanded && !isMobile && (
                      <motion.div 
                        className="transition-all duration-700 ease-in-out md:w-[40%] w-full h-[30%] md:h-full flex items-center justify-center pt-2 md:pt-0"
                        animate={{ scale: 1 }}
                      >
                        <motion.div className="w-full h-[380px] text-white overflow-hidden p-6 bg-black/60 backdrop-blur-md max-h-[500px]">
                          <div className="flex flex-col h-full">
                            <h3 className="text-xl font-serif font-bold mb-4 text-White">
                              {chapterTitle}
                            </h3>
                            <p className="mb-5 text-[15px] leading-[1.9rem] font-light tracking-wide first-letter:text-2xl first-letter:font-semibold line-clamp-6 overflow-hidden">
                              {excerptText}
                            </p>
                            <div className="mt-auto pt-4">
                              <button
                                onClick={() => toggleNarrative(index)}
                                className="px-4 py-2 bg-white text-black text-xs font-semibold rounded-md hover:opacity-90 transition-all"
                              >
                                📖 Read Full Narrative
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Full Narrative (Expanded View) */}
                    {!isMobile && isExpanded && (
                      <motion.div
                        className="absolute inset-0 z-50 bg-black/90 backdrop-blur-lg p-10 md:p-20 overflow-y-auto text-white cursor-pointer"
                        initial={{ opacity: 0, x: 300, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 300, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        onClick={() => toggleNarrative(index)}
                      >
                        <div className="max-w-4xl mx-auto">
                          <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-white">
                            {chapterTitle}
                          </h3>
                          {fullText.split('\n\n').map((para, i) => (
                            <p key={i} className="mb-6 text-[15px] leading-[1.9rem] font-light tracking-wide first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:pr-2 first-letter:leading-[2.5rem]">
                              {para}
                            </p>
                          ))}
                          <div className="text-right text-white/40 text-xs mt-10">Click anywhere to close</div>
                        </div>
                      </motion.div>
                    )}

                    {/* Full Narrative (Mobile) */}
                    {isMobile && (
                      <div className={`bg-black/60 backdrop-blur-sm mt-2 text-sm text-white w-full min-h-fit rounded-xl p-4 cursor-pointer overflow-y-auto ${isExpanded ? 'absolute inset-0 z-20 bg-black/90' : ''}`}
                        onClick={() => toggleNarrative(index)}
                      >
                        {isExpanded ? (
                          <>
                            <h3 className="text-xl mt-12 font-serif font-bold mb-4 text-white">
                              {chapterTitle}
                            </h3>
                            {fullText.split('\n\n').map((para, i) => (
                              <p key={i} className="mb-3 text-sm first-letter:text-2xl first-letter:font-bold first-letter:float-left first-letter:pr-2 first-letter:leading-[2.2rem]">
                                {para}
                              </p>
                            ))}
                          </>
                        ) : (
                          <p>
                          {excerptText}
                          <span className="block mt-2 text-xs italic text-white/50">📖 Tap to read</span>
                        </p>
                        )}
                      </div>
                    )}
                  </div>
                </section>
              );
            })()}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HeadsOfState;