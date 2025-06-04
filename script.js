const form = document.querySelector('#form-redirect');
const input = document.querySelector('#form-redirect > input');

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

const referrerIndex = referrers.findIndex((v) => document.referrer.includes(v))
const referrerCheckout = referrerIndex === -1 ? referrers.at(0) : referrers.at(referrerIndex)
const thankyouScript = referrerIndex === -1 ? thankyou.at(0) : thankyou.at(referrerIndex)

const search = new URLSearchParams(window.location.search)
const upsell = search.get('upsell') ?? '38527'
const redirectTo = search.get('redirectTo')

const redirectUrl = redirectTo ? decodeURIComponent(redirectTo) : `${referrerCheckout}/${upsell}?u=1`

input.setAttribute('value', redirectUrl)
input.focus()

const script = document.createElement('script')
script.setAttribute('src', thankyouScript);
document.body.appendChild(script)

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target)

  window.location.href = formData.get('url') ?? redirectUrl
})
