import Sidebar from "./components/Sidebar";

function ArtisanDashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex flex-col md:flex-row min-h-screen md:h-screen overflow-hidden">
                <Sidebar />
                <div className="flex-1 w-full min-h-screen md:h-screen md:overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
}


export default ArtisanDashboardLayout;