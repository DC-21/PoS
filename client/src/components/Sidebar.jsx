const Sidebar = () => {
  return (
    <div className="w-[100px] h-[470px] mt-4 rounded py-4 flex flex-col bg-[#27105e] sticky left-2">
      <div className="w-full flex justify-start py-2 px-3 items-center gap-2 hover:bg-[#6e617e]">
        <p className="text-white">Profile</p>
      </div>
      <div className="w-full flex justify-start py-2 px-3 items-center gap-2 hover:bg-[#6e617e]">
        <p className="text-white">Password</p>
      </div>
      <div className="w-full flex justify-start py-2 px-3 items-center gap-2 hover:bg-[#6e617e]">
        <p className="text-white">Team</p>
      </div>
      <div className="w-full flex justify-start py-2 px-3 items-center gap-2 hover:bg-[#6e617e]">
        <p className="text-white">Add User</p>
      </div>
    </div>
  );
};

export default Sidebar;
