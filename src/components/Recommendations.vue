<template>
    <main class="content">

      <h4>Not sure what you can get? We got you.</h4>
      <div class="search-filter-area">

        <select id="Location-dropdown">
          <option selected disabled value="">Location</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>


        <select id="Income-dropdown">
          <option selected disabled value="">Income</option>
          <option value="0-5k">0-5k</option>
          <option value="5k-10k">5k-10k</option>
          <option value="10k-12k">10k-12k</option>
          <option value="12k-14k">12k-14k</option>
          <option disabled value="">>14K [Please check your eligibility based on income ceiling]</option>
        </select>


        <select id="Size-dropdown">
          <option selected disabled value="">Number of Bedrooms</option>
          <option value="1 Room">1 Room</option>
          <option value="2 Room">2 Room</option>
          <option value="3 Room">3 Room</option>
          <option value="4 Room">4 Room</option>
          <option value="5 Room">5 Room</option>
        </select>

        <button @click="search">Search</button>
      </div>

      <div class="financial-calculator-button">
        <h4>Click here for a step-by-step financial breakdown!</h4>
        <button @click="openModal">Financial calculator</button>
      </div>
      
      <!-- Modal for Financial Calculator -->
      <div class="modal" v-if="isModalOpen">
        <div id="modal-left">
          <div id="square-container">

            <div id = "mortgage-breakdown">
              <h4> Mortgage Breakdown</h4>
              <h6> Est Monthly Repayment </h6>
              <span id = "Total-Downpayment" v-if="totalDownpayment > 0">S$ {{ totalDownpayment }} / mo</span>
                
              <!-- Progress bar for Downpayment with two colors -->
              <div class="progress-bar-wrapper">
                <div class="progress-bar-background">
                  <!-- Bar for downpaymentPercentage -->
                  <div 
                    class="progress-bar-part downpayment" 
                    :style="{ width: downpaymentPercentage + '%' }"
                  >
                    <span v-if="downpaymentPercentage > 0">{{ downpaymentPercentage }}%</span>
                  </div>
                  <!-- Bar for loanPercentage -->
                  <div 
                    class="progress-bar-part loan-amount" 
                    :style="{ width: loanPercentage + '%' }"
                  >
                    <span v-if="loanPercentage > 0">{{ loanPercentage }}%</span>
                  </div>
                </div>
              </div>

              <!-- Legend for the progress bars -->
              <div class="progress-bar-legend">
                <div class="legend-item">
                  <div class="legend-color downpayment"></div>
                  <span>Downpayment</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color loan-amount"></div>
                  <span>Loan amount</span>
                </div>
              </div>
            </div>

            <div id = "upfront-costs">

              <h4> Upfront Costs</h4>
              <h6> Total Downpayment </h6>
              <span id = "Total-Downpayment" v-if="totalDownpayment > 0">S$ {{ totalDownpayment }}</span>
                
              <!-- Progress bar for Downpayment with two colors -->
              <div class="progress-bar-wrapper">
                <div class="progress-bar-background">
                  <!-- Bar for downpaymentPercentage -->
                  <div 
                    class="progress-bar-part downpayment" 
                    :style="{ width: downpaymentPercentage + '%' }"
                  >
                    <span v-if="downpaymentPercentage > 0">{{ downpaymentPercentage }}%</span>
                  </div>
                  <!-- Bar for loanPercentage -->
                  <div 
                    class="progress-bar-part loan-amount" 
                    :style="{ width: loanPercentage + '%' }"
                  >
                    <span v-if="loanPercentage > 0">{{ loanPercentage }}%</span>
                  </div>
                </div>
              </div>

              <!-- Legend for the progress bars -->
              <div class="progress-bar-legend">
                <div class="legend-item">
                  <div class="legend-color downpayment"></div>
                  <span>Downpayment</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color loan-amount"></div>
                  <span>Loan amount</span>
                </div>
              </div>

            </div>

          </div>
        </div>
        <div id="modal-right">
          <form id = "Modal-Form" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="propertyPrice">Intended Property Price:</label><br>
              <input type="text" id="propertyPrice" v-model="formData.propertyPrice"><br><br>
            </div>

            <div class="form-group">
              <label for="tax">Loan Amount:</label><br>
              <input type="text" id="loan" v-model="formData.loan"><br><br>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="income">Interest Rate:</label><br>
                <input type="text" id="interestRate" v-model="formData.interestRate"><br><br>
              </div>


              <div class="form-group">
                <label for="income">Loan Tenure:</label><br>
                <input type="text" id="loanTenure" v-model="formData.loanTenure"><br><br>
              </div>
            </div>
        
            <h5>Qualify for any schemes? <a href="your-link-url" style="text-decoration: underline;">Click here to find out more!</a></h5>

            <button @click="calculateMortgage">Calculate</button>
          </form>

        </div>
        <button class="close-button" @click="closeModal">&#10005;</button>
      </div>

      <div class = "search-output">

      </div>

    </main>

