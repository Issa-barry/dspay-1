import axios from 'axios';

export default defineNuxtPlugin(nuxtApp => {
  const api = axios.create({
    // baseURL: 'http://localhost:1337/api', // Remplacez par l'URL de votre  
    baseURL: 'http://127.0.0.1:8000/api', // Remplacez par l'URL de votre Strapi
    headers: {
      // 'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
  }
  });

  nuxtApp.provide('api', api);
});




// // plugins/axios.js
// import axios from 'axios';

// export default defineNuxtPlugin((nuxtApp) => {
//     const API_URL = 'http://localhost:1337/api/devises/';
//     const TOKEN = 'fa07a1ca42693ebd72799a38bf7f277fcc54dd89db4d48821b1a385b29b6fb09923d7143cb73b55e0a35e85c19481312c2267339622c084c92868c1b8bf84f95372d264e1ce9bba7fac348404c295b1da6b6b5a2303d48b2ad211eee706be8327d3dc073628d94ef58608d15c6e890ad56e07b507882b545078cadd7b4b177d3'; // Remplacez par votre token

//     const axiosInstance = axios.create({
//         baseURL: API_URL,
//         headers: {
//             'Authorization': `Bearer ${TOKEN}`,
//             'Content-Type': 'application/json',
//         }
//     });

//     // Make the axios instance available globally
//     nuxtApp.provide('axios', axiosInstance);
// });
