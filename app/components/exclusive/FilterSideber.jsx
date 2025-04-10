
import React from 'react'

const FilterSideber = () => {
  return (
 
    <aside className="col-span-3 bg-white p-4 rounded-2xl shadow">
    <h2 className="text-xl font-semibold mb-4">Filtered Data</h2>
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Region</label>
        <div className="flex gap-2 mt-2">
          <input type="checkbox" /> <span>Asia</span>
          <input type="checkbox" /> <span>Europe</span>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Tour Style</label>
        <div className="flex flex-col gap-2 mt-2">
          {["Budget", "Luxury", "Midrange"].map((style) => (
            <label key={style} className="flex items-center gap-2">
              <input type="checkbox" /> {style}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Tour Type</label>
        <div className="flex flex-col gap-2 mt-2">
          {["Adventure", "Cultural", "Wildlife"].map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input type="checkbox" /> {type}
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Duration</label>
        <input
          type="text"
          placeholder="e.g., 3 days"
          className="mt-2 w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Date Range</label>
        <input
          type="date"
          className="mt-2 w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Price Range</label>
        <input
          type="range"
          min="100"
          max="1000"
          step="50"
          className="mt-2 w-full"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Tour Group</label>
        <div className="flex flex-col gap-2 mt-2">
          {["Solo", "Couple", "Family"].map((group) => (
            <label key={group} className="flex items-center gap-2">
              <input type="checkbox" /> {group}
            </label>
          ))}
        </div>
      </div>
    </div>
  </aside>
  )
  }


export default FilterSideber;