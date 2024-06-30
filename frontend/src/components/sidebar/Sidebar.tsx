import { useEffect, useState } from "react";
import storeDatabase from "../../data/MockData";
import { RxDashboard } from "react-icons/rx";
import { CiSquareQuestion } from "react-icons/ci";
import { LiaChartBarSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";
import { MdReceiptLong } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab }) => {
  const { logout } = useAuth();
  const handleLogOut = () => {
    logout();
  };

  const menuItems = [
    {
      label: "მთავარი",
      icon: RxDashboard,
      href: "/",
    },
    // {
    //   label: "შემოსავალი",
    //   icon: CiDollar,
    //   href: "#",
    // },
    {
      label: "შეკვეთები",
      icon: MdReceiptLong,
      href: "/orders",
    },
    {
      label: "პროდუქტები",
      icon: CiSquareQuestion,
      href: "/products",
    },
    {
      label: "სტატისტიკა",
      icon: LiaChartBarSolid,
      href: "#",
    },
  ];

  const [userData, setUserData] = useState({
    name: "",
    instagram: "",
  });

  const [activeMenuItem, setActiveMenuItem] = useState(activeTab);

  useEffect(() => {
    const fetchUserData = () => {
      setTimeout(() => {
        const sellerId = 1;
        const seller = storeDatabase.sellers.find(
          (seller) => seller.id === sellerId
        );
        if (seller) {
          const instagram = storeDatabase.instagrams.find(
            (instagram) => instagram.owner === seller.id
          );
          setUserData({
            name: seller.name,
            instagram: instagram ? instagram.name : "",
          });
        }
      }, 500);
    };
    fetchUserData();
  });

  return (
    <div className="sticky top-0 h-screen w-1/12 lg:w-1/6 bg-white">
      <div className="px-2 sm:px-4 py-4 flex flex-col justify-between h-full">
        {/* Name */}
        <div className="mb-4">
          <div className="hidden lg:block bg-white p-4 rounded-lg">
            <p className="text-lg hidden lg:block font-Nunito font-bold">
              {userData.instagram}
            </p>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 -m-4 mt-3">
          <div>
            <div className="flex flex-col space-y-10 font-BPG-Glaho">
              {menuItems.map((item, key) => {
                const IconComponent = item.icon;
                return (
                  <div key={key} onClick={() => setActiveMenuItem(item.label)}>
                    <a
                      href={item.href}
                      className={`flex flex-row gap-2 items-center px-4 py-2  ${
                        item.label === activeMenuItem
                          ? "bg-gradient-to-r from-[#ACA9FF] from-0% bg-opacity-40 to-transparent to-[10px] text-textActive"
                          : "text-textGray cursor-pointer hover:text-textActive"
                      }`}
                    >
                      <IconComponent className="fill-current text-textGray min-h-[15px] min-w-[15px]" />
                      <span className="mt-1 hidden lg:block">{item.label}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="font-BPG-Glaho">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-[45px] h-[45px] hidden lg:block">
                <img
                  src="https://randomuser.me/api/portraits/men/2.jpg"
                  alt="Profile picture"
                  className="rounded-full"
                />
              </div>
              <div>
                <span className="font-bold text-sm hidden lg:block">
                  {userData.name.split(" ")[0]}
                </span>
              </div>
            </div>
            <div className="cursor-pointer" onClick={handleLogOut}>
              <IoIosLogOut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
