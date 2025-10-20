import Header from "../components/Header";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import About from "../components/About";
import Gallery from "../components/Gallery";
import Skills from "../components/Skills";

const Home = () => {
  return (
    <div className="Home min-h-screen bg-white transition-colors duration-300 font-sans">
      <Nav />
      <div id="home">
        <Header />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="works">
        <Gallery />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
