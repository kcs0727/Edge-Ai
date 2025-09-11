import Aitools from "../components/Aitools"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import Plan from "../components/Plan"
import Testimonial from "../components/Testimonial"


function Home(){
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Aitools/>
        <Testimonial/>
        <Plan/>
        <Footer/>
    </div>
  )
} 

export default Home