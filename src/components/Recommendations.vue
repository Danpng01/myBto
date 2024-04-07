<template>
    <div class="content">

      <h4>Not sure what you can get? We got you.</h4>
      <div class="search-filter-area">

        <select id="Location-dropdown" v-model="location">
          <option selected disabled value="">Location</option>
          <option value="Bedok">Bedok</option>
          <option value="Woodlands">Woodlands</option>
          <option value="Tanglin">Tanglin</option>
          <option value="Hougang">Hougang</option>
          <option value="Punggol">Punggol</option>
          <option value="Any">Any</option>
        </select>


        <select id="minprice-dropdown" v-model="minprice">
          <option selected disabled value="">Minimum Price</option>
          <option value="100000">100000</option>
          <option value="200000">200000</option>
          <option value="300000">300000</option>
          <option value="400000">400000</option>
          <option value="500000">500000</option>
          <option value="600000">600000</option>
          <option value="700000">700000</option>
          <option value="800000">800000</option>
          <option value="Any">Any</option>
        </select>

        <select id="maxprice-dropdown" v-model="maxprice">
          <option selected disabled value="">Maximum Price</option>
          <option value="100000">100000</option>
          <option value="200000">200000</option>
          <option value="300000">300000</option>
          <option value="400000">400000</option>
          <option value="500000">500000</option>
          <option value="600000">600000</option>
          <option value="700000">700000</option>
          <option value="800000">800000</option>
          <option value="Any">Any</option>
        </select>


        <select id="Size-dropdown" v-model="size">
          <option selected disabled value="">Number of Bedrooms</option>
          <option value="1 Room">1 Room</option>
          <option value="2 Room">2 Room</option>
          <option value="3 Room">3 Room</option>
          <option value="4 Room">4 Room</option>
          <option value="5 Room">5 Room</option>
          <option value="Any">Any</option>
        </select>

        <button @click="search">Search</button>
      </div>

      <button id = "disclaimerbutton" @click="openDisclaimer">Disclaimer</button>

      <div class="disclaimerModal" v-if="isDisclaimerModalOpen">
        <strong style="display: block; margin-right: 20px; margin-bottom: 20px;">Disclaimer:</strong>
        <p style="text-align: justify;">The data and information provided by our web search service regarding Built-To-Order (BTO) housing are based on the most recent updates as of April 2024. 
          Any data or information predating this period shall not be considered relevant for BTO applications and will instead pertain to Sales of Balance Flats, 
          which are subject to distinct legal and procedural considerations. We strongly advise potential applicants to verify their eligibility for BTO applications by reviewing their personal 
          circumstances, such as income levels, and by consulting the additional resources and links available on our website. It is the responsibility of the user to ensure that they meet all 
          criteria and understand the conditions that apply to their application for housing before proceeding. </p>
        <button class="close-button" @click="isDisclaimerModalOpen = false">&#10005;</button>
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
              <p> Est Monthly Repayment </p>
              <span id = "est-mortgage" v-if="totalMortgage > 0"><strong>S$ {{ totalMortgage }} / mo</strong></span>
                
              <!-- Progress bar for Downpayment with two colors -->
              <div class="progress-bar-wrapper">
                <div class="progress-bar-background">
                  <!-- Bar for downpaymentPercentage -->
                  <div 
                    class="progress-bar-part downpayment" 
                    :style="{ width: mortgagePrincipalPercent + '%' }"
                  >
                    <span v-if="mortgagePrincipalPercent > 0">{{ mortgagePrincipalPercent }}%</span>
                  </div>
                  <!-- Bar for loanPercentage -->
                  <div 
                    class="progress-bar-part loan-amount" 
                    :style="{ width: mortgageInterestPercent + '%' }"
                  >
                    <span v-if="mortgageInterestPercent > 0">{{ mortgageInterestPercent }}%</span>
                  </div>
                </div>
              </div>

              <!-- Legend for the progress bars -->
              <div class="progress-bar-legend">
                <div class="legend-item">
                  <div class="legend-color downpayment"></div>
                  <span>${{ this.mortgagePrincipal }} principal</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color loan-amount"></div>
                  <span>${{ this.mortgageInterest }} interest</span>
                </div>
              </div>
            </div>

            <div id = "upfront-costs">

              <h4> Upfront Costs</h4>
              <p> Total Downpayment </p>
              <span id = "Total-Downpayment" v-if="totalDownpayment > 0"><strong>S$ {{ totalDownpayment }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>
                
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

            <label for="propertyPrice">Intended Property Price:</label><br>
            <div class="input-container">
              <div class="calculator-symbol">SGD<span class="divider-line"></span></div>
              <input type="text" id="propertyPrice" v-model="formData.propertyPrice">
            </div><br>

            <label for="tax">Loan Amount:</label><br>
            <div class="input-container">
              <div class="calculator-symbol">SGD<span class="divider-line"></span></div>
              <input type="text" id="loan" v-model="formData.loan">
            </div><br>

            <div class="form-row">
              <div>
                <label for="income">Interest Rate:</label>
                <div class="input-container">
                  <div class="calculator-symbol">%<span class="divider-line"></span></div>
                  <input type="text" id="interestRate" v-model="formData.interestRate">
                </div>
              </div>

              <div>
                <label for="income">Loan Tenure:</label>
                <div class="input-container">
                  <div class="calculator-symbol">Yrs<span class="divider-line"></span></div>
                  <input type="text" id="loanTenure" v-model="formData.loanTenure">
                </div>
              </div>

            </div>
          </form>

          <br><h4>Qualify for any schemes? <a href="/check-eligibility" target="_blank" style="text-decoration: underline; color: #E69B9B;">Click here to find out more!</a></h4><br>
          <button @click="calculateMethod">Calculate!</button>

        </div>
        <button class="close-button" @click="closeModal">&#10005;</button>
      </div>

      <div class = "search-output">
        <h4 v-if="sentenceVisible">Some properties for you: </h4>
        
        <div v-if="houses && houses.length">
          <div v-for="(house, index) in houses" :key="index" class="house-item">
            <img :src="house.imageLink" alt="House image" class="house-image"/>
            <div class="house-details">
              <!-- Interpolation inside <p> tags is correct -->
              <p class="house-id">{{ house.id }}</p>
              <p class="house-location">{{ house.location }}</p>
              <p class="house-size">{{ house.size }}</p>
              <p class="house-price">From ${{ house.lowerPrice }}</p>
            </div>
            <!-- Use v-bind for dynamic attributes -->
            <a :href="house.webLink" target="_blank" class="house-link">
              <span class="arrow-button">></span>
            </a>
          </div>
        </div>

      </div>

    </div>

</template>

<script>

import { db } from '../../scripts/firebase.js';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default {
  name: "Recommendations",
  data() {
    return {
        formData: {
        propertyPrice: '',
        loan: '',
        loanTenure: '',
        interestRate: '',
      },
      isModalOpen: false,
      isDisclaimerModalOpen: false,
      location: '',
      maxprice: '',
      minprice: '',
      size: '',
      sentenceVisible: false,
      /* // General information for the financial calculator
      propertyPrice: 0, // Added for property price input
      loan: 0,           // Added for tax input
      interestRate: 0,   // Added for income input
      loanTenure: 0,   // Added for income input  */
      /* Information for the "mortgage breakdown" portion */
      mortgagePrincipalPercent:0,
      mortgagePrincipal: 0,
      mortgageInterestPercent:0,
      mortgageInterest: 0,
      totalMortgage:0,
      /* Information for the "upfront costs" portion */
      totalDownpayment: 0, // Initialize to 0
      downpaymentPercentage: 0, // Initialize to 0
      loanPercentage: 0, // Initialize to 0
      /* Information for the webscraping Search data portion */
      searchData: null,
      houses: [],
      
    };
  },
  methods: {
    openDisclaimer() {
      this.isDisclaimerModalOpen = true; // This method opens the modal
    },
    openModal() {
      this.isModalOpen = true; // This method opens the modal
    },
    closeModal() {
      this.isModalOpen = false;
    },
    search() {
      if (!isNaN(this.minprice) && !isNaN(this.maxprice) && this.maxprice !== '') {
        if (this.minprice > this.maxprice) {
          alert('Error: The minimum price cannot be more than the maximum price.');
        } 
      }

      this.sentenceVisible = true;
      const housesCol = collection(db, 'houseSearch');
      let q = query(housesCol);

      // Dynamically add conditions to the query based on input values
      if (this.size !== 'Any' && this.size !== '') {
        q = query(q, where('size', '==', this.size));
      }
      if (this.location !== 'Any' && this.location !== '') {
        q = query(q, where('location', '==', this.location));
      }
      if (this.maxprice !== '') { // Ensure maxprice is a valid number
        q = query(q, where('upperPrice', '<=', parseFloat(this.maxprice)));
      }
      if (this.minprice !== '') { // Ensure minprice is a valid number
        q = query(q, where('lowerPrice', '>=', parseFloat(this.minprice)));
      } 

      getDocs(q)
      .then(querySnapshot => {
        const houses = querySnapshot.docs.map(doc => {
          let houseData = doc.data();
          // Assign the document ID directly without any prefix
          houseData.id = doc.id.slice(0, -1); // Assuming you still want to remove the last character
          return houseData;
        });
        this.houses = houses;
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
        this.sentenceVisible = false;
      });
    },
    calculateMethod() {
      this.calculateLoanAmount();
      this.calculateMortgage();
    },
    calculateLoanAmount() {

      console.log("in calculator")
      // Placeholder for actual logic
      const propertyPrice = parseFloat(this.formData.propertyPrice);
      const loan = parseFloat(this.formData.loan);
      // MUST CHANGE THIS IS A PLACEHOLDER
      this.totalDownpayment = propertyPrice - loan;

      console.log(this.totalDownpayment)
      
      // Ensure the values are valid numbers
      if (!isNaN(propertyPrice) && !isNaN(loan) && propertyPrice > 0) {
        if (propertyPrice < loan) {
          alert('Error: It is not prudent to borrow more money than you need.');
        } else {
          this.downpaymentPercentage = parseFloat(((propertyPrice - loan) / propertyPrice) * 100).toFixed(1);
          this.loanPercentage = parseFloat((loan / propertyPrice) * 100).toFixed(1);
        }
      }
    },
    calculateMortgage() {
      const loan = parseFloat(this.formData.loan);
      const duration = parseFloat(this.formData.loanTenure);
      const rate = parseFloat(this.formData.interestRate);

      if (!isNaN(loan) && !isNaN(duration) && !isNaN(rate)) {
        const helper = loan * ((1 + (rate/100))**duration);
        this.totalMortgage = (helper/(duration * 12)).toFixed(2);
        this.mortgagePrincipal = (loan/(duration * 12)).toFixed(2);
        this.mortgagePrincipalPercent = parseFloat((this.mortgagePrincipal / this.totalMortgage) * 100).toFixed(1);
        // completed by induction
        this.mortgageInterest = (this.totalMortgage - this.mortgagePrincipal).toFixed(2);
        this.mortgageInterestPercent = parseFloat((this.mortgageInterest / this.totalMortgage) * 100).toFixed(1);
      } else {
        alert('Error: The mortgage portion of the calculator will not work unless you input a valid number for the loan, duration and/or rate field.');
      }
    },
    calculateDownpayment() {
      return (this.upfrontCostsPercentage / 100) * this.totalCost;
    },
    checkWindowWidth() {
      console.log(window.innerWidth)
      if (window.innerWidth < 1300) {
        alert(`Please increase the width of the window for optimal viewing experience. Current width: ${window.innerWidth}px. Optimal width: 1300px.`);
      }
    }
  },
  mounted() {
    this.checkWindowWidth(); // Perform an initial check
    setInterval(this.checkWindowWidth, 20); // Check every 2 seconds
  }
}

</script>

<style scoped>

.content {
  margin-top: 25px;
  margin-left: 40px;
  min-width: 300px;
}

.content h4 {
  /* Style for the descriptive text above the dropdowns */
  margin: 20px 0;
}

.search-filter-area {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* or 'center' if you want the items centered */
  margin-bottom: 20px; /* Adjust as necessary */
}

.search-filter-area select, .search-filter-area button, .financial-calculator-button button, #modal-right button {
  margin-right: 10px; /* Space between the dropdowns and button */
  width: 210px;
  padding: 10px 20px; /* Same padding as the links for visual consistency */
  border-radius: 25px;
  border: 1px solid #ccc;
  background-color: #fefefe;
}

