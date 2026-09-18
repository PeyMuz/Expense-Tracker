const balance = document.getElementById("balance");
const income = document.getElementById("income-amount");
const expense = document.getElementById("expense-amount");
const transactionList = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");
const des = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];


transactionForm.addEventListener("submit", addTransaction)

function addTransaction (e) {
    e.preventDefault();   //so it doesn't refresh the page

    // get form values
    const description = des.value.trim();
    const amount = parseFloat(amountEl.value);
    
    transactions.push({ //push uses to add value at the end of the array
      id:Date.now(),
      description,
      amount
    });

    //to convert javascript object and array inro formatted strings
    localStorage.setItem("transactions",JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();

    transactionForm.reset();

}