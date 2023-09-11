let totalBalance = 200;
let outstandingLoan = 0;
let salaryBalance = 0;
let salary = 0;
let loanRepaid = false;

document.getElementById("salary-balance").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK'}).format(salaryBalance);
document.getElementById("account-balance").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(totalBalance);

function getALoan() {
  let loan = parseFloat(prompt("Enter amount:"));
  if (outstandingLoan > 0) {
    alert("You need to repay your previous loan first")
  } else if (isNaN(loan) || loan <= 0 || loan > totalBalance * 2) {
    alert("Invalid amount");
  } else {
    // Update the outstanding loan
    outstandingLoan = loan;
    document.getElementById("outstanding-loan-amount").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(outstandingLoan);
        
    // Update the total balance and display
    totalBalance += loan;
    document.getElementById("account-balance").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(totalBalance);
        
    // Show the "Repay Loan" button
    document.getElementById("repay-loan-button").style.display = "inline-block";
        
    // Show the "Your outstanding loan:" label
    document.getElementById("outstanding-loan-row").style.display = "flex";
  }
}

function transferToBank() {
  if (salaryBalance === 0) {
    alert("You have no salary to transfer.");
    return;
  }

  // Calculate 10% of the salary as the percentOfSalary
  let percentOfSalary = salaryBalance * 0.10;
  let deductedSalary = salaryBalance;

  if (outstandingLoan > 0) {
    deductedSalary -= percentOfSalary;
    outstandingLoan -= percentOfSalary;

    if (outstandingLoan < 1) {
      outstandingLoan = 0;
      document.getElementById("outstanding-loan-amount").innerHTML = "";
      document.getElementById("outstanding-loan-row").style.display = "none";

      // Hide the "Repay Loan" button when the loan is fully repaid
      document.getElementById("repay-loan-button").style.display = "none";
    } else {
    
      // Update the outstanding loan amount display with the new value
      document.getElementById("outstanding-loan-amount").innerHTML = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(outstandingLoan);
    }
  
  } else {
    document.getElementById("outstanding-loan-amount").innerHTML = "";
  }
  
  totalBalance += deductedSalary;
  salaryBalance = 0; 
    
  // Update the account balance display with the new totalBalance
  document.getElementById("account-balance").innerHTML = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(totalBalance);
  document.getElementById("salary-balance").innerHTML = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(salaryBalance);
}

function increaseSalary() {
  salary = 100;
  salaryBalance += salary;
  document.getElementById("salary-balance").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(salaryBalance);
}

function repayLoan() {
  let remaindingFunds = 0;
  if (salaryBalance === 0) {
    alert("You have no salary to repay loan")
  } else if (outstandingLoan > 0) {
    
    // Deduct the salary balance from the outstanding loan
    salary -= salaryBalance;
    outstandingLoan -= salaryBalance;

    // Update the displayed outstanding loan amount
    document.getElementById("outstanding-loan-amount").innerHTML = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(outstandingLoan);
        
    salaryBalance = 0;
    document.getElementById("salary-balance").innerHTML = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(salaryBalance);

    if (outstandingLoan < 1) {
      // If the outstanding loan is fully repaid, clear its display
      document.getElementById("outstanding-loan-amount").innerHTML = "";
      document.getElementById("outstanding-loan-row").style.display = "none";

      // Hide the "Repay Loan" button
      document.getElementById("repay-loan-button").style.display = "none";
            
      remaindingFunds = salaryBalance - outstandingLoan;

      // Add remaining funds to the total balance
      totalBalance += remaindingFunds;
      document.getElementById("account-balance").innerHTML = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(totalBalance);   
    }
  }
}

  // Fetch the laptops.json file and parse the data
fetch('computers.json')
  .then(response => response.json())
  .then(data => {
    laptops = data; 
    populateLaptopTitles(); // Populate the select element
  })
  .catch(error => {
    console.error("Error reading JSON file:", error);
  });
  
function displayLaptopSpecs(selectedLaptopId) {
  // Find the selected laptop object in the JSON data
  const selectedLaptop = laptops.find(laptop => laptop.id === selectedLaptopId);
  
  if (selectedLaptop) {
    // Get the specs from the selected laptop
    const laptopSpecs = selectedLaptop.specs;
    
    // Display the specs in a div or any other element
    const specsContainer = document.getElementById("specs-container");
    specsContainer.innerHTML = "";
    laptopSpecs.forEach(spec => {
      const specItem = document.createElement("p");
      specItem.textContent = spec;
      specsContainer.appendChild(specItem);
    });
  }
}
  
function populateLaptopTitles() {
  const select = document.getElementById("laptop-select");

  laptops.forEach(laptop => {
    const option = document.createElement("option");
    option.value = laptop.id;
    option.textContent = laptop.title;
    select.appendChild(option);
  });

  select.addEventListener("change", function () {
    const selectedLaptopId = parseInt(select.value);
    displayLaptopSpecs(selectedLaptopId);

     // Call the function to display laptop info
    displayLaptopInfo(selectedLaptopId);
  });

  // Display specs of the first laptop by default
  const firstLaptopId = laptops[0].id;
  displayLaptopSpecs(firstLaptopId);

  // Display laptop info for the first laptop
  displayLaptopInfo(firstLaptopId); 
}
  
function displayLaptopInfo(selectedLaptopId) {
  // Find the selected laptop object in the JSON data
  const selectedLaptop = laptops.find(laptop => laptop.id === selectedLaptopId);

  if (selectedLaptop) {
    // Display laptop image, name, description, and price
    const imageContainer = document.getElementById("laptop-image");
    const nameContainer = document.getElementById("laptop-title");
    const descriptionContainer = document.getElementById("laptop-description");
    const priceContainer = document.getElementById("laptop-price");

    // Set the laptop image source
    const imageUrl = "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image;
    const laptopImage = document.createElement("img");
    laptopImage.src = imageUrl;
    imageContainer.innerHTML = "";
    imageContainer.appendChild(laptopImage);

    // Display laptop name, description, and price
    nameContainer.textContent = selectedLaptop.title;
    descriptionContainer.textContent = selectedLaptop.description;
    priceContainer.textContent = selectedLaptop.price + " NOK";
  }
}

function buyLaptop() {
  // Get the selected laptop ID from the dropdown menu
  const selectedLaptopId = parseInt(document.getElementById("laptop-select").value);
  
  // Find the selected laptop object in the JSON data
  const selectedLaptop = laptops.find(laptop => laptop.id === selectedLaptopId);

  if (selectedLaptop) {
    const laptopPrice = selectedLaptop.price;

    if (laptopPrice <= totalBalance) {
      totalBalance -= laptopPrice;
      document.getElementById("account-balance").innerHTML = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(totalBalance);
      alert("Laptop purchased successfully!");
    } else {
      alert("Not enough funds to buy the laptop");
    }
  } else {
    alert("Selected laptop not found.");
  }
}

