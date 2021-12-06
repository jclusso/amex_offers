function enableOffers() {
  const offersPage = 'https://global.americanexpress.com/offers/eligible';
  if (window.location.href != offersPage) {
    alert('Must be on Amex Express Eligible Offers page. Redirecting there now' +
          'Please click again once redirected to enable all offers.');
    window.location.href = offersPage;
    return
  }
  const offers = document.querySelectorAll('button.offer-cta');
  offers.forEach(el => { el.click(); });
  alert(`Activating ${offers.length} offers! Please do not close the page ` +
        `until all offers have been activated.`)
}

chrome.action.onClicked.addListener(function(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: enableOffers
  });
});
