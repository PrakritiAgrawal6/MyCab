import { Link, useNavigate } from 'react-router-dom';
import hcltechLogo from '../../assets/hcltech.png'; 

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-[#0033A0] to-purple-600 shadow-md">
      <div>
        <a href="/">
          <img src={hcltechLogo} alt="HCLTech Logo" className="h-8 w-auto text-white fill-current" />
        </a>
      </div>
      <div className="text-2xl text-white">
        Cab Approval System
      </div>
      <div className="flex space-x-4">
        <Link to="/booking" className="text-white hover:text-gray-200">
          Booking History
        </Link>
        <Link to="/requests" className="text-white hover:text-gray-200">
          Requests
        </Link>
        <button className="text-white hover:text-gray-200" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;