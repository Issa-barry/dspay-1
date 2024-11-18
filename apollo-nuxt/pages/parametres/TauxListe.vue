<script setup>
import { ref } from 'vue';

import InputNumber from 'primevue/inputnumber';
 
const radioValue = ref(null);
const deviseNom = ref(null);
const deviseTag = ref(null);

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

/****************************************/
 
import useTauxApi from '../../../service/useTauxApi';
// import useDevise  from '../../../service/useDevisesApi';
const { getAllTaux } = useTauxApi();
const tauxList = ref(null);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await getAllTaux();
    tauxList.value = response.data; // Assurez-vous que le backend renvoie bien un `data`
  } catch (err) {
    error.value = 'Erreur lors du chargement des taux.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
    <div class="card">
        <div>
            <h1>Liste des Taux de Change</h1>
            <div v-if="loading">Chargement...</div>
            <ul v-if="tauxList">
              <li v-for="taux in tauxList" :key="taux.id">
                {{ taux.devise_source.nom }} -> {{ taux.devise_cible.nom }} : {{ taux.taux }}
              </li>
            </ul>
            <p v-if="error">{{ error }}</p>
          </div>

          
        <Tabs value="0">
            <TabList>
                <Tab value="0">Taux</Tab>
                <Tab value="1">Devise</Tab>
                <Tab value="2">Notification</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="flex flex-auto justify-between ">
                        <div class="col-span-12 lg:col-span-6  text-surface-900 dark:text-surface-0 font-bold text-3xl mb-6 mt-2">
                             Gestion
                        </div>
                        <div class="col-span-12 lg:col-span-6">
                            <Button label="Sauvegarder" :fluid="false"></Button> 
                        </div>
                    </div>
                    <p class="leading-normal text-surface-600 dark:text-surface-200 p-0 mx-0 mt-0 mb-6">
                        Lors du paramétrage, vous devez sélectionner si les taux doivent être appliqués en pourcentage ou sous forme de montant fixe.
                    </p>

                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-12 lg:col-span-4">
                            <span class="text-surface-900 dark:text-surface-0 block mb-4 font-bold">Type de taux</span>
                            <ul class="list-none p-0 m-0 text-surface-600 dark:text-surface-200 mb-6">  
                                <li class="mb-2"> 
                                    <RadioButton id="option1" name="option" value="Chicago" v-model="radioValue" />
                                    <label for="option1" class="leading-none ml-2">Pourcentage</label>
                                </li>
                                <li class="mb-2"> 
                                    <RadioButton id="option2" name="option" value="Fixe" v-model="radioValue" />
                                    <label for="option2" class="leading-none ml-2">Montant fixe</label>
                                </li>
                             </ul>
                        </div>
                        <div class="col-span-12 lg:col-span-4">
                            <span class="text-surface-900 dark:text-surface-0 block mb-4 font-bold">Montant fixe</span>
                            <ul class="py-0 pl-4 m-0 text-surface-600 dark:text-surface-200 mb-4">
                                <li class="mb-4">Montant inferieur à 50 €. <InputNumber v-model="montantateInferieur50" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid /></li>
                                <li class="mb-4">Montant superieur à 50 €. <InputNumber v-model="montantateSuperieur50" inputId="currency-us" mode="currency" currency="USD" locale="en-US" fluid /></li>
                                <!-- <li class="mb-4 mt-8"><Button label="Sauvegarder" :fluid="false"></Button></li> -->
                            </ul>
                        </div>
                        <div class="col-span-12 lg:col-span-4">
                            <span class="text-surface-900 dark:text-surface-0 block mb-4 font-bold">Pourcentage %</span>
                            <ul class="py-0 pl-4 m-0 text-surface-600 dark:text-surface-200 mb-4">
                                <li class="mb-4">Montant inferieur à 50 €. <InputNumber v-model="pourcentateInferieur50" inputId="percent" prefix="%" fluid /></li>
                                <li class="mb-4">Montant supperieur à 50 €. <InputNumber v-model="pourcentateSuperieur50" inputId="percent" prefix="%" fluid /></li>
                             </ul>
                        </div>
                        <!--                         
                        <div class="col-span-12 lg:col-span-4">
                            <span class="text-surface-900 dark:text-surface-0 block mb-4 font-bold">Pourcentage %</span>
                            <ul class="list-none p-0 m-0 text-surface-600 dark:text-surface-200 mb-6">  
                                <li class="mb-4">Montant inferieur à 50 €. <InputNumber v-model="pourcentateInferieur50" inputId="percent" prefix="%" fluid /></li>
                                <li class="mb-4">Montant supperieur à 50 €. <InputNumber v-model="pourcentateSuperieur50" inputId="percent" prefix="%" fluid /></li>
                            </ul>
                        </div> -->
                    
                        
                    </div>
                </TabPanel>
                <TabPanel value="1">
                     <div class="flex flex-auto justify-between ">
                        <div class="col-span-12 lg:col-span-6  text-surface-900 dark:text-surface-0 font-bold text-3xl mb-6 mt-2">
                            Ajouter une devise Devise
                        </div>
                        <div class="col-span-12 lg:col-span-6">
                            <Button label="Sauvegarder" :fluid="false"></Button> 
                        </div>
                    </div>
                    <p class="leading-normal text-surface-600 dark:text-surface-200 p-0 mx-0 mt-0 mb-6">
                        Pour ajouter une devise, vous devez saisir son nom et ajouter un symbole (par exemple : €, $) comme tag.
                    </p>
                    <ul class="list-none p-0 m-0">
                        <li class="pb-8 border-b border-surface-200 dark:border-surface-700"> 
                            <div class="font-semibold text-xl mb-6">Nom de la devise</div> 
                            <div class="mx-0 mt-0 mt-2  text-surface-600 dark:text-surface-200 leading-normal">
                                <FloatLabel class="mb-6">
                                    <InputText id="username" type="text" v-model="deviseNom"  />
                                    <label for="username" >Exemple : euro</label>
                                </FloatLabel> 
                                <FloatLabel class="mt-6">
                                    <InputText id="username" type="text" v-model="deviseTag"  />
                                    <label for="username">Tag : €</label>
                                </FloatLabel> 
                            </div>
                         </li> 
                    </ul>
                </TabPanel>
                <TabPanel value="2">
                    <div class="text-surface-900 dark:text-surface-0 font-bold text-3xl mb-6 mt-2">Gestion des notification</div>
                    <p class="leading-normal text-surface-600 dark:text-surface-200 p-0 mx-0 mt-0 mb-6">
                        La gestion des notifications sera disponible dans une prochaine version de la plateforme FELLO.
                    </p>

                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-12 md:col-span-6">
                            <span class="text-surface-900 dark:text-surface-0 block font-bold mb-4">Shipping Costs</span>
                            <ul class="py-0 pl-4 m-0 text-surface-600 dark:text-surface-200 mb-4">
                                <li class="mb-2">Japan - JPY 2,500.</li>
                                <li class="mb-2">Europe - EUR 10</li>
                                <li class="mb-2">Switzerland - CHF 10</li>
                                <li class="mb-2">Canada - CAD 25</li>
                                <li class="mb-2">USA - USD 20</li>
                                <li class="mb-2">Australia - AUD 30</li>
                                <li class="mb-2">United Kingdom - GBP 10</li>
                            </ul>
                        </div>
                        <div class="col-span-12 md:col-span-6">
                            <span class="text-surface-900 dark:text-surface-0 block font-bold mb-4">Return Policy</span>
                            <p class="leading-normal text-surface-600 dark:text-surface-200 p-0 m-0">Pharetra et ultrices neque ornare aenean euismod elementum nisi. Diam phasellus vestibulum lorem sed. Mattis molestie a iaculis at.</p>
                        </div>
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>
