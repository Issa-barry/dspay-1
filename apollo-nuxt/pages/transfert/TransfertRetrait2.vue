<script setup>
import { ref } from 'vue';


const code = ref('DP-451234');
const isCodeEditable = ref(false);

// Fonction pour activer l'édition
function toggleEditCode() {
    isCodeEditable.value = true;
}

// Fonction pour valider et désactiver l'édition
function validateCode() {
    isCodeEditable.value = false;
    console.log("Code modifié:", code.value); // Affiche le code modifié dans la console ou faites une autre action si nécessaire
}

const products = ref([
    {
        name: 'Cotton Sweatshirt',
        size: 'Medium',
        color: 'White',
        price: '$12',
        quantity: '1',
        image: '/demo/images/ecommerce/ordersummary/order-summary-1-1.png'
    },
    {
        name: 'Regular Jeans',
        size: 'Large',
        color: 'Black',
        price: '$24',
        quantity: '1',
        image: '/demo/images/ecommerce/ordersummary/order-summary-1-2.png'
    }
]);
</script>

<template>
    <div class="card">
        <!-- <span class="text-surface-700 dark:text-surface-100 text-xl">FELLO !</span> -->
        <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl my-2">DSPAY-Ticket🚀</div>
        <!-- <p class="text-surface-700 dark:text-surface-100 text-xl mt-0 mb-6 p-0">Your order is on the way. It&lsquo;ll be shipped today. We&lsquo;ll inform you.</p> -->
        <div :style="{ height: '3px', background: 'linear-gradient(90deg, var(--primary-color) 0%, rgba(33, 150, 243, 0) 50%)' }"></div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-8">
            <div class="mb-4 sm:mb-0 flex items-center">
                <span class="font-medium text-xl text-surface-900 dark:text-surface-0 mr-2">Code:</span>
                <InputText 
                    v-if="isCodeEditable" 
                    v-model="code" 
                    class="font-medium text-xl text-blue-500 mr-2"
                />
                <span 
                    v-else 
                    class="font-medium text-xl text-blue-500 mr-2"
                >
                    {{ code }}
                </span>
                <!-- Bouton pour rendre le champ modifiable -->
                <Button 
                    icon="pi pi-pencil" 
                    class="p-button-rounded p-button-secondary mr-2" 
                    v-if="!isCodeEditable" 
                    @click="toggleEditCode"
                />
                <!-- Bouton pour valider la modification -->
                <Button 
                    icon="pi pi-check" 
                    class="p-button-rounded p-button-success" 
                    v-if="isCodeEditable" 
                    @click="validateCode"
                />
            </div>
            <div>
                <!-- <Button label="Details" icon="pi pi-list" class="mr-2" outlined></Button> -->
                <Button label="Print" icon="pi pi-print" outlined></Button>
            </div>
        </div>
        <div class="rounded border-surface-200 dark:border-surface-700 border">
            <!-- <ul class="list-none p-0 m-0">
                <li v-for="(product, i) in products" :key="i" class="p-4 border-surface-200 dark:border-surface-700 flex items-start sm:items-center" :class="{ 'border-bottom-1': i !== products.length - 1 }">
                     <div class="flex flex-col">
                        <span class="text-surface-900 dark:text-surface-0 font-semibold text-xl mb-2">
                               Test
                        </span>
                        <span class="text-surface-700 dark:text-surface-100 font-medium mb-4"> {{ product.color }} | {{ product.size }} </span>
                        <span class="text-surface-900 dark:text-surface-0 font-medium">Quantity: {{ product.quantity }}</span>
                    </div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium text-lg ml-auto">{{ product.price }}</span>
                </li>
            </ul> -->
        </div>
        <div class="flex flex-wrap mt-8 pb-4">
            <div class="w-full lg:w-6/12 pl-4">
                <span class="font-medium text-surface-900 dark:text-surface-0">Receveur</span>
                <div class="flex flex-col text-surface-900 dark:text-surface-0 mt-4 mb-8">
                    <span class="mb-1">Alpha Ousmane BARRY</span>
                    <span class="mb-1">666 17 70 06</span> 
                </div>

                <span class="font-medium text-surface-900 dark:text-surface-0">Agence</span>
                <div class="flex items-center mt-4">
                    <!-- <img src="/demo/images/ecommerce/ordersummary/visa.png" class="w-16 mr-4" alt="visa" /> -->
                    <div class="flex flex-col">
                        <span class="text-surface-900 dark:text-surface-0 mb-1">Nongo</span>
                        <span class="text-surface-900 dark:text-surface-0 font-medium">621 58 74 69</span>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-6/12 pl-4 lg:pl-0 lg:pr-4 flex items-end mt-8 lg:mt-0">
                <ul class="list-none p-0 m-0 w-full">
                    <li class="mb-4">
                        <span class="font-medium text-surface-900 dark:text-surface-0">Expediteur</span>
                    </li>
                    <li class="flex justify-between mb-4">
                        <span class="text-surface-900 dark:text-surface-0">Nom complet </span>
                        <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">Issa BARRY</span>
                    </li>
                    <li class="flex justify-between mb-4">
                        <span class="text-surface-900 dark:text-surface-0">Telephone</span>
                        <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">07 58 85 50 39</span>
                    </li>
                    <li class="flex justify-between mb-4">
                        <span class="text-surface-900 dark:text-surface-0">Montant envoyé</span>
                        <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">€ 100</span>
                    </li>
                    <li class="flex justify-between mb-4">
                        <span class="text-surface-900 dark:text-surface-0">Frais</span>
                        <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">€ 5</span>
                    </li>
                    <li class="flex justify-between border-t border-surface-200 dark:border-surface-700 py-4">
                        <span class="text-surface-900 dark:text-surface-0 font-medium">Total</span>
                        <span class="text-surface-900 dark:text-surface-0 font-bold text-lg">€ 105</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <!-- <div class="card">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <span class="text-2xl font-medium text-surface-900 dark:text-surface-0">Thanks for your order!</span>
            <div class="flex mt-4 sm:mt-0">
                <div class="flex flex-col items-center">
                    <span class="text-surface-900 dark:text-surface-0 font-medium mb-2">Order ID</span>
                    <span class="text-surface-700 dark:text-surface-100">451234</span>
                </div>
                <div class="flex flex-col items-center ml-12 md:ml-20">
                    <span class="text-surface-900 dark:text-surface-0 font-medium mb-2">Order Date</span>
                    <span class="text-surface-700 dark:text-surface-100">7 Feb 2023</span>
                </div>
            </div>
        </div>
        <div class="flex flex-col md:flex-row md:items-center border-b border-surface-200 dark:border-surface-700 py-8">
            <img src="/demo/images/ecommerce/ordersummary/order-summary-2-1.png" class="w-60 flex-shrink-0 md:mr-12" alt="summary-1-2" />
            <div class="flex-auto mt-4 md:mt-0">
                <span class="text-xl text-surface-900 dark:text-surface-0">Product Name</span>
                <div class="font-medium text-2xl text-surface-900 dark:text-surface-0 mt-4 mb-8">Order Processing</div>
                <div class="rounded overflow-hidden bg-surface-300 dark:bg-surface-500 mb-4" :style="{ height: '7px' }">
                    <div class="bg-primary text-primary-contrast rounded w-4/12 h-full"></div>
                </div>
                <div class="flex w-full justify-between">
                    <span class="text-surface-900 dark:text-surface-0 text-xs sm:text-base">Ordered</span>
                    <span class="text-surface-900 dark:text-surface-0 font-medium text-xs sm:text-base">Processing</span>
                    <span class="text-surface-500 dark:text-surface-300 text-xs sm:text-base">Shipping</span>
                    <span class="text-surface-500 dark:text-surface-300 text-xs sm:text-base">Delivered</span>
                </div>
            </div>
        </div>
        <div class="py-8 flex justify-between flex-wrap">
            <div class="flex sm:mr-8 mb-8">
                <span class="font-medium text-surface-900 dark:text-surface-0 text-xl mr-20">Product Name</span>
                <span class="text-surface-900 dark:text-surface-0 text-xl">$21.00</span>
            </div>
            <div class="flex flex-col sm:mr-8 mb-8">
                <span class="font-medium text-surface-900 dark:text-surface-0 text-xl">Shipping Address</span>
                <div class="flex flex-col text-surface-900 dark:text-surface-0 mt-4">
                    <span class="mb-1">Celeste Slater</span>
                    <span class="mb-1">606-3727 Ullamcorper. Roseville NH 11523</span>
                    <span>(786) 713-8616</span>
                </div>
            </div>
            <div class="flex flex-col">
                <span class="font-medium text-surface-900 dark:text-surface-0 text-xl">Agence</span>
                <div class="flex items-center mt-4">
                    <img src="/demo/images/ecommerce/ordersummary/visa.png" class="w-16 mr-4" alt="visa-2" />
                    <div class="flex flex-col">
                        <span class="text-surface-900 dark:text-surface-0 mb-1">Agence</span>
                        <span class="text-surface-900 dark:text-surface-0 font-medium">Nongo : 621 58 96 32</span>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
</template>
