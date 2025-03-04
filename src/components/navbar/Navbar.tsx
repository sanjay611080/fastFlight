import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { auth } from "../../firebase/config"; 
import { signOut } from "firebase/auth";
import SignInModal from "../signinmodal/SignInModal";
import SignUpModal from "../signupmodal/SignUpModal";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email || '');
      } else {
        setIsLoggedIn(false);
        setUserEmail('');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <nav className={`bg-black text-white p-2 flex justify-between items-center px-6 sm:px-16 fixed w-full z-50 transition-all duration-300 shadow-md`}>
      <div className="text-xl font-bold">
        <a href="/">
          <img src="/logo.png" alt="Company Logo" width={180} height={10} />
        </a>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-8 items-center">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/about" className="hover:text-gray-400">About Us</Link>
        {isLoggedIn ? (
          <>
            <span className="text-white ">{userEmail}</span>
            <button
              className="bg-[#FFB703] px-4 py-2 text-white rounded cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="bg-[#FFB703] px-4 py-2 text-white rounded cursor-pointer"
            onClick={() => setShowSignInModal(true)}
          >
            Login
          </button>
        )}
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden flex items-center cursor-pointer">
        <button onClick={toggleMenu} className="focus:outline-none">
          {menuOpen ? (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`${
          menuOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
        } fixed top-[53px] right-0 h-[calc(100vh)] w-64 bg-black bg-opacity-90 transition-all duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col items-center justify-center py-4 space-y-8">
          <Link to="/" className="text-white text-2xl" onClick={toggleMenu}>Home</Link>
          <Link to="/about" className="text-white text-2xl" onClick={toggleMenu}>About Us</Link>
          <span className="text-white ">{userEmail}</span>
          {/* Conditionally render Login/Logout button in mobile */}
          {isLoggedIn ? (
            <button
              className="text-white text-2xl px-4 py-2 bg-[#FFB703] rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="text-white text-2xl px-4 py-2 bg-[#FFB703] rounded"
              onClick={() => setShowSignInModal(true)}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {showSignInModal && (
        <SignInModal
          isVisible={showSignInModal}
          onClose={() => setShowSignInModal(false)}
          onSwitchToSignUp={() => { setShowSignInModal(false); setShowSignUpModal(true); }}
          onSignInSuccess={() => setShowSignInModal(false)}
        />
      )}

      {showSignUpModal && (
        <SignUpModal
          onClose={() => setShowSignUpModal(false)}
          onSwitchToSignIn={() => { setShowSignUpModal(false); setShowSignInModal(true); }}
        />
      )}
    </nav>
  );
};

export default Navbar;
