import React from "react";

function Footer({ footerRef }) {
  return (
    <div
      ref={footerRef}
      className="footer w-full flex flex-col text-muted-foreground items-center justify-center md:p-4 py-2 border-t"
    >
      <p className="sm:font-semibold sm:text-lg  bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text text-transparent">
        Safar Saarthi &copy; 2025
      </p>
  
    </div>
  );
}

export default Footer;




