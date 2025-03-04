import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

interface SignUpModalProps {
  onClose: () => void;
  onSwitchToSignIn: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose, onSwitchToSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUserWithEmailAndPassword, , loading] = useCreateUserWithEmailAndPassword(auth);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firebaseError, setFirebaseError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return regex.test(password);
  };

  const handleSignUp = async () => {
    setEmailError('');
    setPasswordError('');
    setFirebaseError('');

    // Validation
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long and contain both letters and numbers.');
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(email, password);
      if (result?.user) {
     
        setEmail('');
        setPassword('');
        onClose();
        navigate('/');
      }
    } catch (e) {
      console.error('Sign Up Error:', e);
      setFirebaseError('An error occurred during sign up. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-8 bg-transparent text-white border border-white border-opacity-30 rounded-lg shadow-lg max-w-sm w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10">
        <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-gray-300 transition-colors duration-200">
          &times;
        </button>
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-3 mb-4 rounded outline-none placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${emailError ? 'bg-red-100 text-red-700' : 'bg-white text-black'}`}
        />
        {emailError && <p className="text-red-400 mb-4 text-center">{emailError}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-3 mb-4 rounded outline-none placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 ${passwordError ? 'bg-red-100 text-red-700' : 'bg-white text-black'}`}
        />
        {passwordError && <p className="text-red-400 mb-4 text-center">{passwordError}</p>}
        {firebaseError && <p className="text-red-400 mt-4 text-center">{firebaseError}</p>}
        <button onClick={handleSignUp} className="w-full p-3 bg-indigo-600 rounded hover:bg-indigo-500 transition-colors duration-200" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <button onClick={onSwitchToSignIn} className="text-blue-400 hover:underline transition-colors duration-200">
            Sign In here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
