const form = document.getElementById("transaction-form");
const desc = document.getElementById("desc");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const list = document.getElementById("list");
const balanceEl = document.getElementById("balance");

// 1. DATA STORAGE: Load existing data or start fresh
let transactions = JSON.parse(localStorage.getItem('student_expenses')) || [];

function updateApp() {
  list.innerHTML = ""; 
  let total = 0;

  transactions.forEach((transaction) => {
    // Math Logic
    const isIncome = transaction.kind === "income";
    total = isIncome ? total + transaction.money : total - transaction.money;

    // UI Logic: Create the List Item
    const li = document.createElement("li");
    li.style.borderLeft = isIncome ? "5px solid #2e7d32" : "5px solid #d32f2f";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.padding = "10px";
    li.style.margin = "5px 0";
    li.style.background = "#fff";
    li.style.borderRadius = "4px";
    li.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";

    li.innerHTML = `
      <span>${transaction.text}</span>
      <span style="color: ${isIncome ? '#2e7d32' : '#d32f2f'}">
        ${isIncome ? '+' : '-'}₦${transaction.money.toLocaleString()}
      </span>
    `;
    list.appendChild(li);
  });

  // Update Balance Text
  balanceEl.textContent = total.toLocaleString();

  // STEP 1: DYNAMIC COLOR LOGIC
  const balanceBox = balanceEl.parentElement;
  if (total < 0) {
    balanceBox.style.background = "#fee2e2"; // Warning Red
    balanceBox.style.color = "#991b1b";
  } else {
    balanceBox.style.background = "#dcfce7"; // Healthy Green
    balanceBox.style.color = "#166534";
  }

  // Save to storage
  localStorage.setItem('student_expenses', JSON.stringify(transactions));
}

// 3. EVENT LISTENER
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const newTransaction = {
    text: desc.value,
    money: Number(amount.value),
    kind: type.value,
    id: Date.now() // Unique ID for each item
  };

  transactions.push(newTransaction);
  updateApp();
  form.reset();
  desc.focus(); // Keeps the cursor in the description box for speed
});

// INITIALIZE ON PAGE LOAD
updateApp();

// ADD THIS AT THE BOTTOM (Line 77)
function convertCurrency() {
    const balanceElement = document.getElementById('balance');
    // This removes the comma from the Naira string so math can be done
    const balanceValue = balanceElement.innerText.replace(/,/g, '');
    const totalNaira = parseFloat(balanceValue);

    if (isNaN(totalNaira) || totalNaira <= 0) {
        alert("Please add some income first!");
        return;
    }

    const rate = 1200; // 1 INIT = 1,200 Naira
    const initiaAmount = (totalNaira / rate).toFixed(4);

    const display = document.getElementById('converted-amount');
    display.innerText = `Value in Initia: ${initiaAmount} INIT`;
    display.style.color = "#28a745"; 
    display.style.fontWeight = "bold";
}
