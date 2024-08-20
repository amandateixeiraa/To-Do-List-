// Variables
const startBtn = document.getElementById("startBtn");
const textInput = document.getElementById("textInput");
const addBtn = document.getElementById("addBtn");
const ul = document.querySelector(".listItems");

// First Page
function start() {
    window.location = "page2.html";
}
if (startBtn) {
    startBtn.addEventListener("click", start);
}

//Second Page

if(location.pathname == '/C:/Users/amand/OneDrive/Desktop/JSProject/todolist/page2.html' || location.pathname == '/todolist/page2.html' ){
function enter(event) {
    const inputValue = textInput.value;
    if (event.key === "Enter" || event.type == "click") {
        event.preventDefault();
        let items = JSON.parse(localStorage.getItem("items")) || [];
        items.push(inputValue);
        localStorage.setItem("items", JSON.stringify(items));

        addItemToList(inputValue);
        textInput.value = "";
    }
}

function clickCheck(img1) {
    const imgSrc = img1.src.split('/').pop();
    let check;
    if (imgSrc.endsWith("unchecked.png")) {
        img1.src = "images/checked.png";
        check = "checked";
    } else if (imgSrc.endsWith("checked.png")) {
        img1.src = "images/unchecked.png";
        check = "unchecked";}

let isChecked = JSON.parse(localStorage.getItem("isChecked")) || [];
isChecked.push({ item: img1.dataset.item, check }); 
localStorage.setItem("isChecked", JSON.stringify(isChecked));



}

function removeCheckFromStorage(item) {
    let isChecked = JSON.parse(localStorage.getItem("isChecked")) || [];
    isChecked = isChecked.filter(function(currentItem) {
        return currentItem.item !== item;
    });
    localStorage.setItem("isChecked", JSON.stringify(isChecked));
}

function addItemToList(item) {
    const div = document.createElement("div");
    div.className = "container-item";
    const div2 = document.createElement("div");
    div2.className = "flex-item1";
    const newListItem = document.createElement("li");
    const div3 = document.createElement("div");
    div3.className = "flex-item2";
    const div4 = document.createElement("div");
    div4.className = "flex-item3";
    const deleteBtn = document.createElement("button");
    const img1 = document.createElement("img");
    img1.className = "unchecked";
    img1.src = "images/unchecked.png";
    img1.dataset.item = item; 
    deleteBtn.className = "deleteBtn";
    deleteBtn.textContent = "Delete";

    if (item) {
        newListItem.textContent = item;
        ul.appendChild(div);
        div.appendChild(div4);
        div4.appendChild(img1);
        div.appendChild(div2);
        div2.appendChild(newListItem);
        div.appendChild(div3);
        div3.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            div.remove();
            removeItemFromStorage(item);
            removeCheckFromStorage(item);
        });

        img1.addEventListener("click", () => clickCheck(img1));
    }
}

function removeItemFromStorage(item) {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    items = items.filter(storedItem => storedItem !== item);
    localStorage.setItem("items", JSON.stringify(items));
}

document.addEventListener("DOMContentLoaded", () => {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.forEach(item => addItemToList(item));

    let isChecked = JSON.parse(localStorage.getItem("isChecked")) || [];
    const images = document.querySelectorAll('img');
    
  
    const itemImageMap = new Map();
    images.forEach(img => {
        const item = img.dataset.item;
        itemImageMap.set(item, img);
    });

    isChecked.forEach(({ item, check }) => {
        let imgElement = itemImageMap.get(item);
        if (imgElement) {
            imgElement.src = check === "checked" ? "images/checked.png" : "images/unchecked.png";
        }
    });
});

// Function's calls
if (textInput) {
    textInput.addEventListener("keydown", enter);
}
if(addBtn){
    addBtn.addEventListener("click", enter);
}}