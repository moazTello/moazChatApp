import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6018328138529620"
    //  crossorigin="anonymous"></script>
    const script = document.createElement('script');
    // script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6018328138529620';
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456";
    script.async = true;
    script.crossOrigin="anonymous";
    // script.client = "ca-pub-1234567890123456"
    document.body.appendChild(script);


    // <div align="center">
    // <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456" crossorigin="anonymous"></script>
    // <!-- Homepage Leaderboard -->
    // <ins class="adsbygoogle"
    // style="display:inline-block;width:728px;height:90px"
    // data-ad-client="ca-pub-1234567890123456"
    // data-ad-slot="1234567890"></ins>
    // <script>
    // (adsbygoogle = window.adsbygoogle || []).push({});
    // </script>
    // </div>



    window.googletag = window.googletag || { cmd: [] };
    googletag?.cmd?.push(() => {
      // Define an ad slot for div with id "banner-ad".
      googletag
        ?.defineSlot("1234567890", [728, 90], "banner-ad")
        ?.addService(googletag?.pubads());

      // Enable the PubAdsService.
      googletag?.enableServices();

      // Request and render an ad for the "banner-ad" slot.
      googletag?.display("banner-ad");
    });
  }, []);

  // return <div id="banner-ad" style={{marginTop:'5px',width:'728px',height:'90px' }}></div>;
  return (<ins
    className="adsbygoogle"
    style={{ display: 'block', width: '728px', height: '90px' }}
    data-ad-client="ca-pub-1234567890123456"
    data-ad-slot="1234567890"
  ></ins>);
};

export default AdComponent;