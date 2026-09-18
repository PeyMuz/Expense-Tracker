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
            ${transaction.amount}
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

  const balance = transactions.reduce(() =>);
}