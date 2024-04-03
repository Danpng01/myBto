<template>
    <div class = "container">
        <div class = "title">
            <h1>Book Flat</h1>
        </div>
        <div class = "info">
            <div class = "general-info">
                <p>If you are shortlisted and are waiting to book a flat, you may continue with the flat application even if the HFE letter has expired. You will be invited to book a flat based on your balloted queue position.</p>
                <p>HDB will notify you of your flat booking appointment about 2 weeks before the appointment date. You may then use your Singpass to log in to <a href = "https://services2.hdb.gov.sg/webapp/FI10PPORTAL/FI10PAtAGlance.jsp" target="_blank">My HDBPage</a> to view the invitation package. The package will contain the flat list and the documents to bring along for the appointment.</p>
                <p>You must attend the flat booking appointment personally. If you are unable to do so, you must complete the <a href = "https://www.hdb.gov.sg/-/media/doc/EAPG-CSC/Authorisation-To-Select-a-Flat.ashx" target="_blank">authorisation form</a> (PDF, 32KB) and have your authorised representative submit it to us during your booking appointment.</P>
                <p>You’ll also need a valid HFE letter before you go for the flat booking appointment.</p>
                <img src = "../assets/requireddocs.png">
                <h5>*Either physical or digital copy of the Identity Card, birth certificate or death certificate.</h5>
            </div>
            <div class = "option-fee">
                <details>
                    <summary>Option Fee</summary>
                    <p>Bring your NETS card too! At this stage, you’ll need to pay the option fee.</p>
                    <p>This option fee will form part of your downpayment.</p>
                    <img src = "../assets/optionfee.png">
                </details>
            </div>
            <div class = "deferred-income">
                <details>
                    <summary>Deferred Income Assessment</summary>
                    <p>Couples who fulfil the eligibility conditions within the last 12 months before the HFE letter application may have their income assessed nearer to their key collection appointment for the EHG and HDB housing loan.</p>
                    <p>If you’re applying for the Deferred Income Assessment, you’ll have to apply for it during the flat booking appointment.</p>
                    <p>You will be informed during your flat booking appointment if you are eligible to defer your income assessment.</p>
                    <p>Eligibility Conditions:</p>
                    <img src = "../assets/eligibilityforDIA.png">
                    <p>Down Payment:</p>
                    <img src = "../assets/downpayment.png">
                    <p>You must pay the downpayment when you sign the <a href = "https://www.hdb.gov.sg/residential/buying-a-flat/buying-procedure-for-new-flats/sign-agreement-for-lease" target="_blank"> Agreement for Lease</a></p>
                </details>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'BookFlat',
}
</script>

<style scoped>
.container {
    margin: 30px 40px 200px 40px;
}

.container p {
    margin-bottom: 30px;
    font-weight: bold;
}

.info {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
}

ul a {
    font-size: 20px;
}

ul {
    margin-left: 10px;
}

.info  img {
  max-width: 50%; /* Adjust the width as necessary */
  height: auto; /* Maintain the aspect ratio */
  display: block; /* Makes the image a block-level element */
  margin: 30px 0 30px 0;
}

.general-info {
    margin-bottom: 50px;
}

summary {
    margin: 30px 0 30px 0;
    font-size: 34px;
    font-weight: bold;
}

</style>