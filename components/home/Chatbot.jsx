"use client"
import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const Chatbot = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

  const toggleChatVisibility = () => {
    setIsChatVisible(prevState => !prevState);
  };

  // Add chatbot script on component mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://departure-away-travel-ai-assistant.vercel.app';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up on component unmount
    };
  }, []);

  return (
    <>
      {/* The button to toggle the chat window */}
      <button
        onClick={toggleChatVisibility}
        className="fixed bottom-5 right-5 z-50 p-4 bg-rose-500 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        <MessageCircle className="h-6 w-6" /> 
    
      </button>

      {/* Chatbot window that can be shown/hidden */}
      {isChatVisible && (
        <div className={`fixed bottom-20 right-5 z-50 w-80 h-96 border border-gray-300 shadow-lg rounded-lg bg-white transition-all transform ${isChatVisible ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Replace this with your actual chatbot embed or iframe */}
          <iframe
            src="https://departure-away-travel-ai-assistant.vercel.app" 
            width="100%"
            height="100%"
            frameBorder="0"
            title="Chatbot"
            className="rounded-lg"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default Chatbot;
