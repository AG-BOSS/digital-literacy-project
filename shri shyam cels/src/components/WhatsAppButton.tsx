import React, { useState } from 'react';
import { MessageSquare, X, Phone, Sparkles } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpenWhatsApp = (num: string) => {
    const text = encodeURIComponent(
      'Hello Shri Shyam Celebrations! I would like to enquire about party products, cakes, candles, or balloons. Please share price and availability.'
    );
    window.open(`https://wa.me/91${num}?text=${text}`, '_blank');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Number Select Popover Modal */}
      {open && (
        <div className="mb-4 bg-[#0B2545] border-2 border-[#25D366]/60 rounded-3xl p-5 shadow-2xl w-72 text-white animate-fadeIn space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#25D366]">
              <MessageSquare className="w-4 h-4 fill-[#25D366]" />
              <span>WhatsApp Direct Order</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-300">
            Select a WhatsApp phone number to chat directly with our store:
          </p>

          <div className="space-y-2">
            <button
              onClick={() => handleOpenWhatsApp('9800312493')}
              className="w-full flex items-center justify-between bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-md transition-all"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> 9800312493
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">Primary</span>
            </button>

            <button
              onClick={() => handleOpenWhatsApp('8927688237')}
              className="w-full flex items-center justify-between bg-[#071A36] hover:bg-[#13325B] text-white border border-[#25D366]/40 text-xs font-bold py-2.5 px-4 rounded-xl transition-all"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#25D366]" /> 8927688237
              </span>
              <span className="text-[10px] bg-[#25D366]/20 text-[#25D366] px-2 py-0.5 rounded-full">Support</span>
            </button>
          </div>

          <div className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1 pt-1">
            <Sparkles className="w-3 h-3 text-[#C99A3E]" />
            <span>Just Opposite Agarwal & Sons Grocery</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white/20"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366]" />
        </span>

        <MessageSquare className="w-7 h-7 fill-white" />
      </button>

    </div>
  );
};
