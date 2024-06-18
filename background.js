try{
    const extid = chrome.runtime.id;
    var currtab;
    var currurl;
    var attackurl;
    var tabiddd;


    chrome.runtime.onInstalled.addListener(() => {
        chrome.tabs.create({ url: "chrome-extension://"+extid+"/extensibles/options.html"})
        chrome.storage.local.set({apikey: "YOURKEYHERE"})
    });

    function pageLoad(tabId, changeInfo, tab){
        if(changeInfo.status === "complete" && tab.url.startsWith("https://web.simple-mmo.com/user/attack/")){
            chrome.scripting.executeScript({
                files: ["worknow.js"],
                target: {tabId: tab.id}
            })
            chrome.scripting.executeScript({
                files: ["jquery.js"],
                target: {tabId: tab.id}
            })
        }
    }

    chrome.tabs.onUpdated.addListener(pageLoad)

}catch(e) {console.log(e)}


