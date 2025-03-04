import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { FaTimes, FaComments } from 'react-icons/fa';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(true);
  const [messages, setMessages] = useState<{ text: string; fromBot: boolean }[]>([
    { text: "Hi there! Welcome to FastFlight. How can I assist you today?", fromBot: true }
  ]);
  const [input, setInput] = useState<string>('');
  const [hasNewMessages, setHasNewMessages] = useState<boolean>(true);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const incomingSoundUrl = 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3';
  const outgoingSoundUrl = 'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3';

  const incomingSoundRef = useRef<HTMLAudioElement>(new Audio(incomingSoundUrl));
  const outgoingSoundRef = useRef<HTMLAudioElement>(new Audio(outgoingSoundUrl));

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowMessage(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowMessage(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) return;

    const intervalId = setInterval(() => {
      setShowMessage((prev) => !prev);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    if (!isOpen && messages.length > 1 && messages[messages.length - 1].fromBot) {
      setHasNewMessages(true);
      incomingSoundRef.current.play();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (input.trim()) {
      outgoingSoundRef.current.play();

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, fromBot: false }
      ]);

      const botResponse = getChatbotResponse(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, fromBot: true }
      ]);

      setInput('');
      setHasNewMessages(true);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const getChatbotResponse = (message: string) => {
    // Handle common greetings
    const greetings = ['hi', 'hello', 'hey', 'howdy', 'hola'];
    const farewells = ['bye', 'goodbye', 'see you', 'later'];

    if (greetings.some((greet) => message.toLowerCase().includes(greet))) {
      return "Hello! How can I help you today?";
    }

    if (farewells.some((farewell) => message.toLowerCase().includes(farewell))) {
      return "Goodbye! Have a great day ahead!";
    }

    if (message.toLowerCase().includes('help')) {
      return "I’m here to assist you with flight bookings, pricing, seat availability, and more. What do you need help with?";
    }

    if (message.toLowerCase().includes('flight')) {
      return "I can help you find available flights. Please provide your departure city, destination city, and travel dates.";
    }

    if (message.toLowerCase().includes('pricing') || message.toLowerCase().includes('price')) {
      return "Our flight prices vary depending on the destination and travel dates. Can you tell me where you'd like to go and when?";
    }

    if (message.toLowerCase().includes('seats')) {
      return "Once you provide your travel details, I can help you check the available seats.";
    }

    if (message.toLowerCase().includes('luggage') || message.toLowerCase().includes('baggage')) {
      return "We allow one carry-on and one checked bag per passenger. Would you like to know about additional baggage charges?";
    }

    if (message.toLowerCase().includes('book') || message.toLowerCase().includes('reservation')) {
      return "I can assist you with booking flights. Please provide your departure city, destination city, and travel dates.";
    }

    if (message.toLowerCase().includes('thank you')) {
      return "You're welcome! Feel free to ask if you need any more assistance.";
    }

    return "I'm sorry, I didn't quite understand that. Can you please rephrase your question? I can help with flight bookings or other queries.";
  };

  return (
    <div className="fixed bottom-6 right-4" ref={chatbotRef}>
      {/* "Support" Message Container */}
      {!isOpen && showMessage && (
        <div className="absolute bottom-20 right-2 z-50 flex items-center space-x-2 animate-fade-bounce">
          <div className="bg-gray-900 text-white p-2 px-4 rounded-lg shadow-lg flex items-center whitespace-nowrap">
            <span>Need help with booking a flight?</span>
          </div>
        </div>
      )}

      {/* Chatbox Container */}
      <div className={`relative transition-all duration-300 ${isOpen ? 'w-80 h-80' : 'w-16 h-16'}`}>
        {isOpen ? (
          <div className="relative w-full h-full bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col">
            <button
              onClick={toggleChatbot}
              className="absolute top-2 right-2 text-white hover:bg-gray-700 rounded-full p-2 transition-colors"
            >
              <FaTimes size={20} />
            </button>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {/* Render chat messages */}
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.fromBot ? 'justify-start' : 'justify-end'}`}>
                  <div
                    className={`max-w-[60%] p-3 mb-2 rounded-lg text-white ${msg.fromBot ? 'bg-gray-700' : 'bg-blue-500'} ${msg.fromBot ? 'mr-2' : 'ml-2'}`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {/* Invisible div to scroll to */}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center mt-auto">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about flights, pricing, or bookings..."
                className="w-full p-2 rounded-md border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                onClick={handleSend}
                className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={toggleChatbot}
            className="relative flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full shadow-lg hover:bg-black active:bg-gray-900 transition-colors transform hover:scale-105 active:scale-95 animate-wave"
          >
            <FaComments size={24} />
            {hasNewMessages && (
              <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                !
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
