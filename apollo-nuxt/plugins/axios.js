// plugins/axios.js
import axios from 'axios';

export default defineNuxtPlugin(nuxtApp => {
    const api = axios.create({
        baseURL: 'http://localhost:8000/api', // Changez l'URL selon votre API
        headers: {
          //       // 'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
    });

    // Optionnel : vous pouvez définir des interceptors si nécessaire
    api.interceptors.response.use(
        response => response,
        error => {
            // Gérer les erreurs ici
            return Promise.reject(error);
        }
    );

    // Enregistrer Axios pour utilisation dans tout le projet
    nuxtApp.provide('axios', api);
});



