<template>
    <div class = "container">
        <div class = "title"> 
            <h1>Submit Application</h1> 
        </div>
        <div class = 'links'>    
            <p>You must have a valid <a href = "https://www.hdb.gov.sg/residential/buying-a-flat/understanding-your-eligibility-and-housing-loan-options/application-for-an-hdb-flat-eligibility-hfe-letter" target="_blank">HDB Flat Eligibility (HFE) letter</a> before you can apply for a flat in our sales launches. The HFE letter will provide you with a holistic understanding of your housing and financing options before you embark on your home buying journey. It will inform you upfront of your eligibility to purchase a new flat, as well as the amount of CPF housing grants and HDB housing loan you are eligible for.</p>
            <p>At the end of the application period, HDB will place all eligible applications through a computerised ballot to determine the queue order to book the flats. For first-timer families, as their flat allocation quota is at least a specified percentage, they can receive queue numbers bigger than the flat supply set aside for them. HDB will inform all applicants of the outcome of their application. You may check the status of your application when the ballot result is announced.</p>
            <p>You will receive an email notification to log in to the <a href = "https://homes.hdb.gov.sg/home/landing" target="_blank">HDB Flat Portal</a> to check the ballot results within 2 months after the applications period has closed. The timeline to release the ballot results is dependent on the sales launch and flat supply.</p>
            <p>For flat applications made before May 2023, you can check the application status via <a href = "https://iam.hdb.gov.sg/common/login?spcptracking=1711444508786__8891_4060aae01883" target = "_blank">HDBPage</a>.</p>
            <p>You may read our frequently asked questions below.</p>
            <p style = "margin-bottom: 50px;">For more information, check out HDB's <a href = "https://www.hdb.gov.sg/residential/buying-a-flat/understanding-your-eligibility-and-housing-loan-options/flat-and-grant-eligibility/seniors" target="_blank">website</a></p>
            <img src = "../assets/HDB.png">
        </div>
        <div class = "faq">
            <h1>Frequently Asked Questions</h1>
            <br>
            <details>
                <summary>Q1: Am I eligible to apply for a flat in this sales launch?</summary>
                <p>You must have a valid <a href = "https://www.hdb.gov.sg/residential/buying-a-flat/understanding-your-eligibility-and-housing-loan-options/application-for-an-hdb-flat-eligibility-hfe-letter" target="_blank">HDB Flat Eligibility (HFE) letter</a> before you can apply for a flat in our sales launches. The HFE letter will provide you with a holistic understanding of your housing and financing options before you embark on your home buying journey. It will inform you upfront of your eligibility to purchase a new or resale flat, as well as the amount of CPF housing grants and HDB housing loan you are eligible for.</p>
            </details>
            <details>
                <summary>Q2: When is the next Build-To-Order (BTO), Sales of Balance Flats (SBF) sales exercise or open booking of flat?</summary>
                <p>You may refer to the <a href = "https://homes.hdb.gov.sg/home/landing" target="_blank">HDB Flat Portal</a> on the upcoming BTO exercise and inject of flat supply for open booking. A SBF exercise is launched on an ad-hoc basis when there are sufficient balance flats to be offered for sale.</p>
            </details>
            <details>
                <summary>Q3: What are the documents required when I apply for a flat?</summary>
                <p>Other than a valid <a href = "https://www.hdb.gov.sg/residential/buying-a-flat/understanding-your-eligibility-and-housing-loan-options/application-for-an-hdb-flat-eligibility-hfe-letter" target="_blank">HDB Flat Eligibility (HFE) letter</a>, you do not need to submit any documents when submitting a flat application.</p>
            </details>
            <details>
                <summary>Q4: I have applied but want to change the town or flat type. How can i do it?</summary>
                <p>You must cancel your existing flat application and re-apply online during the application period with the payment of an administrative fee of $10 (inclusive of GST).</p>
                <p>After the application period has closed, no changes are allowed.</p>
            </details>
            <details>
                <summary>Q5: I am interested in more than 1 town or more than 1 flat type. Can I submit more than 1 application in a sales launch?</summary>
                <p>No. You may only submit 1 application for 1 town and flat type in a sales launch. During a sales launch comprising a BTO exercise and an SBF exercise, you may either apply for the BTO exercise or the SBF exercise, and not both exercises.</p>
            </details>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SubmitApplication',
}
</script>

<style scoped>
.container {
    margin: 30px 40px 200px 40px;
    font-weight: bold;
}

.container p {
    margin-bottom: 30px;
}

.links {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

.links img {
  max-width: 50%; /* Adjust the width as necessary */
  height: auto; /* Maintain the aspect ratio */
  display: block; /* Makes the image a block-level element */
  margin: auto; /* This will horizontally center the image in its container */
}

.faq {
    margin-top: 50px;
}

.faq details {
    margin-bottom: 40px;
}

.faq p {
    margin: 10px 0 0 15px;
}


</style>