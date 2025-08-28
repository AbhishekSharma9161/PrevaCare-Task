import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Feature {
  id: number;
  title: string;
  description: string;
  details: string[];
  gradient: string;
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
                      <div className="pt-16 pb-8 px-6 h-full relative z-10 flex flex-col justify-start items-center">
                        <div className="text-white">
                          <div className="text-xs font-medium mb-2 opacity-80">
                            Feature No.{currentFeature.id}
                          </div>
                          <h3 className="text-lg font-bold leading-tight">
                            {currentFeature.title}
                          </h3>
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
