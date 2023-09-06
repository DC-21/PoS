import { useState, useEffect } from "react";
import own from "../images/images.jpeg";
import Footer from "./Footer";
import axios from "axios";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [showButtons, setShowButtons] = useState(true);
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSignUp = async () => {
    try {
      if (!full_name || !email || !phone_number || !role || !password) {
        console.error("Please fill in all fields");
        return;
      }

      const response = await axios.post("http://localhost:3006/signup", {
        full_name,
        email,
        phone_number,
        role,
        password,
      });

      if (response.status === 201) {
        setFull_name("");
        setEmail("");
        setPhone_number("");
        setRole("");
        setPassword("");
        setShowForm(false);
        setShowButtons(true);
        setShowSuccessMessage(true);
        sessionStorage.setItem("isLoggedIn", "true");
      } else {
        console.error("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error in signup request:", error);
      console.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3006/signUp")
      .then((response) => {
        const users = response.data.Users;
        console.log("Users:", users);
        setUsers(users);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAddUserClick = () => {
    setShowButtons(false);
    setShowForm(true);
    setShowSuccessMessage(false);
  };

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  return (
    <div className="w-full h-auto justify-center items-center flex">
      <div className="w-full flex flex-col px-4 items-center pt-[120px]">
        <p className="text-xl">Profiles Settings</p>
        <div className="w-full flex items-center px-4 py-6 mt-4 rounded justify-between bg-[#27105e]">
          <div className="bg-[#391886] h-[200px] w-[200px] justify-center rounded items-center overflow-hidden flex">
            <img
              className="w-[180px] h-[180px] rounded-full"
              src={own}
              alt="own"
            />
          </div>
          <div className="bg-[#391886] w-[450px] h-[200px] rounded flex flex-col items-center justify-center">
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
              <p className="flex-1 text-start text-white">
                cholahKuboko@gmail.com
              </p>
            </div>
          </div>
          <div className="bg-[#391886] w-[450px] h-[200px] rounded flex flex-col items-center justify-center">
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Role:</p>
              <p className="flex-1 text-start text-white">Admin</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Profession:</p>
              <p className="flex-1 text-start text-white">Software Engineer</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Address:</p>
              <p className="flex-1 text-start text-white">9 miles</p>
            </div>
            <div className="flex gap-4 w-full py-2 px-4">
              <p className="flex-1 text-start text-white">Address 2:</p>
              <p className="flex-1 text-start text-white">Minestone RD.</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center px-4 py-6 mt-4 rounded justify-between bg-[#27105e] gap-4">
          <p className="py-2 px-3 bg-white rounded">Our Team</p>
          <div className="w-full grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {users.map((item, index) => (
              <div
                key={index}
                className="gap-3 p-4 shadow-lg justify-start rounded-xl bg-[#391886] flex-col md:flex-row flex items-center"
              >
                <div className="w-32 h-32 flex items-center rounded-full justify-center">
                  <img
                    src={own}
                    className="w-full h-full rounded-full object-cover object-center"
                  />
                </div>
                <div className="flex gap-2 md:text-left text-center flex-col items-center">
                  <span className="w-full text-white font-semibold capitalize">
                    {item.full_name}
                  </span>
                  <span className="w-full text-neutral-300">{item.role}</span>
                  <span className="w-full text-neutral-300">{item.email}</span>
                  <span className="w-full text-orange-200 font-semibold tracking-wide">
                    +260{item.phone_number}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full">
            {showButtons && (
              <div className="w-full flex justify-center items-center gap-8">
                <button
                  className="bg-white py-2 px-3 rounded"
                  onClick={handleAddUserClick}
                >
                  Add User
                </button>
              </div>
            )}

            {showForm && (
              <div className="w-full flex items-center py-6 mt-4 justify-center">
                <div className="w-full flex flex-col justify-center items-center rounded bg-white p-6">
                  <p className="mb-4 text-lg font-semibold text-center">
                    Add User
                  </p>
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex w-full">
                      <label className="w-[100px] flex-1">Fullname:</label>
                      <input
                        className="flex-1 px-2 py-1 rounded border"
                        type="text"
                        id="full_name"
                        placeholder="Enter your full name"
                        value={full_name}
                        onChange={(e) => setFull_name(e.target.value)}
                      />
                    </div>
                    <div className="flex w-full">
                      <label className="w-[100px] flex-1">Email:</label>
                      <input
                        className="flex-1 px-2 py-1 rounded border"
                        type="email"
                        id="email"
                        placeholder="e.g., chola@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="flex w-full">
                      <label className="w-[100px] flex-1">Contact:</label>
                      <input
                        className="flex-1 px-2 py-1 rounded border"
                        type="tel"
                        id="phone_number"
                        placeholder="Enter your phone number"
                        value={phone_number}
                        onChange={(e) => setPhone_number(e.target.value)}
                      />
                    </div>
                    <div className="flex w-full">
                      <label className="w-[100px] flex-1">Role:</label>
                      <select
                        className="flex-1 px-2 py-1 rounded border"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option>Choose Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div className="flex w-full">
                      <label className="w-[100px] flex-1">Password:</label>
                      <input
                        className="flex-1 px-2 py-1 rounded border"
                        type="password"
                        id="password"
                        placeholder="Choose a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="w-full flex justify-center">
                      <button
                        onClick={handleSignUp}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        Add User
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showSuccessMessage && (
              <div className="w-full flex items-center py-6 mt-4 justify-center">
                <div className="w-full flex flex-col justify-center items-center rounded bg-white p-6">
                  <p className="mb-4 text-lg font-semibold text-center text-green-500">
                    User added successfully!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
