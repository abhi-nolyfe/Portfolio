import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Footer, Tech, Projects, StarsCanvas } from "./components";

const App = () => {
  const showExperience = false;
  const showFeedbacks = false;

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-gradient">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        {showExperience && <Experience />}
        <Tech />
        <Projects />
        {showFeedbacks && <Feedbacks />}
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
