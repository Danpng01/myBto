<template>
    <div class = "container">
        <div class = "title">
            <h1>Key Collection</h1>
        </div>
        <div class = "info">
            <div class = "general-info">
                <p>Once your flat is completed and the keys are ready to be issued, HDB will notify you to collect your keys. Once there, you will have to pay the balance of the purchase price of the flat. Make sure your HLE Letter or Letter of Offer is valid for your housing loan to be disbursed.</p>
                <p>If you applied for the flat under the Fiancé/Fiancée Scheme, you must solemnise your marriage within 3 months of collecting your keys. If your marriage was registered overseas, you need to submit a photocopy of your marriage certificate to HDB. </p>
                <p>During key collection, you will also have to pay survey fees and premiums under the <a href = "https://www.cpf.gov.sg/member/faq/home-ownership/home-protection-scheme" target="_blank">CPF Home Protection Scheme</a> if you are using your CPF funds to pay your home loan instalments, and purchase fire insurance if you are taking an HDB housing loan.</p>
                <p>Required documents for key collection:</p>
                <img src = "../assets/requireddocsforkey.png">
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'Keys',
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