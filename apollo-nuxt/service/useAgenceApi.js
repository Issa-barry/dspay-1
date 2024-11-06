// composables/useAgenceApi.js
import { ref } from 'vue'
import { useNuxtApp } from '#app'; // Importez useNuxtApp pour accéder aux plugins

export const useAgenceApi = () => {
  const agences = ref([])
  const agence = ref(null)
  const error = ref(null)

  // Récupérer toutes les agences
  const fetchAgences = async () => {
    try {
      const response = await useNuxtApp().$axios.get('/agences')
      agences.value = response.data
    //   console.log(agences.value)
    } catch (err) {
      error.value = err
      console.error('Erreur lors de la récupération des agences:', err)
    }
    
  }

  // Récupérer une agence par son ID
  const fetchAgenceById = async (id) => {
    try {
      const response = await useNuxtApp().$axios.get(`/agences/${id}`)
      agence.value = response.data
    } catch (err) {
      error.value = err
      console.error('Erreur lors de la récupération de l\'agence:', err)
    }
  }

  // Créer une nouvelle agence
  const createAgence = async (data) => {
    try {
      const response = await useNuxtApp().$axios.post('/agences', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      agences.value.push(response.data)
      
    } catch (err) { 
      error.value = err
      console.error('Erreur lors de la création de l\'agence:', err.response ? err.response.data : err)
    }
  }

  const createAgence2 = async (nom, email, phone, pays, adresse, ville, code_postal) => {
    try {
      const response = await useNuxtApp().$axios.post('/agences', {
        nom, email, phone, pays, adresse, ville, code_postal,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      agences.value.push(response.data)
      
    } catch (err) { 
      error.value = err
      console.error('Erreur lors de la création de l\'agence:', err.response ? err.response.data : err)
    }
  }

  // Mettre à jour une agence existante
  const updateAgence = async (id, data) => {
    try {
      const response = await useNuxtApp().$axios.put(`/agences/${id}`, data)
      const index = agences.value.findIndex(ag => ag.id === id)
      if (index !== -1) {
        agences.value[index] = response.data
      }
      return response
    } catch (err) {
      error.value = err
      console.error('Erreur lors de la mise à jour de l\'agence:', err)
    }
  }

  // Supprimer une agence
  const deleteAgence = async (id) => {
    try {
      const response = await useNuxtApp().$axios.delete(`/agences/${id}`)
      if (response.status === 204) {
        agences.value = agences.value.filter(ag => ag.id !== id)
      }
    } catch (err) {
      error.value = err
      console.error('Erreur lors de la suppression de l\'agence:', err)
    }
  }

  return {
    agences,
    agence,
    error,
    fetchAgences,
    fetchAgenceById,
    createAgence,
    updateAgence,
    deleteAgence,
  }
}
