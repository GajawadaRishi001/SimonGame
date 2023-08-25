gameseq=[]
userseq=[]
let btnscolor=["red","green","blue","yellow"];
let started=false;
let level=0;
let displaylevel=document.querySelector("h2");
let highscore=0;
let highdisplay=document.querySelector("p");

document.addEventListener("keypress",function()
{
    if(started==false)
    {
        console.log("started");
        started=true;
        levelUp();
    }
})
function btnflash(button)
{
    button.classList.add("flash");
    setTimeout(function(){
        button.classList.remove("flash");

    },150)
}
function userflash(button)
{
    button.classList.add("userflash");
    setTimeout(function(){
        button.classList.remove("userflash");

    },150)
}
function levelUp()
{
    userseq=[];
    level++;
    displaylevel.innerText=`Level ${level}`;
    let randidx=Math.floor(Math.random()*4);
    let randcolor=btnscolor[randidx];
    let randbutton=document.querySelector(`.${randcolor}`);
    console.log(btnscolor[0]);
    gameseq.push(randcolor);
    console.log(gameseq);
    btnflash(randbutton);


}
function checkAns(idx){
    
    if(userseq[idx]===gameseq[idx])
    {
        if(userseq.length==gameseq.length)
        {
            setTimeout(levelUp,1000);
        }
    }
    else{
        console.log(highscore);
        console.log(level);
        if(level>highscore)
        {
                highdisplay.innerText=`HIGH SCORE ${level}`;
                highscore=level;
        }
        displaylevel.innerHTML=`game over ! Your score was<b>${    level}</b><br> press any key to restart`
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function()
        {
            document.querySelector("body").style.backgroundColor="white";
        },150)
        reset();
    }
}
function buttonpress(){
let btn=this;
usercolor=btn.getAttribute("id");
userseq.push(usercolor);
checkAns(userseq.length-1)
userflash(this);
}
let allBtns=document.querySelectorAll(".btn");
for(btns of allBtns)
{
    btns.addEventListener("click",buttonpress)
}
function reset()
{
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}

 function savetoDb()
 {
    return new Promise(resolve,reject)
    {
        let internetSpeed=Math.floor(Math.random*10)+1;
        if(internetSpeed>4)
        {
            success();
        }
        else{
            failure();
        }
    }
 }
 let url="https://catfact.ninja/fact";
// fetch(url)
// .then((res)=>{
//     console.log(res);
//     return res.json()
// })
// .then((data)=>{
//     console.log(data.fact);
// })
// .catch((err)=>{
//     console.log(err)
// })
// async function getfacts()
// {   
//     let res=await fetch(url);
//     let data= await res.json();
//     console.log(data.fact);
// }
async function getfacts()
{
    let res=await axios.get(url);
   
    console.log(res.data.fact);

}