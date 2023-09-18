const flagElement = document.getElementById("flags");

const textsToChange = document.querySelectorAll("[data-section]")

const changeLenguage = async (language) =>{
    const requestJson = await fetch(`../../Lenguage/${language}.json`)
    const texts = await requestJson.json();

    for(const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = texts[section][value];
    }
};



flagElement.addEventListener("click", (e) => {
    changeLenguage(e.target.parentElement.dataset.language);
    
});