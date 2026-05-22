import React, { useEffect } from 'react';

function AdSenseTop() {
  useEffect(() => {
    // This will load Google AdSense ads when deployed
    // Replace 'ca-pub-xxxxxxxxxxxxxxxx' with your actual AdSense publisher ID
    if (window.adsbygoogle) {
      window.adsbygoogle.push({});
    }
  }, []);

  return (
    <div className="adsense-top">
      {/* Google AdSense Horizontal Banner */}
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
        }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot="xxxxxxxxxxxxxxxx"
      ></ins>

      <style>{`
        .adsense-top {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          min-height: 100px;
        }

        @media (max-width: 768px) {
          .adsense-top {
            margin-bottom: 15px;
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}

export default AdSenseTop;
