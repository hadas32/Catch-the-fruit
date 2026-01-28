// let hard=["_Group_","_Group_ (1)","_Group_ (2)",
//     "_Group_ (3)","_Group_ (4)",
//     "_Group_ (5)","_Group_",
//     "_Group_ (1)","_Group_ (2)",
//     "_Group_ (3)","_Group_ (4)",
//     "_Group_ (5)","_Group_2","_Group_2"
// ,"_Group_ (1)1","_Group_ (1)1"
// ,"_Group_ (2)1","_Group_ (2)1",
// "_Group_1","_Group_1"];

// let easy=["_Group_","_Group_ (1)","_Group_ (2)",
//     "_Group_ (3)","_Group_ (4)",
//     "_Group_ (5)","_Group_",
//     "_Group_ (1)","_Group_ (2)",
//     "_Group_ (3)","_Group_ (4)",
//     "_Group_ (5)",];
// let cuurentCards = []
// let points=0
// let first=null
// let second=null

// function startGame(event)
// {
//     cuurentCards=[]

//     let tmp=[]
//     let b=document.querySelector('.board')
//     if(event.target.value=="קל")
//     {
//         b.style.width = "700px";
//         tmp=[...easy]
//     }
//     if(event.target.value=="קשה")
//     {
//         b.style.width = "900px";
//         tmp=[...hard]
//     }
//     while(tmp.length!=0)
//     {
//         let index=getRandomInt(tmp.length);
//         cuurentCards.push(tmp[index]);
//         tmp.splice(index,1);
//     }
//     console.log(cuurentCards);

//     b.innerHTML= ""
//     points=0
//     for (let i = 0; i < cuurentCards.length; i++) {
//         let cardGame=document.createElement('div')
//         cardGame.classList.add('card')
//         cardGame.id=cuurentCards[i]
//         cardGame.onclick=selectCard;
//         b.append(cardGame)
//     }
// }
// function selectCard(event)
// {
//     if(first==null)
//     {
//         first = event.currentTarget
//         first.style.pointerEvents = "none";
//     }
//     else if(second==null)
//     {
//         second= event.currentTarget
//         second.style.pointerEvents = "none";
//         setTimeout(() => {
//             isPair()
//         }, 1500);
//     }
//     else
//          return;
//     event.currentTarget.style.backgroundImage=`url("./images/${event.currentTarget.id}.png")`;
// }
// function isPair()
// {
//     if(first.id==second.id)
//     {
//         points++
//     }

//     else
//     {
//         first.style.pointerEvents = "auto";
//         second.style.pointerEvents = "auto";
//         first.style.backgroundImage= `url('./images/cover.jpg')`;
//         second.style.backgroundImage= `url('./images/cover.jpg')`;
//     }
//     if(points*2==cuurentCards.length)
//     {
//         location.reload();
//     }
//     first=null
//     second=null
//     document.querySelector('h2').innerHTML= "הניקוד שלך הוא: " + points
// }
// function getRandomInt(max) {
//     return Math.floor(Math.random() * max);
// }

let hard=["_Group_","_Group_ (1)","_Group_ (2)",
    "_Group_ (3)","_Group_ (4)",
    "_Group_ (5)","_Group_",
    "_Group_ (1)","_Group_ (2)",
    "_Group_ (3)","_Group_ (4)",
    "_Group_ (5)","_Group_2","_Group_2"
,"_Group_ (1)1","_Group_ (1)1"
,"_Group_ (2)1","_Group_ (2)1",
"_Group_1","_Group_1"];

let easy=["_Group_","_Group_ (1)","_Group_ (2)",
    "_Group_ (3)","_Group_ (4)",
    "_Group_ (5)","_Group_",
    "_Group_ (1)","_Group_ (2)",
    "_Group_ (3)","_Group_ (4)",
    "_Group_ (5)"];
let cuurentCards = []
let points=0
let first=null
let second=null

function startGame(event)
{
    cuurentCards=[]

    let tmp=[]
    let b=document.querySelector('.board')
    if(event.target.value=="קל")
    {
        b.style.width = "700px";
        tmp=[...easy]
    }
    if(event.target.value=="קשה")
    {
        b.style.width = "900px";
        tmp=[...hard]
    }
    while(tmp.length!=0)
    {
        let index=getRandomInt(tmp.length);
        cuurentCards.push(tmp[index]);
        tmp.splice(index,1);
    }
    console.log(cuurentCards);

    b.innerHTML= ""
    points=0
    for (let i = 0; i < cuurentCards.length; i++) {
        let cardGame=document.createElement('div')
        cardGame.classList.add('card')
        cardGame.id=cuurentCards[i]
        cardGame.onclick=selectCard;
        b.append(cardGame)
    }
}
function selectCard(event)
{
    let card = event.currentTarget;
    if (first == null) {
        first = card;
        first.style.pointerEvents = "none";
        flipCard(first);
    } else if (second == null) {
        second = card;
        second.style.pointerEvents = "none";
        flipCard(second);
        setTimeout(() => {
            isPair()
        }, 1500);
    } else {
        return;
    }
}

function flipCard(card) {
    card.style.transform = "rotateY(90deg)";
    setTimeout(() => {
        card.style.backgroundImage = `url("./images/${card.id}.png")`;
        card.style.transform = "rotateY(180deg)";
    }, 150);
}

function unflipCard(card) {
    setTimeout(() => {
        card.style.transform = "rotateY(90deg)";
        setTimeout(() => {
            card.style.backgroundImage = `url('./images/cover.jpg')`;
            card.style.transform = "rotateY(0deg)";
            card.style.pointerEvents = "auto";
        }, 150);
    }, 500);
}

function isPair()
{
    if(first.id==second.id)
    {
        points++;
    }
    else
    {
        unflipCard(first);
        unflipCard(second);
    }
    if(points*2==cuurentCards.length)
    {
        location.reload();
    }
    first=null;
    second=null;
    document.querySelector('h2').innerHTML= "הניקוד שלך הוא: " + points;
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
