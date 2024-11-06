/* eslint-disable react/prop-types */

export const Pagination = ({ pagination, handlePageChange }) => {
    const { currentPage, totalPages } = pagination;

    // Function to handle the display of ellipses and page numbers
    const getPages = () => {
        const pages = [];
        if (totalPages <= 3) {
            // Display all pages if 3 or less
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Always show the first page
            pages.push(1);

            // Add ellipses if currentPage > 3
            if (currentPage > 3) {
                pages.push("...");
            }

            // Display the range of pages around the current page
            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Add ellipses if currentPage < totalPages - 2
            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            // Always show the last page
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex items-center -space-x-px my-4" aria-label="Pagination">
            {/* Previous Button */}
            <button
                type="button"
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Previous"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <svg
                    className="shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M15 18l-6-6 6-6"></path>
                </svg>
                <span className="hidden sm:block">Previous</span>
            </button>

            {/* Page Numbers */}
            {getPages().map((page, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => page !== "..." && handlePageChange(page)}
                    className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm border border-gray-200 text-gray-800 ${currentPage === page ? 'bg-gray-200' : 'hover:bg-gray-100'
                        } first:rounded-s-lg last:rounded-e-lg focus:outline-none focus:bg-gray-100`}
                    disabled={page === "..."}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                type="button"
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Next"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                <span className="hidden sm:block">Next</span>
                <svg
                    className="shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 18l6-6-6-6"></path>
                </svg>
            </button>
        </div>
    );
};