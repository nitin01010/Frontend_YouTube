import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Subscriptions = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.success) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="ml-0 sm:ml-21 rounded">
      <div className="element-with-scrollbar flex items-center border-b border-t border-gray-700 overflow-x-scroll gap-5 px-2 h-[70px]">
        <div className="w-[50px] h-[50px] mt-2 min-w-[50px] cursor-pointer bg-white shadow border-none outline-none rounded-full" />
      </div>
      <div className="flex justify-center items-center h-[600px]">
        <p>Welcome</p>
      </div>
    </div>
  );
};

export default Subscriptions;
