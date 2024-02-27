document.querySelector("#generate").addEventListener("click", generateCards);
let errors=[];
const printBtn = document.querySelector('#print');
printBtn.addEventListener('click', e => window.print());

function generateCards(evt) {
    const allSongs = document.querySelector('textarea').value.trim().split('\n').map(s=>s.trim());
    const numCards = parseInt(document.querySelector('input').value);
    if (allSongs.length<24) {
        errors.push("Please add at least 24 items");
    }
    if(numCards < 1) {
        errors.push("You must have at least 1 card");
    }

    if(errors.length>0) {
        document.querySelector('validation').innerHTML = errors.map(e=> `<li>${e}</li>`);
        return;
    }

    let data = Array.from({length:numCards}, _ => getCardData(allSongs));
    
    renderCards(data)
    // console.log(allSongs);
}

function renderCards(data) {
    let template = ``;
    for (let i=0;i<data.length;i++) {
        template += `<div class="page"><section class="card">
                <header>
                    <h1>BINGO</h1> 
                    <span class="no">Card No: ${i+1}</span>
                </header>
            <main>`
        for (let j=0; j<data[i].length; j++) {
            if (j==12) {
                template += `<div class="cell free">FREE</div>`
            }
            template += `<div class="cell">${ data[i][j] }</div>`
        }
        template += `</main></section></div>`;
    }
    document.querySelector('#print').disabled = false;
    document.querySelector('#cards').innerHTML = template;
    console.log(data)
}

function getCardData(songs) {
    let shuffled=songs.map(s=>s);
    let curr = songs.length;
    
    while (curr > 0) {
        // Pick a remaining element.
        r = Math.floor(Math.random() * curr);
        curr--;

        // And swap it with the current element.
        [
            shuffled[curr], shuffled[r]
        ] = [
            shuffled[r], shuffled[curr]
        ];
    }


    return shuffled.slice(0,24);
}