<template>
    <div class="card">
        <DataTable
            v-model:expandedRows="expandedRows"
            :value="factures"
            :filters="filters"
            :globalFilterFields="['name', 'phone', 'price', 'factureStatus', 'orderIds', 'orderDates', 'orderAmounts', 'orderTypes']"
            dataKey="id"
            tableStyle="min-width: 60rem"
            :paginator="true"
            :rows="10"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Affichage de {first} à {last} sur {totalRecords} factures"
        >
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Paiement" icon="pi pi-money-bill" severity="secondary" class="mr-2" @click="navigateToNouveauTransfertRetrait" />
                </template>
                <template #end>
                    <Button label="Filtre" icon="pi pi-filter" severity="success" />
                </template>
            </Toolbar>

            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <h4 class="m-0 font-semibold text-lg">Vos Factures :</h4>
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Rechercher..." />
                    </IconField>
                </div>
            </template>

            <Column expander style="width: 5rem" />
            <Column field="name" header="Client" sortable></Column>
            <Column field="phone" header="Téléphone" sortable></Column>
            <Column field="price" header="Montant" sortable>
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.price) }}
                </template>
            </Column>
            <Column field="factureStatus" header="Status" sortable>
                <template #body="slotProps">
                    <Tag :value="slotProps.data.factureStatus" :severity="getSeverity(slotProps.data)" />
                </template>
            </Column>
            <Column header="Action" headerStyle="width:4rem">
                <template #body="slotProps">
                    <!-- <Button icon="pi pi-eye" @click="openFactureDetaille(slotProps.data)" /> -->
                    <Button icon="pi pi-eye" @click="navigateToFactureAffichage" />
                </template>
            </Column>

            <template #expansion="slotProps">
                <div class="p-4">
                    <h5>Reste à payer : {{ formatCurrency(slotProps.data.price - getTotalPaid(slotProps.data.orders)) }}</h5>
                    <DataTable :value="slotProps.data.orders">
                        <Column field="id" header="Id" sortable></Column>
                        <Column field="date" header="Date" sortable></Column>
                        <Column field="amount" header="Montant réglé" sortable>
                            <template #body="orderSlot">
                                {{ formatCurrency(orderSlot.data.amount) }}
                            </template>
                        </Column>
                        <Column field="typePaiement" header="Type" sortable>
                            <template #body="orderSlot">
                                <Tag :value="orderSlot.data.typePaiement.toLowerCase()" :severity="getOrderTypePaiement(orderSlot.data)" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </template>
        </DataTable>
        <Toast />

        <!-- Boîte de dialogue pour détails de paiement -->
        <Dialog v-model:visible="factureDialog" :style="{ width: '600px' }" header="Détails de la Facture" :modal="true">
            <div class="flex flex-col gap-6">
                <div>
                    <label for="name" class="block font-bold mb-3">Nom du Client</label>
                    <InputText id="name" v-model.trim="selectedFacture.name" required="true" autofocus fluid />
                </div>
                <div>
                    <label for="phone" class="block font-bold mb-3">Téléphone</label>
                    <InputText id="phone" v-model="selectedFacture.phone" required="true" fluid />
                </div>
                <div>
                    <label for="amount" class="block font-bold mb-3">Montant Total</label>
                    <InputText id="amount" v-model="selectedFacture.price" :disabled="true" fluid />
                </div>
                <div>
                    <label for="factureStatus" class="block font-bold mb-3">Status de la Facture</label>
                    <Dropdown id="factureStatus" v-model="selectedFacture.factureStatus" :options="['Payé', 'Partiel', 'Brouillon']" fluid />
                </div>
                <div>
                    <h5>Reste à payer : {{ formatCurrency(selectedFacture.price - getTotalPaid(selectedFacture.orders)) }}</h5>
                    <DataTable :value="selectedFacture.orders">
                        <Column field="id" header="Id" sortable></Column>
                        <Column field="date" header="Date" sortable></Column>
                        <Column field="amount" header="Montant réglé" sortable>
                            <template #body="orderSlot">
                                {{ formatCurrency(orderSlot.data.amount) }}
                            </template>
                        </Column>
                        <Column field="typePaiement" header="Type" sortable>
                            <template #body="orderSlot">
                                <Tag :value="orderSlot.data.typePaiement.toLowerCase()" :severity="getOrderTypePaiement(orderSlot.data)" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>

            <template #footer>
                <Button label="Annuler" icon="pi pi-times" text @click="hideDialog" />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import { FactureService } from '@/service/FactureService';
import { FilterMatchMode } from '@primevue/core/api';
import {useRouter} from '#vue-router'

const router =  useRouter();

const factures = ref([]);
const expandedRows = ref({});
const toast = useToast();
const selectedFacture = ref({});
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const getTotalPaid = (orders) => {
    return orders.reduce((total, order) => total + order.amount, 0);
};

const formatCurrency = (value) => {
    return value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
};

const getSeverity = (facture) => {
    switch (facture.factureStatus) {
        case 'Payé':
            return 'success';
        case 'Partiel':
            return 'info';
        case 'Brouillon':
            return 'danger';
        default:
            return null;
    }
};

const getOrderTypePaiement = (order) => {
    switch (order.typePaiement) {
        case 'Espèce':
            return 'info';
        case 'Carte':
            return 'primary';
        case 'Chèque':
            return 'warning';
        default:
            return 'secondary';
    }
};

const factureDialog = ref(false);

function openFactureDetaille(facture) {
    selectedFacture.value = { ...facture };
    factureDialog.value = true;
}

function hideDialog() {
    factureDialog.value = false;
}

onMounted(() => {
    FactureService.getFacturesWithOrdersSmall().then((data) => {
        factures.value = data;
    });
});

function navigateToFactureDetaille() {
    router.push({name:'facturation-detaille'})
}

function navigateToFactureAffichage() {
    router.push({name:'facturation-affichage'})
}
</script>
