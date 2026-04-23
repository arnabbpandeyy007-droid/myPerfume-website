import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { X } from 'lucide-react';

export default function FestivalBanner() {
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem('aura-festival-dismissed') !== 'true';
    } catch {
      return true;
    }
  });
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem('aura-festival-dismissed', 'true');
    } catch { /* ignore */ }
  };

  if (!visible) return null;

  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-center min-w-[60px]">
      <span className="text-gold font-semibold text-lg sm:text-xl">
        {String(value).padStart(2, '0')}
      </span>
      <p className="text-[#999] text-[10px] uppercase tracking-wider">{label}</p>
    </div>
  );

  return (
    <section className="relative py-16 sm:py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/festival-banner.jpg"
          alt="Festival"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Dismiss Button */}
      <button
        onClick={dismiss}
        className="absolute top-4 right-4 z-20 text-white/60 hover:text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <p className="text-white/80 text-xs uppercase tracking-[0.2em] font-medium mb-4">
          Limited Time
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-4">
          Diwali Special: Up to 30% Off
        </h2>
        <p className="text-white/70 text-base sm:text-lg mb-8">
          Gift the luxury of scent this festive season.
        </p>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <TimeBox value={timeLeft.days} label="Days" />
          <TimeBox value={timeLeft.hours} label="Hours" />
          <TimeBox value={timeLeft.minutes} label="Mins" />
          <TimeBox value={timeLeft.seconds} label="Secs" />
        </div>

        <Link
          to="/shop"
          className="inline-block bg-gold text-black px-8 py-3.5 rounded-full text-sm font-medium hover:bg-cream transition-colors duration-300"
        >
          Shop Festival Collection
        </Link>
      </div>
    </section>
  );
}
