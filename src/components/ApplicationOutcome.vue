<template>
    <div class = "container">
        <div class = "title">
            <h1>Application Outcome</h1>
        </div>
        <div class = 'info'>
            <p>You will receive an email notification to log in to the <a href = "https://homes.hdb.gov.sg/home/landing" target="_blank">HDB Flat Portal</a> to check the ballot results within 2 months after the applications period has closed. The timeline to release the ballot results is dependent on the sales launch and flat supply.</p>        </div>
    </div>
</template>

<script>
export default {
    name: 'ApplicationOutcome',
}
</script>

<style scoped>
.container {
    margin: 30px 40px 200px 40px;
}

.container p {
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
</style>