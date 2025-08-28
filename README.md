# Feature Showcase - Interactive Demo

A modern, responsive React application featuring an interactive feature showcase with smooth animations, scroll-based navigation, and mobile-first design.

![Feature Showcase Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=Feature+Showcase+Demo)

## ✨ Features

- **Interactive iPhone Mockup** - Realistic iPhone design with dynamic gradient backgrounds
- **Scroll-Based Navigation** - Features auto-advance based on scroll position
- **Click Navigation** - Navigate between features using clickable buttons or arrows
- **Mobile Responsive** - Optimized for all screen sizes from mobile to desktop
- **Smooth Animations** - Hardware-accelerated transitions and micro-interactions
- **Modern UI** - Clean design with Tailwind CSS and Radix UI components

## 🚀 Demo

Experience the live demo: [Feature Showcase](https://your-deployed-url.vercel.app)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS 3 with custom design tokens
- **UI Components**: Radix UI primitives
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📁 Project Structure

```
src/
├── components/ui/     # Reusable UI components (Radix UI + Tailwind)
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── App.tsx           # Main app component with routing
├── global.css        # Global styles and Tailwind imports
└── index.html        # HTML template

public/               # Static assets
```

## ⚡ Quick Start

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd feature-showcase
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run format.fix` - Format code with Prettier

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:

- **Extra Small (< 475px)**: Single column, optimized touch targets
- **Small (475px - 640px)**: Enhanced spacing and typography
- **Medium (640px - 768px)**: Two-column grid for feature list
- **Large (768px+)**: Full three-column layout with optimal viewing

## 🎨 Customization

### Adding New Features

1. **Update the features array** in `src/pages/Index.tsx`:
   ```typescript
   const features = [
     {
       id: 6,
       title: "YOUR NEW FEATURE",
       description: "Feature description",
       details: ["Detail 1", "Detail 2", ...],
       gradient: "from-indigo-500 via-purple-500 to-pink-500"
     }
   ];
   ```

2. **Customize gradients** by updating the gradient classes

### Styling

- **Colors**: Modify `src/global.css` for theme colors
- **Components**: Update component styles in `src/components/ui/`
- **Layout**: Adjust responsive breakpoints in `tailwind.config.ts`

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Deploy automatically

### Netlify

1. Run `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects if needed

### Other Platforms

The built files in `dist/` can be deployed to any static hosting service.

## 🔍 Key Implementation Details

### Scroll-Based Auto-Advance
```typescript
useEffect(() => {
  const handleScroll = () => {
    const scrollPercent = scrollTop / (docHeight - windowHeight);
    const featureIndex = Math.min(
      Math.floor(scrollPercent * features.length * 1.2),
      features.length - 1
    );
    setActiveFeature(featureIndex);
  };
  // ...
}, [activeFeature]);
```

### Responsive iPhone Mockup
- SVG-based design for crisp rendering
- CSS transforms for proper scaling
- Dynamic gradient backgrounds
- Realistic notch and home indicator

### Mobile-First Grid System
```css
/* Single column on mobile */
grid-cols-1 

/* Two columns on medium screens */
md:grid-cols-2 

/* Three columns on large screens */
lg:grid-cols-3
```

## 📋 Assignment Requirements Fulfilled

✅ **Clickable Points**: Feature list with active state indicators  
✅ **Content Updates**: iPhone image, heading, and body text change  
��� **Arrow Navigation**: Left/right arrows for feature switching  
✅ **Scroll Behavior**: Auto-advance features 1→5 with scroll  
✅ **Sticky Section**: Feature showcase stays in view  
✅ **Mobile Responsive**: Optimized for all screen sizes  
✅ **Clean Code**: Well-structured React components with TypeScript  

## 🐛 Troubleshooting

### Development Server Issues
- Ensure port 8080 is not in use
- Clear browser cache if styles don't update
- Restart dev server if hot reload stops working

### Build Issues
- Run `npm run typecheck` to catch TypeScript errors
- Check console for missing dependencies
- Verify all imports are correct after restructuring

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
