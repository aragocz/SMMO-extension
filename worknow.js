const userhpbar = document.getElementById("progress-bar2 playerHPBar");
const opphpbar = document.getElementById("progress-bar2 npcHPBar");
const attackbut = document.getElementById("attackButton");
const specattackbut = document.getElementById("attackButton_special");
const useitem = document.getElementById("useItem");
const origurl = window.location.href;
const urlwithoutargs = origurl.split("?")[0];
const oppid = urlwithoutargs.slice(39);

if(typeof work != "finished!"){
    try{
        chrome.storage.local.get(["smmoid","apikey"], work);
    }catch(e) {
        console.log(e);
        alert("Unable to run damage-showing script! Try refreshing, checking the extension permissions, or contact me on discord: aragocz#8496");
    }
}

function work(items) {
    //Actual magic here
    const userid = items.smmoid;
    const apikey = items.apikey;
        $.post("https://api.simple-mmo.com/v1/player/info/"+userid,"api_key=" + apikey, function(results){
            
            $.post("https://api.simple-mmo.com/v1/player/info/"+oppid,"api_key=" + apikey, function(results2){
                const resultss = results;
                const resultss2 = results2;
                pvpMaths(resultss, resultss2)
            })
        })
        
    //Telling the script that the execution finished
    return "finished!";
}

function randomBetween(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function pvpMaths(results, results2){
    const userhp = results.hp;
    const userdmg = results.str + results.bonus_str;
    const userdef = results.def + results.bonus_def;
    const userdex = results.dex + results.bonus_dex;
    const usermaxhp = results.max_hp;
    const opphp = results2.hp;
    const oppdmg = results2.str + results2.bonus_str;
    const oppdef = results2.def + results2.bonus_def;
    const oppdex = results2.dex + results2.bonus_dex;
    const oppmaxhp = results2.max_hp;
    const usermaxdmg = userdmg - (9/11)*oppdef;
    const usermindmg = userdmg - (11/9)*oppdef;
    const oppmaxdmg = oppdmg - (9/11)*userdef;
    const oppmindmg = oppdmg - (11/9)*userdef;
    var userhit = Math.floor(randomBetween(usermindmg, usermaxdmg));
    var opphit = Math.floor(randomBetween(oppmindmg, oppmaxdmg));
    var hitable = testCTH(userdex, oppdef);
    var urhitable = testCTH(oppdex, userdef);
    
    creatingElement(urhitable, usermaxdmg, usermindmg, userhp, usermaxhp, hitable, oppmaxdmg, oppmindmg, opphp, oppmaxhp);

    console.log(`Userhit: ${userhit} \nOpphit: ${opphit}`);
}

function testCTH(userdex, oppdef){
    const hits = []
    for(var i = 0; i < 10; i++){
        var cth = (7/2)*(userdex/oppdef);
        var roundcth = Math.round(cth);
        if(cth >= 0.05){
            hits.push("true")
            /* -.-.-Error Check-.-.-
            console.log(true)
            console.log(cth);
            console.log(roundcth);*/
        }else if(cth < 0.05){
            hits.push("false")
            /* -.-.-Error Check-.-.-
            console.log(false)
            console.log(cth);
            console.log(roundcth);*/
        }
    }
    if(hits.includes("true")){
        return true;
    }else if (!hits.includes("true")){
        return false;
    }
}

function creatingElement(userhitable, usermax, usermin, userhp, usermaxhp, opphitable, oppmax, oppmin, opphp, oppmaxhp){
    const hpbar = document.getElementsByClassName("progress2 progress-moved");
    const userhptxt = document.getElementById("user-hp");
    const opphptxt =  document.getElementById("opponent-hp");
    const newdivmax = document.createElement("DIV");
    const newdivmin = document.createElement("DIV");
    const userdiv = document.createElement("DIV");
    const oppdivmax = document.createElement("DIV");
    const oppdivmin = document.createElement("DIV");
    const oppdiv = document.createElement("DIV");
    newdivmax.classList.add("progress-bar2");
    newdivmin.classList.add("progress-bar2");
    oppdivmax.classList.add("progress-bar2");
    oppdivmin.classList.add("progress-bar2");
    const upmxraw = (usermax/opphp)*100;
    const upmnrawm = (usermin/opphp)*100;
    const opmxraw = (oppmax/userhp)*100;
    const opmnrawm = (oppmin/userhp)*100;
    const upmxx = upmxraw.toString();
    const upmnn = upmnrawm.toString();
    const opmxx = opmxraw.toString();
    const opmnn = opmnrawm.toString();
    const upmx = upmxx + "%";
    const upmn = upmnn + "%";
    const opmx = opmxx + "%";
    const opmn = opmnn + "%";


    console.log(upmx + " | " + upmn + " | " + opmx + " | " + opmn);

    if(upmnrawm >= 100){
        opphptxt.innerHTML = "ONE TAP!";
    }

    if(opmnrawm >= 100){
        userhptxt.innerHTML = "ONE TAP!";
    }

    newdivmin.style.backgroundColor = "#7800AB";
    newdivmax.style.backgroundColor = "#7849AB";
    newdivmax.style.width = opmx;
    newdivmax.style.zIndex = "0";
    newdivmin.style.zIndex = "1";
    newdivmax.style.position = "absolute";
    newdivmin.style.position = "absolute";
    newdivmax.style.right = "0px";
    newdivmin.style.right = "0px";
    userdiv.style.width = "196px";
    userdiv.style.right = "207px";
    userdiv.style.position = "absolute";

    oppdivmin.style.backgroundColor = "#7800AB";
    oppdivmax.style.backgroundColor = "#7849AB";
    oppdivmax.style.width = upmx;
    oppdivmax.style.zIndex = "0";
    oppdivmin.style.zIndex = "1";
    oppdivmax.style.position = "absolute";
    oppdivmax.style.maxWidth = "196px";
    oppdivmin.style.maxWidth = "196px";
    oppdivmin.style.position = "absolute";
    oppdivmax.style.right = "0px";
    oppdivmin.style.right = "0px";
    oppdiv.style.width = "196px";
    oppdiv.style.left = "207px";
    oppdiv.style.position = "absolute";
    if(userhitable === false || Math.sign(oppmax) == -1){
        userhptxt.innerHTML = "UNHITABLE!"
        console.log("You aren't hitable!")
    }
    if(opphitable === false || Math.sign(usermax) == -1){
        opphptxt.innerHTML = "UNHITABLE!"
        console.log("Opponent isn't hitable!")
    }
    if(Math.sign(oppmin) == -1 && Math.sign(oppmax) == 1){
        newdivmin.style.width = "0px";
    }else if(Math.sign(oppmin) == 1){
        newdivmin.style.width = opmn;
    }
    if(Math.sign(usermin) == -1 && Math.sign(usermax) == 1){
        oppdivmin.style.width = "0px";
    }else if(Math.sign(usermin) == 1){
        oppdivmin.style.width = upmn;
    }
    
    hpbar[0].appendChild(userdiv);
    userdiv.appendChild(newdivmax);
    userdiv.appendChild(newdivmin);
    hpbar[1].appendChild(oppdiv);
    oppdiv.appendChild(oppdivmax);
    oppdiv.appendChild(oppdivmin);

}