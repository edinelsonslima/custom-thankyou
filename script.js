const bntRedirect = document.querySelector('#bnt-redirect');

const referrers = [
  'https://sun-sale-page-front-v4.testzz.ninja',
  'https://sun-sale-page-front-v4-qa1.testzz.ninja',
  'https://sun-sale-page-front-v4-qa2.testzz.ninja'
]

const thankyou = [
  'https://cdn.testzz.ninja/sun/thankyou/thankyou.js',
  'https://cdn.testzz.ninja/sun/thankyou-qa1/thankyou.js',
  'https://cdn.testzz.ninja/sun/thankyou-qa2/thankyou.js',
]

const referrerIndex = referrers.findIndex((v) => v === document.referrer);
const referrerCheckout = referrerIndex === -1 ? referrers.at(0) : referrers.at(referrerIndex)
const thankyouScript = referrerIndex === -1 ? thankyou.at(0) : thankyou.at(referrerIndex)

const search = new URLSearchParams(window.location.search)
const upsell = search.get('upsell') ?? '38527'
const local = search.get('local')

const url = local ?? referrerCheckout
const redirectUrl = `${url}/${upsell}?u=1`

bntRedirect.innerHTML = bntRedirect.textContent.replace('{{checkoutId}}', `<span>${redirectUrl}</span>`)

const script = document.createElement('script')
script.setAttribute('src', thankyouScript);
document.body.appendChild(script)

bntRedirect.addEventListener('click', () => {
  window.location.href = redirectUrl
})
