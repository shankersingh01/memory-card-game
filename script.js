const cards= document.querySelectorAll('.card');

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard=0;

function flipCard(e) {
    let clickedCard=e.target;                 
    
    if(clickedCard !== cardOne &&!disableDeck)  {
        clickedCard.classList.add("flip");
        if(!cardOne){
            return cardOne=clickedCard;
        }
        cardTwo=clickedCard;
        disableDeck=true;
        let cardOneimg=cardOne.querySelector(".back-view img").src,
        cardTwoimg=cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneimg, cardTwoimg);
    }
}

 
function matchCards(img1, img2){
    if(img1===img2){
        matchedCard++;
        if(matchedCard==8){
           setTimeout(()=>{return shuffleCard();
        },1000);   
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne=cardTwo="";
        return disableDeck=false;

    }
    setTimeout(()=>{
        //shaking the cards after 400ms when cards not matched
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    },600);

    setTimeout(()=>{
        //shaking the cards after 400ms when cards not matched
        cardOne.classList.remove("shake","flip");
        cardTwo.classList.remove("shake","flip");
        cardOne=cardTwo="";
        disableDeck = false;
    },1200);
    // setting both the card to none after removing the class shake and flip
}

function shuffleCard(){
    matchedCard = 0;
    cardOne=cardTwo="";
    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(()=>Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index)=>{ 
        let imgTag =card.querySelector("img");
        imgTag.src = `Memory Card Game Images/image-${arr[index]}.jpg`;
        card.classList.remove("flip");
        card.addEventListener('click',flipCard);
    });
}

shuffleCard();

cards.forEach(card =>{ //adding event listener to all cards
    card.addEventListener('click',flipCard);
    // card.classList.add("flip");
});