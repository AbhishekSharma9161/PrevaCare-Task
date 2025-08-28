import { useState } from "react";
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
    description: "Lorem ipsum dolor",
    details: [
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod",
      "Ut enim minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium",
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore",
      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt"
    ],
    gradient: "from-pink-500 via-purple-500 to-indigo-500"
  },
  {
    id: 2,
    title: "RESPONSIVE DESIGN",
    description: "Lorem ipsum dolor",
    details: [
      "Fluid grid systems that adapt to any screen size seamlessly",
      "Touch-friendly interfaces optimized for mobile devices", 
      "Flexible layouts that work perfectly on desktop, tablet, and phone",
      "Consistent user experience maintained across all platforms",
      "Performance optimized for various device capabilities and speeds",
      "Progressive enhancement strategy for better accessibility compliance"
    ],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500"
  },
  {
    id: 3,
    title: "INTERACTIVE ELEMENTS",
    description: "Lorem ipsum dolor",
    details: [
      "Smooth animations and carefully crafted micro-interactions",
      "Real-time feedback system for immediate user action responses",
      "Intuitive navigation patterns and gesture-based controls",
      "Dynamic content updates without requiring page reload",
      "Accessible interactive components designed for all users",
      "Performance optimized animations with hardware acceleration"
    ],
    gradient: "from-orange-500 via-red-500 to-pink-500"
  },
  {
    id: 4,
    title: "PERFORMANCE OPTIMIZATION",
    description: "Lorem ipsum dolor",
    details: [
      "Optimized bundle sizes for lightning-fast initial load times",
      "Intelligent lazy loading strategies for improved performance",
      "Efficient state management and optimized data flow patterns",
      "Minimized re-renders using optimal React development patterns",
      "Progressive loading and intelligent caching strategies",
      "Hardware acceleration utilized for buttery smooth animations"
    ],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500"
  },
  {
    id: 5,
    title: "ACCESSIBILITY FEATURES",
    description: "Lorem ipsum dolor",
    details: [
      "Screen reader compatibility with comprehensive ARIA labels",
      "Full keyboard navigation support throughout the application",
      "High contrast mode for enhanced visibility and readability",
      "Intelligent focus management for improved usability",
      "Semantic HTML structure optimized for better SEO",
      "Full compliance with WCAG accessibility guidelines and standards"
    ],
    gradient: "from-blue-500 via-indigo-500 to-purple-500"
  }
];

export default function Index() {
  const [activeFeature, setActiveFeature] = useState(0);

  const nextFeature = () => {
    setActiveFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  const currentFeature = features[activeFeature];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Heading, Body Text, and Arrows */}
          <div className="order-2 lg:order-1 space-y-6">
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
            
            {/* Navigation Arrows */}
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={prevFeature}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                aria-label="Previous feature"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextFeature}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors"
                aria-label="Next feature"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Center Column - iPhone Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-[580px] bg-black rounded-[3rem] p-2 shadow-2xl">
                <div className={`w-full h-full bg-gradient-to-br ${currentFeature.gradient} rounded-[2.5rem] relative overflow-hidden transition-all duration-500`}>
                  {/* iPhone notch */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full"></div>
                  
                  {/* iPhone content area */}
                  <div className="pt-16 pb-8 px-6 h-full">
                    <div className="text-white opacity-90">
                      <div className="text-xs font-medium mb-2">
                        Feature No.{currentFeature.id}
                      </div>
                      <h3 className="text-lg font-bold mb-4 leading-tight">
                        {currentFeature.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Feature Showcase List */}
          <div className="order-3 lg:order-3">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Feature Showcase
              </h3>
              
              <div className="space-y-1">
                {features.map((feature, index) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(index)}
                    className={`w-full text-left p-3 rounded transition-colors ${
                      activeFeature === index
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-8 rounded-full transition-colors ${
                        activeFeature === index ? 'bg-blue-500' : 'bg-gray-200'
                      }`}></div>
                      <div className="min-w-0 flex-1">
                        <div className={`font-medium text-sm ${
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
  );
}
