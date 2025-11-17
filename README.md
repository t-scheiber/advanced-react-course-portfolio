# Portfolio Website - React & Chakra UI

A modern, responsive portfolio website built with React and Chakra UI, featuring smooth animations and a professional contact form. Created as part of the Advanced React course from Meta.

**🌐 Live Site:** [react-advanced-course-portfolio.thomasscheiber.com](https://react-advanced-course-portfolio.thomasscheiber.com)

## ✨ Features

- **Responsive Design**: Seamless experience across all devices (mobile, tablet, desktop)
- **Smooth Animations**: Implemented with Framer Motion for polished user interactions
- **Contact Form**: Fully functional contact section with form validation using Formik and Yup
- **Project Showcase**: Dynamic project cards displaying work samples
- **Modern UI**: Built with Chakra UI components for a professional appearance
- **FontAwesome Integration**: Social media icons and visual enhancements
- **Alert System**: User feedback notifications for form submissions

## 🛠️ Technologies Used

- **React 18** - Modern UI library with hooks
- **Chakra UI** - Component library for consistent design
- **Formik** - Form state management and validation
- **Yup** - Schema validation for forms
- **Framer Motion** - Smooth animations and transitions
- **FontAwesome** - Icon library for social media and UI elements

## 📦 Installation & Setup

```bash
# Clone the repository
git clone [repository-url]

# Navigate to project directory
cd advanced-react-course-portfolio

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/        # Reusable React components
│   ├── Header.jsx         # Navigation header
│   ├── LandingSection.jsx # Hero section
│   ├── ProjectsSection.jsx # Project showcase
│   ├── ContactMeSection.jsx # Contact form
│   └── Card.jsx           # Project card component
├── context/           # React Context for state management
├── hooks/             # Custom React hooks
└── images/            # Project images and assets
```

## 🎨 Key Features

### Contact Form
- Real-time validation
- User-friendly error messages
- Success/error alerts
- Professional form layout

### Project Cards
- Clean card design
- Hover effects
- Project descriptions
- External links

### Responsive Header
- Smooth scroll navigation
- Hide/show on scroll
- Mobile-friendly menu

## 📚 Learning Outcomes

This project demonstrates proficiency in:
- React hooks (useState, useEffect, useContext, useRef)
- Context API for global state management
- Form handling and validation
- Responsive design principles
- Modern CSS-in-JS patterns
- Component composition
- Accessibility best practices

## 🚀 Build for Production

```bash
npm run build
```

Creates an optimized production build in the `build/` folder.

## 📄 License

This project was created as part of the Meta Advanced React course.

---

**Built with React** ⚛️ | **Styled with Chakra UI** 🎨 | **Validated with Formik & Yup** ✅
