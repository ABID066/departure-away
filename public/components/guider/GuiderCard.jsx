
import guideImg from '../../images/guide-3.png';
import Image from 'next/image';

const PhotoPlaceholder = ({ id }) => {
    // This generates different placeholder styles based on ID
    return (
      <div className="w-full h-48 bg-gray-100 rounded-t-lg">
        <img src={`/api/placeholder/400/320`} alt={`Guide ${id}`} className="w-full h-full object-cover rounded-t-lg" />
      </div>
    );
  };


const GuiderCard = ({guide}) => {
    return (
        <div  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <a href="#" className="block">
        {/* <img src={guideImg} alt={`Guide`} className="w-full h-full object-cover rounded-t-lg" /> */}
        <Image src={guideImg} alt="Guide" className="w-full h-full object-cover rounded-t-lg" />
          <div className="p-4">
            <h3 className="font-medium">{guide.name}</h3>
            <div className="flex items-center mt-1">
              <div className="text-yellow-500">★</div>
              <span className="text-sm ml-1">{guide.rating}</span>
              <span className="text-sm text-gray-500 ml-1">({guide.reviews} Reviews)</span>
            </div>
          </div>
        </a>
      </div>
    );
};

export default GuiderCard;