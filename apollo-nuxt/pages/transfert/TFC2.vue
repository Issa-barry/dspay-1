<script setup>
import { ref, computed } from 'vue';

// Variables réactives pour chaque champ
const montantEuro = ref('');
const montantGNF = computed(() => {
    const euroValue = parseFloat(montantEuro.value) || 0;
    const gnfValue = euroValue * 9670;
    return gnfValue.toLocaleString('fr-FR').replace(/\s/g, ' '); // Formatage avec espaces
});

const frais = computed(() => {
    const euroValue = parseFloat(montantEuro.value) || 0;
    if (euroValue > 100) {
        return Math.floor(euroValue / 50) * 5; // Frais croissant par tranche de 50 €
    } else if (euroValue > 50) {
        return 5;
    } else {
        return 2.5;
    }
});

const expediteurTel = ref('');
const expediteurEmail = ref('');
const expediteurNom = ref('');
const expediteurPrenom = ref('');
const receveurTel = ref('');
const receveurNom = ref('');
const receveurPrenom = ref('');
const payerFrais = ref(true);  // Variable pour switch frais
const tva = 0; // TVA en pourcentage

// Génération aléatoire d'un code de 6 caractères (chiffres et lettres)
function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const showPopup = ref(false); // Pour afficher la pop-up
const randomCode = ref('');   // Stocke le code aléatoire généré

// Calcul TVA
const montantTVA = computed(() => {
    const euroValue = parseFloat(montantEuro.value) || 0;
    return (euroValue * tva / 100).toFixed(2);
});

// Calcul total
const totalAvecFrais = computed(() => {
    const euroValue = parseFloat(montantEuro.value) || 0;
    const fraisValue = payerFrais.value ? frais.value : 0;
    return (euroValue + parseFloat(montantTVA.value) + fraisValue).toFixed(2);
});

// Fonction pour afficher la pop-up au clic sur "Valider"
function valider() {
    randomCode.value = generateCode(); // Générer un code aléatoire
    showPopup.value = true; // Afficher la pop-up
}
</script>
<template>
    <Fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <!-- Formulaire de saisie -->
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4">
                    <!-- MONTANT -->
                    <div class="font-semibold text-xl mt-8">Montant à envoyer ?</div>
                    <div class="flex flex-col md:flex-row gap-4 mb-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="montantEuro">Montant en €</label>
                            <InputText id="montantEuro" v-model="montantEuro" type="text" />
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="montantGNF">Montant en GNF</label>
                            <InputText id="montantGNF" :value="montantGNF" type="text" />
                        </div>
                    </div>

                    <!-- RECEVEUR -->
                    <div class="font-semibold text-xl mt-0">Receveur ?</div>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="receveurTel">Téléphone</label>
                            <InputText id="receveurTel" v-model="receveurTel" type="text" />
                        </div>
                    </div>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="receveurNom">Nom</label>
                            <InputText id="receveurNom" v-model="receveurNom" type="text" />
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="receveurPrenom">Prénom</label>
                            <InputText id="receveurPrenom" v-model="receveurPrenom" type="text" />
                        </div>
                    </div>

                    <!-- EXPEDITEUR -->
                    <div class="font-semibold text-xl mt-4">Expéditeur ?</div>
                    <div class="flex flex-col md:flex-row gap-4 ">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="expediteurTel">Téléphone</label>
                            <InputText id="expediteurTel" v-model="expediteurTel" type="text" />
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="expediteurEmail">Email</label>
                            <InputText id="expediteurEmail" v-model="expediteurEmail" type="text" />
                        </div>
                    </div>

                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="expediteurNom">Nom</label>
                            <InputText id="expediteurNom" v-model="expediteurNom" type="text" />
                        </div>
                        <div class="flex flex-wrap gap-2 w-full">
                            <label for="expediteurPrenom">Prénom</label>
                            <InputText id="expediteurPrenom" v-model="expediteurPrenom" type="text" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section récapitulative -->
            <div class="md:w-1/2">
                <div class="card p-4">
                    <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl my-2">DSPAY-Ticket🚀</div>
                    <div :style="{ height: '3px', background: 'linear-gradient(90deg, var(--primary-color) 0%, rgba(33, 150, 243, 0) 50%)' }"></div>

                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-8">
                        <div class="mb-4 sm:mb-0">
                            <span class="font-medium text-xl text-surface-900 dark:text-surface-0 mr-2">Code:</span>
                            <span class="font-medium text-xl text-blue-500">{{ randomCode }}</span>
                        </div>
                        <div> 
                            <Button label="Print" icon="pi pi-print" outlined></Button>
                        </div>
                    </div>

                    <div class="rounded border-surface-200 dark:border-surface-700 border p-4">
                        <div class="flex flex-wrap mt-8 pb-4">
                            <div class="w-full lg:w-6/12 pl-4">
                                <span class="font-medium text-surface-900 dark:text-surface-0">Receveur</span>
                                <div class="flex flex-col text-surface-900 dark:text-surface-0 mt-4 mb-8">
                                    <span class="mb-1">{{ receveurNom }} {{ receveurPrenom }}</span>
                                    <span class="mb-1">{{ receveurTel }}</span>
                                </div>

                                <span class="font-medium text-surface-900 dark:text-surface-0">Agence</span>
                                <div class="flex items-center mt-4">
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
                                        <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">{{ expediteurNom }} {{ expediteurPrenom }}</span>
                                    </li>
                                    <li class="flex justify-between mb-4">
                                        <span class="text-surface-900 dark:text-surface-0">Telephone</span>
                                        <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">{{ expediteurTel }}</span>
                                    </li>
                                    <li class="flex justify-between mb-4">
                                        <span class="text-surface-900 dark:text-surface-0">Montant envoyé</span>
                                        <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">€ {{ montantEuro }}</span>
                                    </li>
                                    <li class="flex justify-between mb-4">
                                        <span class="text-surface-900 dark:text-surface-0">Frais</span>
                                        <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">€ {{ frais }}</span>
                                    </li>
                                    <li class="flex justify-between border-t border-surface-200 dark:border-surface-700 py-4">
                                        <span class="text-surface-900 dark:text-surface-0 font-medium">Total</span>
                                        <span class="text-surface-900 dark:text-surface-0 font-bold text-lg">€ {{ totalAvecFrais }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fluid>
</template>
