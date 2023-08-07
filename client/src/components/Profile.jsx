import own from "../images/images.jpeg";

const Profile = () => {
  return (
    <div className="w-full h-screen justify-center items-center flex">
      <div className="w-full flex flex-col px-4 items-center">
        <p className="text-xl">Profiles Settings</p>
        <div className="w-full flex items-center px-4 py-6 rounded justify-between bg-[#27105e]">
          <div className="rounded-full overflow-hidden flex">
            <img className="w-[150px] h-[150px]" src={own} alt="own" />
          </div>
          <div className="bg-white h-[200px] rounded flex flex-col justify-center">
            <div className="flex gap-4">
              <p className="text-white">Name:</p>
              <p className="text-white">Chola Kuboko</p>
            </div>
            <div className="flex gap-4">
              <p className="text-white">Username:</p>
              <p className="text-white">Cholah</p>
            </div>
            <div className="flex gap-4">
              <p className="text-white">Contact:</p>
              <p className="text-white">0979054417</p>
            </div>
            <div className="flex gap-4">
              <p className="text-white">Email:</p>
              <p className="text-white">cholahKuboko@gmail.com</p>
            </div>
          </div>
          <div>
            <div className="flex gap-4">
              <p className="text-white">Name</p>
              <p>Chola Kuboko</p>
            </div>
            <div>
              <p className="text-white">Name</p>
            </div>
            <div>
              <p className="text-white">Name</p>
            </div>
            <div>
              <p className="text-white">Name</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
