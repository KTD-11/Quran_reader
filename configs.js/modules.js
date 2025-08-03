async function fetchData(url) {
    try{
        let response = await fetch(url);

        if (!response.ok){
            return {success: false, status: response.status};
        }

        let jsonData = await response.json();

        return {success: true, status: jsonData};
    }

    catch(err){
        return {success: false, status: err};
    }
    
}

function formatSurahNumber(surahNumber) {
    return (surahNumber < 10) ? `00${surahNumber}` : (surahNumber < 100) ? `0${surahNumber}` : surahNumber;
}