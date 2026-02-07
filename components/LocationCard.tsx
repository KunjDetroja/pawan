interface LocationCardProps {
  address: string;
  city: string;
  embedUrl?: string;
  latitude?: number;
  longitude?: number;
}

export function LocationCard({
  address,
  city,
  embedUrl,
  latitude = 22.283303,
  longitude = 70.799252,
}: LocationCardProps) {
  // Generate directions URL
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
  };

  return (
    <div className="glass-card overflow-hidden rounded-2xl p-1">
      <div className="relative h-36 w-full overflow-hidden rounded-xl bg-slate-800">
        {/* Google Maps Embed */}
        {embedUrl ? (
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
        ) : (
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE2JzU5LjkiTiA3MMKwNDcnNTcuMyJF!5e0!3m2!1sen!2sin`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
        )}
        
        {/* Overlay with address */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-transparent to-transparent p-4">
          <div>
            <p className="text-sm font-bold text-white">{address}</p>
            <p className="text-xs text-slate-300">{city}</p>
          </div>
        </div>

        {/* Direction button overlay */}
        <a
          href={getDirectionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-3 top-3 z-10 flex items-center justify-center rounded-lg border border-white/20 bg-white/10 p-1.5 text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <span className="material-symbols-outlined text-sm">north_east</span>
        </a>
      </div>
      <a
        href={getDirectionsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full py-3 text-center text-sm font-semibold text-blue-300 transition-colors hover:text-white"
      >
        Get Directions
      </a>
    </div>
  );
}
