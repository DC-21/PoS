import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import Profile from '../components/Profile'

const AdminProfile = () => {
  return (
    <div className='w-full h-screen flex flex-col'>
    <AdminNavbar/>
    <Profile/>
    </div>
  )
}

export default AdminProfile