
const Landing = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
        <div className="flex flex-col w-full justify-center items-center">
            <p className="text-blue-900 text-2xl">Welcome back</p>
            <div className="mt-6 flex flex-col gap-6">
                <div className="justify-center gap-8 w-full flex">
                    <button className="px-6 py-4 w-[200px] bg-blue-900 rounded text-white">Make New Transaction</button>
                    <button className="px-6 py-4 w-[200px] bg-blue-900 rounded text-white">View All Transactions</button>
                </div>
                <div className="justify-center gap-8 w-full flex">
                    <button className="px-6 py-4 w-[200px] bg-blue-900 rounded text-white">Update Customers</button>
                    <button className="px-6 py-4 w-[200px] bg-blue-900 rounded text-white">Update Income Group codes</button>
                </div>
                <div className="justify-center gap-8 w-full flex">
                    <button className="px-6 py-4 w-[200px] bg-blue-900 rounded text-white">Update G/L Accounts</button>
                    <button className="px-6 py-4 w-[200px] bg-blue-900 rounded text-white">Create New User</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing