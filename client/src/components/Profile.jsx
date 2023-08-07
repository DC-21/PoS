import own from "../images/images.jpeg";

const Profile = () => {
  return (
    <div className="w-full h-screen justify-center items-center flex">
      <div className="w-full flex flex-col px-4 items-center">
        <p className="text-xl">Profiles Settings</p>
        <div className="w-full flex items-center px-4 py-6 mt-4 rounded justify-between bg-[#27105e]">
          <div className="bg-white h-[200px] w-[200px] justify-center rounded items-center overflow-hidden flex">
            <img
              className="w-[180px] h-[180px] rounded-full"
              src={own}
              alt="own"
            />
          </div>
          <div className="bg-white w-[450px] h-[200px] rounded flex flex-col items-center justify-center">
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-black">Name:</p>
              <p className="flex-1 text-start text-black">Chola Kuboko</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-black">Username:</p>
              <p className="flex-1 text-start text-black">Cholah</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-black">Contact:</p>
              <p className="flex-1 text-start text-black">0979054417</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-black">Email:</p>
              <p className="flex-1 text-start text-black">
                cholahKuboko@gmail.com
              </p>
            </div>
          </div>
          <div className="bg-white w-[450px] h-[200px] rounded flex flex-col items-center justify-center">
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-black">Role:</p>
              <p className="flex-1 text-start text-black">Admin</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-black">Profession:</p>
              <p className="flex-1 text-start text-black">Software Engineer</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-black">Address:</p>
              <p className="flex-1 text-start text-black">9 miles</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-black">Address 2:</p>
              <p className="flex-1 text-start text-black">Minestone RD.</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center px-4 py-6 mt-4 rounded justify-between bg-[#27105e] gap-4">
          <div className="w-full flex gap-4">
            <div className="flex flex-1 w-full justify-between bg-white rounded">
              <div className="h-[200px] w-[250px] ml-4 justify-center rounded items-center overflow-hidden flex">
                <img
                  className="w-[180px] h-[180px] rounded-full"
                  src={own}
                  alt="own"
                />
              </div>
              <div className="flex flex-col w-full mr-4 justify-center">
                <div className="flex w-full p-2">
                  <div className="flex-1 w-[50%] ">Name:</div>
                  <div className="flex-1 w-[50%] ">Tamani Phiri</div>
                </div>
                <div className="flex w-full p-2">
                  <div className="flex-1 w-[50%] ">Proffesion:</div>
                  <div className="flex-1 w-[50%] ">Software Engineer</div>
                </div>
                <div className="flex w-full p-2">
                  <div className="flex-1 w-[50%] ">Role:</div>
                  <div className="flex-1 w-[50%] ">User</div>
                </div>
                <div className="flex w-full p-2">
                  <div className="flex-1 w-[50%] ">Email</div>
                  <div className="flex-1 w-[50%] ">
                    Tamanigabriel0@gmail.com
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-1 w-full justify-between bg-white rounded">
              <div className="h-[200px] w-[250px] ml-4 justify-center rounded items-center overflow-hidden flex">
                <img
                  className="w-[180px] h-[180px] rounded-full"
                  src={own}
                  alt="own"
                />
              </div>
              <div className="flex flex-col w-full mr-4 justify-center">
                <div className="flex w-full p-2">
                  <div className="flex-1 w-[50%] ">Name:</div>
                  <div className="flex-1 w-[50%] ">Tamani Phiri</div>
                </div>
                <div className="flex w-full p-2">
                  <div className="flex-1 w-[50%] ">Proffesion:</div>
                  <div className="flex-1 w-[50%] ">Software Engineer</div>
                </div>
                <div className="flex w-full p-2">
                  <div className="flex-1 w-[50%] ">Role:</div>
                  <div className="flex-1 w-[50%] ">User</div>
                </div>
                <div className="flex w-full p-2">
                  <div className="flex-1 w-[50%] ">Email</div>
                  <div className="flex-1 w-[50%] ">
                    Tamanigabriel0@gmail.com
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center gap-8">
            <button>Add User</button>
            <button>Remove User</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
