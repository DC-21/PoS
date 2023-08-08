import UserNavbar from '../../components/UserNavbar';
import Footer from '../../components/Footer';
import UserLanding from '../../components/UserLanding';

const Home = () => {
  return (
    <div>
      <UserNavbar />
        <UserLanding/>
        <Footer/>
    </div>
  )
}

export default Home