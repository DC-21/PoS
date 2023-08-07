import Navbar from '../components/UserNavbar';
import Footer from '../components/Footer';
import UserLanding from '../components/UserLanding';

const Home = () => {
  return (
    <div>
      <Navbar />
        <UserLanding/>
        <Footer/>
    </div>
  )
}

export default Home