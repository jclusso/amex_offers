function elementReady(selector) {
  return new Promise((resolve, reject) => {
    let el = document.querySelector(selector);
    if (el) {
      resolve(el);
      return
    }
    new MutationObserver((mutationRecords, observer) => {
      // Query for elements matching the specified selector
      Array.from(document.querySelectorAll(selector)).forEach((element) => {
        resolve(element);
        //Once we have resolved we don't need the observer anymore.
        observer.disconnect();
      });
    })
      .observe(document.documentElement, {
        childList: true,
        subtree: true
      });
  });
}

function buttonClick() {
  offers = document.querySelectorAll('button.offer-cta');
  alert(`Activating ${offers.length} offers! Please do not close the page ` +
        `until all offers have been activated.`)
  offers.forEach(el => { el.click(); });
};

const offersEl = "#offers";
elementReady(offersEl).then((el) => {
  addButton(el)
});

var pastOffers = undefined;
function addButton(offersContainer) {
  const observer = new MutationObserver(function() {
    const header = document.querySelector('.axp-offers__global__headerSection___1aNfL');
    var btn = header.querySelector('button');
    if (btn == undefined) {
      btn = document.createElement('button');
      btn.id = 'activateAllOffers';
      header.appendChild(btn);
    };

    const offers = document.querySelectorAll('button.offer-cta');
    console.log(offers);
    if (pastOffers && offers.length == pastOffers.length) {
      return;
    };

    if (offers.length > 0) {
      text = offers.length > 1 ? 'Offers' : 'Offer'
      btn.innerHTML = `Activate ${offers.length} ${text}`;
      btn.removeAttribute('disabled');
    } else {
      btn.innerHTML = 'All Activated';
      btn.setAttribute('disabled', true);
    }

    btn.removeEventListener('click', buttonClick);
    btn.addEventListener('click', buttonClick);

    pastOffers = offers;
  });

  observer.observe(offersContainer, { subtree: true, childList: true });
};
