import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setReceiverId } from "../redux/messageSlice";

const Chatlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Fetch user and sender list from Redux
  const { user } = useSelector((state) => state.auth);
  const { allreceivermessagesID } = useSelector((state) => state.message);
  // ✅ On click, set receiver and navigate
  const chathandler = (e) => {
    const userId = e.currentTarget.getAttribute("data-id");
    dispatch(setReceiverId(userId));
    navigate(`/userChat/${userId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 mt-[60px]">
      <div className="max-w-md mx-auto bg-white rounded shadow">
        <h1 className="text-xl font-semibold p-4 border-b">Chats</h1>

        {allreceivermessagesID?.length === 0 ? (
          <p className="text-center text-gray-500 p-4">No chats yet.</p>
        ) : (
          allreceivermessagesID?.map((user, index) => (
            <div
              key={user?._id}
              data-id={user?._id}
              onClick={chathandler}
              className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
            >
              <img
                src={`https://i.pravatar.cc/150?img=${index + 10}`} // 👤 Random avatar
                alt={user.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="font-medium">{user?.name}</h2>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 truncate w-48">
                    Click to chat
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Chatlist;
