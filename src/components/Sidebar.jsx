import { InfoCircle, LoginCurve } from "iconsax-react";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const fixAvatarUrl = (url) => {
    if (!url) return "/assets/avatar.png";
    return url.replace("https://127.0.0.1:5050", "https://mock.arianalabs.io");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://mock.arianalabs.io/api/current_user/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();

        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://mock.arianalabs.io/api/auth/", {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to logout");
      }

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <aside className="w-60 bg-[#E2E8F0] p-4 shadow-md flex flex-col justify-between">
      {user && (
        <div className="flex flex-col items-center text-center">
          <img
            src={fixAvatarUrl(user.avatar)}
            alt="User Avatar"
            className="w-12 h-12 rounded-full object-cover mb-2"
          />
          <h2 className="font-semibold">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-gray-500">@{user.username}</p>
        </div>
      )}

      <button
        onClick={openModal}
        className="mt-4 w-full py-2 bg-[#DC2626] text-white rounded-md flex items-center justify-center space-x-2"
      >
        <LoginCurve size="20" color="white" />
        <span>Logout</span>
      </button>

      {isOpen ? (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <div className="flex justify-center">
            <InfoCircle size="32" color="black" className="mt-8" />
          </div>
          <h2 className="text-black text-[14px] my-2">Log out</h2>
          <p className="text-[#4E5553] text-[14px] mb-4">
            Are you sure you want to sign out of your account?
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={handleLogout}
              className="flex-1 py-2 px-6 bg-white border-2 border-[#E2E8F0] text-black rounded-md"
            >
              Log out
            </button>
            <button
              onClick={closeModal}
              className="flex-1 py-2 px-6 bg-[#0F172A] text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        </Modal>
      ) : null}
    </aside>
  );
}
