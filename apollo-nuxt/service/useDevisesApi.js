import { ref } from 'vue';
import { useNuxtApp } from '#app';

export const useDevises = () => {
  const devises = ref([]);
  const devise = ref(null);
  const error = ref(null);
 
  const fetchDevises = async () => {
    try {
      const response = await useNuxtApp().$axios.get('/devises');
      devises.value = response.data.data;  
    } catch (err) { 
      error.value = err;
      console.error('Erreur lors de la récupération des devises:', err);
    } 
  };
 
  const fetchDeviseById = async (id) => {
    try {
      const response = await useNuxtApp().$axios.get(`/devises/${id}`);
      devise.value = response.data.data;
    } catch (err) {
      error.value = err;
    }
  };
 
  const createDevise = async (nom, tag) => {
    try {
        const response = await useNuxtApp().$axios.post('/devises',  
            {
                nom,
                tag,
            },
            {
                headers: {
                    'Content-Type': 'application/json' ,
                },
            }
        );
        devises.value.push(response.data.data);
    } catch (err) {
        error.value = err;
        console.error('Erreur lors de la création de la devise:', err.response ? err.response.data : err);
    }
};
 
  const updateDevise = async (id, nom, tag) => {
    try {
      const response = await useNuxtApp().$axios.put(`/devises/${id}`, {
        nom,
        tag,
      });
      const index = devises.value.findIndex(dev => dev.id === id);
      devises.value[index] = response.data.data;
      return response;  
    } catch (err) {
      error.value = err;
    }
  };
   
  const deleteDevise = async (id) => {
    try {
      const response = await useNuxtApp().$axios.delete(`/devises/${id}`);
      console.log('Réponse de la suppression:', response);
      if (response.status === 204) {
        
        devises.value = devises.value.filter(dev => dev.id !== id);
      }
    } catch (err) {
      error.value = err;
      console.error('Erreur lors de la suppression de la devise:', err);
    }
  };
  
  

  return {
    devises,
    devise,
    error,
    fetchDevises,
    fetchDeviseById,
    createDevise,
    updateDevise,
    deleteDevise,
  };
};
