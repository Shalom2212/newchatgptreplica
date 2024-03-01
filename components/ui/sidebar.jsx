// components/Sidebar.js
"use client";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import chatgpticongradient from "@/assets/chatgptgradient.svg";
import newchaticon from "@/assets/newchaticon.svg";
import verticalline from "@/assets/vertical-line.png";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { sidebardata, sidebaraddress, sidebarloading } from "@/States/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button } from "./button";
import { signOut } from "@/connections/signOut";
import { useRouter } from "next/router";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [data, setData] = useRecoilState(sidebardata);
  const [address, setAddress] = useRecoilState(sidebaraddress);
  const isLoading = useRecoilValue(sidebarloading);
  // const router = useRouter();

  const sidebarlist = data.map((item) => (
    <div
      className=""
      key={item.id}
      onClick={() => {
        console.log(item.id);
        setAddress(item.id);
      }}
    >
      <Button variant="ghost">{item.title}</Button>
    </div>
  ));

  // const signOutHandler = () => {
  //   signOut();
  //   useEffect(() => {
  //     router.push("/login");
  //   }, [router]);
  // };

  return (
    <div
      className={`bg-black ${
        isOpen ? "w-64 " : "w-0"
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
            <div className="text-[#666666] text-xs p-[8px]">History</div>
            {isLoading ? (
              <div className="flex  flex-col items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin " />
              </div>
            ) : (
              sidebarlist
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed bottom-0 text-center">
          <Button className="text-center" variant="ghost" onClick={signOut}>
            Sign Out
          </Button>
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
