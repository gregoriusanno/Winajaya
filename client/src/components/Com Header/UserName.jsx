import { useEffect, useState } from "react";
import { Twirl as Hamburger } from "hamburger-react";

const UserName = ({ isOpen, setOpen, onToggle }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    try {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const user = JSON.parse(userData);
        if (user.name) {
          setUserName(user.name.split(" ").slice(0, 2).join(" "));
        } else {
          setUserName("");
        }
      } else {
        setUserName("");
      }
    } catch {
      setUserName("");
    }
  }, []);

  return (
    <div className="bg-white px-4 py-2 rounded-full gap-1 flex items-center h-[41px] outline outline-2 outline-[#5096FC]">
      <span className="font-bebas text-xl text-[#3F3F3F] flex items-center justify-center h-full w-full text-center mb-[-2px]">
        {userName ? userName : "Guest"}
      </span>
      <div className="flex items-center justify-center mr-[-10px] ml-[-5px]">
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          size={17}
          color="#5096FC"
          onToggle={onToggle}
        />
      </div>
    </div>
  );
};

export default UserName; 