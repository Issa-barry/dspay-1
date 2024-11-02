
<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nouveau" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                    <Button label="Supprimer" icon="pi pi-trash" severity="secondary" @click="deleteAgenceById()"   />
                </template>
                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                v-model:selection="selectedAgences"
                :value="agences"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} agences"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Gestion Agences</h4>
                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                    </div>
                </template>
                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="id" header="Reference" sortable style="min-width: 12rem"></Column>
                <Column field="reference" header="Reference" sortable style="min-width: 12rem"></Column>
                <Column field="nom" header="Nom-agence" sortable style="min-width: 12rem"></Column>
                <!-- <Column field="adresse" header="Adresse" sortable style="min-width: 12rem"></Column> -->
                <!-- <Column field="phone" header="Phone" sortable style="min-width: 13rem"></Column> -->
                <!-- <Column field="email" header="Email" sortable style="min-width: 13rem"></Column> -->
                <Column field="pays" header="Pays" sortable style="min-width: 13rem"></Column> 
                <!-- <Column field="ville" header="Ville" sortable style="min-width: 13rem"></Column> -->
                <!-- <Column field="code_postal" header="Code_postal" sortable style="min-width: 13rem"></Column>  -->
                <!-- <Column field="statut" header="Status" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.statut" :severity="getStatusLabel(slotProps.data.statut)" />
                    </template>
                </Column> -->
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editAgence(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="deleteAgenceById(slotProps.data.id)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="agenceDialog" :style="{ width: '450px' }" header="Agence Details" :modal="true">
            <div class="flex flex-col gap-6">
                <!-- <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" /> -->
                <div>
                    <label for="nom" class="block font-bold mb-3">Nom agence</label>
                    <InputText id="nom" v-model.trim="agence.nom" required="true"  fluid />
                 </div>  
                <div>
                    <label for="email" class="block font-bold mb-3">Email</label>
                    <InputText id="email" v-model.trim="agence.email" required="true" autofocus :invalid="submitted && !agence.value.email" fluid />
                    <small v-if="submitted && !agence.value.email" class="text-red-500">L'email de l'agence est obligatoire.</small>
                </div>
                <div>
                    <label for="phone" class="block font-bold mb-3">Téléphone</label>
                    <InputText id="phone" v-model.trim="agence.phone" required="true" autofocus :invalid="submitted && !agence.phone" fluid />
                    <small v-if="submitted && !agence.phone" class="text-red-500">Le numéro de téléphone de l'agence est obligatoire.</small>
                </div>  
                <!-- <div>
                    <label for="description" class="block font-bold mb-3">Description</label>
                    <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" fluid />
                </div> -->
              <div>
                    <label for="pays" class="block font-bold mb-3">Pays</label>
                    <Select id="pays" v-model="agence.pays" :options="statusPays" optionLabel="label" placeholder="Selectionner 1 pays" fluid></Select>
                    <!-- <small v-if="submitted && !agence.statusPays" class="text-red-500">Le pays est obligatoire.</small> -->
                </div>

                <div>
                    <label for="adresse" class="block font-bold mb-3">Adresse</label>
                    <InputText id="adresse" v-model.trim="agence.adresse" required="true" autofocus :invalid="submitted && !agence.adresse" fluid />
                    <small v-if="submitted && !agence.adresse" class="text-red-500">L'adresse est obligatoire.</small>
                </div>
              

                <div class="grid grid-cols-12 gap-4">
                    <div  class="col-span-6">
                        <label for="phone" class="block font-bold mb-3">Ville2</label>
                        <InputText id="phone" v-model.trim="agence.ville" required="true" autofocus :invalid="submitted && !agence.phone" fluid />
                        <small v-if="submitted && !agence.phone" class="text-red-500">Le numéro de téléphone de l'agence est obligatoire.</small>
                    </div>
                    <div  class="col-span-6">
                        <label for="code_postal" class="block font-bold mb-3">Ville</label>
                        <InputText id="code_postal" v-model.trim="agence.code_postal" required="true" autofocus :invalid="submitted && !agence.phone" fluid />
                        <small v-if="submitted && !agence.code_postal" class="text-red-500">Le code postal est obligatoire.</small>
                    </div>
                  
                </div>  
            </div>

            <template #footer>
                <Button label="Annuler" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Enregistrer" icon="pi pi-check" @click="saveAgence" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteAgenceDialog" :style="{ width: '450px' }" header="Confirmation" :modal="true">
            <div>Êtes-vous sûr de vouloir supprimer cette agence ?</div>
            <template #footer>
                <Button label="Non" icon="pi pi-times" outlined @click="deleteAgenceDialog = false" />
                <Button label="Oui" icon="pi pi-check" @click="deleteAgenceConfirmed" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { useAgenceApi } from '../../../service/useAgenceApi';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const {
    agences,
    fetchAgences,
    createAgence,
    updateAgence,
    deleteAgence,
} = useAgenceApi();

const dt = ref();
const agenceDialog = ref(false);
const deleteAgenceDialog = ref(false);
const agence = ref({});
const selectedAgences = ref();
const filters = ref({global: { value: null, matchMode: FilterMatchMode.CONTAINS },});
const submitted = ref(false);
const statusPays = ref([
    { label: 'GUINEE-CONAKRY', value: 'Guinée-conakry' },
    { label: 'FRANCE', value: 'France' },
]);

onMounted(() => {
    fetchAgences();
});

function openNew() {
    agence.value = {};
    submitted.value = false;
    agenceDialog.value = true;
}

function hideDialog() {
    agenceDialog.value = false;
    submitted.value = false;
}

 

function editAgence(prod) {
    agence.value = { ...prod };
    agenceDialog.value = true;
}

function confirmDeleteAgence(prod) {
    // agence.value = prod;
    // deleteAgenceDialog.value = true;
   
}

function deleteAgenceConfirmed() {
    deleteAgence(agence.value.id).then(() => {
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Agence supprimée', life: 3000 });
        deleteAgenceDialog.value = false;
    });
}

function confirmDeleteSelected() {
    deleteAgencesDialog.value = true;
}

function deleteSelectedAgences() {
    selectedAgences.value.forEach(selected => {
        deleteAgence(selected.id);
    });
    deleteAgencesDialog.value = false;
    selectedAgences.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Agences supprimées', life: 3000 });
}

function getStatusLabel(status) {
    switch (status) {
        case 'active':
            return 'success';
        case 'attente':
            return 'warn';
        case 'blocke':
            return 'danger';
        case 'archive':
            return 'secondary';
        default:
            return null;
    }
}

function createId() {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function exportCSV() {
    dt.value.exportCSV();
}

/***************************************************************/
function saveAgence() {
    submitted.value = true;
     const data = {
        nom: agence.value.nom?.trim(),
        email: agence.value.email?.trim(),  
        phone: agence.value.phone?.trim(),  
        pays: agence.value.pays.value,
        adresse: agence.value.adresse?.trim(), 
        ville: agence.value.ville?.trim(),  
        code_postal: agence.value.code_postal?.trim(),  
        // statut: agence.value.status || 'attente' // Défaut à 'attente' si non défini
    };

    if (agence.value.nom?.trim()) {
        if (agence.value.id) {
            updateAgence(agence.value.id, data).then(() => {
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Agence mise à jour', life: 3000 });
                hideDialog();
            });
       console.log(agence.value);
        } else {
            agence.value.reference = createId();
            agence.value.status = 'attente';
            createAgence(agence.value).then(() => {
                toast.add({ severity: 'success', summary: 'Successful', detail: 'Agence créée', life: 3000 });
                hideDialog();
            });
        }
        agence.value = {};
    }
}

  
const deleteAgenceById = async (id) => {
    try {
      await deleteAgence(id);
      await fetchAgences();  
    // console.log(id);
    } catch (err) {
      error.value = err;
      console.error("Erreur lors de la suppression de la devise:", err);
    }
  };


// function deleteAgenceById() {

// }
  
</script>
