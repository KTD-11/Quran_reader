//initializing DOM content to be edited later
const mainSurahsContainer = document.querySelector(".main");
const mainTitle = document.querySelector(".title");
const readButton = document.querySelector(".read");
const backButton = document.querySelector(".backButton");
const timeControls =  {
    duration: 500, 
    iterations: 1, 
    fill: "forwards",
    delay: 200,
}

//fetching the two functions from the "modules.js" file, they're in a separate file because the functions are used elsewhere
fetchData();
formatSurahNumber();

//loading the Surah(s) in their place once the page is loaded, not to show the user any loading screens
window.addEventListener("DOMContentLoaded", async() => {
    //fetching the data from the surahs.json file
    let surahs = await fetchData("configs.js/surahs.json");

    /*looping over each surah in the file, the file is structured in an "interesting way, it's as follows"
    {
        success: <bool>, // false if the fetching operation fails
        status: <Obj> // if the success parameter is false then status is assigned as a string with the error code
    }

    if 'success' is true, then 'status' is a json response object, as shown

    {
        "surahs": [
            surah,
            surah,
            ...
        ]
    }
    */

    //checking if the response is valid, then rendering the page accordingly
    if (surahs.success === true){
        surahs.status.surahs.forEach(surah => {

            //initializing new DOM content
            let surahNumber = document.createElement("p"),
            surahEnglishName = document.createElement("h2"),
            surahArabicName = document.createElement("h2"),
            surahRevealPlace = document.createElement("p"),
            topContainer = document.createElement("div"),
            bottomContainer = document.createElement("div"),
            allContainer = document.createElement("div");

            //setting attributes of each new DOM element
            surahNumber.innerHTML = surah.number;
            surahEnglishName.innerHTML = surah.englishName;
            surahArabicName.innerHTML = formatSurahNumber(surah.number);
            surahRevealPlace.innerHTML = surah.revelationType;

            //setting classes for DOM content if necessary
            topContainer.classList.add("surahTopContainer");
            bottomContainer.classList.add("surahBottomContainer");
            surahArabicName.classList.add("surahArabicName");
            allContainer.classList.add("surahAllContainer");

            //appending each element to its own respective div
            topContainer.appendChild(surahArabicName);
            topContainer.appendChild(surahEnglishName);

            bottomContainer.appendChild(surahRevealPlace);
            bottomContainer.appendChild(surahNumber);

            allContainer.appendChild(topContainer);
            allContainer.appendChild(bottomContainer);

            //adding each surah to the DOM
            mainSurahsContainer.appendChild(allContainer);

            //redirecting user to the surah page, if the user clicks on it
            allContainer.addEventListener("click", ()=>{
                window.location.href = `surah.html?surah=${encodeURIComponent(surah.number)}`;
            });
        });
    }

    //showing an error message if the response is invalid
    else{
        let errMsg = document.createElement("h1");
        
        errMsg.innerHTML = `Failed to load surahs, error: ${surahs.status}`;

        mainSurahsContainer.appendChild(errMsg);
    }
});

//moving the main image towards the mouse slightly
window.addEventListener("mousemove", (e)=>{
    let mouseX = e.pageX,
    mouseY = e.pageY;

    mainTitle.animate([{
        transform: `translatex(${(mouseX - (screen.width / 2)) / 20}px) translatey(${(mouseY - (screen.height / 2)) / 20}px)`
    }], {
        duration: 1000,
        iterations: 1,
        fill: "forwards",
    });
});

readButton.addEventListener('click', ()=>{
    backButton.style.visibility = "visible";
    backButton.style.transform = "translatex(-10px) rotate(-90deg)";
});

backButton.addEventListener('click', ()=>{
    backButton.style.transform = "translatex(100px)";

    setTimeout(()=>{
        backButton.style.visibility = "hidden";
    }, 750);
});