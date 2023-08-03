
const Landing = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
        <div className="flex flex-col w-full justify-center items-center">
            <p className="text-blue-900 text-2xl">Welcome back</p>
            <div className="mt-6">
                <div className="justify-center gap-8 w-full flex">
                    <button className="px-6 py-4 bg-blue-900 rounded text-white">New Transaction</button>
                    <button>All Transactions</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Landing