</template>

<script>
export default {
  name: "Recommendations",
  data() {
    return {
        formData: {
        propertyPrice: '',
        tax: '',
        income: ''
      },
      isModalOpen: false,
      location: null,
      income: null,
      size: null,

      /* General information for the financial calculator */
      propertyPrice: 0, // Added for property price input
      loan: 0,           // Added for tax input
      interestRate: 0,   // Added for income input
      loanTenure: 0,   // Added for income input
      /* Information for the "upfront costs" portion */
      totalDownpayment: 0, // Initialize to 0
      downpaymentPercentage: 0, // Initialize to 0
      loanPercentage: 0, // Initialize to 0
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true; // This method opens the modal
    },
    closeModal() {
      this.isModalOpen = false;
    },
    search() {
      // Implement your search functionality here
      // This will use propertyPrice, tax, and annualIncome for the search
    },
    calculateMortgage() {
      this.calculateLoanAmount();
    },
    calculateLoanAmount() {
      // Placeholder for actual logic
      const propertyPrice = parseFloat(this.formData.propertyPrice);
      const loan = parseFloat(this.formData.loan);
      // MUST CHANGE THIS IS A PLACEHOLDER
      this.totalDownpayment = parseFloat(this.formData.loan);
      
      // Ensure the values are valid numbers
      if (!isNaN(propertyPrice) && !isNaN(loan) && propertyPrice > 0) {
        this.downpaymentPercentage = parseFloat(((propertyPrice - loan) / propertyPrice) * 100).toFixed(1);
        this.loanPercentage = parseFloat((loan / propertyPrice) * 100).toFixed(1);
      }
    },
    calculateDownpayment() {
      return (this.upfrontCostsPercentage / 100) * this.totalCost;
    },
  }
};

</script>

<style scoped>

.content {
  margin-top: 25px;
  margin-left: 40px;
}
.content h4 {
  /* Style for the descriptive text above the dropdowns */
  margin: 20px 0;
}

.search-filter-area {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* or 'center' if you want the items centered */
  margin-bottom: 60px; /* Adjust as necessary */
}

.search-filter-area select, .search-filter-area button, .financial-calculator-button button, #Modal-Form button {
  margin-right: 10px; /* Space between the dropdowns and button */
  width: 190px;
  padding: 10px 20px; /* Same padding as the links for visual consistency */
  border-radius: 25px;
  border: 1px solid #ccc;
}

.search-filter-area button, #Modal-Form button {
  cursor: pointer; /* Change the cursor to indicate the button is clickable */
  margin-left: 40px;
  background-color: #E69B9B;
  color: white;
}

/* Hover effect for dropdowns and button */
.search-filter-area select:hover, .search-filter-area button:hover {
  background-color: #f2f2f2;
  color: #000;
}

