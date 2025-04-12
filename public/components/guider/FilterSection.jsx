import { ChevronDown } from "lucide-react";

function FilterSection({ title, children, isOpen, onToggle }) {
  return (
    <div className=" mb-4 bg-[#F7F6FE] rounded-sm p-5">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <h4 className="font-medium text-sm">{title}</h4>
        <ChevronDown 
          size={16} 
          className={`transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </div>
      <div className={`mt-2 ${isOpen ? 'block' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
}

export default FilterSection