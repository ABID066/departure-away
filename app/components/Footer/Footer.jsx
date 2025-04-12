'use client'
import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import logo from '@/public/images/Logo.png';

const Footer = () => {
    return (
        <footer className="bg-[#F9F9FC] text-gray-700 px-6 md:px-16 lg:px-32 py-12 pt-25">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">

                {/* Logo & Description */}
                <div>
                    <div className="relative w-64 h-16 mb-4">
                        <Image
                            src={logo}
                            alt="Departure Away Logo"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </div>
                    <p className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus.
                    </p>
                    <div className="flex gap-4 text-xl text-gray-600">
                        <Link href="https://twitter.com" aria-label="Twitter">
                            <FaTwitter className="hover:text-blue-500 cursor-pointer" />
                        </Link>
                        <Link href="https://facebook.com" aria-label="Facebook">
                            <FaFacebookF className="hover:text-blue-700 cursor-pointer" />
                        </Link>
                        <Link href="https://instagram.com" aria-label="Instagram">
                            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                        </Link>
                        <Link href="https://pinterest.com" aria-label="Pinterest">
                            <FaPinterestP className="hover:text-red-500 cursor-pointer" />
                        </Link>
                    </div>
                </div>

                {/* Discover */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">DISCOVER</h3>
                    <ul className="space-y-2">
                        <li><Link href="/hotel" className="hover:text-gray-900">Hotel</Link></li>
                        <li><Link href="/tour" className="hover:text-gray-900">Tour</Link></li>
                        <li><Link href="/guider" className="hover:text-gray-900">Guider</Link></li>
                        <li><Link href="/packages" className="hover:text-gray-900">Travel Package</Link></li>
                        <li><Link href="/offers" className="hover:text-gray-900">Exclusive Offers</Link></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">COMPANY</h3>
                    <ul className="space-y-2">
                        <li><Link href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link></li>
                        <li><Link href="/booking-policy" className="hover:text-gray-900">Booking Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-gray-900">Terms and Conditions</Link></li>
                        <li><Link href="/youtube" className="hover:text-gray-900">YouTube Playlist</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <FiPhone className="text-lg stroke-[3]"/> <span>555-555-5555</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FiMail className="text-lg stroke-[3]" /> <span>hi@magicdesign.io</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <FiMapPin className="text-2xl stroke-[3]"/>
                        <span>Wizard Ventures GmbH, Bugenhagenstr. 11, 10551 Berlin</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between text-xs text-gray-500">
                <div className="flex gap-4 mb-2 md:mb-0">
                    <Link href="/about" className="hover:text-gray-900">About Us</Link>
                    <Link href="/contact" className="hover:text-gray-900">Contact Us</Link>
                    <Link href="/privacy" className="hover:text-gray-900">Privacy policy</Link>
                    <Link href="/terms" className="hover:text-gray-900">Terms of Use</Link>
                </div>
                <p>© {new Date().getFullYear()}, All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
