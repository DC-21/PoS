import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="flex w-full justify-center items-center">
        <div className="bg-[#f5f6fa] h-screen flex flex-col w-full justify-center items-center">
            <p className="text-blue-900 text-2xl">Welcome back</p>
            <p className='text-blue-800 text-xl mt-2'>Kindly select what you want to do from the services listed below</p>
            <div className="mt-6 flex flex-col gap-6">
                <div className="justify-center gap-8 w-full flex">
                    <Link to='/transact' className="px-6 py-4 w-[200px] bg-blue-900 rounded text-white">Make New Transaction</Link>
                    <Link to='/transactions' className="px-6 py-4 w-[200px] bg-[#fe8267] rounded text-white">View All Transactions</Link>
                </div>
                <div className="justify-center gap-8 w-full flex">
                    <button className="px-6 py-4 w-[200px] bg-[#e74723] rounded text-white">Update Customers</button>
                    <button className="px-6 py-4 w-[200px] bg-[#260c65] rounded text-white">Update Income Group codes</button>
                </div>
                <div className="justify-center gap-8 w-full flex">
                    <button className="px-6 py-4 w-[200px] bg-[#984dd6] rounded text-white">Update G/L Accounts</button>
                    <Link to='/signup' className="px-6 py-4 w-[200px] bg-[#2b9c14] rounded text-white">Create New User</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing