"use client";

function PaginationButton({ children, active = false, disabled = false, onClick }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`
        px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
        ${active
                ? 'bg-pink-500 text-white border border-pink-500'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }
        ${disabled
                ? 'opacity-50 cursor-not-allowed hover:bg-white'
                : 'cursor-pointer'
            }
        focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2
      `}
        >
            {children}
        </button>
    );
}

export default PaginationButton;