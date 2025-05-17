import { useState, useEffect, useRef } from 'react';
import { X, Send, Phone, Video, MoreVertical, Search, Paperclip, Smile } from 'lucide-react';

export default function ChatPopup({ isOpen, onClose }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello there! How can I help you today?', sender: 'them', time: '10:30 AM' },
        { id: 2, text: 'I need some information about my recent order.', sender: 'me', time: '10:32 AM' },
        { id: 3, text: 'Sure, I can help with that. Could you provide your order number?', sender: 'them', time: '10:33 AM' },
    ]);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Scroll to bottom of messages whenever messages change
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            inputRef.current?.focus();
        }
    }, [messages, isOpen]);

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                sender: 'me',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages([...messages, newMessage]);
            setMessage('');

            // Simulate a reply after a short delay
            setTimeout(() => {
                const reply = {
                    id: messages.length + 2,
                    text: 'Thanks for your message. Our team will get back to you shortly.',
                    sender: 'them',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, reply]);
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
            {/* Chat header */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 font-medium">
                        S
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium">Support</h3>
                        <p className="text-xs text-gray-500">Online</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="text-gray-500 hover:text-gray-700">
                        <Phone size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                        <Video size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                        <MoreVertical size={16} />
                    </button>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`mb-3 flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                                msg.sender === 'me'
                                    ? 'bg-blue-500 text-white rounded-br-none'
                                    : 'bg-white border border-gray-200 rounded-bl-none'
                            }`}
                        >
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                                {msg.time}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="px-4 py-3 bg-white border-t border-gray-200">
                <div className="flex items-center">
                    <button className="text-gray-500 mr-2">
                        <Smile size={20} />
                    </button>
                    <button className="text-gray-500 mr-2">
                        <Paperclip size={20} />
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                        className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                        onClick={handleSendMessage}
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}