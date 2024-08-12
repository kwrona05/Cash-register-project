let price = 19.5;
let cid = [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
];

// Get elements
const cashInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const changeDueElement = document.getElementById('change-due');

// Function to calculate the change
function calculateChange(price, cash, cid) {
    let change = cash - price;
    if (change < 0) {
        alert("Customer does not have enough money to purchase the item");
        return "INSUFFICIENT_FUNDS";
    }

    let totalCid = cid.reduce((sum, [denom, amount]) => sum + amount, 0);
    if (totalCid < change) {
        return "INSUFFICIENT_FUNDS";
    }

    let changeArr = [];
    const currencyUnit = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1,
        "FIVE": 5,
        "TEN": 10,
        "TWENTY": 20,
        "ONE HUNDRED": 100
    };

    for (let i = cid.length - 1; i >= 0; i--) {
        let [denom, amount] = cid[i];
        let unitValue = currencyUnit[denom];
        let amountToReturn = 0;

        while (change >= unitValue && amount > 0) {
            change -= unitValue;
            change = Math.round(change * 100) / 100;
            amount -= unitValue;
            amountToReturn += unitValue;
        }

        if (amountToReturn > 0) {
            changeArr.push([denom, amountToReturn]);
        }
    }

    if (change > 0) {
        return "INSUFFICIENT_FUNDS";
    } else if (totalCid === cash - price) {
        return `Status: CLOSED ${changeArr.map(([denom, amt]) => `${denom}: $${amt}`).join(' ')}`;
    } else {
        return `Status: OPEN ${changeArr.map(([denom, amt]) => `${denom}: $${amt}`).join(' ')}`;
    }
}

// Event listener for the purchase button
purchaseBtn.addEventListener('click', () => {
    const cash = parseFloat(cashInput.value);
    if (cash === price) {
        changeDueElement.textContent = "No change due - customer paid with exact cash";
    } else {
        const result = calculateChange(price, cash, cid);
        if (result === "INSUFFICIENT_FUNDS") {
            changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
        } else {
            changeDueElement.textContent = result;
        }
    }
});