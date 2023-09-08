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
        document.getElementById("outstanding-loan").innerHTML = "Your outstanding loan: " + new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(outstandingLoan);
        
        // Update the total balance and display
        totalBalance += loan;
        document.getElementById("account-balance").innerHTML = new Intl.NumberFormat('no-NO', {style: 'currency', currency: 'NOK' }).format(totalBalance);
        
        // Show the "Repay Loan" button
        document.getElementById("repay-loan-button").style.display = "inline-block";
    }
}

function transferToBank() {
    if (salaryBalance === 0) {
        alert("You have no salary to transfer.");
        return;
    }

    let percentOfSalary = salaryBalance * 0.10;
    let deductedSalary = salaryBalance;

    if (outstandingLoan > 0) {
        deductedSalary -= percentOfSalary;
        outstandingLoan -= percentOfSalary;

        if (outstandingLoan < 1) {
            outstandingLoan = 0;
            document.getElementById("outstanding-loan").innerHTML = "";
            // Hide the "Repay Loan" button
            document.getElementById("repay-loan-button").style.display = "none";
        } else {
            document.getElementById("outstanding-loan").innerHTML = "Your outstanding loan: " + new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(outstandingLoan);
        }
    } else {
        document.getElementById("outstanding-loan").innerHTML = "";
    }

    totalBalance += deductedSalary;
    salaryBalance = 0; 
    
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
        salary -= salaryBalance;
        outstandingLoan -= salaryBalance;

        document.getElementById("outstanding-loan").innerHTML = "Your outstanding loan: " + new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(outstandingLoan);
        
        salaryBalance = 0;
        document.getElementById("salary-balance").innerHTML = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(salaryBalance);

        if (outstandingLoan < 1) {
            document.getElementById("outstanding-loan").innerHTML = "";
            document.getElementById("repay-loan-button").style.display = "none";
            
            remaindingFunds = salaryBalance - outstandingLoan;

            totalBalance += remaindingFunds;
            document.getElementById("account-balance").innerHTML = new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(totalBalance);   
        }
    }
}

  // Fetch the laptops.json file and parse the data
  fetch('https://hickory-quilled-actress.glitch.me/computers')
    .then(response => response.json())
    .then(data => {
      laptops = data; 
      populateLaptopTitles(); // Populate the select element
    })
    .catch(error => {
      console.error("Error reading JSON file:", error);
    });
  

// Function to fetch and display laptop specs
function displayLaptopSpecs(selectedLaptopId) {
    // Find the selected laptop object in the JSON data
    const selectedLaptop = laptops.find(laptop => laptop.id === selectedLaptopId);
  
    if (selectedLaptop) {
      // Get the specs from the selected laptop
      const laptopSpecs = selectedLaptop.specs;
  
      // Display the specs in a div or any other element
      const specsContainer = document.getElementById("specs-container");
      specsContainer.innerHTML = "<h4>Features:</h4>";
      laptopSpecs.forEach(spec => {
        const specItem = document.createElement("p");
        specItem.textContent = spec;
        specsContainer.appendChild(specItem);
      });
    }
  }
  
  // Function to populate the select element with laptop titles
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
    displayLaptopInfo(selectedLaptopId); // Call the function to display laptop info
  });

  // Display specs of the first laptop by default
  const firstLaptopId = laptops[0].id;
  displayLaptopSpecs(firstLaptopId);
  displayLaptopInfo(firstLaptopId); // Display laptop info for the first laptop
}
  
// Function to display laptop information (image, name, description, price)
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
    laptopImage.style.width = "300px";
    laptopImage.style.height = "300px";
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

