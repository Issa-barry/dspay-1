<template>
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        <li v-for="user in users" :key="user.id">
          <h2>{{ user.name.firstname }} {{ user.name.lastname }}</h2>
          <p>Email: {{ user.email }}</p>
          <p>Téléphone: {{ user.phone }}</p>
          <p>Adresse: {{ user.address.street }}, {{ user.address.city }}, {{ user.address.zipcode }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const users = ref([]);
  
  // Fonction pour récupérer les données de l'API
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/users');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }
      users.value = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  // Appel de la fonction pour récupérer les utilisateurs
  fetchUsers();
  </script>
  
  <style scoped>
  h1 {
    color: #333;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  