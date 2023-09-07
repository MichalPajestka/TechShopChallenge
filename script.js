let totalBalance = 200;
let outstandingLoan = 0;
let currentPay = 0;
document.getElementById("current-pay").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK'}).format(currentPay);
document.getElementById("account-balance").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(totalBalance);

function getALoan() {
    let loan = parseFloat(prompt("Enter amount:"));
    if (isNaN(loan) || loan <= 0 || loan > totalBalance * 2) {
        alert("Invalid amount");
    } else if (outstandingLoan > 0) {
        alert("You need to repay your previous loan first")
    } else {
        // Update the outstanding loan
        outstandingLoan = loan;
        document.getElementById("outstanding-loan").innerHTML = "Your outstanding loan: " + new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(outstandingLoan);
        
         // Update the total balance and display
         totalBalance += loan;
         document.getElementById("accountBalance").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(totalBalance);
    }
    
}