/* Active state for dropdowns, add a class to the select if it's active */
.search-filter-area select.active, .search-filter-area button.active {
  background-color: #E69B9B;
  border-color: #E69B9B;
  color: #fff;
}
.modal {
  box-sizing: border-box; /* Include padding and borders in the element's total width and height */
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 80vw; /* 80% of the viewport width */
  height: 70vh; /* 70% of the viewport height for a fixed size */
  margin: auto;
  overflow: hidden;
  position: fixed; /* To ensure it's placed relative to the viewport */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center the modal */
  z-index: 1000; /* Ensure it's above other content */
}

#modal-right {
  flex-basis: 40%; /* Take up half the space of the modal */
  padding: 20px; /* Padding inside the children */
  display: flex;
  justify-content: center;
  align-items: center;
}

#Modal-Form {
  justify-content: center; /* Center content vertically */
  border: #000;
}

#modal-left {
  flex-basis: 60%; /* Take up 60% of the modal's width */
  border-right: 2px solid #000; /* Right border */
  display: flex; /* Use Flexbox to align children */
  justify-content: center; /* Center children horizontally */
  align-items: center; /* Center children vertically */
}

#square-container {
  border: 2px solid #000; /* 4px solid border */
  width: 40vw; /* Set a specific width */
  height: 50vh; /* Set a specific height */
  padding: 20px; /* Add some padding inside the square */
  display: flex; /* Use flexbox to align content */
  flex-direction: column; /* Stack children vertically */
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  border-radius: 15px; /* Rounded corners */
}

#mortgage-breakdown {
  border-bottom: 2px solid black; /* Add a black bottom border */
  width: 35vw;
  padding-bottom: 10px; /* Add some padding below the content */
  margin-bottom: 10px; /* Add some space below the border */
}

#upfront-costs {
  width: 35vw;
  padding-bottom: 10px; /* Add some padding below the content */
  margin-bottom: 10px; /* Add some space below the border */
}


.modal-right {
  background-color: #fff; /* Background color for the right side */
  padding-left: 20px; /* Padding inside the right child */
}

.form-row {
  display: flex;
}

.form-group { 
  padding: 10px;
}

input[type="text"] {
  border: 1px solid black; /* This sets the border color to black */
}

.close-button {
  position: absolute; /* Position the button absolutely within its positioned parent */
  top: 10px; /* Space from the top of the container */
  right: 10px; /* Space from the right of the container */
  background: none; /* Remove default button background */
  border: none; /* Remove default button border */
  font-size: 24px; /* Adjust the size as needed */
  cursor: pointer; /* Change cursor to pointer when hovering over the button */
}

#Total-Downpayment {
  margin-left: auto;
}

.progress-bar-wrapper {
  margin: 10px 0;
}

.progress-bar-background {
  background-color: #e0e0e0;
  border-radius: 10px; /* Increased border-radius for rounded edges */
  display: flex; /* Align inner divs horizontally */
  height: 30px; /* Increased height for a thicker bar */
  overflow: hidden; /* Ensures the child divs are contained within the border radius */
}

.progress-bar-part {
  text-align: center;
  line-height: 30px; /* Adjust line-height to match the new height for vertical centering */
  color: black;
  transition: width 0.5s ease-in-out;
  display: flex;
  justify-content: center; /* Center text horizontally */
  align-items: center; /* Center text vertically */
}

.downpayment {
  background-color: #E69B9B; /* Green color for the 25% */
  border-radius: 10px 0 0 10px; /* Rounded edges on the left side */
}

.loan-amount {
  background-color:#ccc; /* Blue color for the 75% */
  border-radius: 0 10px 10px 0; /* Rounded edges on the right side */
}

.progress-bar-legend {
  display: flex;
  justify-content: center; /* Adjust as needed for your layout */
  align-items: center;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-right: 40px; /* Space between legend items */
}

.legend-color {
  width: 15px; /* Circle size */
  height: 15px; /* Circle size */
  border-radius: 50%; /* Make it round */
  margin-right: 5px; /* Space between circle and label */
}


</style>