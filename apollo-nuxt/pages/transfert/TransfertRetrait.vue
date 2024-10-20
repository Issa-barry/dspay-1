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

// Informations Expéditeur, Receveur et Agent
const expediteurTel = ref('');
const expediteurEmail = ref('');
const expediteurNom = ref('');
const expediteurPrenom = ref('');
const receveurTel = ref('');
const receveurNom = ref('');
const receveurPrenom = ref('');
const agentNom = ref('');
const agentPrenom = ref('');
const agentTel = ref('');
const payerFrais = ref(true);  // Variable pour switch frais
const tva = 0; // TVA en pourcentage

// Génération aléatoire d'un code de 6 caractères (chiffres et lettres)
function generateCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const showPopup = ref(false); // Pour afficher la pop-up
const randomCode = ref('');   // Stocke le code aléatoire généré
const isEditable = ref(false); // Pour rendre le champ "Code" modifiable

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

// Fonction pour rendre le champ "Code" modifiable
function toggleEdit() {
    isEditable.value = true; // Activer l'édition
}

// Fonction pour valider le code
function validerCode() {
    console.log('Code validé:', receveurTel.value);
    isEditable.value = false; // Désactiver l'édition après validation
}
</script>

<template>
    <Fluid>
        <div class="flex flex-col md:flex-row gap-8">
            <!-- Formulaire de saisie -->
            <div class="md:w-1/2">
                <div class="card flex flex-col gap-4"> 
                    <div class="font-semibold text-xl mt-8">Retrait</div>
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex flex-wrap gap-2 w-full items-center">
                            <label for="receveurTel" class="mr-2">Code</label>
                            <InputText id="receveurTel" v-model="receveurTel" type="text" :readonly="!isEditable" />
                            <!-- Bouton pour rendre le champ modifiable -->
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-secondary ml-2" @click="toggleEdit" />
                            <!-- Bouton pour valider, grisé tant que le champ n'est pas modifiable -->
                            <Button icon="pi pi-check" class="p-button-rounded p-button-success ml-2" @click="validerCode" :disabled="!isEditable" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Section récapitulative -->
            <div class="md:w-1/2">
                <div class="card p-4">
                    <h2 class="font-semibold text-xl mb-4">Détaille du transfert</h2>

                 

                    <div class="mb-4 flex justify-between mt-4">
                        <span class="font-semibold">Receveur :</span>
                        <span>Alpha Ousmane BARRY ( +33 7 58 85 50 39 )</span>
                        <!-- <span>{{ receveurNom }} {{ receveurPrenom }} ({{ receveurTel }})</span> -->
                    </div>
                    <div class="mb-4 flex justify-between mt-4">
                        <span class="font-semibold">Montant à recevoir en GNF :</span>
                        <span>GNF 970 000</span>
                        <!-- <span>GNF {{ montantGNF }} </span> -->
                    </div>
                    <hr>
                    <div class="mb-4 flex justify-between mt-4">
                        <span class="font-semibold">Expéditeur :</span>
                        <span>Issa BARRY ( +33 7 58 85 50 39 )</span>
                        <!-- <span>{{ expediteurNom }} {{ expediteurPrenom }} ({{ expediteurEmail }}, {{ expediteurTel }})</span> -->
                    </div>
                    <div class="mb-4 flex justify-between mt-4">
                        <span class="font-semibold">Montant envoyé en € :</span>
                        <span>€ 100 {{ montantEuro }}</span>
                    </div>

                    
                    <div class="mb-4 flex justify-between">
                        <span class="font-semibold">Frais :</span>
                        <span>{{ frais }} € 5 </span>
                    </div>


                    <div class="mb-4 flex justify-between mt-4">
                        <span class="font-semibold">Total à payer :</span>
                        <span> € 105 </span>
                        <!-- <span>{{ totalAvecFrais }} €</span> -->
                    </div>
                    <hr>
                    <div class="mb-4 flex justify-between mt-4">
                        <span class="font-semibold ">Agent :</span>
                        <span>Ibrahim BARRY ( +33 7 58 85 50 39 )</span>
                        <!-- <span>{{ agentNom }} {{ agentPrenom }} ({{ agentTel }})</span> -->
                    </div>

                    <Button label="Valider-retrait" class="p-button-success mt-4" @click="valider" />
                </div>
            </div>
        </div>

        <!-- Pop-up pour afficher le récapitulatif final et le code aléatoire -->
        <Dialog header="Ticket" v-model:visible="showPopup" modal style="width: 50vw;">
            <!-- Informations de l'expéditeur -->
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Expéditeur :</span>
                <span>{{ expediteurNom }} {{ expediteurPrenom }} ({{ expediteurEmail }}, {{ expediteurTel }})</span>
            </div>
            
            <!-- Informations du receveur -->
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Receveur :</span>
                <div>{{ receveurNom }} {{ receveurPrenom }} ({{ receveurTel }})</div>
            </div>

            <!-- Montant à récupérer -->
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Montant à récupérer en GNF :</span>
                <span>{{ montantGNF }}</span>
            </div>

            <!-- Informations de l'agent -->
            <div class="mb-4 flex justify-between">
                <span class="font-semibold">Agent :</span>
                <span>{{ agentNom }} {{ agentPrenom }} ({{ agentTel }})</span>
            </div>

            <div class="mt-4 font-semibold text-center">Code de transaction : {{ randomCode }}</div>
        </Dialog>
    </Fluid>
</template>
