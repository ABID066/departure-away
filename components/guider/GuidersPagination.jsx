"use client";

import { useGuiderOffers } from "./GuidersContext";
import PaginationButton from "@/components/shared/PaginationButton";

export default function GuiderOffersPagination() {
  const {
    totalOffers,
    currentPage,
    totalPages,
    handlePageChange,
    loading,
    filteredOffers,
    offers
  } = useGuiderOffers();

  // Don't show pagination if loading or no data
  if (loading || totalOffers === 0) {
    return null;
  }

  // If we have filtered results, don't show server-side pagination
  // as filtering is done client-side
  if (filteredOffers.length > 0 && filteredOffers.length !== offers.length) {
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
                  <span key={pageNumber} className="flex items-center px-2">
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