import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    occasion: 'Birthday',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setSubmitted(true);
    
    // Also construct WhatsApp message for easy direct sending
    const text = encodeURIComponent(
      `Hello Shri Shyam Celebrations!\n\nNew Enquiry from Website:\nName: ${formData.name}\nPhone: ${formData.phone}\nOccasion: ${formData.occasion}\nMessage: ${formData.message || 'General Enquiry'}`
    );
    window.open(`https://wa.me/919800312493?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-[#071A36] relative border-t border-[#C99A3E]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-[#C99A3E] text-xs font-bold uppercase tracking-widest bg-[#0B2545] px-4 py-1.5 rounded-full border border-[#C99A3E]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A3E]" />
            <span>GET IN TOUCH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-display font-bold text-white">
            Let's Make Your <span className="gold-gradient-text">Celebration Special</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg">
            Have a question or looking for specific party items? Reach out to us directly or visit our local store.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Info Cards (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Phone Card */}
            <div className="p-6 bg-[#0B2545] border border-[#C99A3E]/30 rounded-3xl flex items-start gap-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#071A36] border border-[#C99A3E]/40 flex items-center justify-center text-[#C99A3E] shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-lg">📞 Call Us</h3>
                <div className="flex flex-col text-sm text-[#F8F3E8]/80 font-medium">
                  <a href="tel:9800312493" className="hover:text-[#C99A3E] transition-colors">9800312493</a>
                  <a href="tel:8927688237" className="hover:text-[#C99A3E] transition-colors">8927688237</a>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="p-6 bg-[#0B2545] border border-[#25D366]/40 rounded-3xl flex items-start gap-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#071A36] border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-lg">📱 WhatsApp Us</h3>
                <div className="flex flex-col text-sm text-[#F8F3E8]/80 font-medium">
                  <a href="https://wa.me/919800312493" target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors">9800312493</a>
                  <a href="https://wa.me/918927688237" target="_blank" rel="noreferrer" className="hover:text-[#25D366] transition-colors">8927688237</a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 bg-[#0B2545] border border-[#C2185B]/40 rounded-3xl flex items-start gap-4 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-[#071A36] border border-[#C2185B]/40 flex items-center justify-center text-[#C2185B] shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-lg">📍 Find Us</h3>
                <p className="text-sm font-semibold text-[#C99A3E]">
                  Just Opposite Agarwal & Sons Grocery
                </p>
                <p className="text-xs text-gray-400">
                  Local Celebration & Party Supply Store
                </p>
              </div>
            </div>

            {/* Interactive Location Placeholder Map */}
            <div className="p-6 bg-[#071A36] border border-[#C99A3E]/30 rounded-3xl text-center space-y-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B2545] to-[#13325B] opacity-50" />
              <div className="relative z-10 space-y-2">
                <MapPin className="w-8 h-8 text-[#C99A3E] mx-auto animate-bounce" />
                <p className="font-serif-display font-bold text-white">Shri Shyam Celebrations Map</p>
                <p className="text-xs text-gray-300">Just Opposite Agarwal & Sons Grocery</p>
                <span className="inline-block bg-[#C99A3E] text-[#071A36] font-bold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider">
                  Store Entrance Opposite Agarwal & Sons
                </span>
              </div>
            </div>

          </div>

          {/* Right Contact Form (7 Columns) */}
          <div className="lg:col-span-7 bg-[#0B2545] border border-[#C99A3E]/30 rounded-3xl p-8 shadow-2xl">
            
            <h3 className="text-2xl font-serif-display font-bold text-white mb-2">
              Send Us an Enquiry
            </h3>
            <p className="text-sm text-gray-300 mb-6">
              Fill out the form below and we will get back to you immediately on WhatsApp or call!
            </p>

            {submitted ? (
              <div className="p-8 bg-[#071A36] rounded-2xl border border-[#25D366]/40 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#25D366] mx-auto" />
                <h4 className="text-xl font-bold text-white">Enquiry Sent Successfully!</h4>
                <p className="text-sm text-gray-300">
                  Thank you, {formData.name}. We have opened WhatsApp to connect with you directly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#C99A3E] text-[#071A36] font-bold text-xs px-5 py-2.5 rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#071A36] border border-white/10 text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-[#C99A3E] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#071A36] border border-white/10 text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-[#C99A3E] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Occasion / Event Type
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-[#071A36] border border-white/10 text-white rounded-xl py-3.5 px-4 focus:outline-none focus:border-[#C99A3E] text-sm"
                  >
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Engagement">Engagement / Wedding</option>
                    <option value="Other">Other Event</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Message / Item Enquiries
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what party items, cakes, candles or balloons you are looking for..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#071A36] border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-[#C99A3E] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#C99A3E] via-[#E5BA55] to-[#C99A3E] text-[#071A36] font-extrabold py-4 px-6 rounded-2xl shadow-xl hover:shadow-[#C99A3E]/30 transition-all flex items-center justify-center gap-2 text-base"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
