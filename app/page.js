"use client";

import Image from "next/image";
import chatgpticongradient from "@/assets/chatgptgradient.svg";
import shareicon from "@/assets/shareicon.png";
import chatloading from "@/assets/chatloading.svg";
import Sidebar from "@/components/ui/sidebar";
import sendicon from "@/assets/send.png";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  responsehistory,
  sidebardata,
  sidebaraddress,
  sidebarloading,
} from "@/States/atoms";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { supabase } from "@/connections/supabase";

export default function TestPage() {
  const [data, setData] = useRecoilState(responsehistory);
  const [userq, setuserq] = useState("");
  const [userfullinput, setuserfullinput] = useState("");
  const [newchat, setNewchat] = useState(true);
  const [currentchatId, setCurrentchatId] = useState("");
  const [chatlist, setChatlist] = useRecoilState(sidebardata);
  const [getsidebaraddress, setGetsidebaraddress] =
    useRecoilState(sidebaraddress);
  const [chatscreenloading, setChatscreenloading] = useState("");
  const [isSidebarloading, setIssidebarloading] =
    useRecoilState(sidebarloading);

  var tempchatid;

  const sidebarlistcall = async () => {
    setIssidebarloading(true);
    const chatlistres = await axios.post("/api/fetchchatlist", {
      user_id: "shalom",
    });
    if (chatlistres.status == 200) {
      setIssidebarloading(false);
      setChatlist(chatlistres.data.data);
    } else {
      console.log("can't retreive sidebar list");
    }
  };

  const fecthProfile = async () => {
    const profileData = await supabase.auth.getSession();
    console.log(profileData);
  };

  useEffect(() => {
    fecthProfile();
    sidebarlistcall();
  }, []);

  useEffect(() => {
    const getchathistory = async () => {
      const getchathistoryres = await axios.post("/api/fetchchathistorybyid", {
        chat_id: getsidebaraddress,
      });
      if (getchathistoryres.status == 200) {
        console.log(getchathistoryres.data.data[0]);
        setData(getchathistoryres.data.data);
        tempchatid = getsidebaraddress;
        setCurrentchatId(getsidebaraddress);
      } else {
        console.log("can't get any historical data");
      }
    };
    if (getsidebaraddress != "") {
      getchathistory();
    }
  }, [getsidebaraddress]);

  useEffect(() => {
    const openaicall = async () => {
      console.log("Request", userfullinput);

      try {
        const response = await axios.post("/api/chatgpt", {
          prompt: userfullinput,
        });

        if (response.status === 200 && response.data.gptresponse) {
          const chatres = response.data.gptresponse;

          console.log(currentchatId);
          setData([
            ...data,
            {
              message_data: {
                user: userfullinput,
                chatgpt: chatres,
              },
            },
          ]);

          if (newchat) {
            const chatlistres = await axios.post("/api/fetchchatlist", {
              user_id: "shalom",
            });
            if (chatlistres.status == 200) {
              setChatlist(chatlistres.data.data);
            } else {
              console.log("can't retreive sidebar list");
            }

            const response = await axios.post("/api/createnewchat", {
              user_id: "shalom",
              title: chatres.slice(0, 25) + "...",
            });
            if (response.status == 200) {
              tempchatid = response.data.chatid;
              setCurrentchatId(response.data.chatid);
              setNewchat(false);
            } else {
              console.log("can't create a new chat");
            }
          }

          var cchat = "";
          if (currentchatId == "") {
            cchat = tempchatid;
          } else {
            cchat = currentchatId;
          }

          const res = await axios.post("/api/insertnewmessage", {
            chat_id: cchat,
            message_data: {
              user: userfullinput,
              chatgpt: chatres,
            },
          });

          if (res.status == 200) {
            console.log("Succesfully inserted");
          } else {
            console.log("can't insert data to the messages");
          }
        } else {
          console.error("Failed to generate text");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (userfullinput != "") {
      openaicall();
    }
  }, [userfullinput]);

  const responselist = data.map((item) => (
    <div key={item.message_data.user}>
      <div className="m-5 pb-5">
        <div className="flex m-4 my-0">
          <Image
            src="https://github.com/shadcn.png"
            width={32}
            height={32}
            alt="user image"
            className="mx-2 my-0 rounded-2xl"
          />
          <b>Shalom M</b>
        </div>
        <div className="px-14 m-2 my-0">{item.message_data.user}</div>
      </div>

      <div className="m-5 pb-5">
        <div className="flex m-4 my-0">
          <Image
            src={chatgpticongradient}
            width={32}
            className="mx-2 my-0"
            alt="chatgpt profile"
          />
          <b>ChatGPT</b>
        </div>
        <div className="px-14 m-2 my-0">
          <ReactMarkdown>{item.message_data.chatgpt}</ReactMarkdown>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex h-full flex-col w-full">
        <div className="sticky top-0 mb-1.5 flex items-center justify-between z-10 h-14 bg-white/95 p-2 font-semibold dark:bg-[#40414f]">
          <h1>
            <b>Chatgpt 3.5</b>
          </h1>
          <Image
            src={shareicon}
            alt="share icon"
            height={30}
            width={30}
            className="mx-10"
          />
        </div>
        <div className="flex flex-col items-center justify-center mx-24">
          <div className="overflow-hidden overflow-y-scroll scroll-smooth w-full max-w-6xl max-h-[calc(100vh-10rem)] ">
            {data.length == 0 ? (
              <div className="flex flex-col items-center justify-center mt-48 mr-16 ">
                <Image
                  src={chatgpticongradient}
                  alt="chatgpt"
                  width={100}
                  height={100}
                />
              </div>
            ) : (
              responselist
            )}
          </div>
        </div>
      </div>
      <div className="fixed flex flex-row justify-center bottom-0 w-2/3 mx-9 left-1/4 py-5 px-90">
        <textarea
          id="prompt-textarea"
          tabIndex="0"
          data-id="30c24fff-152f-4e7a-b308-95b2f7ec7345"
          rows="1"
          value={userq}
          onChange={(e) => setuserq(e.target.value)}
          placeholder="Message ChatGPT…"
          className="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 gizmo:md:py-3.5 gizmo:placeholder-black/50 gizmo:dark:placeholder-white/50 pl-3 md:pl-4 rounded-xl"
        ></textarea>
        <button
          type="submit"
          onClick={() => {
            setuserfullinput(userq);
            setuserq("");
          }}
          className="px-5"
        >
          <Image src={sendicon} alt="sendicon" width={30} height={30} />
        </button>
      </div>
    </div>
  );
}
