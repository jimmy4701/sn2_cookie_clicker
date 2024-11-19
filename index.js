// Global variables
let total_cookie = 0 
let cookies_per_second = 0
let total_cps = 0

let shop = []

// DOM elements
const cookie_image = document.getElementById('cookie_image')
const cookie_counter_tag = document.getElementById('cookie_counter')
const shop_tag = document.getElementById('shop-container')
const cookie_per_second_tag = document.getElementById('cookie_per_second')
const reset_button = document.getElementById('reset-button')

// Functions
function handleShopClick ( item ) {

    if(item.price > total_cookie){
        alert(`🤔 Vous êtes pauvre !`)
        return
    }

    let index = shop.findIndex(o =>  o.id == item.id)
    total_cookie -= item.price
    shop[index].total += 1
    shop[index].price = Math.round(shop[index].price * 1.4)
    localStorage.setItem('saved_shop', JSON.stringify(shop))
    refreshShop()
    refreshCPS()
}

function refreshCPS() {
    let total = 0

    shop?.forEach(item => {
        total += item.total * item.cps
    })
    total_cps = total
    cookie_per_second_tag.innerText = `${total_cps} cookies par seconde`
}

function refreshShop() {

    shop_tag.innerHTML = null
    
    shop?.forEach((item) => {
        let content = `
            <div class="bg-white rounded p-3 flex justify-between cursor-pointer hover:bg-blue-200 transition-all duration-300">
                <div class="flex items-center gap-3">
                    <img src="${item.image_url}" class="rounded-full h-20 w-20">
                    <span class="font-bold">${item.title}</span>
                    <span>${item.price} cookies</span>
                </div>
                <span>${item.total}</span>
            </div>
        `
        
        let newDomElement = document.createElement('div')
        newDomElement.innerHTML = content
        

        shop_tag.appendChild(newDomElement)

        // Add event listener
        newDomElement.addEventListener('click', () => { handleShopClick(item)} )


    })

}

function initializeGame () {
    const saved_cookies = localStorage.getItem('saved_cookies')
    const saved_shop = localStorage.getItem('saved_shop')

    if(!saved_shop){
        shop = [
            {id: "mamy", title: "Mamy", price: 10, cps: 1, image_url: "https://www.lavieapreslamort.com/wp-content/uploads/2017/10/Grand-mere-Instragram.jpg", total: 0},
            {id: "farm", title: "Ferme", price: 100, cps: 10, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK_gP3iZMoqN0wgz1A3CYCo5bVvEyHJdmZRg&s", total: 0},
        ]
    } else {
        shop = JSON.parse(saved_shop)
    }
    
    if(!saved_cookies) {
        localStorage.setItem('saved_cookies', 0)
        total_cookie = 0
    } else {
        total_cookie = parseInt(saved_cookies)
    }
    
    refreshShop()
    refreshCPS()
    refreshCookies(total_cookie)

}

function resetGame() {
    localStorage.removeItem('saved_cookies')
    localStorage.removeItem('saved_shop')
    total_cookie = 0
    total_cps = 0
    initializeGame()
}

function refreshCookies (value) {
    cookie_counter_tag.innerText = Math.round(total_cookie) + " cookies"
}

function incrementCookies (cookies_to_add) {
    total_cookie += cookies_to_add
    refreshCookies(total_cookie)
    localStorage.setItem('saved_cookies', total_cookie)
}

// Main
initializeGame()
cookie_image.addEventListener('click', () => { incrementCookies(1) } )
reset_button.addEventListener('click', resetGame)

setInterval(() => {
    incrementCookies(total_cps / 10)
}, 100)