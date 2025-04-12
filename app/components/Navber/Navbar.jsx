"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import logo from '../../../public/images/Logo.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('বাংলা');

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Guiders', href: '/guiders' },
        { name: 'Exclusive', href: '/exclusive-offers' },
        { name: 'Travel', href: '/travel-packages' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const languages = [
        { name: 'বাংলা', flag: '🇧🇩' },
        { name: 'English', flag: '🇬🇧' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-transparent backdrop-blur-sm">
            <div className="container mx-auto px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image src={logo} alt="DepartureAway" height={50} width={280} />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center flex-grow mx-12 space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-black hover:text-pink-700 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center space-x-6">
                        {/* Language Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                                className="flex items-center space-x-2 text-black hover:text-pink-700 transition-colors"
                            >
                                <span>{languages.find(lang => lang.name === selectedLanguage)?.flag}</span>
                                <span>{selectedLanguage}</span>
                                <ChevronDownIcon className="h-4 w-4" />
                            </button>
                            {isLanguageOpen && (
                                <div className="absolute top-full mt-2 w-32 bg-white rounded-md shadow-lg py-1">
                                    {languages.map((language) => (
                                        <button
                                            key={language.name}
                                            className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
                                            onClick={() => {
                                                setSelectedLanguage(language.name);
                                                setIsLanguageOpen(false);
                                            }}
                                        >
                                            <span className="mr-2">{language.flag}</span>
                                            {language.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button onClick={() => {
                                window.location.href = '/signUp';
                            }} className="text-black border border-black px-6 py-2 rounded-full hover:bg-pink-700 hover:border-transparent hover:text-amber-50 transition-colors">
                            Get Started
                            
                        </button>
                    </div>

                    {/* Mobile Navigation Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-black hover:text-pink-700 transition-colors"
                        >
                            {isOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-black hover:text-purple-200 transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {/* Mobile Language Selector */}
                        <div className="py-2">
                            {languages.map((language) => (
                                <button
                                    key={language.name}
                                    className={`block w-full text-left py-2 text-black hover:text-purple-200 transition-colors ${selectedLanguage === language.name ? 'text-pink-700' : ''}`}
                                    onClick={() => {
                                        setSelectedLanguage(language.name);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span className="mr-2">{language.flag}</span>
                                    {language.name}
                                </button>
                            ))}
                        </div>
                        <button
                            className="text-black border border-black px-20 py-2 rounded-full hover:bg-pink-700 hover:border-transparent hover:text-amber-50 transition-colors"
                            onClick={() => {
                                setIsOpen(false);
                                window.location.href = '/signUp';
                            }}
                        >
                            Get Started
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}