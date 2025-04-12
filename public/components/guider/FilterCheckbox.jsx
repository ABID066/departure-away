function FilterCheckbox({ label, checked = false, onChange }) {
    return (
      <div className="flex items-center mb-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mr-2 h-4 w-4  cursor-pointer accent-pink-500"
        />
        <label className="text-sm cursor-pointer" onClick={onChange}>
          {label}
        </label>
      </div>
    );
  }
  
  export default FilterCheckbox;