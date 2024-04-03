<template>
    <div class = "container">
        <div class = "title">
            <h1>Sign Agreement for Lease</h1>
        </div>
        <div class = "info">
            <div class = "general-info">
                <p>You will be invited to sign the <a href = "https://www.hdb.gov.sg/residential/buying-a-flat/buying-procedure-for-new-flats/sign-agreement-for-lease" target="_blank">Agreement for Lease</a> within 9 months after booking an uncompleted flat.</p>
                <p>If you have booked a completed flat, you will sign the Agreement for Lease and collect the keys to the flat within 6 to 9 months after booking the flat.</p>
                <p>Items required:</p>
                <img src = "../assets/requireddocsforlease.png">
                <h5>*Either physical or digital copy of the Identity Card, birth certificate or death certificate.</h5>
            </div>
            <div class = "downpayment">
                <details>
                    <summary>Downpayment</summary>
                    <p>The amount payable depends on whether you are:</p>
                    <ul>
                        <li><p>Taking an HDB housing loan</p></li>
                        <li><p>Not taking any housing loan</p></li>
                        <li><p>Taking a housing loan from a financial institution (FI)</p></li>
                    </ul>
                    <p>Please refer to housing loan from <a href = "https://www.hdb.gov.sg/residential/buying-a-flat/understanding-your-eligibility-and-housing-loan-options/housing-loan-options/housing-loan-from-financial-institutions" target="_blank">housing loan from financial institutions</a> for more information on the loan ceilings for purchase of new flats.</p>
                    <p>You have to pay the downpayment when you sign the Agreement for Lease, and the balance when collecting keys to your new flat.</p>
                    <p>You may pay the downpayment with cash and/ or CPF Ordinary Account (OA) savings (including CPF housing grant if eligible), depending on your financing option.</p>
                    <img src = "../assets/downpaymentcategory.png">
                    <h5>[1] For flat applications received from 16 Dec 2021 to 29 Sep 2022, the LTV limit for HDB housing loan is at 85%, and the downpayment amount during collection of keys is 5% of purchase price.</h5>
                    <h5 style = "margin-top: 10px">[2] For flat applications received on or after 30 Sep 2022, the LTV limit for HDB housing loan is at 80%, and the downpayment amount during collection of keys is 10% of purchase price.</h5>
                    <p style = "margin-top: 30px">For payment using CPF savings, you would need to access your Singpass and your mobile phone. Note that the registration for Singpass and activation of 2FA can take up to 10 working days, so be sure to prepare these in advance!</p>
                </details>
            </div>
            <div class = "legal-fee">
                <details>
                    <summary>Stamp duty and legal fees</summary>
                    <h1 style = "margin-bottom: 30px;">Stamp Duty</h1>
                    <p>When you sign the Agreement for Lease, you will also need to pay stamp duty on the Agreement for Lease and the legal fee(s).</p>
                    <img src = "../assets/stampduty.png">
                    <h5>* Applicable if you are taking a housing loan from HDB</h5>
                    <p style = "margin-top: 30px">Stamp duty is based on the selling price of the flat. The amount payable is calculated as such:</p>
                    <ul>
                        <li><p>First $180,000: 1%</p></li>
                        <li><p>Next $180,000: 2%</p></li>
                        <li><p>Next $640,000: 3%</p></li>
                        <li><p>Remaining amount: 4%</p></li>
                    </ul>
                    <p>You may also use the <a href = "https://mytax.iras.gov.sg/ESVWeb/default.aspx?target=MSDCalculatorIntro" target="_blank">Stamp Duty Calculator</a> on the Inland Revenue Authority of Singapore (IRAS) <a href = "https://www.iras.gov.sg/taxes/stamp-duty/for-property" target="_blank">website</a> to calculate the stamp duty payable for your flat purchase.</p>
                    <p>If applicable, you must also pay an annual stamp duty on your Service & Conservancy Charges (S&CC) for the year. This is 0.40% of 4 times the S&CC amount for the year. This annual stamp duty is applicable if S&CC for the year plus annual rent of $1 is an amount exceeding $1,000.</p>
                    <h1 style = "margin: 50px 0 30px 0;">Legal Fees</h1>
                    <p>The fees that you may need to pay are:</p>
                    <ul>
                        <li><p>Legal fee for purchase of flat from HDB based on the purchase price of the flat</p></li>
                        <li><p>Legal fee for HDB to act for you in the mortgage based on the housing loan amount taken for the flat</p></li>
                    </ul>
                    <p>Legal fees are calculated as such:</p>
                    <ul>
                        <li><p>First $30,000: $0.90 per $1,000</p></li>
                        <li><p>Next $30,000: $0.72 per $1,000</p></li>
                        <li><p>Remaining Amount: $0.60 per $1,000</p></li>
                    </ul>
                    <p>Please note that the legal fee is rounded up to the next dollar, before applying GST. The minimum legal fee chargeable is $21.80 (inclusive of GST).</p>
                </details>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Lease',
}
</script>

<style scoped>
.container {
    margin: 30px 40px 200px 40px;
}

.title {
    margin-bottom: 30px;
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

ul {
    margin-left: 40px;
}


.info  img {
  max-width: 70%; /* Adjust the width as necessary */
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