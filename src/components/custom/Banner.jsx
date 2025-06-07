import React, { useEffect, useState } from "react";

export default function Banner() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 6000); // 6 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="text-white px-6 py-4 rounded-lg shadow-2xl max-w-xl w-full text-center border border-blue-400 animate-fadeIn font-semibold text-[15px] md:text-lg
            bg-[#800000]">
            ⚠️ This site is currently not fully functional due to Google Billing and API issues. Some features may not work.
        </div>
    </div>

  );
}
