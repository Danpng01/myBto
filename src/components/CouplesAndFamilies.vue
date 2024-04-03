<template>
    <div class = "container">
        <div class = "relevant-info">
            <p>A household’s eligibility for housing subsidies and HDB housing loan is assessed based on the core family nucleus, which is formed by the applicant(s) and occupier(s) who enable the household to meet the eligibility conditions for the flat purchase. They must remain in the flat application, as well as during the minimum occupation period (MOP) after the flat purchase.</p>
        </div>
        <div class = "fiance">
            <details>
                <summary>Fiancé and fiancée</summary>
                <p>Under this HDB eligibility scheme, you’ll form a family nucleus with your spouse-to-be, and if you haven’t already done so, you’ll need to solemnise your marriage within three months of getting the keys to your HDB flat. HDB will require a photocopy of your marriage certificate.</p>
                <p>If you’ve solemnised your marriage before collecting the keys, you can submit the photocopy when you visit the HDB sales office to get the keys. If you’ve done it after key collection, then you’ll submit your marriage certificate to your managing HDB branch.</p>
                <p>For more information checkout HDB's <a href="https://www.hdb.gov.sg/residential/buying-a-flat/understanding-your-eligibility-and-housing-loan-options/flat-and-grant-eligibility/couples-and-families" target="_blank" rel="noopener noreferrer">website</a></p>
            </details>
        </div>
        <div class = "married">
            <details>
                <summary>Married couples and/or parent(s) with child(ren)</summary>
                <p>Your household must comprise 1 of the following groups:</p>
                <ul>
                    <li><p>You, your spouse and child(ren)</p></li>
                    <li><p>You, your parents and siblings. If you are an unmarried/ widowed/ divorced SC buying a flat with parents, at least one of your parents must be an SC or SPR.</p></li>
                    <li><p>You and your child(ren) under your legal custody, care and control (for widowed/ divorced persons). If the care and control of your child is shared with your ex-spouse, you must obtain his/ her written agreement before you may list your child in a flat application.</p></li>
                </ul>
                <p>For more information checkout HDB's <a href="https://www.hdb.gov.sg/residential/buying-a-flat/understanding-your-eligibility-and-housing-loan-options/flat-and-grant-eligibility/couples-and-families" target="_blank" rel="noopener noreferrer">website</a></p>
            </details>
        </div>
        <div class = "multi-generation">
            <details>
                <summary>Multi-generation families</summary>
                <p>You and your fiancé/ fiancée or spouse will form a core family nucleus. Together with your parents (at least one of your parents must be an SC or SPR), your household may apply for a 3Gen flat from HDB or buy a resale 3Gen flat.</p>
                <p>For more information checkout HDB's <a href="https://www.hdb.gov.sg/residential/buying-a-flat/understanding-your-eligibility-and-housing-loan-options/flat-and-grant-eligibility/couples-and-families" target="_blank" rel="noopener noreferrer">website</a></p>
            </details>
        </div>
        <div class = "orphans">
            <details>
                <summary>Orphaned siblings</summary>
                <p>You and your siblings, who are orphans and single, i.e., unmarried, divorced, or widowed persons (Divorced or widowed persons who have child(ren) and can form a family unit will not qualify to buy a flat as orphaned siblings.), will form a core family nucleus and may apply for a flat from HDB or buy a resale flat on the open market with the following criteria:</p>
                <ul>
                    <li><p>All your siblings are listed in the same application, and they are not applying for/ owning/ renting a flat separately</p></li>
                    <li><p>At least 1 of your deceased parents was a Singapore Citizen (SC) or Singapore Permanent Resident (SPR)</p></li>
                </ul>
                <p>For more information checkout HDB's <a href="https://www.hdb.gov.sg/residential/buying-a-flat/understanding-your-eligibility-and-housing-loan-options/flat-and-grant-eligibility/couples-and-families" target="_blank" rel="noopener noreferrer">website</a></p>
            </details>
        </div>
        <div class = "non-resident">
            <details>
                <summary>Families with non-residents</summary>
                <p>You are a Singapore Citizen (SC) buying a flat with your non-resident spouse or parents/child(ren)</p>
                <p>For non-resident spouse, you may apply to buy a 2-room Flexi flat in the non-mature estates from HDB or a resale flat on the open market with your non-resident spouse who is not an SC or Singapore Permanent Resident (SPR). If you have a child who is an SC or SPR, please refer to married couples and/ or parent(s) with child(ren).</p>
                <p>For non-resident parents / child(ren), you may buy a resale flat as a single, divorced, or widowed SC, with your non-resident parents/ child(ren) (under your legal custody, care, and control), who are not SC or SPR. </p>
                <p>For more information checkout HDB's <a href="https://www.hdb.gov.sg/residential/buying-a-flat/understanding-your-eligibility-and-housing-loan-options/flat-and-grant-eligibility/couples-and-families" target="_blank" rel="noopener noreferrer">website</a></p>
            </details>
        </div>
    </div>
</template>

<script>
export default {
    name: "CouplesAndFamilies",
};
/*
<div class = "container">
        <h3>Useful Links:</h3>
        <a href="https://www.hdb.gov.sg/residential/buying-a-flat/understanding-your-eligibility-and-housing-loan-options/flat-and-grant-eligibility/couples-and-families" target="_blank" rel="noopener noreferrer">1. Flat types for couples and families</a>
    </div>
    <div class = "relevant-info">
        <h3>Some relevant information:</h3>
        <h3>1. If you and your spouse are aged 55 and above and are looking to buy a short-lease 2-room Flexi flat, or aged 65 and above and are looking to buy a or Community Care Apartment (CCA), please refer to the section on seniors.</h3>
    </div>
*/
</script>

<style scoped>
.container {
    margin: 30px 40px 200px 0px;
}

.container p, summary{
    font-weight: bold;
    margin-bottom: 30px;;
}

.container summary {
    font-size: 34px;
}

.fiance {
    margin-top: 30px;
}

ul li {
    margin-left: 30px;
}

.fiance {
    margin-top: 60px;
}

</style>