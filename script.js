let totalBalance = "200";
document.getElementById("accountBalance").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(totalBalance);

function getALoan() {
    let outstandingLoan = "";
    let  loan = prompt("Enter amount: ");
    if(loan == null || loan == "" || loan > totalBalance * 2) {
        alert("Invalid amount");
    } else {
        outstandingLoan = "Your loan: " + loan;
    }
    document.getElementById("outstanding-loan").innerHTML = outstandingLoan;
}
