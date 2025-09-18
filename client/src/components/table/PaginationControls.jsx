import React from "react";
import useIcon from "../../hooks/useIcon";

const PaginationControls = ({
  page = 1,
  totalPages = 1,
  onPrev,
  onNext,
  onPageChange, // Optional: for direct page navigation
  className = "",
  showPageNumbers = false,
  maxVisiblePages = 5,
  disabled = false,
}) => {
  const icons = useIcon();
  // Handle edge cases
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Generate page numbers for display
  const getVisiblePageNumbers = () => {
    if (!showPageNumbers || totalPages <= 1) return [];

    const delta = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePageNumbers();

  const handlePageClick = (pageNumber) => {
    if (onPageChange && pageNumber !== currentPage && !disabled) {
      onPageChange(pageNumber);
    }
  };

  const handlePrevious = () => {
    if (onPrev && hasPrevious && !disabled) {
      onPrev();
    }
  };

  const handleNext = () => {
    if (onNext && hasNext && !disabled) {
      onNext();
    }
  };

  // Don't render if no pages
  if (totalPages <= 0) return null;

  return (
    <nav
      className={`flex items-center justify-center gap-2 mt-4 border-inherit ${className}`}
      aria-label="Pagination Navigation"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={!hasPrevious || disabled}
        className="
          flex items-center gap-1 px-3 py-2 
          text-sm font-medium text-gray-700 
         border border-inherit rounded-lg 
          hover:bg-gray-50 hover:text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
          transition-colors duration-200
        "
        aria-label="Go to previous page"
      >
        {icons["leftArrow"]}
        Previous
      </button>

      {/* Page Numbers */}
      {showPageNumbers && (
        <div className="flex items-center gap-1 border-inherit">
          {/* First page + ellipsis */}
          {visiblePages[0] > 1 && (
            <>
              <button
                onClick={() => handlePageClick(1)}
                disabled={disabled}
                className="
                  px-3 py-2 text-sm font-medium text-gray-700 
                  border border-inherit rounded-lg
                  hover:bg-gray-50 hover:text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-200
                "
                aria-label="Go to page 1"
              >
                1
              </button>
              {visiblePages[0] > 2 && (
                <span className="px-2 py-2 text-gray-500" aria-hidden="true">
                  …
                </span>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {visiblePages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              disabled={disabled}
              className={`
                px-3 py-2 text-sm font-medium rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                disabled:cursor-not-allowed transition-colors duration-200
                ${
                  pageNumber === currentPage
                    ? "text-white bg-blue-600 border border-blue-600 hover:bg-blue-700"
                    : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50"
                }
              `}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={pageNumber === currentPage ? "page" : undefined}
            >
              {pageNumber}
            </button>
          ))}

          {/* Last page + ellipsis */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="px-2 py-2 text-gray-500" aria-hidden="true">
                  …
                </span>
              )}
              <button
                onClick={() => handlePageClick(totalPages)}
                disabled={disabled}
                className="
                  px-3 py-2 text-sm font-medium text-gray-700 
                  border border-inherit  rounded-lg
                  hover:bg-gray-50 hover:text-gray-900
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-colors duration-200
                "
                aria-label={`Go to page ${totalPages}`}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
      )}

      {/* Page Info (when not showing page numbers) */}
      {!showPageNumbers && (
        <span className="px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg">
          Page {currentPage} of {totalPages}
        </span>
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!hasNext || disabled}
        className="
          flex items-center gap-1 px-3 py-2 
          text-sm font-medium text-gray-700 
        border border-inherit rounded-lg 
          hover:bg-gray-50 hover:text-gray-900
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
          transition-colors duration-200
        "
        aria-label="Go to next page"
      >
        Next
        {icons["rightArrow"]}
      </button>
    </nav>
  );
};

export default PaginationControls;