.search-filter-area button, #modal-right button {
  cursor: pointer; /* Change the cursor to indicate the button is clickable */
  margin-left: 40px;
  background-color: #E69B9B;
  color: white;
}

#disclaimerbutton {
  width: 150px;
  padding: 10px 20px; /* Same padding as the links for visual consistency */
  border-radius: 25px;
  border: 1px solid #ccc;
  background-color: black;
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

.search-output {
  margin-top: 50px;
}

.disclaimerModal {
  box-sizing: border-box; /* Include padding and borders in the element's total width and height */
  display: flex;
  justify-content: space-between;
  padding: 40px;
  padding-right: 80px;
  align-items: stretch;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 70vw; /* 80% of the viewport width */
  height: 30vh; /* 70% of the viewport height for a fixed size */
  margin: auto;
  overflow: hidden;
  position: fixed; /* To ensure it's placed relative to the viewport */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -85%); /* Center the modal */
  z-index: 1000; /* Ensure it's above other content */
}

.sizeModal {
  box-sizing: border-box; /* Include padding and borders in the element's total width and height */
  display: flex;
  justify-content: space-between;
  padding: 40px;
  padding-right: 80px;
  align-items: stretch;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 70vw; /* 80% of the viewport width */
  height: 30vh; /* 70% of the viewport height for a fixed size */
  margin: auto;
  overflow: hidden;
  position: fixed; /* To ensure it's placed relative to the viewport */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -85%); /* Center the modal */
  z-index: 1000; /* Ensure it's above other content */
}

