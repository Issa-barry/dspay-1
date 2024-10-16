<script setup>
import { AgenceService } from '../../service/AgenceService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
const router = useRouter();

onMounted(() => {
    AgenceService.getAgences().then((data) => (agences.value = data));
});

const toast = useToast();
const dt = ref();
const agences = ref();
const agenceDialog = ref(false);
const deleteAgenceDialog = ref(false);
const deleteAgencesDialog = ref(false);
const agence = ref({});
const selectedAgences = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const  pays = ref([
    { label: 'GUINEE-CONAKRY', value: 'Guinée-conakry' },
    { label: 'FRANCE', value: 'France' },
]);

function formatCurrency(value) {
    if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
}

function openNew() {
    agence.value = {};
    submitted.value = false;
    agenceDialog.value = true;
}

function hideDialog() {
    agenceDialog.value = false;
    submitted.value = false;
}

function saveAgence() {
    submitted.value = true;

    if (agence?.value.name?.trim()) {
        if (agence.value.id) {
            agence.value.status = agence.value.status.value ? agence.value.status.value : agence.value.status;
            agences.value[findIndexById(agence.value.id)] = agence.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Agence mis à jour', life: 3000 });
        } else {
            agence.value.id = createId();
            agence.value.code = createId();
            agence.value.image = 'agence-placeholder.svg';
            agence.value.status = agence.value.status ? agence.value.status.value : 'INSTOCK';
            agences.value.push(agence.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Agence Créé', life: 3000 });
        }

        agenceDialog.value = false;
        agence.value = {};
    }
}

function editAgence(prod) {
    agence.value = { ...prod };
    agenceDialog.value = true;
}

function confirmDeleteAgence(prod) {
    agence.value = prod;
    deleteAgenceDialog.value = true;
}

function deleteAgence() {
    agences.value = agences.value.filter((val) => val.id !== agence.value.id);
    deleteAgenceDialog.value = false;
    agence.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Agence  Supprimé', life: 3000 });
}

function findIndexById(id) {
    let index = -1;
    for (let i = 0; i < agences.value.length; i++) {
        if (agences.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

function createId() {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function exportCSV() {
    dt.value.exportCSV();
}

function confirmDeleteSelected() {
    deleteAgencesDialog.value = true;
}

function deleteSelectedAgences() {
    agences.value = agences.value.filter((val) => !selectedAgences.value.includes(val));
    deleteAgencesDialog.value = false;
    selectedAgences.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Agences  Supprimé', life: 3000 });
}

function getStatusLabel(status) {
    switch (status) {
        case 'ACTIVÉ':
            return 'success';

        case 'ATTENTE':
            return 'warn';

        case 'BLOQUÉ':
            return 'danger';

        case 'DELOQUÉ':
            return 'danger';

        case 'ARCHIVÉ':
            return 'secondary';

        
        case 'SUPPRIMÉ':
            return 'secondary';

        default:
            return null;
    }
}

function navigateToAgenceCreate() {
    router.push({ name: 'agence-create' });
}
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nouveau" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                    <Button label="Supprimer" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedAgences || !selectedAgences.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
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
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="reference" header="Reference" sortable style="min-width: 12rem"></Column>
                <Column field="nom" header="Nom" sortable style="min-width: 12rem"></Column>
                <Column field="addresse.ville" header="Adresse" sortable style="min-width: 12rem"></Column>
                <Column field="phone" header="Phone" sortable style="min-width: 12rem"></Column>
                <!-- <Column field="email" header="Email" sortable style="min-width: 10rem"></Column> -->
                <Column field="status" header="Status" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.status" :severity="getStatusLabel(slotProps.data.status)" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editAgence(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteAgence(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="agenceDialog" :style="{ width: '450px' }" header="Agence Details" :modal="true">
            <div class="flex flex-col gap-6">
                <!-- <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`" :alt="product.image" class="block m-auto pb-4" /> -->
                <div>
                    <label for="nom" class="block font-bold mb-3">Nom agence</label>
                    <InputText id="nom" v-model.trim="agence.nom" required="true" autofocus :invalid="submitted && !agence.nom" fluid />
                    <small v-if="submitted && !agence.nom" class="text-red-500">Le nom de l'agence est obligatoire.</small>
                </div>
                <div>
                    <label for="email" class="block font-bold mb-3">Email</label>
                    <InputText id="email" v-model.trim="agence.email" required="true" autofocus :invalid="submitted && !agence.email" fluid />
                    <small v-if="submitted && !agence.email" class="text-red-500">L'email de l'agence est obligatoire.</small>
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
                    <label for="status" class="block font-bold mb-3">Pays</label>
                    <Select id="status" v-model="agence.pays" :options="pays" optionLabel="label" placeholder="Select a Status" fluid></Select>
                    <small v-if="submitted && !agence.pays" class="text-red-500">Le pays est obligatoire.</small>
                </div>

                <div>
                    <label for="name" class="block font-bold mb-3">Adresse</label>
                    <InputText id="name" v-model.trim="agence.name" required="true" autofocus :invalid="submitted && !agence.name" fluid />
                    <small v-if="submitted && !agence.name" class="text-red-500">L'adresse est obligatoire.</small>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Code Postal</label>
                        <InputNumber id="price" v-model="agence.price" mode="currency" currency="USD" locale="en-US" fluid />
                        <small v-if="submitted && !agence.name" class="text-red-500">Le code postal est obligatoire.</small>
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">Ville</label>
                        <InputNumber id="quantity" v-model="agence.quantity" integeronly fluid />
                        <small v-if="submitted && !agence.name" class="text-red-500">La ville est obligatoire.</small>
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Annuler" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Enregistrer" icon="pi pi-check" @click="saveAgence" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteAgenceDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="agence"
                    >Êtes-vous sûr de vouloir supprimer <b>{{ agence.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteAgenceDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteAgence" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteAgencesDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="agence">Êtes-vous sûr de vouloir supprimer les agences sélectionnées ?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteAgencesDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedAgences" />
            </template>
        </Dialog>
    </div>
</template>
