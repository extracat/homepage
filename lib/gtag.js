export const GA_TRACKING_ID = "G-LG3PLEN3EH";
export const GTM_ID = "GTM-WDW9ZB7";

export const pageview = (url) => {
  //window.gtag("config", GA_TRACKING_ID);
  window.gtag("event", "test-event: " + window.location.pathname, {
    'href': window.location.href,
    'url': url
  });
};

export const event = ({ action, category, label, value }) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};