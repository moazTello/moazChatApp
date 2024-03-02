import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
    script.async = true;
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