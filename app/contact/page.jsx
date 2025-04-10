import ContactForm from '../components/contact/ContactForm';

export default function ContactPage() {
    return (
        <>
            {/* Page Header */}
            <div className="bg-[#F0EDFD] py-30 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 pt-20">Contact Us</h1>
                <p className="text-sm text-gray-600 mt-2">
                    <a href="/" className="text-gray-500 hover:underline">Home</a> &gt; <span className="text-gray-700">Contact Us</span>
                </p>
            </div>

            {/* Main Content Container */}
            <div className=" max-w-6xl mx-auto px-4 py-35">
                <div className="flex justify-center">
                    <ContactForm />
                </div>
            </div>
        </>
    );
}