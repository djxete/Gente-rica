//------------------------------- VARIABLES-------------------------------

const add__user = document.getElementById("add__user");
const double = document.getElementById("double");
const show__millionaires = document.getElementById("show__millionaires");
const sort = document.getElementById("sort");
const calculate__wealth = document.getElementById("calculate__wealth");

const main = document.getElementById("main");




//-------------------------------- EVENT LISTENERS---------------------------

 add__user.addEventListener("click",getRandomUser);
 double.addEventListener("click", doubleMoney);
 sort.addEventListener("click", sortByRichest);
show__millionaires.addEventListener("click", showMillionaires);
calculate__wealth.addEventListener("click", calculateWealth);



let data = [];


//----------------------------------FUNCTIONS--------------------------------


//Fetch random user and add money

async function getRandomUser(){
    
    const re =  await fetch("https://www.randomuser.me/api");
    const data = await re.json();
    const user = data.results[0];
    // console.log(data);
    //console.log(user);

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }


    addData(newUser);


}



//Add new obj to data array

function addData(obj){
    data.push(obj);

    updateDOM();
}


//Update DOM

function updateDOM(providedData = data){
    //Clear main div
    main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

    providedData.forEach( item =>{
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element)
        //console.log(typeof item.money);
    })

}

//Format number and money

function formatMoney(number){

    return "$" + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}


//Double everyones money

function doubleMoney(){
    data = data.map((user) => {
        //console.log(user);
        return {...user, money: user.money *2}
        
    })

    updateDOM();
}


//Sort names by richest

function sortByRichest(){

    data = data.sort((a,b) => b.money - a.money);

  

    updateDOM();
}

//Show millionaires

function showMillionaires(){

   data = data.filter(user => user.money > 1000000);
   

   updateDOM();

}

//Calculate wealth

function calculateWealth(){
    const wealth = data.reduce((acc,user) =>
    (acc += user.money),0);
    const wealthEle = document.createElement("div");
    wealthEle.classList.add("total");
    wealthEle.innerHTML = `<h3>Total: </h3> ${formatMoney(wealth)}`;
    
    main.appendChild(wealthEle);
    //console.log(formatMoney(wealth));
}