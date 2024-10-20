<script setup>
import { ref } from 'vue';

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
         <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl my-2">DSPAY-Ticket🚀</div>
         <div :style="{ height: '3px', background: 'linear-gradient(90deg, var(--primary-color) 0%, rgba(33, 150, 243, 0) 50%)' }"></div>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-8">
            <div class="mb-4 sm:mb-0">
                <span class="font-medium text-xl text-surface-900 dark:text-surface-0 mr-2">Code:</span>
                <span class="font-medium text-xl text-blue-500">DP-451234</span>
            </div>
            <div> 
                <Button label="Print" icon="pi pi-print" outlined></Button>
            </div>
        </div>
        <div class="rounded border-surface-200 dark:border-surface-700 border">
            
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

   
        
</template>
