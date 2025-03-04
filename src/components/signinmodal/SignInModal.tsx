import React, { useState, useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

interface SignInModalProps {
  onClose: () => void;
  onSwitchToSignUp: () => void;
  isVisible: boolean;  
  onSignInSuccess: () => void;
}
const SignInModal: React.FC<SignInModalProps> = ({
  onClose,
  onSwitchToSignUp,
  isVisible,
  onSignInSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error('Sign In Error:', error);
    }
  }, [error]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(email, password);
      if (result?.user) {
        onSignInSuccess();
        navigate('/');
      }
    } catch (e) {
      console.error('Sign In Error:', e);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative p-8 bg-transparent text-white border border-white border-opacity-30 rounded-lg shadow-lg max-w-sm w-full mx-4 sm:mx-6 md:mx-8 lg:mx-10">
        <button onClick={onClose} className="absolute top-3 right-3 text-white hover:text-gray-300 transition-colors duration-200">
          &times;
        </button>
        <h1 className="text-3xl font-semibold mb-6 text-center">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-white text-black rounded outline-none placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-white text-black rounded outline-none placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
        />
        <button onClick={handleSignIn} className="w-full p-3 bg-indigo-600 rounded hover:bg-indigo-500 transition-colors duration-200" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        {error && <p className="text-red-400 mt-4 text-center">{error.message}</p>}
        <p className="mt-4 text-center">
          Don’t have an account?{' '}
          <button onClick={onSwitchToSignUp} className="text-blue-400 hover:underline transition-colors duration-200">
            Sign Up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
