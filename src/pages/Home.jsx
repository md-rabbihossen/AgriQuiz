import Hero from "../components/Hero/Hero";
import HomeAbout from "../components/HomeAbout/HomeAbout";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../pages/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeAbout />
      <Footer />
    </>
  );
}

export default Home;
