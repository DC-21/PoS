import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import Profile from '../components/Profile'

const AdminProfile = () => {
  return (
    <div className='w-full h-screen'>
    <AdminNavbar/>
    <Profile/>
    <Footer/>
    </div>
  )
}

export default AdminProfile