<template>
    <div class = "container">
        <div class = "title"> 
            <h1>Financial Planning</h1> 
        </div>
        <div class = 'relevant-info'>    
            <p>Buying your first home is undeniably an exciting journey. While there are plenty of steps to take in your house hunt, it is recommended that you start by reviewing your finances and determining your budget.</p>
            <p>Many first-time buyers struggle with the decision of whether to finance their new flat using CPF savings or to make payments in cash. There's also uncertainty about selecting the right type of loan and understanding eligibility for it.</p>
            <p>Don't worry, this segment aims to clarify these choices for you and includes helpful links to streamline your decision-making process.</p>
        </div>
        <div class = "cpf">
            <div class = "title"> 
                <h1>Benefits of using your CPF savings</h1> 
            </div>
            <ol>
                <li>
                    <p>Tapping into your accumulated CPF savings</p>
                    <p>Your CPF savings start to accumulate in your OA from the moment you begin working, benefiting from compound interest along the way.</p>
                    <p>These accumulated savings will be useful when it comes to funding your flat's downpayment and reducing your mortgage. Without your CPF savings, you would need to come up with cash for the downpayment and this might be quite a substantial amount.</p>
                </li>
                <li>
                    <p>Free up your finances</p>
                    <p>Using your CPF savings also means that you would have more available cash for other expenses.</p>
                    <p>This includes big-ticket items such as your renovation or wedding – which can only be paid with cash. Don’t forget that electronic appliances and furniture can significantly add to the overall cost of your home as well!</p>
                </li>
            </ol>
        </div>
        <div class = "cash">
            <div class = "title"> 
                <h1>Benefits of using cash</h1> 
            </div>
            <ol>
                <li>
                    <p>Allows your CPF savings to grow at risk-free interest rates</p>
                    <p>Leaving a portion of your CPF untouched means that you have room for it to grow. With your CPF savings steadily growing at an interest rate of 2.5% p.a., you will be able to secure more for your retirement needs.</p>
                </li>
                <li>
                    <p>Lesser CPF savings to refund when selling your property</p>
                    <p>Your CPF savings are meant for your retirement needs. This means that any CPF funds used to purchase a property (along with its accrued interest and any housing grant received) will have to be <a href = "https://www.cpf.gov.sg/member/infohub/educational-resources/sales-proceeds-after-selling-your-home" target="_blank">refunded to your CPF account after selling your property</a>. The refunded amount can then be used to finance your next home or for retirement.</p>
                </li>
                <li>
                    <p>Reduces your mortgage</p>
                    <p>You can also use additional cash to reduce your housing debt. This decreases your housing loan, which means that you pay less interest over time.  </p>

                </li>
            </ol>
        </div>
        <div class = "loans">
            <div class = "title"> 
                <h1>HDB or bank loan?</h1> 
            </div>
            <p>Choosing between a HDB loan and a bank loan will depend on your financial situation and the interest rate environment.</p>
            <p>HDB loans have a fixed interest rate at 2.6%. Bank loans come in a variety of packages with floating rates, fixed rates, and hybrid options. Floating rates for home loans are typically pegged to the Singapore Overnight Rate Average <a href = "https://www.mas.gov.sg/monetary-policy/sora" target="_blank">(Sora)</a> benchmark, which can change and is often influenced by US interest rates.</p>
            <p>Whether you take out a mortgage from HDB or a bank can affect your financial planning, as the loan amount, the monthly instalments, and the mode of payment will be different. Here’s a quick summary: </p>
            <img src = "../assets/loan.png">
            <p>With a 75% LTV limit for a bank loan, you will have to fork out a larger downpayment — 25% of the property value — which may not be feasible for some couples.</p>
            <p>Hence, when deciding between a HDB loan and a bank loan, it is also important to consider how much available cash and CPF you have on hand for the downpayment. For more information, check out CPF's <a href = "https://www.cpf.gov.sg/member/home-ownership/using-your-cpf-to-buy-a-home" target="_blank">website</a>.</p>
            <p style = "margin-bottom: 10px;">If you would like to know more about which loans you are eligible for, or if you're interested in how to better plan your finances, check out these links:</p>
            <ol>
                <li><a href = "https://www.hdb.gov.sg/residential/buying-a-flat/buying-procedure-for-new-flats/timeline/plan-your-finances" target="_blank">HDB</a></li>
                <li><a href = "https://endowus.com/insights/planning-finances-hdb-bto" target="_blank">Endowus</a></li>
                <li><a href = "https://www.cpf.gov.sg/member/home-ownership/using-your-cpf-to-buy-a-home" target="_blank">CPF</a></li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FinancialPlanning',
}
</script>

<style scoped>
.container {
    margin: 30px 40px 200px 40px;
    font-weight: bold;
}

.container p {
    margin-bottom: 30px
}

.title {
    margin-bottom: 30px;
}

.relevant-info {
    margin-bottom: 50px;
}

ol {
    margin-left: 20px;
}

ol li {
    margin-bottom: 35px;
}
ol li p {
    margin-top: 10px;
}

img {
  max-width: 70%; /* Adjust the width as necessary */
  height: auto; /* Maintain the aspect ratio */
  margin: 0px 0 30px 0;
}

.loans, .cash, .cpf {
    margin-top: 80px;
}

.loans ol li {
    margin-bottom: 10px;
}
</style>