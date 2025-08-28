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
    description: "Advanced typography and text rendering capabilities",
    details: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod",
      "Ut enim minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
      "Et harum quidem rerum facilis est et expedita distinctio"
    ],
    gradient: "from-pink-500 via-purple-500 to-indigo-500"
  },
  {
    id: 2,
    title: "RESPONSIVE DESIGN",
    description: "Seamless experience across all devices",
    details: [
      "Fluid grid systems that adapt to any screen size",
      "Touch-friendly interfaces optimized for mobile devices", 
      "Flexible layouts that work on desktop, tablet, and phone",
      "Consistent user experience across all platforms",
      "Performance optimized for various device capabilities",
      "Progressive enhancement for better accessibility"
    ],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500"
  },
  {
    id: 3,
    title: "INTERACTIVE ELEMENTS",
    description: "Engaging user interface components",
    details: [
      "Smooth animations and micro-interactions",
      "Real-time feedback for user actions",
      "Intuitive navigation and gesture controls",
      "Dynamic content updates without page reload",
      "Accessible interactive components for all users",
      "Performance optimized animations and transitions"
    ],
    gradient: "from-orange-500 via-red-500 to-pink-500"
  },
  {
    id: 4,
    title: "PERFORMANCE OPTIMIZATION",
    description: "Lightning-fast loading and smooth interactions",
    details: [
      "Optimized bundle sizes for faster initial load",
      "Lazy loading for improved performance",
      "Efficient state management and data flow",
      "Minimized re-renders and optimal React patterns",
      "Progressive loading and caching strategies",
      "Hardware acceleration for smooth animations"
    ],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500"
  },
  {
    id: 5,
    title: "ACCESSIBILITY FEATURES",
    description: "Inclusive design for everyone",
    details: [
      "Screen reader compatible with ARIA labels",
      "Keyboard navigation support throughout",
      "High contrast mode for better visibility",
      "Focus management for improved usability",
      "Semantic HTML structure for better SEO",
      "Compliance with WCAG accessibility guidelines"
    ],
    gradient: "from-blue-500 via-indigo-500 to-purple-500"
  }
];

export default function Index() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle scroll-based auto-advance
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is sticky (in view)
      const inView = rect.top <= 0 && rect.bottom >= windowHeight;
      setIsSticky(inView);
      
      if (inView) {
        // Calculate scroll progress within the section
        const scrollProgress = Math.abs(rect.top) / (rect.height - windowHeight);
        const newFeatureIndex = Math.min(
          Math.floor(scrollProgress * features.length),
          features.length - 1
        );
        
        if (newFeatureIndex !== activeFeature) {
          setActiveFeature(newFeatureIndex);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeFeature]);

  // Setup intersection observer for sticky behavior
  useEffect(() => {
    if (!sectionRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSticky(true);
          } else {
            setIsSticky(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    observerRef.current.observe(sectionRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const nextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  const currentFeature = features[activeFeature];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Feature Showcase
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Interactive demonstration of advanced functionality
          </p>
        </div>
      </div>

      {/* Feature Showcase Section */}
      <div 
        ref={sectionRef}
        className={`min-h-[500vh] bg-white ${isSticky ? 'relative' : ''}`}
      >
        <div className={`${isSticky ? 'sticky top-0' : ''} h-screen flex items-center justify-center px-4 md:px-8 lg:px-16`}>
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Left Side - iPhone Mockup and Content */}
              <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start">
                <div className="relative mb-6 lg:mb-8">
                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-4 mb-8">
                    <button
                      onClick={prevFeature}
                      className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors"
                      aria-label="Previous feature"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>
                    <button
                      onClick={nextFeature}
                      className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors"
                      aria-label="Next feature"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>

                  {/* iPhone Mockup */}
                  <div className="relative">
                    <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
                      <div className={`w-full h-full bg-gradient-to-br ${currentFeature.gradient} rounded-[2.5rem] relative overflow-hidden`}>
                        {/* iPhone notch */}
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full"></div>
                        
                        {/* Content area */}
                        <div className="pt-16 pb-8 px-6 h-full flex flex-col justify-center">
                          <div className="text-white space-y-4">
                            <div className="text-xs font-medium opacity-80">
                              Feature No.{currentFeature.id}
                            </div>
                            <h3 className="text-lg font-bold leading-tight">
                              {currentFeature.title}
                            </h3>
                            <div className="space-y-2 text-sm opacity-90">
                              {currentFeature.details.slice(0, 4).map((detail, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{detail}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature Description */}
                <div className="text-center lg:text-left max-w-md">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {currentFeature.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {currentFeature.description}
                  </p>
                </div>
              </div>

              {/* Right Side - Feature List */}
              <div className="order-1 lg:order-2">
                <div className="bg-gray-50 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Feature Showcase
                  </h3>
                  
                  <div className="space-y-4">
                    {features.map((feature, index) => (
                      <button
                        key={feature.id}
                        onClick={() => setActiveFeature(index)}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                          activeFeature === index
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-8 rounded-full transition-colors ${
                            activeFeature === index ? 'bg-white' : 'bg-blue-500'
                          }`}></div>
                          <div>
                            <div className="font-medium">
                              Feature {feature.id}
                            </div>
                            <div className={`text-sm ${
                              activeFeature === index ? 'text-blue-100' : 'text-gray-500'
                            }`}>
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

      {/* Footer Section */}
      <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Experience
          </h2>
          <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto">
            These features in your next project?
          </p>
        </div>
      </div>
    </div>
  );
}
