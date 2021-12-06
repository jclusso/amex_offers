function enableOffers() {
  const offersPage = 'https://global.americanexpress.com/offers/eligible';
  if (window.location.href.startsWith(offersPage)) {
    var btn = document.getElementById('activateAllOffers');
    var originalText = btn.innerHTML;
    btn.innerHTML = 'Click Me!'
    btn.style.background = '#118C4F';
    setTimeout(function() {
      btn.style.background = '';
      btn.innerHTML = originalText;
    }, 1000);
  } else {
    alert('Must be on Amex Express Eligible Offers page. Redirecting there now!');
    window.location.href = offersPage;
  }
}

chrome.action.onClicked.addListener(function(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: enableOffers
  });
});
