//selectors
let bill = document.querySelector(".bill");
let tipbtns = document.querySelectorAll(".tip");
let tipCustom = document.querySelector(".input-cstm")
let people = document.querySelector("#ppl-input");
let errorMsg = document.querySelector(".error-msg");
let result = document.querySelector(".results");
let totals = document.querySelector(".total");
let resetbtn =document.querySelector(".reset")


// event listener
bill.addEventListener('input' , getBillValue);
tipbtns.forEach(btn => {
    btn.addEventListener("click",getTipValue)
});
tipCustom.addEventListener('input',setCustomValue);
people.addEventListener('input',getNumberPeople);
resetbtn.addEventListener('click',reset)
//variables
let billValue = 0.0;//default value
let tipValue = 0.15;
let numberOfPeople = 1;


//functions
function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx)

}
function validateInt(s){
    var rgx =/^[0-9]*/;
    return s.match(rgx)

}
function getBillValue(){
    if(bill.value.includes(',')){
        bill.value=bill.value.replace(',','.');
    }
    //cuts of all the invalid input 
    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0,bill.value.length-1)
    }
    billValue = parseFloat(bill.value);
    calculateTip();
    //console.log(billValue);
}

function getTipValue(event){
    tipbtns.forEach(btn => {btn.classList.remove("btn-active")
    //set active state
    if(event.target.innerHTML == btn.innerHTML){
        btn.classList.add("btn-active")
        tipValue = parseFloat(btn.innerHTML)/100;

        }
    });
    //clear the tip value
    tipCustom.value = "";
    calculateTip();
    //console.log(tipValue)
}

function setCustomValue(){
    if(!validateInt(tipCustom.value)){
        tipCustom.value =tipCustom.value.substring(0, tipCustom.value.length-1);
    }
    //only integers
    tipValue = parseFloat(tipCustom.value/100)

    //remove active state from button
    tipbtns.forEach(btn =>{
        btn.classList.remove("btn-active")
    });
    if(tipCustom.value !== ""){
        calculateTip();
        }
}

function getNumberPeople(){
    if(!validateInt(people.value)){
        people.value =people.value.substring(0, people.value.length-1);
    }
    numberOfPeople = parseFloat(people.value)
    if(people.value <= 0){
        errorMsg.classList.add('show-error-msg');
        setTimeout(function(){
            errorMsg.classList.remove('show-error-msg');
        },5000)
    }

    calculateTip();
}

function calculateTip(){
    if(numberOfPeople>=1){
        let tipAmount = (billValue + tipValue) /numberOfPeople;
        let total = (billValue +(tipValue + 1)) / numberOfPeople;
        result.innerHTML = "$"+ tipAmount.toFixed(2);
        totals.innerHTML = "$" +total.toFixed(2);
 
 
    }
}

function reset(){
    bill.value  = "0.0";
    getBillValue();
    people.value ='1';
    getNumberPeople();

    tipbtns.forEach(btn =>{
        btn.classList.remove("btn-active")
    });
    result.innerHTML = "$"+"0.0";
    totals.innerHTML = "$"+ "0.0";
       
}