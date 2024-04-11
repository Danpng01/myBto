<template>
    <div class = "container">
        <div class = "title">
            <h1>Sales Launches</h1>
        </div>
        <div class = "links">
            <p>First, you’ll have to check the <a href = "https://homes.hdb.gov.sg/home/landing" target="_blank">HDB</a> website regularly for news of upcoming sales launches. To make life easier, sign up for <a href = "https://services2.hdb.gov.sg/webapp/BF08CESS/Subscription.jsp" target="_blank">HDB's eAlert Service</a> so you can be notified of upcoming launches.</p>
            <p>HDB typically announces upcoming BTO projects at least 3 months prior to their launch. This should give you ample time to plan for the location you want.</p>
            <p>After a sales launch is announced, you can apply for a flat online at the <a href = "https://homes.hdb.gov.sg/home/landing" target="_blank">HDB Flat Portal</a> during the application period. An non-refundable administrative fee of $10 (inclusive of GST) per application is payable by credit card (MasterCard/ Visa) or scanning the QR code using any of the supporting mobile payment apps.</p>
            <p><strong>Click <router-link to="/recommendations">here</router-link> for recommendations on upcoming sales launches!</strong></p>
            <p style = "margin-bottom: 10px;">Check out some reviews of the 2023 launches here:</p>
            <ul>
                <li><p><a href = "https://blog.moneysmart.sg/property/hdb-bto-feb-2023/" target="_blank">BTO February 2023</a> review</p></li>
                <li><p><a href = "https://blog.moneysmart.sg/property/hdb-bto-may-2023/" target="_blank">BTO May 2023</a> review</p></li>
                <li><p><a href = "https://blog.moneysmart.sg/property/hdb-bto-aug-2023/" target="_blank">BTO September 2023</a> review (The third BTO of the year is usually in August, but 2023’s got pushed back)</p></li>
                <li><p><a href = "https://blog.moneysmart.sg/property/hdb-bto-dec-2023-review/" target="_blank">BTO Dec 2023</a> review (Since the Aug BTO got pushed to Sep, the Nov one got pushed to Dec)</p></li>
            </ul>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'SalesLaunches',
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

ul {
    margin-left: 30px;
}
</style>