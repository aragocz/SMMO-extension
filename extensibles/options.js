function saveid(){
    const thingy = document.getElementById("para");
    const value = document.getElementById("id").value;
    chrome.storage.local.set({smmoid: value});
    thingy.innerHTML = "ID succesfully saved! \n (ID set to: " + value +")";
}

function saveapi(){
    const thingy = document.getElementById("para2");
    const value = document.getElementById("apikey").value;
    chrome.storage.local.set({apikey: value});
    thingy.innerHTML = "API key succesfully saved! \n (API key set to: " + value +")";
} 

function apihelp(){
    alert("After you close this, a new window will open, copy ONLY the key, without the \"api_key=\" part.")
    window.open("https://web.simple-mmo.com/p-api/home");
}

const button = document.getElementById("submit");
const apibut = document.getElementById("submitapi");
const apitxt = document.getElementById("apilabel")
function setListener(){
    button.addEventListener("click", saveid);   
    apibut.addEventListener("click", saveapi);
    apitxt.addEventListener("click", apihelp);
};

setListener();
