<script setup>
import { ContactService } from '../../service/ContactService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

onMounted(() => {
    ContactService.getContacts().then((data) => (products.value = data));
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteContactDialog = ref(false);
const deleteContactsDialog = ref(false);
const contact = ref({});
const selectedContacts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const inviteDialog = ref(false);
const submitted = ref(false);


const statuses = ref([
    { label: 'FRANCE', value: 'France' },
    { label: 'Guinée-Conakry', value: 'Guinée-Conakry' },
]);

const selecttedRole = ref([
    { label: 'PARTENAIRE', value: 'Partenaire' },
    { label: 'CLIENT', value: 'Client' },
    { label: 'Admin', value: 'Admin' },
    
]);


const role = ref([
    { label: 'Client', value: 'Client' },
    { label: 'Partenaire', value: 'Partenaire' },
    { label: 'Admin', value: 'Admin' },
]);


function formatCurrency(value) {
    if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
}

function openNew() {
    contact.value = {};
    submitted.value = false;
    productDialog.value = true;
}

function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}

function openNewInvite() {
    contact.value = {};
    submitted.value = false;
    inviteDialog.value = true;
}

function inviteContact() {
    inviteDialog.value = false;
    toast.add({ severity: 'success', summary: 'Succés', detail: 'Invitation envoyé', life: 3000 });
}


function hideDialogInvite() {
    inviteDialog.value = false;
    submitted.value = false;
}

function saveContact() {
    submitted.value = true;

    if (contact?.value.name?.trim()) {
        if (contact.value.id) {
            contact.value.inventoryStatus = contact.value.inventoryStatus.value ? contact.value.inventoryStatus.value : contact.value.inventoryStatus;
            products.value[findIndexById(contact.value.id)] = contact.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Contact Updated', life: 3000 });
        } else {
            contact.value.id = createId();
            contact.value.code = createId();
            contact.value.image = 'contact-placeholder.svg';
            contact.value.inventoryStatus = contact.value.inventoryStatus ? contact.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(contact.value);
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Contact Created', life: 3000 });
        }

        productDialog.value = false;
        contact.value = {};
    }
}

function editContact(prod) {
    contact.value = { ...prod };
    productDialog.value = true;
}

function confirmDeleteContact(prod) {
    contact.value = prod;
    deleteContactDialog.value = true;
}

function deleteContact() {
    products.value = products.value.filter((val) => val.id !== contact.value.id);
    deleteContactDialog.value = false;
    contact.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Contact Deleted', life: 3000 });
}


function findIndexById(id) {
    let index = -1;
    for (let i = 0; i < products.value.length; i++) {
        if (products.value[i].id === id) {
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
    deleteContactsDialog.value = true;
}

function deleteSelectedContacts() {
    products.value = products.value.filter((val) => !selectedContacts.value.includes(val));
    deleteContactsDialog.value = false;
    selectedContacts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Contacts Deleted', life: 3000 });
}

function getStatusLabel(status) {
    switch (status) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warn';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}
</script>

<template>
    <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nouveau" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNew" />
                    <Button label="Inviter" icon="pi pi-plus" severity="secondary" class="mr-2" @click="openNewInvite" />
                    <Button label="Supprimer" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedContacts || !selectedContacts.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

            <DataTable
                ref="dt"
                v-model:selection="selectedContacts"
                :value="products"
                dataKey="id"
                :paginator="true"
                :rows="10"
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Gestion Contacts</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="filters['global'].value" placeholder="Recherche..." />
                        </IconField>
                    </div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="code" header="Reference" sortable style="min-width: 12rem"></Column>
                <Column field="name" header="Name" sortable style="min-width: 16rem"></Column>
                <Column field="phone" header="Phone" sortable style="min-width: 16rem"></Column>
                <!-- <Column field="role" header="Role" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.role" :severity="getStatusLabel(slotProps.data.role)" />
                    </template>
                </Column> -->
                <Column field="inventoryStatus" header="Status" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        <Tag :value="slotProps.data.inventoryStatus" :severity="getStatusLabel(slotProps.data.inventoryStatus)" />
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editContact(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteContact(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>








        <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Contact Details" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <label for="nom" class="block font-bold mb-3">Nom</label>
                    <InputText id="nom" v-model.trim="contact.nom" required="true" autofocus :invalid="submitted && !contact.nom" fluid />
                    <small v-if="submitted && !contact.nom" class="text-red-500">Nom is required.</small>
                </div>

                <div>
                    <label for="prenom" class="block font-bold mb-3">Prenom</label>
                    <InputText id="prenom" v-model.trim="contact.prenom" required="true" autofocus :invalid="submitted && !contact.prenom" fluid />
                    <small v-if="submitted && !contact.prenom" class="text-red-500">prenom is required.</small>
                </div>

                <div>
                    <label for="phone" class="block font-bold mb-3">Téléphone</label>
                    <InputText id="phone" v-model.trim="contact.phone" required="true" autofocus :invalid="submitted && !contact.phone" fluid />
                    <small v-if="submitted && !contact.phone" class="text-red-500">phone is required.</small>
                </div>

                <div>
                    <label for="email" class="block font-bold mb-3">Email</label>
                    <InputText id="email" v-model.trim="contact.email" required="true" autofocus :invalid="submitted && !contact.email" fluid />
                    <small v-if="submitted && !contact.email" class="text-red-500">Email is required.</small>
                </div>

                <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Pays</label>
                    <Select id="inventoryStatus" v-model="contact.inventoryStatus" :options="statuses" optionLabel="label" placeholder="Select a Status" fluid></Select>
                    <small v-if="submitted && !contact.inventoryStatus" class="text-red-500">Pays is required.</small>
                </div>

                <div>
                    <label for="email" class="block font-bold mb-3">Adresse</label>
                    <InputText id="email" v-model.trim="contact.address" required="true" autofocus :invalid="submitted && !contact.address" fluid />
                    <small v-if="submitted && !contact.address" class="text-red-500">address is required.</small>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="code_postal" class="block font-bold mb-3">Code Postal</label>
                        <InputNumber id="code_postal" v-model="contact.code_postal" fluid />
                        <small v-if="submitted && !contact.code_postal" class="text-red-500">code_postal is required.</small>
                    </div>
                    <div class="col-span-6">
                        <label for="ville" class="block font-bold mb-3">Ville</label>
                        <InputText id="ville" v-model="contact.ville" integeronly fluid />
                        <small v-if="submitted && !contact.ville" class="text-red-500">Ville is required.</small>
                    </div>
                </div>
                <div>
                    <label for="inventoryStatus" class="block font-bold mb-3">Role</label>
                    <Select id="inventoryStatus" v-model="contact.role" :options="selecttedRole" optionLabel="label" placeholder="Select a Status" fluid></Select>
                    <small v-if="submitted && !contact.role" class="text-red-500">Pays is required.</small>
                </div>
            </div>

            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" @click="saveContact" />
            </template>
        </Dialog>




        <Dialog v-model:visible="inviteDialog" :style="{ width: '450px' }" header="Contact Details" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <label for="email" class="block font-bold mb-3">Email</label>
                    <InputText id="email" v-model.trim="contact.email" required="true" autofocus :invalid="submitted && !contact.email" fluid />
                    <small v-if="submitted && !contact.email" class="text-red-500">Email is required.</small>
                </div>

            </div>

            <template #footer>
                <Button label="Annuler" icon="pi pi-times" text @click="hideDialogInvite" />
                <Button label="Envoyer" icon="pi pi-check" @click="inviteContact" />
            </template>
        </Dialog>






        <Dialog v-model:visible="deleteContactDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="contact"
                    >Are you sure you want to delete <b>{{ contact.name }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteContactDialog = false" />
                <Button label="Yes" icon="pi pi-check" @click="deleteContact" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteContactsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="contact">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteContactsDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteSelectedContacts" />
            </template>
        </Dialog>
    </div>
</template>
