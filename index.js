// Global variables
let total_cookie = 0 
let cookies_per_second = 0

// DOM elements
const cookie_image = document.getElementById('cookie_image')
const cookie_counter_tag = document.getElementById('cookie_counter')

function changeCounterTag (value) {
    cookie_counter_tag.innerText = total_cookie + " cookies"
}

function incrementCookies (cookies_to_add) {
    total_cookie += cookies_to_add
    changeCounterTag(total_cookie)

}

changeCounterTag(total_cookie)

cookie_image.addEventListener('click', () => { incrementCookies(1) } )
