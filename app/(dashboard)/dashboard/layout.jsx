
import { Geist, Geist_Mono } from "next/font/google";
import DashboardWrapper from '@/components/dashboard/DashboardWrapper';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Admin dashboard - Departure Away",
    description: "Admin dashboard",
};

export default function AdminLayout({ children }) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <DashboardWrapper>{children}</DashboardWrapper>
        </body>
        </html>
    );
}
