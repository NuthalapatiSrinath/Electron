import { Check, CheckCheck } from 'lucide-react';

interface ChatBubbleProps {
  message: string;
  isSent: boolean;
  timestamp: string;
  isRead?: boolean;
  image?: string;
}

export function ChatBubble({ message, isSent, timestamp, isRead = false, image }: ChatBubbleProps) {
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isSent ? 'order-2' : 'order-1'}`}>
        {image && (
          <div className="mb-2">
            <img src={image} alt="Shared" className="rounded-lg max-w-full" />
          </div>
        )}
        <div
          className={`rounded-2xl px-4 py-2 ${
            isSent
              ? 'bg-blue-600 text-white rounded-br-sm'
              : 'bg-gray-200 text-gray-900 rounded-bl-sm'
          }`}
        >
          <p className="text-sm">{message}</p>
        </div>
        <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${isSent ? 'justify-end' : 'justify-start'}`}>
          <span>{timestamp}</span>
          {isSent && (
            <>
              {isRead ? (
                <CheckCheck className="w-3 h-3 text-blue-600" />
              ) : (
                <Check className="w-3 h-3 text-gray-400" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
