import React, { useEffect } from 'react';

function AdSenseSidebar() {
  useEffect(() => {
    // This will load Google AdSense ads when deployed
    // Replace 'ca-pub-xxxxxxxxxxxxxxxx' with your actual AdSense publisher ID
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div className="adsense-sidebar">
      {/* Google AdSense Vertical Banner */}
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
        }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot="xxxxxxxxxxxxxxxx"
        data-ad-format="vertical"
        data-full-width-responsive="true"
      ></ins>

      <style>{`
        .adsense-sidebar {
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          height: fit-content;
          position: sticky;
          top: 20px;
          min-height: 600px;
        }

        @media (max-width: 1024px) {
          .adsense-sidebar {
            position: static;
            min-height: auto;
          }
        }
      `}</style>
    </div>
  );
}

export default AdSenseSidebar;
