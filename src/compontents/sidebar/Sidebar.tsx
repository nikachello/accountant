import { useEffect, useState } from "react";
import storeDatabase from "../../data/MockData";

function Sidebar() {
  const [userData, setUserData] = useState({
    name: "",
    instagram: "",
  });

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
    <div className="h-screen w-1/4 md:w-1/6 bg-stone-100">
      <div className="px-4 py-4 flex flex-col justify-between h-full">
        {/* Name */}
        <div className="mb-4">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg font-bold">{userData.name}</p>
            <p className="text-sm">{userData.instagram}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="mb-4">
          <div>
            <div className="flex flex-col space-y-10 font-BPG-Glaho">
              <a className="inline-block text-green-600 cursor-pointer">
                მთავარი
              </a>
              <a className="inline-block hover:text-green-600 cursor-pointer">
                შემოსავალი
              </a>
              <a className="inline-block hover:text-green-600 cursor-pointer">
                მოთხოვნები
              </a>
              <a className="inline-block hover:text-green-600 cursor-pointer">
                სტატისტიკა
              </a>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div>
          <div>
            <p className="text-lg font-bold font-BPG-Glaho">პროფილი</p>
            {/* Add profile information here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
