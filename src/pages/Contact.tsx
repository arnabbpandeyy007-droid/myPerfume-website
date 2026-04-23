import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Message sent successfully! We will get back to you soon.');
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="pt-32 sm:pt-40 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4">
          Get in Touch
        </h1>
        <p className="text-[#999] text-base sm:text-lg max-w-lg mx-auto">
          We'd love to hear from you. Reach out for orders, partnerships, or just to say hello.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            <h3 className="font-display text-2xl text-white mb-8">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-[#999] block mb-1">WhatsApp</span>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline text-sm sm:text-base">
                    +91-98765-43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-[#999] block mb-1">Phone</span>
                  <a href="tel:+912212345678" className="text-gold hover:underline text-sm sm:text-base">
                    +91-22-1234-5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-[#999] block mb-1">Email</span>
                  <a href="mailto:hello@auraperfumes.in" className="text-gold hover:underline text-sm sm:text-base">
                    hello@auraperfumes.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-[#999] block mb-1">Address</span>
                  <p className="text-cream text-sm sm:text-base">
                    AURA House, 42 Linking Road<br />
                    Bandra West, Mumbai - 400050
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-[0.15em] text-[#999] block mb-1">Hours</span>
                  <p className="text-cream text-sm sm:text-base">
                    Mon - Sat: 10:00 AM - 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210?text=Hi%20AURA!%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full font-medium hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="font-display text-2xl text-white mb-8">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-[#333] text-white placeholder-[#666] py-3 px-1 focus:outline-none focus:border-gold transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-[#333] text-white placeholder-[#666] py-3 px-1 focus:outline-none focus:border-gold transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-[#333] text-white placeholder-[#666] py-3 px-1 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-transparent border-b border-[#333] text-white py-3 px-1 focus:outline-none focus:border-gold transition-colors appearance-none"
                >
                  <option value="General Inquiry" className="bg-black">General Inquiry</option>
                  <option value="Order Support" className="bg-black">Order Support</option>
                  <option value="Bulk Order" className="bg-black">Bulk / Corporate Order</option>
                  <option value="Partnership" className="bg-black">Partnership</option>
                  <option value="Feedback" className="bg-black">Feedback</option>
                </select>
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-[#333] text-white placeholder-[#666] py-3 px-1 focus:outline-none focus:border-gold transition-colors resize-none min-h-[120px]"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-gold text-black py-4 rounded-full font-medium text-sm hover:bg-cream transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {submitted ? 'Message Sent!' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
