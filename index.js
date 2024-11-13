// Global variables
let total_cookie = 0 
let cookies_per_second = 0

// DOM elements
const cookie_image = document.getElementById('cookie_image')
const cookie_counter_tag = document.getElementById('cookie_counter')

// Functions
function initializeGame () {
    const saved = localStorage.getItem('saved_cookies')
    
    if(!saved) {
        localStorage.setItem('saved_cookies', 0)
        total_cookie = 0
    } else {
        total_cookie = parseInt(saved)
    }
}

function changeCounterTag (value) {
    cookie_counter_tag.innerText = total_cookie + " cookies"
}

function incrementCookies (cookies_to_add) {
    total_cookie += cookies_to_add
    changeCounterTag(total_cookie)
    localStorage.setItem('saved_cookies', total_cookie)
}

// Main
initializeGame()
changeCounterTag(total_cookie)
cookie_image.addEventListener('click', () => { incrementCookies(1) } )
