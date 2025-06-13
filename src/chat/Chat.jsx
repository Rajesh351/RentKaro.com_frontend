import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HOST } from '../assets/EndPoint';
import { USER_API_END_POINT } from '../assets/EndPoint';
const socket = io(`${HOST}`);

const ChatBox = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const chatContainerRef = useRef(null);

  const { senderID, receiverID } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !senderID) {
      navigate('/auth'); // ✅ Redirect if user not logged in
      return;
    }

    if (!receiverID) return; // ❗ Stop further execution if no receiver selected

    // ✅ Join room
    socket.emit('join', { userId: senderID });

    // ✅ Load previous messages
    axios
      .get(`${USER_API_END_POINT}/chat/${senderID}/${receiverID}`)
      .then((res) => setChat(res.data))
      .catch((err) => toast.error('Failed to load messages!'));

    // ✅ Listen for new messages
    socket.on('receive-message', (msg) => {
      const isRelevant =
        (msg.sender === senderID && msg.receiver === receiverID) ||
        (msg.sender === receiverID && msg.receiver === senderID);

      if (isRelevant) {
        setChat((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off('receive-message');
    };
  }, [senderID, receiverID]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSend = () => {
    if (message.trim() === '' || !receiverID) return;

    const newMessage = {
      sender: senderID,
      receiver: receiverID,
      message,
    };

    socket.emit('send-message', newMessage);
    setChat((prev) => [...prev, newMessage]);
    setMessage('');
  };

  // ❗ Show prompt when receiver is not selected
  if (!receiverID) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center text-gray-500 font-semibold">
        📩 Select a user to start chatting.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto border p-4 rounded mt-[80px]">
      <div
        ref={chatContainerRef}
        className="h-80 overflow-y-scroll bg-gray-100 p-2 rounded mb-2"
      >
        {chat?.length === 0 ? (
          <div className="text-center text-gray-500 mt-24">
            No messages yet. Say hello! 👋
          </div>
        ) : (
          chat?.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 flex ${msg?.sender === senderID ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-2 rounded-lg max-w-[70%] break-words ${
                  msg?.sender === senderID ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
              >
                {msg?.message}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l"
          placeholder="Type message..."
          disabled={!receiverID}
        />
        <button
          onClick={handleSend}
          className={`p-2 rounded-r ${receiverID ? 'bg-blue-500 text-white' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!receiverID}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
