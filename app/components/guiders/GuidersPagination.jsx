"use client";

import { useGuiders } from "./GuidersContext";
import PaginationButton from "./PaginationButton";

export default function GuidersPagination() {
  const { filteredGuides, currentPage, totalPages, handlePageChange } = useGuiders();

  if (filteredGuides.length === 0) {
    return null;
  }

  return (
    <div className="flex justify-center mt-8">
      <nav className="flex space-x-1">
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </PaginationButton>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          // Show limited page numbers
          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
          ) {
            return (
              <PaginationButton
                key={pageNumber}
                active={currentPage === pageNumber}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationButton>
            );
          } else if (
            (pageNumber === currentPage - 2 && currentPage > 3) ||
            (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
          ) {
            return (
              <span key={pageNumber} className="flex items-center">
                ...
              </span>
            );
          }
          return null;
        })}

        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </PaginationButton>
      </nav>
    </div>
  );
}