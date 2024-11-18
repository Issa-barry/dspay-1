

  <template>
    <div class="container mx-auto p-4"> 
      <h2 class="text-xl font-semibold mt-4 mb-2">Ajouter une nouvelle devise</h2>
      <div class="flex items-center space-x-2 mb-8">
        <input v-model="newNom" placeholder="Nom de la devise" class="border border-gray-300 p-2 rounded flex-1" />
        <input v-model="newTag" placeholder="Tag de la devise" class="border border-gray-300 p-2 rounded flex-1" />
        <button @click="addDevise" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Ajouter</button>
      </div>
  
      <div v-if="error" class="text-red-500 mt-4">{{ error.message }}</div>

      <h1 class="text-2xl font-bold mb-4">Liste des Devises</h1>
   
      <table class="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th class="border border-gray-300 px-4 py-2">Nom</th>
            <th class="border border-gray-300 px-4 py-2">Tag</th>
            <th class="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="devise in devises" :key="devise.id">
            <td class="border border-gray-300 px-4 py-2">
              <span v-if="editId !== devise.id">{{ devise.nom }}</span>
              <input v-else v-model="editNom" placeholder="Nom de la devise" class="border border-gray-300 p-1 rounded" />
            </td>
            <td class="border border-gray-300 px-4 py-2">
              <span v-if="editId !== devise.id">{{ devise.tag }}</span>
              <input v-else v-model="editTag" placeholder="Tag de la devise" class="border border-gray-300 p-1 rounded" />
            </td>
            <td class="border border-gray-300 px-4 py-2 flex space-x-2">
              <button 
                @click="editId !== devise.id ? enableEdit(devise) : updateDeviseById(devise.id)"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {{ editId !== devise.id ? 'Modifier' : 'Enregistrer' }}
              </button>
              <button @click="deleteDeviseById(devise.id)" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Supprimer</button>
              <button v-if="editId === devise.id" @click="cancelEdit" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Annuler</button>
            </td>
          </tr>
        </tbody>
      </table>
   

    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'; 
  import { useDevises } from '../../../service/useDevisesApi';
  
  const { 
    devises, 
    fetchDevises, 
    createDevise, 
    updateDevise, 
    deleteDevise, 
    error } = useDevises();
  
  const newNom = ref('');
  const newTag = ref(''); 
  
  const editId = ref(null);
  const editNom = ref('');
  const editTag = ref('');
  
  const addDevise = async () => {
    if (newNom.value && newTag.value) {
      await createDevise(newNom.value, newTag.value);
      newNom.value = '';
      newTag.value = '';
      await fetchDevises();  
    }
  };
  
  const enableEdit = (devise) => {
    editId.value = devise.id;
    editNom.value = devise.nom;
    editTag.value = devise.tag;
  };
  
  const cancelEdit = () => {
    editId.value = null;
    editNom.value = '';
    editTag.value = '';
  };
  
  const updateDeviseById = async (id) => {
    try {
      console.log("Début de la mise à jour de la devise avec ID:", id);
      if (editNom.value && editTag.value) {
        const response = await updateDevise(id, editNom.value, editTag.value);
        console.log("Réponse de l'API:", response);
        editId.value = null;
        editNom.value = '';
        editTag.value = '';
        await fetchDevises();  
      }
    } catch (err) {
      error.value = err;
      console.error("Erreur lors de la mise à jour de la devise:", err);
    }
  };
  
  const deleteDeviseById = async (id) => {
    try {
      await deleteDevise(id);
      await fetchDevises();  
    } catch (err) {
      error.value = err;
      console.error("Erreur lors de la suppression de la devise:", err);
    }
  };
  
  onMounted(() => {
    fetchDevises();
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;  
  }
  </style>
   