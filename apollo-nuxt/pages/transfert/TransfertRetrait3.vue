<script setup>
import { CountryService } from '../../service/CountryService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const value = ref('');
const quantities = ref([1, 1, 1]);
const checked = ref(true);
const checked2 = ref(true);
const selectedCountry = ref(null);
const countries = ref([]);

onMounted(() => {
    CountryService.getCountries().then((data) => (countries.value = data));
});

function navigateToTransfertListe() {
    router.push({ name: 'transfert-liste' });
}

</script>

<template>
    <div class="card">
        <div class="grid grid-cols-12 gap-4 grid-nogutter">
            <div class="col-span-12 px-2 mt-0 md:mt-6 md:px-12">
                <span class="text-surface-900 dark:text-surface-0 block font-bold text-xl">Retrait</span>
            </div>
            <div class="col-span-12 lg:col-span-6 h-full px-6 py-6 md:px-12"> 
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 mb-12">
                        <span class="text-surface-900 dark:text-surface-0 text-2xl block font-medium mb-2">Code</span>
                        <div class="py-2 mt-0 border-surface-200 dark:border-surface-700">
                            <InputGroup class="mt-4">
                                <InputText type="text" v-model="value" placeholder="code" class="w-full" />
                                <Button  type="button" icon="pi pi-check" :disabled="!value"></Button>
                             </InputGroup>
                        </div>
                    </div> 
                </div>
            </div>

            <div class="col-span-12 lg:col-span-6 px-6 py-6 md:px-12">
                <!-- <div class="pb-4 border-surface-200 dark:border-surface-700">
                    <span class="text-surface-900 dark:text-surface-0 font-medium text-xl">Informations de retrait</span>
                </div> -->
                <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl my-2">Ticket</div>
                <div :style="{ height: '3px', background: 'linear-gradient(90deg, var(--primary-color) 0%, rgba(33, 150, 243, 0) 50%)' }"></div>
                <div class="mb-4 mt-6 sm:mb-0">
                    <span class="font-medium text-xl text-surface-900 dark:text-surface-0 mr-2">Code:</span>
                    <span class="font-medium text-xl text-blue-500">DP-451234</span>
                </div>
                <!-- <div class="flex flex-col lg:flex-row flex-wrap lg:items-center py-2 mt-4 border-surface-200 dark:border-surface-700">
                    <div class="flex-auto lg:ml-4">
                       <div class="text-surface-600 dark:text-surface-200 text-sm mb-4">Veuillez saisir 1 code de retrait</div>
                    </div>
               </div>  -->
                <div class="flex flex-col lg:flex-row flex-wrap lg:items-center py-2 mt-4 border-surface-200 dark:border-surface-700">
                    <div class="flex-auto lg:ml-4">
                       <div class="flex items-center justify-between mb-4">
                           <span class="text-surface-900 dark:text-surface-0 font-bold">Receveur</span>
                           <span class="text-surface-900 dark:text-surface-0 font-bold">GNF 967 000</span>
                       </div>
                       <div class="text-surface-600 dark:text-surface-200 text-sm mb-4">Alpha Ousmane BARRY</div>
                       <div class="text-surface-600 dark:text-surface-200 text-sm mb-4">+224 666 17 70 06</div>
                   </div>
               </div>
               <div class="flex flex-col lg:flex-row flex-wrap lg:items-center py-2 mt-4 border-surface-200 dark:border-surface-700">
                <div class="flex-auto lg:ml-4">
                   <div class="flex items-center justify-between mb-4">
                       <span class="text-surface-900 dark:text-surface-0 font-bold">Expediteur</span>
                       <span class="text-surface-900 dark:text-surface-0 font-bold">France</span>
                   </div>
                   <div class="text-surface-600 dark:text-surface-200 text-sm mb-4">Issa BARRY</div>
                   <div class="text-surface-600 dark:text-surface-200 text-sm mb-4">+33 7 58 85 50 39</div>
               </div>
           </div>
               
                <div class="py-2 mt-4">
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-surface-900 dark:text-surface-0 font-medium">Montant envoyé</span>
                        <span class="text-surface-900 dark:text-surface-0">€100</span>
                    </div>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-surface-900 dark:text-surface-0 font-medium">Frais</span>
                        <span class="text-primary font-bold">€5</span>
                    </div>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-surface-900 dark:text-surface-0 font-bold">Total</span>
                        <span class="text-surface-900 dark:text-surface-0 font-medium text-xl">€105</span>
                    </div>
                </div>
              
 
                    <div class="grid grid-cols-12 gap-4"> 
                        <div class="col-span-12 flex flex-col lg:flex-row justify-center items-center lg:justify-end my-8">
                             <Button class="w-full   order-1 lg:order-2" label="Valider" icon="pi pi-fw pi-check"></Button>
                        </div>
                    </div> 
            </div>
        </div>
    </div>
</template>
