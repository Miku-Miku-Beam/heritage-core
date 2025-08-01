
import Navbar from '../../lib/components/Navbar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <Navbar/>
            {children}
        </>
    );
}
