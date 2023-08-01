
const Footer = () => {
  return (
    <div className="w-full py-2 px-4 sticky top-0 flex justify-center">
        <div className="px-4 py-2 bg-slate-400 rounded-md w-full flex items-center justify-between">
            <button className="text-lg hover:bg-slate-200 py-2 px-2 rounded text-white bg-slate-600 hover:text-black">Log Out</button>
            <button className="text-lg hover:bg-slate-200 py-2 px-2 rounded text-white bg-slate-600 hover:text-black">Update</button>
        </div>
    </div>
  )
}

export default Footer