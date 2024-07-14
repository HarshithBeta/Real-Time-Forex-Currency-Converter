const base_url = "https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

const change = document.querySelector(".dropdown i");
//for ..of is used for iteratable items like arrays,maps etc
//for ..in is used for enumerable objects with no proper iterators
for(let select of dropdowns){
  for(currCode in countryList){
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if(select.name === "from" && currCode === "USD"){
        newOption.selected = "selected";
      }
      if(select.name === "to" && currCode === "INR"){
        newOption.selected = "selected";
      }
      select.append(newOption);
  }
  //.target returns the element on which the event has occured
  select.addEventListener("change",(evt) =>{
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () =>{
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  console.log(amountVal);
  if(amountVal === ""||amountVal < 1){
    amountVal = 1;
    amount.value = "1";
  }
  let response = await fetch(base_url);
  let data = await response.json();
  let rateList = data.eur;
  let from = fromCurr.value.toLowerCase();
  let to = toCurr.value.toLowerCase();
  let rate = ((1/rateList[from])*rateList[to]);
  let finalAmount = rate*amountVal;
  from = from.toUpperCase();
  to = to.toUpperCase();
  msg.innerText = `${amountVal} ${from} =  ${finalAmount} ${to}`;
};

const updateFlag = (element) =>{
    let currCode = element.value;
    let Countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${Countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", ()=>{
    updateExchangeRate();
});

change.addEventListener("click",()=>{
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = temp;
    updateFlag(fromCurr);
    updateFlag(toCurr);
    updateExchangeRate();
});