.modal {
  box-sizing: border-box; /* Include padding and borders in the element's total width and height */
  display: flex;
  justify-content: space-between;
  padding: 10px;
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
  background-color: #fff; /* Background color for the right side */
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally */
  padding: 20px; /* Padding inside the modal */
  margin: auto; /* Center the modal in the available space */
  width: 40vw;
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
  padding: 15px;
}

#square-container {
  border: 2px solid #000; /* 4px solid border */
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
.form-row {
  display: flex;
  max-width: 40vw;
}

input[type="text"] {
  border: 1px solid black; /* This sets the border color to black */
}

.close-button {
  position: absolute; /* Position the button absolutely within its positioned parent */
  top: 10px; /* Space from the top of the container */
  right: 20px; /* Space from the right of the container */
  background: none; /* Remove default button background */
  border: none; /* Remove default button border */
  font-size: 24px; /* Adjust the size as needed */
  cursor: pointer; /* Change cursor to pointer when hovering over the button */
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
.house-image {
  width: 100px; /* Fixed width for the image */
  height: auto; /* Maintain aspect ratio */
}

.house-details {
  margin-left: 20px; /* Consistent space after the image */
  flex-grow: 1; /* Allows text container to fill up remaining space */
}

.house-item {
  display: flex;
  align-items: center; /* Center items vertically */
  background-color: #f0f0f0;
  padding: 10px;
  padding-left: 30px; /* You may want to adjust this if it's too much with the image width */
  padding-right: 30px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.house-title,
.house-size,
.house-location,
.house-price {
  margin: 5px 0; /* Reduced space between paragraphs */
  color: #333; /* Darker text for contrast */
  font-size: 1.2em; /* Larger text size */
}


.house-id {
  margin: 5px 0; /* Reduced space between paragraphs */
  color: #333; /* Darker text for contrast */
  font-size: 1.4em; /* Larger text size */
}

.arrow-button {
  font-size: 1.5em; /* Large size for the arrow button */
  color: #333; /* Arrow button color */
  padding: 5px;
  transition: color 0.3s; /* Smooth transition for hover effect */
}

.house-link {
  text-decoration: none; /* Removes underline from the link */
  margin-left: auto; /* Pushes link to the right */
  display: flex;
  align-items: center; /* Center the arrow vertically */
}

.house-link:hover .arrow-button {
  color: #666; /* Darkens the arrow on hover for a button-like effect */
}

.input-container {
  display: flex;
  align-items: center;
  border: 2px solid #000; /* Adjust border color as needed */
  padding: 5px 15px;
  border-radius: 25px; /* Adjust for desired border radius */
  box-shadow: inset 0 0 5px rgba(0,0,0,0.2); /* subtle inner shadow */
  position: relative; /* Needed for absolute positioning of children */
  margin-right: 15px;
  max-width: 40vw;
}

.calculator-symbol {
  position: relative; /* For positioning the line */
  margin-right: 5px; /* Space between symbol and input */
  padding-right: 10px; /* Space for the line */
}

/* Vertical line */
.divider-line {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 24px; /* Adjust height as needed */
  border-right: 1px solid #000; /* Right border is the line */
}

.input-container input {
  border: none;
  outline: none;
  /* flex: 1; /* Fill the rest of the container */
  font-size: 1em;
}

#Total-Downpayment {
  display: block; /* Makes the span a block-level element */
  text-align: right; /* Aligns text to the right */
}

#est-mortgage {
  display: block; /* Makes the span a block-level element */
  text-align: right; /* Aligns text to the right */
}

</style>