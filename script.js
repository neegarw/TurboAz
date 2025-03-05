const cards = document.getElementById('cards')
const showBtn = document.getElementById('showBtn')
const sec = document.getElementById('sec')
const sec2 = document.getElementById('sec2')
const totalSec = document.getElementById('totalSec')
const shoppingList = document.getElementById('shoppingList')
const search = document.getElementById('search')
const search2 = document.getElementById('search2')
const sidebar = document.getElementById('sidebar')
const totalEndrim = document.getElementById('totalEndrim')
const totalEndrimsiz = document.getElementById('totalEndrimsiz')


let cardsNum = 4

const printCards = () => {
    cards.innerHTML = ''
    data
    .filter(item => (sec.value || sec2.value) ? item.marka == sec.value || item.marka == sec2.value : item)
    .slice(0, cardsNum)
    .map(item => cards.innerHTML += `<div class="container max-w-xs p-5 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800 ">
                                            <img onclick="showDet(${item.id})" src="${item.img}" alt="" class="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500">
                                            <div class="flex flex-col justify-between p-6 space-y-8">
                                                <div class="space-y-2">
                                                    <h2 class="text-3xl font-semibold tracking-wide hover:text-red-900 transition">${item.qiymet}₼</h2>
                                                    <h2 class="text-xl font-semibold tracking-wide">${item.marka},${item.model}</h2>
                                                    <p class="dark:text-gray-800">${item.il}, ${item.mator}, <span id="color" style="color:${item.reng}">${item.reng}</span></p>
                                                    <button onclick="buy(${item.id})" type="button" class="px-8 py-3 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100">Buy</button>
                                                </div>
                                            </div>
                                        </div>`)
}
printCards()

function showMore() {
    cardsNum += 4
    showBtn.style.display = cardsNum > data.length ? 'none' : 'block'
    printCards()
}

function handleBasket(status) {
    sidebar.style.right = status ? '0' : '-100vw'
}

let basketArr = []
function buy(id) {
    const obj = data.find(item => item.id == id)
    const product = basketArr.find(item => item.id == id)   
    if(product){
        product.count += 1
    } else basketArr.push({...obj, count: 1})
    printBasket()
}

function remove(id) {
    const index = basketArr.findIndex(item => item.id == id)
    basketArr.splice(index, 1)
    printBasket()
}

function handleCount(x, id) {
    const product = basketArr.find(item => item.id == id)
    const productIndex = basketArr.findIndex(item => item.id == id); 
    if ((product.count > 0 && x == -1) || (x == 1)){
        product.count += x 
        if (basketArr[productIndex].count === 0) basketArr.splice(productIndex, 1)
    }
    
    printBasket()
}


function showDet(id){
    window.location.href = `http://127.0.0.1:5501/detail.htm?id=${id}`
    }

function axtar(){
    cards.innerHTML = ''
    data
    .filter(item => item.marka.toLowerCase().includes(search.value.toLowerCase() || search2.value.toLowerCase()))
    .map((item, index) => cards.innerHTML +=  `<div class="container max-w-xs p-5 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800 ">
                                                <img onclick="showDet(${item.id})" src="${item.img}" alt="" class="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500">
                                                <div class="flex flex-col justify-between p-6 space-y-8">
                                                    <div class="space-y-2">
                                                        <h2 class="text-3xl font-semibold tracking-wide hover:text-red-900 transition">${item.qiymet}₼</h2>
                                                        <h2 class="text-xl font-semibold tracking-wide">${item.marka},${item.model}</h2>
                                                        <p class="dark:text-gray-800">${item.il}, ${item.mator}, ${item.reng}</p>
                                                        <button type="button" class="px-8 py-3 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100">Buy</button>
                                                    </div>
                                                </div>
                                            </div>`)
    showBtn.style.display = 'none'

}           
function filterCards(){
    cards.innerHTML = '';
    let selectedMarka = document.getElementById('sec').value 
    let selectedMarka2 = document.getElementById('sec2').value 
    data
    .filter(item => item.marka === selectedMarka || item.marka === selectedMarka2 )
    .forEach(item => {
        cards.innerHTML += `<div class="max-w-[20%] w-[100%] rounded-md shadow-md dark:bg-gray-50 dark:text-gray-800">
                            <img onclick="showDet(${item.id})" src="${item.img}" alt="" class="object-cover object-center w-full rounded-t-md h-72 dark:bg-gray-500">
                            <div class="flex flex-col justify-between p-6 space-y-8">
                                <div class="space-y-2">
                                    <h2 class="text-3xl font-semibold tracking-wide hover:text-red-900 transition">${item.qiymet}₼</h2>
                                    <h2 class="text-xl font-semibold tracking-wide">${item.marka},${item.model}</h2>
                                    <p class="dark:text-gray-800">${item.il}, ${item.mator}, ${item.reng}</p>
                                    <button type="button" class="px-8 py-3 font-semibold rounded-full dark:bg-gray-800 dark:text-gray-100">Buy</button>
                                </div>
                            </div>
                        </div>`})
    showBtn.style.display = 'none'
}

