<template>
    <main class="content">
      <div class="search-filter-area">

        <h4>Not sure what you can get? We got you.</h4>
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
      <div class = "modal-wrapper" v-if="isModalOpen" @click="handleWrapperClick">
        <div class="modal-bg" v-if="isModalOpen" @click.stop>
          <div class="modal-left">
            <div class="square-container">
              <div id = "mortgage-breakdown">
                <h4> Mortgage Breakdown</h4>
                <h6> Est Monthly Repayment </h6>
              </div>
              <div id = "upfront-costs">
                <h4> Upfront Costs</h4>
                <h6> Total Downpayment </h6>
              </div>
            </div>
          </div>
          <div class="modal-right">
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
        </div>
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
      propertyPrice: null, // Added for property price input
      loan: null,           // Added for tax input
      interestRate: null,   // Added for income input
      loanTenure: null   // Added for income input
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true; // This method opens the modal
    },
    handleWrapperClick() {
      this.isModalOpen = false;
    },
    search() {
      // Implement your search functionality here
      // This will use propertyPrice, tax, and annualIncome for the search
    },
    calculateMortgage() {
      // pass
    }
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

.modal-wrapper {
  position: fixed; /* or absolute depending on your layout */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* More styles as needed to cover the whole screen */
}

.modal-bg {
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

.modal-right {
  flex-basis: 40%; /* Take up half the space of the modal */
  padding: 20px; /* Padding inside the children */
  display: flex;
  justify-content: center;
  align-items: center;
}

.Modal-Form {
  justify-content: center; /* Center content vertically */
}

.modal-left {
  flex-basis: 60%; /* Take up 60% of the modal's width */
  border-right: 2px solid #000; /* Right border */
  display: flex; /* Enable flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  height: 100%; /* Take up full height of its container */
}


.square-container {
  border: 4px solid #000; /* 4px solid border */
  width: 40vw; /* Set a specific width */
  height: 40vh; /* Make the height fill the entire viewport height */
  padding: 20px; /* Add some padding inside the square */
  display: flex; /* Use flexbox to align content */
  flex-direction: column; /* Stack children vertically */
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  position: fixed; /* Position it fixed on the left side */
  left: 0; /* Align to the left side of the viewport */
  top: 0; /* Align to the top of the viewport */
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

</style>