<template>
     
    <Toolbar class="mb-6">
        <template #start>
            <span class="font-semibold mr-12">Total : €320.00</span>
            <span class="font-semibold mr-12">Reste : €100.00</span>
            <span class="font-semibold mr-12">Partiel</span>
            <!-- <Button label="Supprimer" icon="pi pi-trash" severity="secondary" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
        </template>

        <template #end>
            <Button label="Telecharger" icon="pi pi-download" severity="succes" @click="generatePDF" />
            <Button label="Envoyer" icon="pi pi-send" severity="succes" @click="exportCSV($event)"  class="ml-4"/>
        </template>
    </Toolbar>

    <div class="card py-20 px-12 md:px-20 overflow-auto pdf-content" ref="pdfContent" >
        <div class="flex flex-col items-start md:flex-row md:items-center md:justify-between border-b border-surface-200 dark:border-surface-700 pb-8 min-w-max">
            <div class="flex flex-col">
                <svg width="48" height="50" viewBox="0 0 48 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M33.1548 9.65956L23.9913 4.86169L5.54723 14.5106L0.924465 12.0851L23.9913 0L37.801 7.23403L33.1548 9.65956ZM23.9931 19.3085L42.4255 9.65955L47.0717 12.0851L23.9931 24.1595L10.1952 16.9361L14.8297 14.5106L23.9931 19.3085ZM4.6345 25.8937L0 23.4681V37.9149L23.0669 50V45.1489L4.6345 35.4894V25.8937ZM18.4324 28.2658L0 18.6169V13.7658L23.0669 25.8403V40.2977L18.4324 37.8615V28.2658ZM38.7301 23.468V18.6169L24.9205 25.8403V49.9999L29.555 47.5743V28.2659L38.7301 23.468ZM43.3546 35.4892V16.1914L48.0008 13.7659V37.9148L34.1912 45.1488V40.2977L43.3546 35.4892Z"
                        fill="var(--p-primary-color)"
                    />
                </svg>
                <div class="my-4 text-4xl font-bold text-surface-900 dark:text-surface-0">FELLO</div>
                <span class="mb-2">5 allé du Foehn Ostwald</span>
                <span>67540, Strasbourg.</span>
            </div>
            <div class="flex flex-col mt-8 md:mt-0">
                <div class="text-2xl font-semibold text-left md:text-right mb-4">FACTURE</div>
                <div class="flex flex-col">
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-semibold mr-12">DATE</span>
                        <span>30/08/2024</span>
                    </div>
                    <div class="flex justify-between items-center mb-2">
                        <span class="font-semibold mr-12">N° #</span>
                        <span>8523</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-semibold mr-12">CLIENT</span>
                        <span>C1613</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 mb-20 flex flex-col">
            <div class="mb-4 text-2xl font-medium">FACTURE DE</div>
            <span class="mb-2">Elhadj Oumar TALL</span>
            <span>Guinée, Conakry, Cosa.</span>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full" :style="{ borderCollapse: 'collapse', tableLayout: 'auto' }">
                <thead>
                    <tr>
                        <th class="text-left font-semibold py-4 border-b border-surface-200 dark:border-surface-700 whitespace-nowrap">Description</th>
                        <th class="text-right font-semibold py-4 border-b border-surface-200 dark:border-surface-700 whitespace-nowrap px-4">Quantity</th>
                        <th class="text-right font-semibold py-4 border-b border-surface-200 dark:border-surface-700 whitespace-nowrap px-4">Type</th>
                        <th class="text-right font-semibold py-4 border-b border-surface-200 dark:border-surface-700 whitespace-nowrap">Montant</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-left py-4 border-b border-surface-200 dark:border-surface-700 whitespace-nowrap">Transfert</td>
                        <td class="text-right py-4 border-b border-surface-200 dark:border-surface-700 px-4">1</td>
                        <td class="text-right py-4 border-b border-surface-200 dark:border-surface-700 px-4">Standart</td>
                        <td class="text-right py-4 border-b border-surface-200 dark:border-surface-700">€ 332.00</td>
                    </tr>
                    <!-- <tr>
                        <td class="text-left py-4 border-b border-surface-200 dark:border-surface-700 whitespace-nowrap">Envoie</td>
                        <td class="text-right py-4 border-b border-surface-200 dark:border-surface-700 px-4">2</td>
                        <td class="text-right py-4 border-b border-surface-200 dark:border-surface-700 px-4">Orange-Monney</td>
                        <td class="text-right py-4 border-b border-surface-200 dark:border-surface-700">€198.00</td>
                    </tr> -->
                   
                </tbody>
            </table>
        </div>

        <div class="flex flex-col md:flex-row md:items-start md:justify-between mt-10">
            <div class=" mb-4 md:mb-0">
                <span class="font-semibold">NOTES</span>
                <p>Payez votre facture, j'ai faim.</p>
            </div>
            <div class="flex flex-col">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold mr-12">SOUS-TOTAL</span>
                    <span>€332.00</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold mr-12">TVA #</span>
                    <span>0%</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold mr-12">TOTAL</span>
                    <span>€332.00</span>
                </div>
                <hr>
                <div class="flex justify-between items-center mt-4">
                    <span class="font-semibold mr-12">Reste à payer</span>
                    <span>€102.00</span>
                </div>
            </div>
        </div>

        <div class="flex flex-col md:flex-row md:items-start md:justify-between mt-20">
            <div class=" mb-4 md:mb-0">
                <span class="font-semibold"></span>
                <!-- <p>Payer votre facture, j'ai faim.</p> -->
            </div>
            <div class="flex flex-col">
                <div class="mb-4 md:mb-0">
                    <span class="font-semibold">Détaille de paiement : </span>
                    <!-- <p>Payer votre facture, j'ai faim.</p> -->
                </div>
                <div class="flex justify-between items-center mb-2 mt-4">
                    <span class="font-semibold mr-12">25/10/2024</span>
                    <span class="font-semibold mr-12">éspece</span>
                    <span>€15.00</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold mr-12">01/11/2024</span>
                    <span class="font-semibold mr-12">orange</span>
                    <span>€15.00</span>
                </div>
                <div class="flex justify-between items-center mb-2">
                    <span class="font-semibold mr-12">15/12/2024</span>
                    <span class="font-semibold mr-12">virement</span>
                    <span>€15.00</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ProductService } from '@/service/ProductService';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';

