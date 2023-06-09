import React, { useContext, useEffect, useRef, useState } from 'react';
import SendOutline from '@/assets/send.png';
import Image from 'next/image';
import {
  IMsg,
  SocketContext,
  SocketContextType,
} from '@/context/SocketProvider';

export default function Area() {
  const [msg, setMsg] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { connected, user, chat, activeUsers } = useContext(
    SocketContext
  ) as SocketContextType;

  const sendMessage = async () => {
    if (msg && connected) {
      const message: IMsg = {
        user,
        msg,
      };

      try {
        const res = await fetch('/api/conversation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });

        if (res.status === 200) {
          setMsg('');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  return (
    <main className="flex flex-1">
      <div className="sm:mx-auto mx-1 max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-1">
          {chat.length ? (
            chat.map((chat, index) => (
              <div key={index} className="flex gap-3 items-center">
                <div
                  className={`${
                    chat.user === user ? 'text-gray-800' : 'text-green-600'
                  } text-sm w-20 text-ellipsis overflow-hidden text-right`}
                  data-te-toggle="tooltip"
                  data-te-placement="top"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  title={chat.user === user ? 'Me' : chat.user}
                >
                  {chat.user === user ? 'Me' : chat.user}
                </div>
                :<pre className="text-sm flex-1">{chat.msg}</pre>
              </div>
            ))
          ) : (
            <div>No Chat</div>
          )}
        </div>
        <div className="flex items-center justify-between gap-5 sticky bottom-[1.5rem] left-0 right-0 bg-white py-1">
          <textarea
            ref={inputRef}
            name="message"
            onChange={(e) => setMsg(e.target.value)}
            className="min-h-[40px] max-h-[40px] flex-1 p-2 rounded outline-none bg-slate-200 text-sm"
            placeholder="Enter Here!"
            onKeyDown={handleKeyDown}
            value={msg}
          />
          <Image
            onClick={sendMessage}
            src={SendOutline}
            alt="send picture"
            width={25}
            height={25}
            className="cursor-pointer"
          />
        </div>
      </div>
    </main>
  );
}
