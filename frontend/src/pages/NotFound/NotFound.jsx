import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
                <p className="text-center text-gray-600 mb-8 px-4 max-w-md">
                    Sorry, the page you are looking for does not exist or has been moved. Please check the URL or return to the homepage.
                </p>
                <Link
                    to="/"
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Go to Homepage
                </Link>
            </div>
        </>
    );
}

export default NotFound;
