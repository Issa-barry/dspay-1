
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


//   const createTaux = async (devise_source_id, devise_cible_id, taux) => {
//     console.log(devise_source_id);
    
//     try {
//         const response = await useNuxtApp().$axios.post('/taux-echanges',  
//             {
//               devise_cible_id,
//               devise_source_id,
//               taux
//             },
//             {
//                 headers: {
//                     'Content-Type': 'application/json' ,
//                 },
//             }
//         );
//         taux_echanges.value.push(response.data);
//     } catch (err) {
//         error.value = err;
//         console.error('Erreur lors de la création de la devise:', err.response ? err.response.data : err);
//     }
// };


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
    deleteTaux, // Nouvelle méthode
  };
}
