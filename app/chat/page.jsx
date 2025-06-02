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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const messagesEndRef = useRef(null);

    // Get current user data from localStorage
    const getCurrentUser = () => {
        if (typeof window !== 'undefined') {
            const userData = localStorage.getItem('userData');
            return userData ? JSON.parse(userData) : null;
        }
        return null;
    };

    // Get token from localStorage
    const getToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('accessToken');
        }
        return null;
    };

    // API Headers
    const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `${getToken()}`
    });

    // Initialize current user on component mount
    useEffect(() => {
        const user = getCurrentUser();
        setCurrentUser(user);
    }, []);

    // Sample users data - THIS NEEDS TO BE REPLACED WITH REAL USER DATA FROM API
    const [users, setUsers] = useState([
        {
            id: "683d5b6057cebd2fc305be24",
            name: "John Smith",
            email: "john@example.com",
            avatar: "/api/placeholder/40/40",
            isOnline: true,
            lastSeen: "just now"
        },
        {
            id: "683d5b6057cebd2fc305be24",
            name: "Sarah Johnson", 
            email: "sarah@example.com",
            avatar: "/api/placeholder/40/40",
            isOnline: false,
            lastSeen: "2 hours ago"
        },
        // Add more users as needed
    ]);

    // Conversations state - will be populated dynamically based on messages
    const [conversations, setConversations] = useState([]);
    
    // Messages state - will be populated from API
    const [messages, setMessages] = useState([]);

    // Fetch messages for a specific user (this creates/finds conversation)
    const fetchMessages = async (userId) => {
        try {
            setLoading(true);
            setError('');
            
            const token = getToken();
            if (!token) {
                setError('No authentication token found');
                return;
            }

            // Use the dynamic userId parameter instead of hardcoded value
            const response = await fetch(`https://royolex.vercel.app/api/v1/message/${userId}`, {
                method: 'GET',
                headers: getHeaders()
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Transform API data to match our component structure
            const transformedMessages = data.map(msg => ({
                id: msg._id,
                sender_id: msg.senderId,
                receiver_id: msg.reciverId,
                message: msg.messages,
                sent_at: new Date(msg.sent_at).getTime(),
                is_read: msg.is_read,
                conversationId: msg.conversationId,
                createdAt: msg.createdAt,
                updatedAt: msg.updatedAt
            }));

            // Update messages for this specific conversation
            setMessages(prevMessages => {
                // Remove old messages for this conversation
                const filteredMessages = prevMessages.filter(msg => 
                    !(
                        (msg.sender_id === userId && msg.receiver_id === currentUser?.id) ||
                        (msg.sender_id === currentUser?.id && msg.receiver_id === userId)
                    )
                );
                // Add new messages for this conversation
                return [...filteredMessages, ...transformedMessages];
            });

            return transformedMessages;
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError('Failed to load messages');
            return [];
        } finally {
            setLoading(false);
        }
    };

    // Send message function
    const sendMessage = async (receiverId, messageText) => {
        try {
            setLoading(true);
            setError('');
            
            const token = getToken();
            if (!token) {
                setError('No authentication token found');
                return;
            }

            // Use the dynamic receiverId parameter
            const response = await fetch(`https://royolex.vercel.app/api/v1/message/send/${receiverId}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    messages: messageText
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Transform the response to match our component structure
            const newMessage = {
                id: data._id,
                sender_id: data.senderId,
                receiver_id: data.reciverId,
                message: data.messages,
                sent_at: new Date(data.sent_at).getTime(),
                is_read: data.is_read,
                conversationId: data.conversationId,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt
            };

            // Add the new message to our messages state
            setMessages(prevMessages => [...prevMessages, newMessage]);

            // Update conversations list
            updateConversationsList();

            return data;
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Update conversations list based on messages
    const updateConversationsList = () => {
        if (!currentUser) return;

        // Group messages by conversation partners
        const conversationMap = new Map();

        messages.forEach(msg => {
            // Determine the other user in the conversation
            const otherUserId = msg.sender_id === currentUser.id ? msg.receiver_id : msg.sender_id;
            
            if (!conversationMap.has(otherUserId)) {
                conversationMap.set(otherUserId, {
                    otherUserId,
                    messages: [],
                    lastMessage: null,
                    lastTime: 0,
                    unreadCount: 0
                });
            }

            const conversation = conversationMap.get(otherUserId);
            conversation.messages.push(msg);
            
            // Update last message if this message is newer
            if (msg.sent_at > conversation.lastTime) {
                conversation.lastMessage = msg;
                conversation.lastTime = msg.sent_at;
            }

            // Count unread messages (messages sent by the other user that are not read)
            if (msg.sender_id !== currentUser.id && !msg.is_read) {
                conversation.unreadCount++;
            }
        });

        // Convert to conversations array
        const conversationsArray = Array.from(conversationMap.values()).map(conv => {
            const otherUser = users.find(u => u.id === conv.otherUserId);
            const formattedTime = formatMessageTime(conv.lastTime);

            return {
                id: conv.lastMessage?.conversationId || `temp-${conv.otherUserId}`,
                userId: conv.otherUserId,
                user: otherUser || {
                    id: conv.otherUserId,
                    name: "Unknown User",
                    email: "",
                    avatar: "/api/placeholder/40/40",
                    isOnline: false,
                    lastSeen: "unknown"
                },
                messages: conv.messages,
                unreadCount: conv.unreadCount,
                lastMessage: {
                    text: conv.lastMessage?.message || "",
                    time: formattedTime.time,
                    date: formattedTime.date,
                    isRead: conv.lastMessage?.is_read || false
                },
                lastTime: conv.lastTime
            };
        });

        // Sort by last message time (newest first)
        conversationsArray.sort((a, b) => b.lastTime - a.lastTime);
        
        setConversations(conversationsArray);
    };

    // Update conversations when messages or users change
    useEffect(() => {
        updateConversationsList();
    }, [messages, users, currentUser]);

    // Helper function to format message time
    const formatMessageTime = (timestamp) => {
        if (!timestamp) return { time: '', date: '' };
        
        const date = new Date(timestamp);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let dateStr;
        if (date >= today) {
            dateStr = 'Today';
        } else if (date >= yesterday) {
            dateStr = 'Yesterday';
        } else {
            dateStr = date.toLocaleDateString();
        }

        return { time: timeStr, date: dateStr };
    };

    // Check if the screen is mobile size
    useEffect(() => {
        const checkIfMobile = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);

            if (isMobileView && selectedChat) {
                setShowChatList(false);
            } else {
                setShowChatList(true);
            }
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, [selectedChat]);

    // Scroll to bottom of messages
    useEffect(() => {
        if (selectedChat && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedChat, messages]);

    // Set the first conversation as selected by default
    useEffect(() => {
        if (conversations.length > 0 && !selectedChat) {
            setSelectedChat(conversations[0]);
            if (isMobile) {
                setShowChatList(false);
            }
        }
    }, [conversations, selectedChat, isMobile]);

    // Handle toggle chat list visibility
    const toggleChatList = () => {
        setShowChatList(!showChatList);
    };

    // Handle send message
    const handleSendMessage = async () => {
        if (message.trim() === '' || !selectedChat || !currentUser) return;

        try {
            await sendMessage(selectedChat.userId, message.trim());
            setMessage('');
        } catch (error) {
            console.error('Failed to send message:', error);
            setError('Failed to send message. Please try again.');
        }
    };

    // Handle chat selection
    const handleChatSelect = async (chat) => {
        setSelectedChat(chat);
        
        // Fetch messages for this conversation
        await fetchMessages(chat.userId);

        // Mark messages as read (you might want to add a separate API for this)
        const updatedMessages = messages.map(message => {
            if ((message.sender_id === chat.userId || message.receiver_id === chat.userId) && 
                message.sender_id !== currentUser?.id) {
                return { ...message, is_read: true };
            }
            return message;
        });
        setMessages(updatedMessages);

        if (isMobile) {
            setShowChatList(false);
        }
    };

    // Handle starting a new chat with a user
    const handleStartChat = async (userId) => {
        // Find if conversation already exists
        const existingConversation = conversations.find(conv => conv.userId === userId);
        
        if (existingConversation) {
            handleChatSelect(existingConversation);
        } else {
            // Create a new temporary conversation
            const user = users.find(u => u.id === userId);
            const newConversation = {
                id: `temp-${userId}`,
                userId: userId,
                user: user,
                messages: [],
                unreadCount: 0,
                lastMessage: {
                    text: "",
                    time: "",
                    date: "",
                    isRead: true
                },
                lastTime: 0
            };
            
            setSelectedChat(newConversation);
            
            // Fetch messages for this new conversation
            await fetchMessages(userId);
            
            if (isMobile) {
                setShowChatList(false);
            }
        }
    };

    // Filter conversations based on search query
    const filteredConversations = conversations.filter(conversation =>
        conversation.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Get current conversation messages
    const getCurrentMessages = () => {
        if (!selectedChat || !currentUser) return [];
        
        return messages.filter(msg => 
            (msg.sender_id === selectedChat.userId && msg.receiver_id === currentUser.id) ||
            (msg.sender_id === currentUser.id && msg.receiver_id === selectedChat.userId)
        ).sort((a, b) => a.sent_at - b.sent_at);
    };

    if (!currentUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <p className="text-gray-500">Loading user data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100 overflow-hidden">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
                    {error}
                </div>
            )}
            
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
                    
                    {/* Search */}
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

                    {/* Available Users Section - For starting new chats */}
                    <div className="p-3 border-b border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Start New Chat</h4>
                        <div className="max-h-32 overflow-y-auto">
                            {users.filter(user => user.id !== currentUser.id).map(user => (
                                <div
                                    key={user.id}
                                    className="flex items-center p-2 cursor-pointer hover:bg-gray-50 rounded"
                                    onClick={() => handleStartChat(user.id)}
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden">
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <span className="ml-2 text-sm text-gray-700">{user.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Conversations List */}
                    <div className="flex-1 overflow-y-auto">
                        {loading && <div className="p-4 text-center text-gray-500">Loading...</div>}
                        {filteredConversations.length === 0 && !loading && (
                            <div className="p-4 text-center text-gray-500">No conversations yet</div>
                        )}
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
                                            src={chat.user?.avatar || "/api/placeholder/40/40"}
                                            alt={chat.user?.name || "User"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {chat.user?.isOnline && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div className="ml-3 flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-semibold text-gray-900">{chat.user?.name || "Unknown User"}</h3>
                                        <span className="text-xs text-gray-500">{chat.lastMessage.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                                            {chat.lastMessage.text || "Start a conversation"}
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
                                            src={selectedChat.user?.avatar || "/api/placeholder/40/40"}
                                            alt={selectedChat.user?.name || "User"}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="font-semibold text-gray-900">{selectedChat.user?.name || "Unknown User"}</h3>
                                        <p className="text-xs text-gray-500">
                                            {selectedChat.user?.isOnline ? 'Online' : `Last seen ${selectedChat.user?.lastSeen}`}
                                        </p>
                                    </div>
                                </div>
                                <button className="text-gray-500 p-2 rounded-full hover:bg-gray-100">
                                    <MoreVertical size={20} />
                                </button>
                            </div>

                            {/* Chat messages */}
                            <div className="flex-1 overflow-y-auto p-4 bg-[#e5ded8] pb-16 mb-16 md:mb-0 md:pb-4">
                                {loading && <div className="text-center text-gray-500">Loading messages...</div>}
                                {getCurrentMessages().map((msg) => {
                                    const formattedTime = formatMessageTime(msg.sent_at);
                                    const isCurrentUser = msg.sender_id === currentUser.id;

                                    return (
                                        <div
                                            key={msg.id}
                                            className={`max-w-xs md:max-w-md rounded-lg p-3 mb-2 ${
                                                isCurrentUser
                                                    ? 'bg-orange-100 ml-auto rounded-tr-none'
                                                    : 'bg-white mr-auto rounded-tl-none'
                                            }`}
                                        >
                                            <p className="text-gray-800">{msg.message}</p>
                                            <div className="flex items-center justify-end mt-1 space-x-1">
                                                <span className="text-xs text-gray-500">{formattedTime.time}</span>
                                                {isCurrentUser && (
                                                    <div className="text-gray-400">
                                                        {msg.is_read ? (
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
                                        disabled={loading}
                                    />
                                    <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 mr-1">
                                        <Smile size={20} />
                                    </button>
                                    <button
                                        className="p-2 bg-orange-500 text-white rounded-full disabled:opacity-50"
                                        onClick={handleSendMessage}
                                        disabled={message.trim() === '' || loading}
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
                                <p className="text-sm text-gray-400">Choose a user from the list to begin</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}