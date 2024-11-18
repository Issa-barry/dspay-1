
import { useNuxtApp } from '#app'; 
export default function useTauxApi() {
 

  const taux_echanges = ref([]);
  const taux_echange = ref(null);
  const error = ref(null);

  // Récupérer tous les taux
  const getAllTaux = async () => {
    try {
      const response = await useNuxtApp().$axios.get('/taux-echanges');
      return response.data; // Supposant que 'data' contient la liste
    } catch (error) {
      console.error('Erreur lors de la récupération des taux :', error);
      throw error;
    }
  };

  // Récupérer un taux spécifique entre deux devises
  const getTauxByDevises = async (sourceId, cibleId) => {
    try {
      const response = await useNuxtApp().$axios.get(`/taux-echanges/${sourceId}/${cibleId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du taux :', error);
      throw error;
    }
  };

  const createTaux = async (data) => {
    try {
      const response = await useNuxtApp().$axios.post('/taux-echanges', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      taux_echanges.value.push(response.data)
      
    } catch (err) { 
      error.value = err
      console.error('Erreur lors de la création de l\'agence:', err.response ? err.response.data : err)
    }
  }

 // Mettre à jour un taux existant
 const updateTaux = async (tauxId, data) => {
  try {
    const response = await useNuxtApp().$axios.put(`/taux-echanges/${tauxId}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Trouver le taux à mettre à jour dans la liste existante
    // const index = taux_echanges.value.findIndex((taux) => taux.id === tauxId);
    // if (index !== -1) {
    //   taux_echanges.value[index] = response.data; // Remplacer le taux existant par le taux mis à jour
    // }
    console.log(response.data);
    
    return response.data;
  } catch (err) {
    error.value = err;
    console.error('Erreur lors de la mise à jour du taux :', err.response ? err.response.data : err);
    throw err;
  }
};

  // Supprimer un taux
  const deleteTaux = async (tauxId) => {
    try {
      const response = await useNuxtApp().$axios.delete(`/taux-echanges/${tauxId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression du taux :', error);
      throw error;
    }
  };

  return {
    getAllTaux,
    getTauxByDevises,
    createTaux,
    updateTaux,
    deleteTaux, 
  };
}
