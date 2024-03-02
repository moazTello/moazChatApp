import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6018328138529620"
    //  crossorigin="anonymous"></script>
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6018328138529620';
    script.async = true;
    script.crossOrigin="anonymous";
    document.body.appendChild(script);

    window.googletag = window.googletag || { cmd: [] };
    googletag?.cmd?.push(() => {
      // Define an ad slot for div with id "banner-ad".
      googletag
        ?.defineSlot("/6355419/Travel/Europe/France/Paris", [300, 250], "banner-ad")
        ?.addService(googletag?.pubads());

      // Enable the PubAdsService.
      googletag?.enableServices();

      // Request and render an ad for the "banner-ad" slot.
      googletag?.display("banner-ad");
    });
  }, []);

  return <div id="banner-ad" style={{marginTop:'5px' }}></div>;
};

export default AdComponent;