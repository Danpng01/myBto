<template>
    <div class="header">
      <h1>Eligibility for BTO</h1>
      <h4>Which category do you fall under?</h4>
      <v-select
        class="select"
        :items="['Couples and families', 'Seniors', 'Singles']"
        clearable
        density="comfortable"
        label="Type"
        variant="solo"
        v-model="selectedCategory"
        @change="onCategoryChange"
      ></v-select>
      <!-- Conditional rendering based on selectedCategory -->
      <component :is="getCategoryComponent(selectedCategory)" />
    </div>
  </template>
  
  <script>
  import { VSelect } from 'vuetify/components';
  import { ref } from 'vue';
  import CouplesAndFamilies from './CouplesAndFamilies.vue'; // Assuming you have this component
  import Seniors from './Seniors.vue';
  import Singles from './Singles.vue'; // Assuming you have this component
  
  export default {
    name: 'CheckEligibility',
    components: {
      VSelect,
      CouplesAndFamilies,
      Seniors,
      Singles,
    },
    setup() {
      const selectedCategory = ref('');
  
      const getCategoryComponent = (category) => {
        const componentsMap = {
          'Couples and families': CouplesAndFamilies,
          'Seniors': Seniors,
          'Singles': Singles,
        };
        return componentsMap[category] || null;
      };
  
      const onCategoryChange = () => {
        // This function now only needs to set the selectedCategory
      };
  
      return {
        selectedCategory,
        onCategoryChange,
        getCategoryComponent,
      };
    },
  };
  </script>

<style scoped>
.header {
    margin: 30px 0px 0px 40px;
}

h4 {
    margin-top: 20px;
}

.select {
    max-height: 50px;
    max-width: 300px;
    background-color: white;
    margin-top: 20px;
}


</style>