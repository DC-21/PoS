import own from "../images/images.jpeg";

const Profile = () => {
  return (
    <div className="w-full h-screen justify-center items-center flex">
      <div className="w-full flex flex-col px-4 items-center">
        <p className="text-xl">Profiles Settings</p>
        <div className="w-full flex items-center px-4 py-6 rounded justify-between bg-[#27105e]">
          <div className="rounded-full bg-[#0b051a] overflow-hidden flex">
            <img className="w-[150px] h-[150px]" src={own} alt="own" />
          </div>
          <div className="bg-[#0b051a] w-[450px] h-[200px] rounded flex flex-col items-center justify-center">
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Name:</p>
              <p className="flex-1 text-start text-white">Chola Kuboko</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Username:</p>
              <p className="flex-1 text-start text-white">Cholah</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Contact:</p>
              <p className="flex-1 text-start text-white">0979054417</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Email:</p>
              <p className="flex-1 text-start text-white">cholahKuboko@gmail.com</p>
            </div>
          </div>
          <div className="bg-[#0b051a] w-[450px] h-[200px] rounded flex flex-col items-center justify-center">
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Name:</p>
              <p className="flex-1 text-start text-white">Chola Kuboko</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Username:</p>
              <p className="flex-1 text-start text-white">Cholah</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Contact:</p>
              <p className="flex-1 text-start text-white">0979054417</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Email:</p>
              <p className="flex-1 text-start text-white">cholahKuboko@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
