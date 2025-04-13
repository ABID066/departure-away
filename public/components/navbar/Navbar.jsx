"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import logo from '../../images/Logo.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('বাংলা');
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    
    // Check if current path is home page
    const isHomePage = pathname === '/' || pathname === '';

    useEffect(() => {
        const handleScroll = () => {
            // Check if page has been scrolled more than 75% (3/4) of the viewport height
            const isScrolled = window.scrollY > window.innerHeight * 0.75;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Guiders', href: '/guiders' },
        { name: 'Exclusive', href: '/exclusive-offers' },
        { name: 'Travel', href: '/travel-packages' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Components', href: '/component-gallery' },
    ];

    const languages = [
        { name: 'বাংলা', flag: '🇧🇩' },
        { name: 'English', flag: '🇬🇧' },
    ];

    // Determine text color based on homepage and scroll state
    const textColor = isHomePage && !scrolled ? 'text-white' : 'text-black';
    const hoverTextColor = 'hover:text-pink-700'; // Consistent hover color
    const buttonBorderColor = isHomePage && !scrolled ? 'border-white' : 'border-black';
    const buttonHoverClass = 'hover:bg-pink-700 hover:border-transparent hover:text-amber-50';

    return (
        <nav className={`w-full z-50 fixed top-0 transition-colors duration-300 ${
            scrolled || !isHomePage ? 'bg-white' : 'bg-transparent'
        } ${isOpen ? 'bg-white' : ''} backdrop-blur-sm`}>
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
                                className={`${textColor} ${hoverTextColor} transition-colors`}
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
                                className={`flex items-center space-x-2 ${textColor} ${hoverTextColor} transition-colors`}
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
                        <button 
                            onClick={() => {
                                window.location.href = '/signUp';
                            }} 
                            className={`${textColor} border ${buttonBorderColor} px-6 py-2 rounded-full ${buttonHoverClass} transition-colors`}
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Navigation Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`${isOpen ? 'text-black' : textColor} ${hoverTextColor} transition-colors`}
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
                    <div className="md:hidden mt-4 space-y-4 bg-white">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block text-black hover:text-pink-700 transition-colors"
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
                                    className={`block w-full text-left py-2 text-black hover:text-pink-700 transition-colors ${selectedLanguage === language.name ? 'text-pink-700' : ''}`}
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