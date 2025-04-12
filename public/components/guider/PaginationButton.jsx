function PaginationButton({ children, active = false, disabled = false, onClick, ...props }) {
    return (
      <button
        className={`w-8 h-8 flex items-center justify-center rounded ${
          active 
            ? 'bg-pink-500 text-white' 
            : disabled 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 border hover:bg-gray-50'
        }`}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }

  export default PaginationButton;