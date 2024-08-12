const price = 19.5;  // Global price of the item
let cid = [          // Global cash-in-drawer array
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

const button = document.getElementById('purchase-btn');
const div = document.getElementById('change-due');

const calculateChange = (changeDue, cid) => {
    let change = [];
    const currencyUnits = [
        ["ONE HUNDRED", 100],
        ["TWENTY", 20],
        ["TEN", 10],
        ["FIVE", 5],
        ["ONE", 1],
        ["QUARTER", 0.25],
        ["DIME", 0.1],
        ["NICKEL", 0.05],
        ["PENNY", 0.01]
    ];

    // Calculate total cash in drawer
    let totalCid = cid.reduce((acc, [_, amount]) => acc + amount, 0).toFixed(2);

    // Check if total cash in drawer is exactly equal to the change due
    if (parseFloat(totalCid) === parseFloat(changeDue)) {
        return { status: "CLOSED", change: cid };
    }

    // Calculate change to return
    for (let i = 0; i < currencyUnits.length; i++) {
        const [name, value] = currencyUnits[i];
        let amountInDrawer = cid.find(([n]) => n === name)[1];
        let amountToReturn = 0;

        while (changeDue >= value && amountInDrawer > 0) {
            changeDue = (changeDue - value).toFixed(2);
            amountInDrawer = (amountInDrawer - value).toFixed(2);
            amountToReturn += value;
        }

        if (amountToReturn > 0) {
            change.push([name, amountToReturn]);
        }
    }

    if (parseFloat(changeDue) > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else {
        return { status: "OPEN", change: change };
    }
};

const purchase = () => {
    const cash = parseFloat(document.getElementById('cash').value);

    if (isNaN(cash)) {
        alert("Please enter a valid amount of cash.");
        return;
    }

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
        return;
    }

    const changeDue = (cash - price).toFixed(2);

    if (parseFloat(changeDue) === 0) {
        div.innerHTML = "No change due - customer paid with exact cash";
        return;
    }

    const { status, change } = calculateChange(changeDue, cid);

    if (status === "INSUFFICIENT_FUNDS") {
        div.innerHTML = `Status: ${status}`;
    } else if (status === "CLOSED") {
        let changeString = change.map(([name, amount]) => `${name}: $${amount.toFixed(2)}`).join(' ');
        div.innerHTML = `Status: ${status} ${changeString}`;
    } else {
        let changeString = change.map(([name, amount]) => `${name}: $${amount.toFixed(2)}`).join(' ');
        div.innerHTML = `Status: ${status} ${changeString}`;
    }
};

button.addEventListener('click', purchase);