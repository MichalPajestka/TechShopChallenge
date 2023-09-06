let totalBalance = "200";
document.getElementById("accountBalance").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(totalBalance);

function getALoan() {
    let outstandingLoan = "";
    let loan = parseFloat(prompt("Enter amount:"));
    if(isNaN(loan) || loan <= 0 || loan > totalBalance * 2) {
        alert("Invalid amount");
    } else {
        outstandingLoan = "Your loan: " + loan;
    }
    document.getElementById("outstanding-loan").innerHTML = outstandingLoan;
}
