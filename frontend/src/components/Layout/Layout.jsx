import { Outlet } from 'react-router-dom';
import { Header } from '../Header';

export const Layout = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Header />

            {/* Main Content */}
            <main className="flex-1 bg-gray-50 overflow-y-auto md:ml-48 lg:ml-0">
                <Outlet />
            </main>
        </div>
    );
};
