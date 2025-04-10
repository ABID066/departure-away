"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../../public/images/Logo.png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Hotel', href: '/hotel' },
        { name: 'Tour', href: '/tour' },
        { name: 'About Us', href: '/about' },
        { name: 'Guiders', href: '/guiders' },
        { name: 'Contact Us', href: '/contact' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-transparent backdrop-blur-sm">
            <div className="container py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center pl-4 md:pl-35">
                        <Link href="/" className="flex items-center">
                            <Image src={logo} alt="DepartureAway" height={50} width={280} />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-black hover:text-pink-700 transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                        <button className="text-black border border-black px-6 py-2 rounded-full hover:bg-pink-700 hover:border-transparent hover:text-amber-50 transition-colors">
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
                    <div className="md:hidden  mt-4 space-y-4">
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
                        <button
                            className=" text-black border border-black px-20 py-2 rounded-full hover:bg-pink-700 hover:border-transparent hover:text-amber-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Get Started
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}