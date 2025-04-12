'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
        acceptTerms: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('idle');

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? e.target.checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitStatus('success');
            setFormData({
                firstName: '', lastName: '', phone: '',
                email: '', subject: '', message: '',
                acceptTerms: false
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full flex flex-col md:flex-row gap-12 items-stretch">
            {/* Form Section */}
            <div className="my-contact-box bg-white rounded-xl shadow-md p-6 md:p-8 md:w-1/2">
                <h2 className="text-lg font-bold text-gray-600 mb-6">We would love to hear from you</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-400">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-400">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-400">
                                Your Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-400">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-400">
                            Message here..
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="bg-gray-100 w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-700 min-h-[150px]"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="acceptTerms"
                            name="acceptTerms"
                            checked={formData.acceptTerms}
                            onChange={handleChange}
                            className="h-4 w-4 border-2 border-pink-700 text-pink-700 focus:ring-pink-500 rounded"
                            required
                        />
                        <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
                            I have read and accept the <a href="#" className="text-pink-700 hover:underline">Terms & Conditions</a> and <a href="#" className="text-pink-700 hover:underline">Privacy Policy</a>.
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-50 bg-pink-700 hover:bg-pink-900 text-white font-medium py-3 px-4 rounded-lg transition duration-300 mt-4 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Sending...' : 'Submit Your Query'}
                    </button>
                </form>

            </div>

            {/* Map Section */}
            <div className="bg-white rounded-xl md:w-1/2 overflow-hidden">
                <div className="h-64 md:h-full w-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291865!2d-73.98784492416406!3d40.74844097138992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623862347712!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
