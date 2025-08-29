import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Thumb {
  src: string;
  label: string;
}

interface Feature {
  id: number;
  title: string;
  description: string;
  details: string[];
  gradient: string;
  thumbs: Thumb[];
}

function makeThumb(label: string, from: string, to: string) {
  const svg = `<?xml version='1.0' encoding='UTF-8'?>
  <svg xmlns='http://www.w3.org/2000/svg' width='320' height='200' viewBox='0 0 320 200'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='${from}'/>
        <stop offset='100%' stop-color='${to}'/>
      </linearGradient>
    </defs>
    <rect x='0' y='0' width='320' height='200' rx='24' fill='url(#g)'/>
    <circle cx='260' cy='40' r='20' fill='rgba(255,255,255,0.25)'/>
    <circle cx='280' cy='60' r='10' fill='rgba(255,255,255,0.35)'/>
    <text x='24' y='120' font-family='Inter, Arial, sans-serif' font-size='40' font-weight='700' fill='white'>${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function gradientToColors(gradient: string): [string, string] {
  if (gradient.includes('emerald')) return ['#10b981', '#06b6d4'];
  if (gradient.includes('orange')) return ['#f97316', '#ef4444'];
  if (gradient.includes('violet')) return ['#8b5cf6', '#d946ef'];
  if (gradient.includes('blue') && gradient.includes('indigo')) return ['#3b82f6', '#8b5cf6'];
  return ['#ec4899', '#6366f1'];
}

const features: Feature[] = [
  {
    id: 1,
    title: "TEXT HEADING DISPLAY",
    description: "Advanced typography and text rendering",
    details: [
      "Dynamic font loading with web font optimization for better performance",
      "Advanced text styling with custom typography scales and spacing",
      "Multi-language support with proper character rendering and RTL layouts",
      "Responsive text sizing that adapts perfectly to all screen sizes",
      "Accessibility-focused text contrast and readability optimization",
      "Custom font fallbacks and graceful degradation for older browsers",
    ],
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    thumbs: [
      { src: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=640&q=80&auto=format&fit=crop", label: "Adaptive Typography" },
      { src: "https://images.unsplash.com/photo-1529078155058-5d716f45d604?w=640&q=80&auto=format&fit=crop", label: "Kerning & Spacing" },
      { src: "https://images.unsplash.com/photo-1554331544-16b6e8c7b155?w=640&q=80&auto=format&fit=crop", label: "RTL Support" },
      { src: "https://images.unsplash.com/photo-1526244434298-88fcbcb82372?w=640&q=80&auto=format&fit=crop", label: "Font System" },
    ],
  },
  {
    id: 2,
    title: "RESPONSIVE DESIGN",
    description: "Seamless experience across all devices",
    details: [
      "Fluid grid systems that adapt seamlessly to any screen size",
      "Touch-friendly interfaces optimized for mobile and tablet interactions",
      "Flexible layouts that maintain visual hierarchy across all devices",
      "Consistent user experience with adaptive navigation patterns",
      "Performance optimized for various device capabilities and connection speeds",
      "Progressive enhancement ensuring functionality on all browsers",
    ],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    thumbs: [
      { src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=640&q=80&auto=format&fit=crop", label: "Fluid Grid" },
      { src: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=640&q=80&auto=format&fit=crop", label: "Touch Targets" },
      { src: "https://images.unsplash.com/photo-1551281044-8d8e95aaaa0e?w=640&q=80&auto=format&fit=crop", label: "Auto Layout" },
      { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&q=80&auto=format&fit=crop", label: "Breakpoints" },
    ],
  },
  {
    id: 3,
    title: "INTERACTIVE ELEMENTS",
    description: "Engaging user interface components",
    details: [
      "Smooth animations and carefully crafted micro-interactions",
      "Real-time feedback systems for immediate user action responses",
      "Intuitive navigation patterns with gesture-based controls",
      "Dynamic content updates without requiring page reloads",
      "Accessible interactive components designed for all users",
      "Hardware-accelerated animations for buttery smooth performance",
    ],
    gradient: "from-orange-500 via-red-500 to-pink-500",
    thumbs: [
      { src: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=640&q=80&auto=format&fit=crop", label: "Animations" },
      { src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=640&q=80&auto=format&fit=crop", label: "Real-time" },
      { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=640&q=80&auto=format&fit=crop", label: "Gestures" },
      { src: "https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=640&q=80&auto=format&fit=crop", label: "Intuitive UX" },
    ],
  },
  {
    id: 4,
    title: "PERFORMANCE OPTIMIZATION",
    description: "Lightning-fast loading and smooth interactions",
    details: [
      "Code splitting and lazy loading for optimized bundle sizes",
      "Intelligent caching strategies with service worker implementation",
      "Efficient state management with optimized React rendering patterns",
      "Image optimization with next-gen formats and responsive loading",
      "Database query optimization with intelligent data fetching",
      "Memory management and cleanup for long-running applications",
    ],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    thumbs: [
      { src: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=640&q=80&auto=format&fit=crop", label: "Code Split" },
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&q=80&auto=format&fit=crop", label: "Caching" },
      { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=640&q=80&auto=format&fit=crop", label: "Lazy Load" },
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=640&q=80&auto=format&fit=crop", label: "Fast" },
    ],
  },
  {
    id: 5,
    title: "ACCESSIBILITY FEATURES",
    description: "Inclusive design for everyone",
    details: [
      "Screen reader compatibility with comprehensive ARIA label implementation",
      "Full keyboard navigation support throughout the entire application",
      "High contrast mode with customizable color themes for better visibility",
      "Intelligent focus management with proper tab order and focus indicators",
      "Semantic HTML structure optimized for SEO and assistive technologies",
      "WCAG 2.1 AA compliance with regular accessibility auditing and testing",
    ],
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    thumbs: [
      { src: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=640&q=80&auto=format&fit=crop", label: "WCAG" },
      { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=640&q=80&auto=format&fit=crop", label: "Keyboard" },
      { src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=640&q=80&auto=format&fit=crop", label: "Screen Readers" },
      { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=640&q=80&auto=format&fit=crop", label: "High Contrast" },
    ],
  },
];

export default function Index() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-advance features on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      setIsScrolling(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Calculate scroll progress
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrollTop / (docHeight - windowHeight);

      // Map scroll progress to features (0-1 maps to 0-4 features)
      const featureIndex = Math.min(
        Math.floor(scrollPercent * features.length * 1.2), // Slightly faster progression
        features.length - 1,
      );

      if (featureIndex !== activeFeature) {
        setActiveFeature(featureIndex);
      }

      // Reset scrolling state after scroll ends
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [activeFeature]);

  const nextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  const currentFeature = features[activeFeature];

  return (
    <div ref={containerRef} className="min-h-[300vh] bg-gray-50">
      <div className="sticky top-0 h-screen flex items-center justify-center p-1 sm:p-2 md:p-4 lg:p-6 xl:p-8">
        <div className="w-full max-w-[95rem] mx-auto">
          <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-6 xl:gap-8 items-center">
            {/* Left Column - Enhanced Text Styling and Fixed Arrows */}
            <div className="order-1 col-span-1">
              <div className="space-y-2 sm:space-y-4 lg:space-y-6">
                {/* Enhanced Text Section */}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <div>
                    <div className="text-[10px] sm:text-xs font-semibold text-blue-600 mb-1 tracking-wide uppercase">
                      Feature No.{currentFeature.id} -
                    </div>
                    <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 leading-tight tracking-tight">
                      {currentFeature.title}
                    </h1>
                    <ul className="space-y-1 sm:space-y-2 lg:space-y-3 text-gray-700">
                      {currentFeature.details
                        .slice(0, 4)
                        .map((detail, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-1 sm:gap-2"
                          >
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-500 rounded-full mt-1 sm:mt-1.5 flex-shrink-0"></div>
                            <span className="text-[10px] sm:text-xs md:text-sm leading-tight font-medium">
                              {detail}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>

                {/* Fixed Navigation Arrows */}
                <div className="flex items-center justify-start gap-2 sm:gap-3 pt-2 sm:pt-3">
                  <button
                    onClick={prevFeature}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex-shrink-0"
                    aria-label="Previous feature"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextFeature}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex-shrink-0"
                    aria-label="Next feature"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Center Column - Perfect iPhone Design matching reference */}
            <div className="order-2 col-span-1 flex justify-center">
              <div className="relative transform scale-[0.4] sm:scale-[0.6] md:scale-75 lg:scale-85 xl:scale-95">
                {/* iPhone Frame - Exact replica of reference image */}
                <div className="relative w-[288px] h-[588px] bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-[48px] shadow-2xl">
                  {/* Metallic shine effect on frame */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/30 rounded-[48px]"></div>

                  {/* Screen bezel - thicker darker border */}
                  <div className="absolute inset-[4px] bg-black rounded-[44px]">
                    {/* Screen area with notch cutout */}
                    <div
                      className={`absolute inset-[3px] bg-gradient-to-br ${currentFeature.gradient} rounded-[41px] overflow-hidden transition-all duration-700 ease-in-out flex flex-col`}
                    >
                      {/* iPhone Notch - thinner height */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black rounded-b-2xl">
                        {/* Speaker */}
                        <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gray-700 rounded-full"></div>
                        {/* Front camera - lighter/less black */}
                        <div className="absolute top-1.5 right-4 w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      </div>

                      {/* Screen reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent rounded-[43px]"></div>

                      {/* Content area */}
                      <div className="pt-16 pb-4 px-4 h-full relative z-10 flex flex-col justify-start items-center">
                        <div className="text-white w-full">
                          <div className="text-xs font-medium mb-2 opacity-80">
                            Feature No.{currentFeature.id}
                          </div>
                          <h3 className="text-lg font-bold leading-tight">
                            {currentFeature.title}
                          </h3>
                        </div>

                        {/* Dynamic thumbnails */}
                        <div className="mt-4 grid grid-cols-2 gap-3 w-full">
                          {currentFeature.thumbs.map((thumb, i) => (
                            <div key={i} className="bg-white/10 rounded-xl p-1 backdrop-blur-sm ring-1 ring-white/20">
                              <img loading="lazy" src={thumb.src} alt={thumb.label} className="w-full h-24 object-cover rounded-md shadow-md" onError={(e)=>{ const [from,to]=gradientToColors(currentFeature.gradient); e.currentTarget.src = makeThumb(thumb.label, from, to); }} />
                              <div className="text-[10px] text-white/95 mt-1 text-center truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                                {thumb.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Home indicator */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full"></div>
                    </div>
                  </div>

                  {/* Additional frame shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-[48px] transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Right Column - Feature Showcase List */}
            <div className="order-3 col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-2 sm:p-3 md:p-4 lg:p-6 shadow-sm">
                <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                  Feature Showcase
                </h3>

                <div className="space-y-1">
                  {features.map((feature, index) => (
                    <button
                      key={feature.id}
                      onClick={() => setActiveFeature(index)}
                      className={`w-full text-left p-1.5 sm:p-2 md:p-3 rounded-md transition-all duration-200 ${
                        activeFeature === index
                          ? "bg-blue-50 border border-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div
                          className={`w-0.5 sm:w-1 h-4 sm:h-6 md:h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                            activeFeature === index
                              ? "bg-blue-500"
                              : "bg-gray-200"
                          }`}
                        ></div>
                        <div className="min-w-0 flex-1">
                          <div
                            className={`font-semibold text-[10px] sm:text-xs md:text-sm transition-colors ${
                              activeFeature === index
                                ? "text-blue-600"
                                : "text-gray-900"
                            }`}
                          >
                            Feature {feature.id}
                          </div>
                          <div className="text-[8px] sm:text-xs text-gray-500 truncate mt-0.5">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
