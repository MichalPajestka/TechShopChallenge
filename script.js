let totalBalance = "200";
document.getElementById("accountBalance").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(totalBalance);


