const balance = document.getElementById("balance");
const income = document.getElementById("income-amount");
const expense = document.getElementById("expense-amount");
const transactionList = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");
const des = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionForm.addEventListener("submit", addTransaction);

function addTransaction(e) {
    e.preventDefault();

    const description = des.value.trim();
    const amount = parseFloat(amountEl.value);

    transactions.push({
        id: Date.now(),
        description,
        amount
    });

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();

    // Hindi muna natin tatapusin ang updateSummary()
     updateSummary();

    transactionForm.reset();
}

function updateTransactionList() {
    transactionList.innerHTML = "";

    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach((transaction) => {
        const transactionEl = createTransactionElement(transaction);

        transactionList.appendChild(transactionEl);
    });
}

function createTransactionElement(transaction) {
    const li = document.createElement("li");

    li.classList.add("transaction");

    li.classList.add(
        transaction.amount > 0 ? "income" : "expense"
    );

    li.innerHTML = `
        <span>${transaction.description}</span>

        <span>
            ${formatCurrency(transaction.amount)}
            <button 
                class="delete-btn" 
                onclick="removeTransaction(${transaction.id})"
            >×</button>
        </span>
    `;

    return li;
}

function updateSummary() {
  // 100, -50, 200, -200, => 50

  const bal = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  //for income
  const inc = transactions
    .filter((transaction) => transaction.amount > 0)   // kinukuha niya yung positive values
    .reduce((acc, transaction) => acc + transaction.amount, 0);  //tinototal lahat ng values. acc = running total / naiipong value.

  // for expense
  const exp = transactions
    .filter((transaction) => transaction.amount <0) // kinukuha lahat ng may negative sign for expense
    .reduce((acc, transaction) => acc + transaction.amount, 0) 

  //Html will display it on the website
  balance.textContent = bal;
  income.textContent = inc;
  expense.textContent = exp;

}


function formatCurrency(number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(number);
}


function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !==id)

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
}


//Kapag ni refresh, magpapakita parin mga result base sa localstorage
updateTransactionList();
updateSummary();