import { useRouter } from 'vue-router';

const router = useRouter();


onMounted(() => {
    ProductService.getProducts().then((data) => (products.value = data));
});

const toast = useToast();
const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const submitted = ref(false);
const statuses = ref([
    { label: 'INSTOCK', value: 'instock' },
    { label: 'LOWSTOCK', value: 'lowstock' }, 
    { label: 'OUTOFSTOCK', value: 'outofstock' }
]);

function formatCurrency(value) {
    if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return;
}

function openNew() {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}

function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}

function saveProduct() {
    submitted.value = true;

    if (product?.value.name?.trim()) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            product.value.id = createId();
            product.value.code = createId();
            product.value.image = 'product-placeholder.svg';
            product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
            products.value.push(product.value);
            toast.add({ severity: 'success', summary: 'Succéss', detail: 'Retrait effectué avec succées', life: 3000 });
        }

        productDialog.value = false;
        product.value = {};
    }
}

function editProduct(prod) {
    product.value = { ...prod };
    productDialog.value = true;
}

function confirmDeleteProduct(prod) {
    product.value = prod;
    deleteProductDialog.value = true;
}

function deleteProduct() {
    products.value = products.value.filter((val) => val.id !== product.value.id);
    deleteProductDialog.value = false;
    product.value = {};
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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
    deleteProductsDialog.value = true;
}

function deleteSelectedProducts() {
    products.value = products.value.filter((val) => !selectedProducts.value.includes(val));
    deleteProductsDialog.value = false;
    selectedProducts.value = null;
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
}

function getStatusLabel(status) {
    switch (status) {
        case 'ACTIVE':
            return 'success';

        case 'FINIE':
            return 'success';

        case 'ATTENTE':
            return 'warn';

        case 'BLOQUE':
            return 'danger';

        default:
            return null;
    }
}

function navigateToTransfertCreate() {
    router.push({ name: 'transfert-create' });
}

function navigateToNouveauTransfertRetrait() {
    router.push({ name: 'transfert-retrait3' });
}

</script>