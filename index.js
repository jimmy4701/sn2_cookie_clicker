// Global variables
let total_cookie = 0 
let cookies_per_second = 0

let shop = [
    {id: "mamy", title: "Mamy", price: 10, cps: 1, image_url: "https://www.lavieapreslamort.com/wp-content/uploads/2017/10/Grand-mere-Instragram.jpg", total: 0},
    {id: "farm", title: "Ferme", price: 10, cps: 1, image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK_gP3iZMoqN0wgz1A3CYCo5bVvEyHJdmZRg&s", total: 0},
]


// DOM elements
const cookie_image = document.getElementById('cookie_image')
const cookie_counter_tag = document.getElementById('cookie_counter')
const shop_tag = document.getElementById('shop-container')

// Functions

function handleShopClick ( item ) {
    let index = shop.findIndex(o =>  o.id == item.id)
    shop[index].total += 1
    refreshShop()
}

function refreshShop() {

    shop_tag.innerHTML = null
    
    shop.forEach((item) => {
        let newDomElement = document.createElement('div')
        newDomElement.classList = ['bg-white rounded p-3 flex justify-between cursor-pointer hover:bg-blue-200 transition-all duration-300']
        
        let leftPart = document.createElement('div')
        leftPart.classList = ['flex items-center gap-3']

        let itemImage = document.createElement('img')
        itemImage.src = item.image_url
        itemImage.classList = ['rounded-full h-10']

        let itemName = document.createElement('span')
        itemName.innerText = item.title

        let itemTotal = document.createElement('span')
        itemTotal.innerText = item.total

        newDomElement.appendChild(leftPart)
        newDomElement.appendChild(itemTotal)

        leftPart.appendChild(itemImage)
        leftPart.appendChild(itemName)

        shop_tag.appendChild(newDomElement)

        // Add event listener
        newDomElement.addEventListener('click', () => { handleShopClick(item)} )


    })

}

function initializeGame () {
    const saved = localStorage.getItem('saved_cookies')
    
    if(!saved) {
        localStorage.setItem('saved_cookies', 0)
        total_cookie = 0
    } else {
        total_cookie = parseInt(saved)
    }

    refreshShop()
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
