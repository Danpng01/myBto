<template>
    <div class="sidebar">
      <ul>
        <li><router-link to="/dashboard" active-class="active-link">My Dashboard</router-link></li>
        <li><router-link to="/calendar" active-class="active-link">Calendar</router-link></li>
        <li><router-link to="/recommendations" active-class="active-link">Recommendations for Me</router-link></li>
      </ul>
    </div>
  </template>
  
  
<script>
  export default {
    name: 'Sidebar'
  };
</script>
  
<style scoped>
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 250px;
    min-height: 100vh;
    height: auto;
    margin-top: 30px;
    padding-left: 40px;
    border-right: 1px solid #B3AC93;
  }
  
  .sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 30px;
  margin-right: 30px;
}

.sidebar ul li a {
  display: block;
  padding: 10px 20px;
  border-radius: 25px;
  border: 1px solid #ccc;
  background-color: white;
  text-decoration: none;
  color: #000;

  /* new addition */
  padding-right: 40px;
  transition: background-color 0.3s, color 0.3s; 
}

.sidebar ul li a:hover {
  background-color: #f2f2f2; 
  color: #000;
}


.sidebar ul li a.active-link {
  background-color: #E69B9B;
  border-color: #E69B9B;
  color: #fff;
}

.sidebar ul li a.active-link:hover {
  background-color: #E69B9B;
  color: #fff;
}
</style>
  