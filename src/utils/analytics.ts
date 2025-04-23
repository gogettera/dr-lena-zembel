
export const applyGoogleAnalytics = (gaId: string) => {
  if (!gaId || gaId.trim() === '') return;
  
  try {
    // Check if GA script already exists
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${gaId}"]`)) {
      return; // Already loaded
    }
    const gaInitScript = document.createElement('script');
    gaInitScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}', { 'send_page_view': false });
      setTimeout(() => {
        gtag('event', 'page_view');
      }, 1500);
    `;
    document.head.appendChild(gaInitScript);

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.defer = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(gaScript);

    console.log(`Google Analytics initialized with ID: ${gaId}`);
  } catch (error) {
    console.error('Error applying Google Analytics:', error);
  }
};

export const applyFacebookPixel = (pixelId: string) => {
  if (!pixelId || pixelId.trim() === '') return;
  
  try {
    // Check if FB Pixel script already exists
    if (document.querySelector(`script[id="facebook-pixel-${pixelId}"]`)) {
      return; // Already loaded
    }
    const fbScript = document.createElement('script');
    fbScript.id = `facebook-pixel-${pixelId}`;
    fbScript.defer = true;
    fbScript.text = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      setTimeout(() => {
        fbq('track', 'PageView');
      }, 2000);
    `;
    document.head.appendChild(fbScript);
    console.log(`Facebook Pixel initialized with ID: ${pixelId}`);
  } catch (error) {
    console.error('Error applying Facebook Pixel:', error);
  }
};
