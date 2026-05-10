"use client";

export default function TourBookingButton({ tourTitle }: { tourTitle: string }) {

  return (
    <button 
      onClick={() => {
        const element = document.getElementById('booking-form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }}
      className="w-full bg-primary text-white py-3.5 rounded-airbnb-sm font-semibold text-base hover:bg-primary-active transition-all active:scale-95"
    >
      Reserve this tour
    </button>
  );
}
