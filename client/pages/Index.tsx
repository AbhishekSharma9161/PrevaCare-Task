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
      "Custom font fallbacks and graceful degradation for older browsers"
    ],
    gradient: "from-pink-500 via-purple-500 to-indigo-500"
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
      "Progressive enhancement ensuring functionality on all browsers"
    ],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500"
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
      "Hardware-accelerated animations for buttery smooth performance"
    ],
    gradient: "from-orange-500 via-red-500 to-pink-500"
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
      "Memory management and cleanup for long-running applications"
    ],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500"
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
      "WCAG 2.1 AA compliance with regular accessibility auditing and testing"
    ],
    gradient: "from-blue-500 via-indigo-500 to-purple-500"
  }
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
        features.length - 1
      );
      
      if (featureIndex !== activeFeature) {
        setActiveFeature(featureIndex);
      }
      
      // Reset scrolling state after scroll ends
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      <div className="sticky top-0 h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Heading, Body Text, and Fixed Arrows */}
            <div className="order-2 lg:order-1">
              <div className="min-h-[400px] flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <div className="text-sm font-medium text-blue-500 mb-2">
                      Feature No.{currentFeature.id} -
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                      {currentFeature.title}
                    </h1>
                    <ul className="space-y-3 text-gray-600">
                      {currentFeature.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Fixed Navigation Arrows */}
                <div className="flex items-center gap-4 pt-6">
                  <button
                    onClick={prevFeature}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors flex-shrink-0"
                    aria-label="Previous feature"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={nextFeature}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors flex-shrink-0"
                    aria-label="Next feature"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Center Column - Enhanced iPhone Design */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                {/* iPhone outer frame with enhanced styling */}
                <div className="relative w-72 h-[580px] bg-gradient-to-b from-gray-800 to-black rounded-[3rem] p-1 shadow-2xl">
                  {/* Inner frame for more realistic depth */}
                  <div className="w-full h-full bg-black rounded-[2.8rem] p-1">
                    {/* Screen area */}
                    <div className={`w-full h-full bg-gradient-to-br ${currentFeature.gradient} rounded-[2.5rem] relative overflow-hidden transition-all duration-700 ease-in-out`}>
                      
                      {/* Enhanced iPhone camera area (not notch) */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                        {/* Speaker */}
                        <div className="w-12 h-1 bg-black/40 rounded-full"></div>
                        {/* Front camera */}
                        <div className="w-3 h-3 bg-black/60 rounded-full border border-black/20"></div>
                      </div>
                      
                      {/* Screen reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2.5rem]"></div>
                      
                      {/* Content area */}
                      <div className="pt-16 pb-8 px-6 h-full">
                        <div className="text-white">
                          <div className="text-xs font-medium mb-2 opacity-80">
                            Feature No.{currentFeature.id}
                          </div>
                          <h3 className="text-lg font-bold mb-4 leading-tight">
                            {currentFeature.title}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Home indicator */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced reflection/shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-[3rem] pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Right Column - Feature Showcase List */}
            <div className="order-3 lg:order-3">
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Feature Showcase
                </h3>
                
                <div className="space-y-1">
                  {features.map((feature, index) => (
                    <button
                      key={feature.id}
                      onClick={() => setActiveFeature(index)}
                      className={`w-full text-left p-3 rounded transition-all duration-200 ${
                        activeFeature === index
                          ? 'bg-blue-50 border border-blue-100'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-8 rounded-full transition-all duration-300 ${
                          activeFeature === index ? 'bg-blue-500' : 'bg-gray-200'
                        }`}></div>
                        <div className="min-w-0 flex-1">
                          <div className={`font-medium text-sm transition-colors ${
                            activeFeature === index ? 'text-blue-600' : 'text-gray-900'
                          }`}>
                            Feature {feature.id}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
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
