import { LoginCurve } from "iconsax-react";
import { useEffect, useState } from "react";
import Modal from "./Modal";
// import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  //   const navigate = useNavigate();

  const closeModal = () => setIsOpen(false);

  const fixAvatarUrl = (url) => {
    if (!url) return "/assets/avatar.png";
    return url.replace("https://127.0.0.1:5050", "http://localhost:5050");
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

  const handleLogout = () => {
    setIsOpen(true);
    // localStorage.removeItem("token");
    // navigate("/login");
  };

  return (
    <aside className="w-60 bg-[#E2E8F0] p-4 shadow-md flex flex-col justify-between">
      {user && (
        <div className="flex flex-col items-center text-center">
          <img
            src={fixAvatarUrl(user.avatar)}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover mb-2"
          />
          <h2 className="font-semibold">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-gray-500">@{user.username}</p>
        </div>
      )}

      <button
        onClick={handleLogout}
        className="mt-4 w-full py-2 bg-[#DC2626] text-white rounded-md flex items-center justify-center space-x-2"
      >
        <LoginCurve size="20" color="white" />
        <span>Logout</span>
      </button>

      {isOpen ? (
        <Modal isOpen={isOpen} onClose={closeModal}>
          <h2 className="modal-title">Confirmation</h2>
          <p className="modal-text">Are you sure you want to log out?</p>
          <div className="mt-4">
            <button
              onClick={closeModal}
              className="py-2 px-6 bg-green-500 text-white rounded-md"
            >
              Yes
            </button>
            <button
              onClick={closeModal}
              className="py-2 px-6 bg-red-500 text-white rounded-md ml-4"
            >
              No
            </button>
          </div>
        </Modal>
      ) : null}
    </aside>
  );
}
