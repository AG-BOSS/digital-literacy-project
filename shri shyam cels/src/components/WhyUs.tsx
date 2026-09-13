import React from 'react';
import { Sparkles, Layers, MessageSquare, MapPin, Eye } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const features = [
    {
      icon: <Layers className="w-7 h-7 text-[#C99A3E]" />,
      title: 'Wide Range of Items',
      description: 'Over 100+ celebration items across cake decorating, balloon arches, birthday themes, and disposable partyware.',
      borderAccent: 'hover:border-[#C99A3E]'
    },
    {
      icon: <MessageSquare className="w-7 h-7 text-[#25D366]" />,
      title: 'Easy WhatsApp Enquiry',
      description: 'Select products online and enquire directly on WhatsApp to confirm current shop prices and stock availability.',
      borderAccent: 'hover:border-[#25D366]'
    },
    {
      icon: <MapPin className="w-7 h-7 text-[#C2185B]" />,
      title: 'Local Store Pickup',
      description: 'Convenient local pickup right opposite Agarwal & Sons Grocery with personal, friendly assistance for your event.',
      borderAccent: 'hover:border-[#C2185B]'
    },
    {
      icon: <Eye className="w-7 h-7 text-[#E5BA55]" />,
      title: 'Browse Products Online',
      description: 'Check products, quantities, and category details from your phone or desktop before visiting or placing an enquiry.',
      borderAccent: 'hover:border-[#E5BA55]'
    }
  ];

  return (
    <section id="why-us" className="py-16 sm:py-20 bg-[#071A36] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#C99A3E] text-xs font-bold uppercase tracking-widest bg-[#0B2545] px-4 py-1.5 rounded-full border border-[#C99A3E]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A3E]" />
            <span>LOCAL CELEBRATION STORE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-display font-bold text-white tracking-tight">
            Why Shop <span className="gold-gradient-text">With Shri Shyam?</span>
          </h2>

          <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
            Your neighborhood celebration partner making event planning simple, transparent, and hassle-free.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 bg-[#0B2545] border border-[#C99A3E]/20 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between ${feat.borderAccent}`}
            >
              <div className="space-y-4">
                <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-[#071A36] border border-white/10 flex items-center justify-center shadow-inner">
                  {feat.icon}
                </div>

                <h3 className="text-lg font-serif-display font-bold text-white">
                  {feat.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-semibold text-[#C99A3E] flex items-center gap-1">
                <span>Shri Shyam Celebrations</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
