import { Link } from 'react-router-dom'
import logo from '../images/mulonga.png'
const Navbar = () => {
  return (
    <div className='w-full py-2 px-4 sticky top-0 flex justify-center'>
        <div className='px-4 py-2 bg-slate-400 rounded-md w-full flex items-center justify-between'>
            <Link to='/'>
                <img className='w-[200px] h-[80px] rounded' src={logo} alt='logo'/>
            </Link>
            <Link to='/transactions'>
                <p className='text-lg hover:bg-slate-200 py-2 px-2 rounded'>Transactions</p>
            </Link>
        </div>
    </div>
  )
}

export default Navbar