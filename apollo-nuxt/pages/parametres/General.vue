

<template>
    <div class="card">
         
        <Tabs value="0">
            <TabList>
                <Tab value="0">Taux</Tab>
                <Tab value="1">Frais</Tab>
                <Tab value="2">Devise</Tab>
                <Tab value="3">Notification</Tab>
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <div class="flex flex-auto justify-between ">
                        <div class="col-span-12 lg:col-span-6  text-surface-900 dark:text-surface-0 font-bold text-3xl mb-6 mt-2">
                             Gestion
                        </div>
                        <div class="col-span-12 lg:col-span-6">
                            <Button label="Sauvegarder" :fluid="false"  @click="addTaux" :disabled="!deviseSourceId || !deviseCibleId || !tauxValeur"></Button> 
                        </div>
                    </div>
                    <p class="leading-normal text-surface-600 dark:text-surface-200 p-0 mx-0 mt-0 mb-6">
                        Lors du paramétrage, vous devez sélectionner si les taux doivent être appliqués en pourcentage ou sous forme de montant fixe.
                    </p>

                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-12 lg:col-span-3">
                          <!-- Devise source -->
                          <ul class="py-0 pl-4 m-0 text-surface-600 dark:text-surface-200 mb-4">
                            <li class="mb-4">
                              Devise source
                              <InputDropdown v-model="deviseSourceId" :options="deviseOptions" optionLabel="name" optionValue="id" placeholder="Choisir la devise source" fluid />
                            </li>
                          </ul>
                        </div>
                        
                        <div class="col-span-12 lg:col-span-3">
                          <!-- Devise cible -->
                          <ul class="py-0 pl-4 m-0 text-surface-600 dark:text-surface-200 mb-4">
                            <li class="mb-4">
                              Devise cible
                              <InputDropdown v-model="deviseCibleId" :options="deviseOptions" optionLabel="name" optionValue="id" placeholder="Choisir la devise cible" fluid />
                            </li>
                          </ul>
                        </div>
                    
                        <div class="col-span-12 lg:col-span-2">
                          <!-- Valeur -->
                          <ul class="py-0 pl-4 m-0 text-surface-600 dark:text-surface-200 mb-4">
                            <li class="mb-4">
                              Valeur
                              <InputNumber v-model="tauxValeur" />
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div class="col-span-12 lg:col-span-6">
                        <div class="card">
                            <div class="text-surface-900 dark:text-surface-0 text-xl font-semibold mb-4">Dévises : </div>
            
                            <DataTable ref="dt" :value="tauxList" dataKey="id" :rows="5">
                                <template #empty> No products found.</template>
                                <Column field="devise_source.nom" header="devise_source" class="whitespace-nowrap w-4/12"> </Column>
                                <Column field="devise_cible.nom" header="devise_cible" class="whitespace-nowrap w-4/12">
                                </Column>
                                <Column field="taux" header="valeur" class="whitespace-nowrap w-4/12"> 
                                    <template #body="{ data }">
                                      {{ formatTaux(data.taux) }} {{ data.devise_cible.tag }}
                                    </template>
                                </Column>
                                
                                <Column header="Action" :exportable="false" style="min-width: 12rem">
                                    <template #body="slotProps">
                                        <!-- <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" /> -->
                                        <Button icon="pi pi-eye"   rounded class="mr-2" @click="editProduct(slotProps.data)" />
                                        <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel value="1">
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


                <TabPanel value="2">
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

               

                <TabPanel value="3">
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

<script setup>
import { ref } from 'vue';
import InputNumber from 'primevue/inputnumber';
import InputDropdown from 'primevue/dropdown';
import Button from 'primevue/button';


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

/**********************************************************/
import useTauxApi from '../../../service/useTauxApi';
const { 
    getAllTaux,
    getTauxByDevises,
    createTaux,
    deleteTaux
   } = useTauxApi();

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

// Méthode pour formater le taux
function formatTaux(taux) {
  return Number(taux).toFixed(0); // Garantit un format à 2 décimales
}


// Variables réactives pour le formulaire
const deviseSourceId = ref(null);  // ID de la devise source
const deviseCibleId = ref(null);   // ID de la devise cible
const tauxValeurRaw = ref('');
const tauxValeur = computed({
  get: () => (tauxValeurRaw.value === '' ? 0 : Number(tauxValeurRaw.value)),
  set: (val) => (tauxValeurRaw.value = val),
});

const deviseOptions = ref([
  { id: 1, name: 'FRANC-GUINEEN' },
  { id: 2, name: 'EUR' },
  { id: 3, name: 'DOLLAR' },
]);


// // Fonction pour créer le taux
async function addTaux() {
  if (deviseSourceId.value && deviseCibleId.value && tauxValeur.value) {
    const payload = {
      devise_source_id: deviseSourceId.value,
      devise_cible_id: deviseCibleId.value,
      taux: tauxValeur.value
    };

    try {
      const response = await createTaux(payload);  // Appel à l'API avec les données formatées
      deviseSourceId.value = null;
      deviseCibleId.value = null;
      tauxValeur.value = 0;
      await getAllTaux();
    } catch (error) {
        console.log('Erreur lors de la création du taux');
    }
  } else {
    console.log('Veuillez remplir tous les champs');
  }
}
</script>