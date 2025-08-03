let surahNumber;
const surahTitle = document.querySelector("h1");
const ayahContainer = document.querySelector(".ayahContainer");
const sideBarToggle = document.querySelector(".hamburgerButton");
const sideBarContainer = document.querySelector(".sideBarContainer");
const closeButton = document.querySelector(".closeButton");
const homeButton = document.querySelector(".homeButton");
const animateOptions = {
    duration: 400,
    easing: "ease-in-out",
    iterations: 1,
    fill: "forwards",
};

fetchData();
formatSurahNumber();

window.addEventListener("DOMContentLoaded", async ()=>{

    Loader.open();
    const params = new URLSearchParams(window.location.search);
    surahNumber = params.get("surah");

    const surahResponseObject = await fetchData("configs.js/surahs.json");
    const surah = surahResponseObject.status.surahs[surahNumber - 1];

    document.title = surah.englishName;
    surahTitle.innerHTML = formatSurahNumber(surahNumber);

    let ayahElement = document.createElement("div");
    let i = 0;

    surah.ayahs.forEach( ayah => {
        i++;

        ayah.text.split(" ").forEach(word => {
            let wordContainer = document.createElement("span");

            wordContainer.innerHTML = word + " ";

            ayahElement.appendChild(wordContainer);
            wordContainer.classList.add(`word${i}`);

            wordContainer.addEventListener("mouseover", ()=>{
                let spans = [
                    {
                        name: (wordContainer.previousElementSibling).previousElementSibling, 
                        color: "#EEE"
                    },
                    {
                        name: wordContainer.previousElementSibling, 
                        color: "#EEE"
                    },
                    {
                        name: wordContainer, 
                        color: "#FFF"
                    },
                    {
                        name: wordContainer.nextElementSibling, 
                        color: "#EEE"
                    },
                    {
                        name: (wordContainer.nextElementSibling).nextElementSibling, 
                        color: "#EEE"
                    }
                ];

                for (let span in spans){
                    if (spans[span].name === null)
                        continue;

                    (spans[span].name).animate([{ color: spans[span].color }], animateOptions);
                }
            });

            wordContainer.addEventListener("mouseleave", ()=>{
                let spans = [
                    {
                        name: (wordContainer.previousElementSibling).previousElementSibling, 
                    },
                    {
                        name: wordContainer.previousElementSibling, 
                    },
                    {
                        name: wordContainer, 
                    },
                    {
                        name: wordContainer.nextElementSibling, 
                    },
                    {
                        name: (wordContainer.nextElementSibling).nextElementSibling, 
                    }
                ];

                for (let span in spans){
                    if (spans[span].name === null)
                        continue;

                    (spans[span].name).animate([{ color: "#555" }], animateOptions);
                }
            });
            
        });
        
        let ayahNumberDisplay = document.createElement("span");
        ayahNumberDisplay.innerHTML = ` ﴿${ayah.numberInSurah}﴾ `
        ayahNumberDisplay.classList.add('snd');

        ayahElement.appendChild(ayahNumberDisplay);
        ayahElement.classList.add("ayahStyle");

        ayahContainer.appendChild(ayahElement);
    });

    Loader.close();
    sideBarToggle.addEventListener('click', ()=> displaySurahsInSideMenu(surahNumber, surahResponseObject.status.surahs));
});

function displaySurahsInSideMenu(surahNumber, surahs){
    surahs.forEach(Element => {
        let surah = document.createElement("p");
        
        surah.innerHTML = (Element === surahs[surahNumber - 1]) ? Element.englishName + " ←" :Element.englishName;

        sideBarContainer.appendChild(surah);

        surah.addEventListener('click', ()=>{
            window.location.href = `surah.html?surah=${surahs.indexOf(Element) + 1}`;
        });
    });

    sideBarContainer.style.display = "flex";
    sideBarContainer.animate({width: (window.screen.width < 580) ? "100vw" : "50vw"}, animateOptions); 
}

closeButton.addEventListener('click', ()=>{
    sideBarContainer.animate({width: "0"}, animateOptions); 

    setTimeout(()=> {
        sideBarContainer.style.display = "none";
    }, 400);
});

homeButton.addEventListener('click', ()=>{
    window.location.href = "index.html"
});