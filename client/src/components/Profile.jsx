import own from "../images/images.jpeg";

const Profile = () => {
  return (
    <div className="w-full h-screen justify-center items-center flex">
      <div className="w-full flex flex-col px-4 items-center">
        <p className="text-xl">Profiles Settings</p>
        <div className="w-full flex items-center mt-4 py-6 rounded bg-[#27105e]">
          <div className="ml-6 rounded-full overflow-hidden">
            <img
              className="w-[150px] h-[150px]"
              src={own}
              alt="own"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
