import { Smartphone, Tv, Refrigerator, Laptop, Wind, Camera, Headphones, Tablet } from 'lucide-react';

interface CategoryIconProps {
  category: string;
  label: string;
  onClick: () => void;
}

export function CategoryIcon({ category, label, onClick }: CategoryIconProps) {
  const getIcon = () => {
    switch (category) {
      case 'phones':
        return <Smartphone className="w-6 h-6" />;
      case 'tv':
        return <Tv className="w-6 h-6" />;
      case 'fridge':
        return <Refrigerator className="w-6 h-6" />;
      case 'laptops':
        return <Laptop className="w-6 h-6" />;
      case 'ac':
        return <Wind className="w-6 h-6" />;
      case 'cameras':
        return <Camera className="w-6 h-6" />;
      case 'audio':
        return <Headphones className="w-6 h-6" />;
      case 'tablets':
        return <Tablet className="w-6 h-6" />;
      default:
        return <Smartphone className="w-6 h-6" />;
    }
  };

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:bg-blue-50 hover:border-blue-500 border-2 border-transparent transition-all group"
    >
      <div className="p-3 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {getIcon()}
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </button>
  );
}
