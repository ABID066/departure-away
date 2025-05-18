import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'

const Pagination = () => {
  return (
    
        <div className="flex justify-center items-center gap-2 mt-8">
            <button className="border rounded-full p-2 hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-full ${
                  page === 2
                    ? "bg-pink-500 text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="border rounded-full p-2 hover:bg-gray-100">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
    
  )
}

export default Pagination