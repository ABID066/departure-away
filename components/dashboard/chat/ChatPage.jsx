"use client"

import { useState, useEffect, useRef } from 'react';
import { Search, Send, MoreVertical, Check, CheckCheck, Paperclip, Smile, Menu } from 'lucide-react';
import Link from 'next/link';
import logo from "@/public/images/Logo.png";
import Image from 'next/image';

export default function ChatPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showChatList, setShowChatList] = useState(true);
    const messagesEndRef = useRef(null);

    // Sample users data
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "John Smith",
            avatar: "/api/placeholder/40/40",
            isOnline: true,
            lastSeen: "just now"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            avatar: "/api/placeholder/40/40",
            isOnline: false,
            lastSeen: "2 hours ago"
        },
        {
            id: 3,
            name: "Michael Brown",
            avatar: "/api/placeholder/40/40",
            isOnline: true,
            lastSeen: "just now"
        },
        {
            id: 4,
            name: "Emily Davis",
            avatar: "/api/placeholder/40/40",
            isOnline: false,
            lastSeen: "3 days ago"
        },
        {
            id: 5,
            name: "David Wilson",
            avatar: "/api/placeholder/40/40",
            isOnline: false,
            lastSeen: "1 week ago"
        }
    ]);

    // Sample data for chats based on your schema
    const [chats, setChats] = useState([
        {
            id: 1,
            user1_id: 999, // Admin ID
            user2_id: 1,  // John Smith
            last_message: "I need help with my booking, the flight number seems incorrect",
            last_time: new Date(2025, 4, 18, 10, 42).getTime(), // Today, 10:42 AM
            unreadCount: 3
        },
        {
            id: 2,
            user1_id: 999, // Admin ID
            user2_id: 2,  // Sarah Johnson
            last_message: "Thank you for your help with my visa application!",
            last_time: new Date(2025, 4, 17, 14, 35).getTime(), // Yesterday, 2:35 PM
            unreadCount: 0
        },
        {
            id: 3,
            user1_id: 999, // Admin ID
            user2_id: 3,  // Michael Brown
            last_message: "Can you recommend a good hotel in Paris?",
            last_time: new Date(2025, 4, 17, 17, 30).getTime(), // Yesterday, 5:30 PM
            unreadCount: 2
        },
        {
            id: 4,
            user1_id: 999, // Admin ID
            user2_id: 4,  // Emily Davis
            last_message: "I've received the refund. Thank you for your assistance!",
            last_time: new Date(2025, 4, 13, 14, 30).getTime(), // Monday, 2:30 PM
            unreadCount: 0
        },
        {
            id: 5,
            user1_id: 999, // Admin ID
            user2_id: 5,  // David Wilson
            last_message: "The tour was amazing! Thank you for the recommendation!",
            last_time: new Date(2025, 4, 10, 20, 30).getTime(), // 05/10/2025, 8:30 PM
            unreadCount: 0
        }
    ]);

    // Sample data for messages based on your schema
    const [messages, setMessages] = useState([
        // John Smith conversation
        {
            id: 1,
            chat_id: 1,
            sender_id: 1,
            message: "Hello, I've booked a flight to Dubai but there seems to be an issue with my booking",
            sent_at: new Date(2025, 4, 18, 10, 30).getTime(), // Today, 10:30 AM
            is_read: true
        },
        {
            id: 2,
            chat_id: 1,
            sender_id: 1,
            message: "The confirmation email shows a different flight number than what I selected",
            sent_at: new Date(2025, 4, 18, 10, 31).getTime(), // Today, 10:31 AM
            is_read: true
        },
        {
            id: 3,
            chat_id: 1,
            sender_id: 999, // Admin
            message: "Hello John, I'll help you with this issue. Can you please provide your booking reference number?",
            sent_at: new Date(2025, 4, 18, 10, 35).getTime(), // Today, 10:35 AM
            is_read: true
        },
        {
            id: 4,
            chat_id: 1,
            sender_id: 1,
            message: "Sure, it's DPT78945",
            sent_at: new Date(2025, 4, 18, 10, 40).getTime(), // Today, 10:40 AM
            is_read: true
        },
        {
            id: 5,
            chat_id: 1,
            sender_id: 1,
            message: "I need help with my booking, the flight number seems incorrect",
            sent_at: new Date(2025, 4, 18, 10, 42).getTime(), // Today, 10:42 AM
            is_read: false
        },

        // Sarah Johnson conversation
        {
            id: 6,
            chat_id: 2,
            sender_id: 2,
            message: "Hi, I'm planning to travel to Europe next month and I need help with my visa application",
            sent_at: new Date(2025, 4, 17, 14, 15).getTime(), // Yesterday, 2:15 PM
            is_read: true
        },
        {
            id: 7,
            chat_id: 2,
            sender_id: 999, // Admin
            message: "Hello Sarah, I'd be happy to help you with your visa application. Which country are you planning to visit?",
            sent_at: new Date(2025, 4, 17, 14, 20).getTime(), // Yesterday, 2:20 PM
            is_read: true
        },
        {
            id: 8,
            chat_id: 2,
            sender_id: 2,
            message: "I'm planning to visit France, Italy, and Spain",
            sent_at: new Date(2025, 4, 17, 14, 25).getTime(), // Yesterday, 2:25 PM
            is_read: true
        },
        {
            id: 9,
            chat_id: 2,
            sender_id: 999, // Admin
            message: "Great! You'll need a Schengen visa for these countries. I've sent you an email with the application process and required documents.",
            sent_at: new Date(2025, 4, 17, 14, 30).getTime(), // Yesterday, 2:30 PM
            is_read: true
        },
        {
            id: 10,
            chat_id: 2,
            sender_id: 2,
            message: "Thank you for your help with my visa application!",
            sent_at: new Date(2025, 4, 17, 14, 35).getTime(), // Yesterday, 2:35 PM
            is_read: true
        },

        // Other messages for other conversations...
        // (shortened for brevity)
    ]);

    // Computed state for conversations - combines chats, users, and messages data
    const [conversations, setConversations] = useState([]);

    // Process conversations data from the raw data sources
    useEffect(() => {
        // Combine chats, users, and messages to create conversations object
        const processedConversations = chats.map(chat => {
            // Find the user for this chat (the non-admin user)
            const user = users.find(u => u.id === chat.user2_id);

            // Get messages for this chat
            const chatMessages = messages.filter(m => m.chat_id === chat.id);

            // Count unread messages
            const unreadCount = chatMessages.filter(m => !m.is_read && m.sender_id !== 999).length;

            // Format time for display
            const formattedTime = formatMessageTime(chat.last_time);

            return {
                id: chat.id,
                user,
                unreadCount,
                lastMessage: {
                    text: chat.last_message,
                    time: formattedTime.time,
                    date: formattedTime.date,
                    isRead: chatMessages.find(m => m.message === chat.last_message)?.is_read ?? false
                },
                messages: chatMessages
            };
        });

        // Sort conversations by last message time (newest first)
        const sortedConversations = processedConversations.sort((a, b) => {
            const chatA = chats.find(c => c.id === a.id);
            const chatB = chats.find(c => c.id === b.id);
            return chatB.last_time - chatA.last_time;
        });

        setConversations(sortedConversations);
    }, [chats, users, messages]);

    // Helper function to format message time
    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Format time (12-hour format)
        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Determine date display
        let dateStr;
        if (date >= today) {
            dateStr = 'Today';
        } else if (date >= yesterday) {
            dateStr = 'Yesterday';
        } else {
            // For dates more than a day old, show MM/DD/YYYY
            dateStr = date.toLocaleDateString();
        }

        return { time: timeStr, date: dateStr };
    };

    // Check if the screen is mobile size on initial load and when window resizes
    useEffect(() => {
        const checkIfMobile = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);

            // If switching to mobile and a chat is selected, hide the chat list
            if (isMobileView && selectedChat) {
                setShowChatList(false);
            } else {
                // On desktop, always show chat list
                setShowChatList(true);
            }
        };

        // Call on initial load
        checkIfMobile();

        // Set up event listener for window resize
        window.addEventListener('resize', checkIfMobile);

        // Clean up event listener
        return () => window.removeEventListener('resize', checkIfMobile);
    }, [selectedChat]);

    // Scroll to bottom of messages when new message is added
    useEffect(() => {
        if (selectedChat && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedChat, messages]);

    // Set the first conversation as selected by default
    useEffect(() => {
        if (conversations.length > 0 && !selectedChat) {
            setSelectedChat(conversations[0]);
            // On mobile, hide the chat list when a chat is selected initially
            if (isMobile) {
                setShowChatList(false);
            }
        }
    }, [conversations, selectedChat, isMobile]);

    // Handle back button click on mobile
    const handleBackClick = () => {
        setShowChatList(true);
    };

    // Handle toggle chat list visibility
    const toggleChatList = () => {
        setShowChatList(!showChatList);
    };

    const handleSendMessage = () => {
        if (message.trim() === '' || !selectedChat) return;

        const now = new Date();
        const messageId = messages.length + 1;

        // Create new message
        const newMessage = {
            id: messageId,
            chat_id: selectedChat.id,
            sender_id: 999, // Admin ID
            message: message,
            sent_at: now.getTime(),
            is_read: false
        };

        // Update messages
        setMessages([...messages, newMessage]);

        // Update chat with new last message
        const updatedChats = chats.map(chat => {
            if (chat.id === selectedChat.id) {
                return {
                    ...chat,
                    last_message: message,
                    last_time: now.getTime()
                };
            }
            return chat;
        });

        setChats(updatedChats);
        setMessage('');
    };

    const handleChatSelect = (chat) => {
        // Mark all messages as read when selecting a chat
        const updatedMessages = messages.map(message => {
            if (message.chat_id === chat.id && message.sender_id !== 999) {
                return {
                    ...message,
                    is_read: true
                };
            }
            return message;
        });

        setMessages(updatedMessages);

        // Update unread count in chats
        const updatedChats = chats.map(c => {
            if (c.id === chat.id) {
                return {
                    ...c,
                    unreadCount: 0
                };
            }
            return c;
        });

        setChats(updatedChats);

        // Set the selected chat
        setSelectedChat(chat);

        // On mobile, hide the chat list when a chat is selected
        if (isMobile) {
            setShowChatList(false);
        }
    };

    // Filter conversations based on search query
    const filteredConversations = conversations.filter(conversation =>
        conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
            {/* Chat interface */}
            <div className="flex-1 flex overflow-hidden bg-gray-100">
                {/* Chat list (left side) */}
                <div
                    className={`
                        ${isMobile ? 'absolute z-10 h-full w-full' : 'w-2/5 lg:w-1/3'} 
                        bg-white border-r border-gray-200 flex flex-col
                        ${isMobile && !showChatList ? 'hidden' : 'block'}
                    `}
                >
                    {/* Logo at the top */}
                    <div className="p-4 border-b border-gray-200">
                        <Link href="/dashboard" className="flex items-center">
                            <Image src={logo} alt="DepartureAway" className="max-w-[250px]" />
                        </Link>
                    </div>
                    <div className="p-3 border-b border-gray-200">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <div className="absolute left-3 top-2.5 text-gray-400">
                                <Search size={18} />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.map((chat) => (
                            <div
                                key={chat.id}
                                className={`flex items-center p-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                                    selectedChat && selectedChat.id === chat.id ? 'bg-orange-50' : ''
                                }`}
                                onClick={() => handleChatSelect(chat)}
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full overflow-hidden">
                                        <img
                                            src={chat.user.avatar}
                                            alt={chat.user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {chat.user.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div className="ml-3 flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-900">{chat.user.name}</h3>
                                        <span className="text-xs text-gray-500">{chat.lastMessage.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                                            {chat.lastMessage.text}
                                        </p>
                                        {chat.unreadCount > 0 && (
                                            <div className="ml-2 flex-shrink-0 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                                {chat.unreadCount}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat content (right side) */}
                <div className={`w-full md:w-3/5 lg:w-2/3 flex flex-col bg-gray-50 relative ${isMobile && !selectedChat && showChatList ? 'hidden' : 'block'}`}>
                    {selectedChat ? (
                        <>
                            {/* Chat header */}
                            <div className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
                                <div className="flex items-center">
                                    {isMobile && (
                                        <button
                                            className="mr-2 text-gray-500 p-2 rounded-full hover:bg-gray-100"
                                            onClick={toggleChatList}
                                            aria-label="Toggle chat list"
                                        >
                                            <Menu size={20} />
                                        </button>
                                    )}
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img
                                            src={selectedChat.user.avatar}
                                            alt={selectedChat.user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="font-semibold text-gray-900">{selectedChat.user.name}</h3>
                                        <p className="text-xs text-gray-500">
                                            {selectedChat.user.isOnline ? 'Online' : `Last seen ${selectedChat.user.lastSeen}`}
                                        </p>
                                    </div>
                                </div>
                                <button className="text-gray-500 p-2 rounded-full hover:bg-gray-100">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            {/* Chat messages */}
                            <div className="flex-1 overflow-y-auto p-4 bg-[#e5ded8] pb-16 mb-16 md:mb-0 md:pb-4">
                                {selectedChat.messages.map((msg) => {
                                    // Get the appropriate message from our messages array
                                    const messageDetails = messages.find(m => m.id === msg.id);
                                    if (!messageDetails) return null;

                                    // Format the time
                                    const formattedTime = formatMessageTime(messageDetails.sent_at);

                                    return (
                                        <div
                                            key={messageDetails.id}
                                            className={`max-w-xs md:max-w-md rounded-lg p-3 mb-2 ${
                                                messageDetails.sender_id === 999
                                                    ? 'bg-orange-100 ml-auto rounded-tr-none'
                                                    : 'bg-white mr-auto rounded-tl-none'
                                            }`}
                                        >
                                            <p className="text-gray-800">{messageDetails.message}</p>
                                            <div className="flex items-center justify-end mt-1 space-x-1">
                                                <span className="text-xs text-gray-500">{formattedTime.time}</span>
                                                {messageDetails.sender_id === 999 && (
                                                    <div className="text-gray-400">
                                                        {messageDetails.is_read ? (
                                                            <CheckCheck size={14} className="text-blue-500" />
                                                        ) : (
                                                            <Check size={14} />
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                {/* Add an empty div to use as a ref for scrolling to bottom */}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat input */}
                            <div className="p-3 bg-white border-t border-gray-200 absolute bottom-0 left-0 right-0 md:relative">
                                <div className="flex items-center">
                                    <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                                        <Paperclip size={20} />
                                    </button>
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-2 bg-gray-100 border border-transparent rounded-lg mx-2 focus:outline-none focus:border-gray-300"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleSendMessage();
                                            }
                                        }}
                                    />
                                    <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 mr-1">
                                        <Smile size={20} />
                                    </button>
                                    <button
                                        className="p-2 bg-orange-500 text-white rounded-full"
                                        onClick={handleSendMessage}
                                        disabled={message.trim() === ''}
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-gray-500 mb-4">Select a conversation to start chatting</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}