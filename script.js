
const price = 19.5;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

const denominations = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25,
    "ONE": 1.0,
    "FIVE": 5.0,
    "TEN": 10.0,
    "TWENTY": 20.0,
    "ONE HUNDRED": 100.0
};

function calculateChange(price, cash, cid) {
    let changeDue = cash - price;
    let totalCid = cid.reduce((acc, curr) => acc + curr[1], 0).toFixed(2);

    if (changeDue > totalCid) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else if (changeDue.toFixed(2) === totalCid) {
        return { status: "CLOSED", change: cid };
    } else {
        let changeArray = [];
        for (let i = cid.length - 1; i >= 0; i--) {
            let denomination = cid[i][0];
            let denominationTotal = cid[i][1];
            let denominationValue = denominations[denomination];
            let amount = 0;

            while (changeDue >= denominationValue && denominationTotal > 0) {
                changeDue -= denominationValue;
                changeDue = changeDue.toFixed(2);
                denominationTotal -= denominationValue;
                amount += denominationValue;
            }

            if (amount > 0) {
                changeArray.push([denomination, amount]);
            }
        }

        if (changeDue > 0) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        }

        return { status: "OPEN", change: changeArray };
    }
}

document.getElementById("purchase-btn").addEventListener("click", function () {
    const cash = parseFloat(document.getElementById("cash").value);
    const changeDueElement = document.getElementById("change-due");

    if (cash < price) {
        alert("Customer does not have enough money to purchase the item");
    } else if (cash === price) {
        changeDueElement.innerText = "No change due - customer paid with exact cash";
    } else {
        let result = calculateChange(price, cash, cid);
        if (result.status === "INSUFFICIENT_FUNDS") {
            changeDueElement.innerText = "Status: INSUFFICIENT_FUNDS";
        } else if (result.status === "CLOSED") {
            let changeString = result.change.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(" ");
            changeDueElement.innerText = `Status: CLOSED ${changeString}`;
        } else if (result.status === "OPEN") {
            let changeString = result.change.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join(" ");
            changeDueElement.innerText = `Status: OPEN ${changeString}`;
        }
    }
});