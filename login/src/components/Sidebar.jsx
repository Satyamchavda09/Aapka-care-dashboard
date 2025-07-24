/** @format */
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiHome, FiLayers, FiBox, FiLogOut, FiTag } from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const menuItems = [
    {
      icon: <FiHome size={20} />,
      name: "Dashboard",
      nv: "/dashboard",
    },
    {
      icon: <FiLayers size={20} />,
      name: "Categories",
      nv: "/categories",
    },
    {
      icon: <FiBox size={20} />,
      name: "Product",
      nv: "/product",
    },
    {
      icon: <FiTag size={20} />,
      name: "Brand",
      nv: "/brand",
    },
    {
      icon: <FiLogOut size={20} />,
      name: "Logout",
      nv: "/logout",
    },
  ];

  return (
    <>
  
      <div className="hidden md:block bg-gray-800 p-6 text-center h-screen sticky top-0">
        <h1 className="text-violet-500 font-bold text-[24px] shadow-3xl shadow-amber-50 mb-6">
          Aapka Care
        </h1>
        <div className="py-3">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className={`flex gap-3 px-2 py-2 items-center cursor-pointer rounded transition-colors ${
                location.pathname === item.nv
                  ? "bg-gray-700 text-violet-400"
                  : "hover:bg-gray-700 text-white"
              }`}
              onClick={() => handleNavigation(item.nv)}>
              <span>{item.icon}</span>
              <h1 className="font-medium">{item.name}</h1>
            </div>
          ))}
        </div>
      </div>


      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 flex justify-around items-center py-3 z-50 md:hidden border-t border-gray-700">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              location.pathname === item.nv ? "text-violet-400" : "text-white"
            }`}
            onClick={() => handleNavigation(item.nv)}>
            <span className="text-lg">{item.icon}</span>
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </div>
    </>
  );
}
