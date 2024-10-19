<script setup>
import { ref } from 'vue';

import InputNumber from 'primevue/inputnumber';
 

const radioValue = ref(null);
const deviseNom = ref(null);
const deviseTag = ref(null);
const date = ref();

const pourcentateInferieur50 = ref(0);
const pourcentateSuperieur50 = ref(0);
const montantateInferieur50 = ref(0);
const montantateSuperieur50 = ref(0);
 
const selectedImageIndex = ref(0);
const liked = ref(false);
const quantity = ref(1);
const color = ref('bluegray');
const size = ref('M');
const images = ref(['product-overview-3-1.png', 'product-overview-3-2.png', 'product-overview-3-3.png', 'product-overview-3-4.png']);

function setColor(val) {
    color.value = val;
}

function setSize(val) {
    size.value = val;
}

function setSelectedImageIndex(index) {
    selectedImageIndex.value = index;
}
</script>

<template>
    <div class="card">
        <div class="col-span-12 lg:col-span-6  text-surface-900 dark:text-surface-0 font-bold text-3xl mb-6 mt-2">
            Profile
       </div>
        <Tabs value="0">
            <TabList>
                <Tab value="0">Informations</Tab>
                <Tab value="1">Adresse</Tab>
                <Tab value="2">Authentification</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="flex flex-auto justify-between ">
                        <!-- <div class="col-span-12 lg:col-span-6  text-surface-900 dark:text-surface-0 font-bold text-3xl mb-6 mt-2">
                            Informations
                       </div> -->
                       <div class="col-span-12 lg:col-span-6  text-surface-900 dark:text-surface-0">
                        <p class="leading-normal text-surface-600 dark:text-surface-200 p-0 mx-0 mt-0 mb-6">
                           Vous pouvez mettre à jour vos informations personnel.
                        </p>
                       </div>
                        <div class="col-span-12 lg:col-span-6">
                            <Button label="Sauvegarder" :fluid="false"></Button> 
                        </div>
                    </div>
                  

                    <div class="grid grid-cols-12 gap-4">
                       
                        <div class="col-span-12 lg:col-span-6">
                            <span class="text-surface-900 dark:text-surface-0 block mb-4 ">Informations personnel</span> 
                        </div>
                        <div class="col-span-12 lg:col-span-4">
                            <!-- <span class="text-surface-900 dark:text-surface-0 block mb-4 font-bold">Pourcentage %</span> -->
                            <ul class="py-0 pl-4 m-0 text-surface-600 dark:text-surface-200 mb-4">
                                <li class="mb-4">Nom <InputText    fluid/></li>
                                <li class="mb-4">Prénom <InputText    fluid/></li>
                                <li class="mb-4">Email <InputText    fluid/></li>
                                <li class="mb-4">Téléphone <InputText    fluid /></li>
                                <li class="mb-4">Date de naissance <DatePicker  v-model:model-value="date"  fluid placeholder="date de naissance"/></li>
                            </ul>
                        </div> 
                    </div>
                </TabPanel>
                <TabPanel value="1">
                    <div class="flex flex-auto justify-between ">
                        <div class="col-span-12 lg:col-span-6   mb-6 mt-2">
                            <p class="leading-normal text-surface-600 dark:text-surface-200 p-0 mx-0 mt-0 mb-6">
                                Vous pouvez modifier votre adresse sur cette page.
                            </p>
                        </div>
                        <div class="col-span-12 lg:col-span-6">
                            <Button label="Sauvegarder" :fluid="false"></Button> 
                        </div>
                    </div>
                   

                    <div class="grid grid-cols-12 gap-4">
                       
                        <div class="col-span-12 lg:col-span-6">
                            <span class="text-surface-900 dark:text-surface-0 block mb-4 ">Addresse</span> 
                        </div>
                        <div class="col-span-12 lg:col-span-4">
                            <!-- <span class="text-surface-900 dark:text-surface-0 block mb-4 font-bold">Pourcentage %</span> -->
                            <ul class="py-0 pl-4 m-0 text-surface-600 dark:text-surface-200 mb-4">
                                <li class="mb-4">Pays <InputText    fluid /></li>
                                <li class="mb-4">Adresse <InputText    fluid /></li> 
                                <li class="mb-4">Code_postale <InputText    fluid /></li>
                                <li class="mb-4">Ville <InputText    fluid /></li>
                            </ul>
                        </div> 
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div class="flex flex-auto justify-between ">
                        <div class="col-span-12 lg:col-span-6  text-surface-900 dark:text-surface-0 font-bold text-3xl mb-6 mt-2">
                             <!-- Informations -->
                        </div>
                        <div class="col-span-12 lg:col-span-6">
                            <Button label="Sauvegarder" :fluid="false"></Button> 
                        </div>
                    </div>
                    <!-- <p class="leading-normal text-surface-600 dark:text-surface-200 p-0 mx-0 mt-0 mb-6">
                        Lors du paramétrage, vous devez sélectionner si les taux doivent être appliqués en pourcentage ou sous forme de montant fixe.
                    </p> -->

                    <div class="grid grid-cols-12 gap-4">
                       
                        <div class="col-span-12 lg:col-span-6">
                            <span class="text-surface-900 dark:text-surface-0 block mb-4 ">Changer de mot de passe</span> 
                        </div>
                        <div class="col-span-12 lg:col-span-4">
                            <!-- <span class="text-surface-900 dark:text-surface-0 block mb-4 font-bold">Pourcentage %</span> -->
                            <ul class="py-0 pl-4 m-0 text-surface-600 dark:text-surface-200 mb-4">
                                <li class="mb-4">Mot de passe actuelle *<InputText    fluid/></li>
                                <li class="mb-4">Nouveau mot de passe *<InputText    fluid/></li>
                                <li class="mb-4">Confirmer mot de passe *<InputText    fluid/></li>
                             </ul>
                        </div> 
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
