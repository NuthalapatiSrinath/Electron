import { Star, Zap, CheckCircle } from 'lucide-react';

interface BadgeProps {
  type: 'premium' | 'featured' | 'verified';
  className?: string;
}

export function Badge({ type, className = '' }: BadgeProps) {
  if (type === 'premium') {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded-md text-xs ${className}`}>
        <Star className="w-3 h-3 fill-current" />
        <span>Premium</span>
      </div>
    );
  }

  if (type === 'featured') {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded-md text-xs ${className}`}>
        <Zap className="w-3 h-3 fill-current" />
        <span>Featured</span>
      </div>
    );
  }

  if (type === 'verified') {
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs ${className}`}>
        <CheckCircle className="w-3 h-3 fill-current" />
        <span>Verified</span>
      </div>
    );
  }

  return null;
}
