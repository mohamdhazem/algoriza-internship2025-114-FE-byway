import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ pageIndex, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex border border-[#E2E8F0] text-[#334155] text-xs font-inter font-semibold rounded-sm overflow-hidden">
        {/* Previous */}
        <button
          className="px-3 py-2 text-sm border-r border-[#E2E8F0] hover:bg-gray-100 disabled:opacity-50"
          onClick={() => onPageChange(Math.max(pageIndex - 1, 1))}
          disabled={pageIndex === 1}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 text-sm border-r border-[#E2E8F0] hover:bg-gray-100 ${
              page === pageIndex ? "bg-gray-200" : ""
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          className="px-3 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
          onClick={() => onPageChange(Math.min(pageIndex + 1, totalPages))}
          disabled={pageIndex === totalPages}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