function printBasket(){
    const total = basketArr.reduce((acc, item) => {return acc + item.qiymet * item.count}, 0) 
    const totalCount = basketArr.reduce((acc, item) => acc + item.count, 0);
    const hasDiscount = totalCount >= 10
    const umumi = hasDiscount ? total * 0.9 : total
    const endrim = hasDiscount ? total * 0.1 : 0;

    totalEndrimsiz.innerHTML = 'Endrimsiz qiymet: ' + total + '₼'
    totalSec.innerHTML = hasDiscount ? 'Endrimli qiymet: ' + umumi + '₼' : ''
    totalEndrim.innerHTML = hasDiscount ? `<p>Ümumi endirim: <span class="font-semibold">${endrim}</span></p>` : '';
    shoppingList.innerHTML = ''
    basketArr.map(item => shoppingList.innerHTML += `<li class="flex flex-col py-6 sm:flex-row sm:justify-between">
                                                            <div class="flex w-full space-x-2 sm:space-x-4">
                                                                <img class="flex-shrink-0 object-cover w-20 h-20 dark:border- rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src="${item.img}" alt="Polaroid camera">
                                                                <div class="flex flex-col justify-between w-full pb-4">
                                                                    <div class="flex justify-between w-full pb-2 space-x-2">
                                                                        <div class="space-y-1">
                                                                            <h3 class="text-lg font-semibold leading-snug sm:pr-8">${item.marka}</h3>
                                                                            <p class="text-sm dark:text-gray-600">${item.model}</p>
                                                                            <div class="flex items-center gap-[10px]">
                                                                            <button onclick="handleCount(-1, ${item.id})" class="px-[10px] py-[5px] bg-white text-black rounded-[5px]">-</button>
                                                                                <span>${item.count}</span>
                                                                            <button onclick="handleCount(1, ${item.id})" class="px-[10px] py-[5px] bg-white text-black rounded-[5px]">+</button>
                                                                        </div>
                                                                        </div>
                                                                        <div class="text-right">
                                                                            <p class="text-lg font-semibold">${item.qiymet}₼</p>
                                                                            <span>total:</span><span class="text-md dark:text-white ${totalCount >= 10 ? 'line-through' : ''}">${item.qiymet * item.count}₼</span>
                                                                            <p class=" dark:text-gray-600">${totalCount >= 10 ? 'Endirimli qiymet: ' + item.count * item.qiymet * 0.9 : ''}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="flex text-sm divide-x">
                                                                        <button onclick="remove(${item.id})" type="button" class="flex items-center px-2 py-1 pl-0 space-x-1">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 fill-current">
                                                                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                                                <rect width="32" height="200" x="168" y="216"></rect>
                                                                                <rect width="32" height="200" x="240" y="216"></rect>
                                                                                <rect width="32" height="200" x="312" y="216"></rect>
                                                                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                                                            </svg>
                                                                            <span>Remove</span>
                                                                        </button>
                                                                        <button type="button" class="flex items-center px-2 py-1 space-x-1">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 h-4 fill-current">
                                                                                <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                                                                            </svg>
                                                                            <span>Add to favorites</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>`)
}
const opts = []
function printModels() {
    data.map(item => {
        !opts.some(i => i == item.marka) && opts.push(item.marka)
    })
    opts.forEach(item => sec.innerHTML += `<option value="${item}">${item}</option>`)
}
printModels()

function deleteBasket(){
    basketArr = []
    printBasket()
}

// burgerMenyu
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    menuBtn.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });
})