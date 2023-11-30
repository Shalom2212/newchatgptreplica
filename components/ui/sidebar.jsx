// components/Sidebar.js
"use client";
import { useState } from "react";
import { Switch } from "./switch";
import Image from "next/image";
import chatgpticongradient from "@/assets/chatgptgradient.svg";
import newchaticon from "@/assets/newchaticon.svg";
import verticalline from "@/assets/vertical-line.png";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { sidebardata, sidebaraddress } from "@/States/atoms";
import { useRecoilState } from "recoil";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [data, setData] = useRecoilState(sidebardata);
  const [address, setAddress] = useRecoilState(sidebaraddress);

  const sidebarlist = data.map((item) => (
    <div
      className="text-sm p-[5px] pl-2"
      key={item.id}
      onClick={() => {
        console.log(item.id);
        setAddress(item.id);
      }}
    >
      <div>{item.title}</div>
    </div>
  ));

  return (
    <div
      className={`bg-black ${
        isOpen ? "w-1/4 " : "w-0"
      } transition-all duration-200 ease-in-out overflow-hidden h-screen flex flex-col`}
    >
      <div
        className={`p-2 fixed top-[45%] ${
          isOpen ? "left-[20vw]" : "left-0"
        }  z-50`}
        onClick={toggleSidebar}
      >
        <Image src={verticalline} />
      </div>
      <div className="flex sticky z-10 items-center m-4 gap-2 w-full">
        <Image
          src={chatgpticongradient}
          width={28}
          height={28}
          alt="chatgpt icon"
          className="bg-white rounded-full mx-2"
        />
        New chat
        <Image
          src={newchaticon}
          alt="newchat icon chtgpt"
          width={20}
          height={20}
          className="bg-white"
        />
      </div>
      <div className="flex flex-col mx-5">
        <div className=" overflow-hidden scroll-smooth overflow-y-auto justify-center items-center  max-h-[calc(100vh-10rem)]  ">
          <div className="mb-6">
            <div className="text-[#666666] text-xs p-[8px]">Today</div>
            {sidebarlist}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed bottom-0">
          <div className="text-center ">Upgrade</div>
          <div className="flex items-center justify-center m-3">
            <Avatar className="m-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h3>Shalom M</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
