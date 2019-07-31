const add = document.querySelector('#add');
const update = document.querySelector('#update');
const formWallet = document.querySelector('#formWallet');
const myWallet = document.querySelector('.myWallet');
const formBill = document.querySelector('#formBill');
const message = document.querySelector('.message');
const listBill = document.querySelector('#listBill');
const buttonDebt = document.querySelector('#buttonDebt');
const cardMyDebt = document.querySelector('#card-myDebts');
const upArrow = document.querySelector('.upArrow');
const patternBillTitle = /^\w{1,15}$/;
//UPDATE WALLET
update.addEventListener('click', e => {
    let walletValue = formWallet['walletValue'].value;
    if (walletValue.length === 0) {
        myWallet.innerText = '0.00';
    } else {
        myWallet.innerText = walletValue;
        //EMPTY FORM
        formWallet['walletValue'].value = "";
    }
});

//ADD WALLET
add.addEventListener('click', e => {
    //STRING FORMAT
    let walletValue = myWallet.innerText;
    let inputWallet = formWallet['walletValue'].value;

    if (inputWallet.length === 0) {
        const value = convertToNumber(walletValue) + 0;
        myWallet.innerText = value.toFixed(2);
    } else {
        walletValue = convertToNumber(walletValue);
        inputWallet = convertToNumber(inputWallet);
        //HTML RECIEVES THE DATA
        let value = walletValue + inputWallet
        myWallet.innerText = value.toFixed(2);
        //EMPTY FORM
        formWallet['walletValue'].value = "";
    }
});

// FORM BILL
formBill.addEventListener('submit', e => {
    //prevent refresh
    e.preventDefault();
    const billTitle = formBill['billTitle'].value.trim();
    let billValue = formBill['billValue'].value;

    if (billValue.length === 0) {
        billValue = '0.00';
    }
    // CHECKS THE FORM
    if (patternBillTitle.test(billTitle)) {
        console.log('passed');
        let html = `<div class="mt-3 mb-3">
        <li class="list-group-item active">${billTitle.toUpperCase()}<i class="fas fa-trash-alt float-right delete"></i></li>
        <li class="list-group-item">R$ <span class="listValue">${billValue}</span></li>
        </div>
        `;
        listBill.innerHTML += html;
        formBill.reset();
    } else {
        console.log('not passed');
        message.style.display = 'block';
        closeMessageError();
    }

});

// REMOVE A BILL
listBill.addEventListener('click', e => {
    const parentEl = e.target.parentElement.parentElement;
    if (e.target.className.includes('delete')) {
        parentEl.remove();
    }
});

//CALCULATE DEBT BUTTON
buttonDebt.addEventListener('click', e => {
    const listValue = document.querySelectorAll(".listValue");
    // console.log(listValue);
    // ARRAY PRICE ON STRING FORMAT
    const price = [];
    listValue.forEach(value => {
        price.push(value.innerText);
    });
    // ARRAY PRICE ON NUMBER FORMAT
    const priceNumber = [];
    price.forEach(value => {
        priceNumber.push(convertToNumber(value));
    });

    // SUM ALL VALUES INSIDE OF ARRAY
    const debtNumber = priceNumber.reduce((acc, cur) => {
        // console.log('acumulator',acc);
        // console.log('current value',cur);
        return acc + cur;

    }, 0);

    myDebtsCalculation(debtNumber);
});

// FUNCTION THAT CALCULATES THE DEBTS
const myDebtsCalculation = (debtNumber) => {
    const debtString = debtNumber.toFixed(2);
    const walletString = myWallet.innerText;
    walletNumber = convertToNumber(walletString);
    totalDebt = (walletNumber) - (debtNumber);
    let html = `
    <h4 class="card-tile">My Debts</h4>
    <div class="mb-2">
        <span>Wallet</span>
        <span class="float-right wallet font-weight-bold"><i class="fas fa-dollar-sign"></i> ${walletString}</span>
    </div>

    <div class="mb-2">
        <span>Debt</span>
        <span class="float-right text-danger font-weight-bold"><i class="fas fa-dollar-sign"></i> ${debtString}</span>
    </div>
    <hr class="primary-color-dark">
    <div>
        <span>Available on Wallet</span>
        <span class="float-right available font-weight-bold"><i class="fas fa-dollar-sign"></i> ${totalDebt.toFixed(2)}</span>
    </div>`;

    cardMyDebt.innerHTML = html;
    myWallet.innerText = totalDebt.toFixed(2);
    const wallet = document.querySelector('.wallet');
    const available = document.querySelector('.available');

    // CONDITION TO CHANGE THE COLOR FROM WALLET PRICE
    switch (true) {
        case walletNumber > 0:
            wallet.style.color = 'green';
            break;
        case walletNumber < 0:
            wallet.style.color = 'red';
            break;
        default:
            wallet.style.color = 'black';
            break;
    }
    // CONDITION TO CHANGE THE COLOR FROM DEBT PRICE
    switch (true) {
        case totalDebt > 0:
            available.style.color = 'green';
            break;
        case totalDebt < 0:
            available.style.color = 'red';
            break;
        default:
            available.style.color = 'black';
            break;
    }
}

//SCROLL TO TOP
upArrow.addEventListener('click', e =>{
    window.scrollTo(0,0);
});

// CONVERT STRING TO NUMBER
const convertToNumber = (string) => {
    let myString = string.replace(",", '');
    myString = parseFloat(myString);
    return myString;
}

// CLOSE THE MESSAGE ERROR WITH TIMEOUT
const closeMessageError = () => {
    setTimeout(() => {
        message.style.display = 'none';
    }, 2500);
}

//MONEY MASK INPUT
$(function () {
    $('#walletValue').maskMoney();
    $('#billValue').maskMoney();
});