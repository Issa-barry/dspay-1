<script setup>
import { onMounted, ref, watch } from 'vue';

const { getPrimary, getSurface, isDarkTheme } = useLayout();
const price = ref(0);
const chartData = ref(null);
const chartOptions = ref(null);
const payments = ref([
    { name: 'Electric Bill', amount: 75.6, paid: true, date: '06/04/2022' },
    { name: 'Water Bill', amount: 45.5, paid: true, date: '07/04/2022' },
    { name: 'Gas Bill', amount: 45.2, paid: false, date: '12/04/2022' },
    { name: 'Internet Bill', amount: 25.9, paid: true, date: '17/04/2022' },
    { name: 'Streaming', amount: 40.9, paid: false, date: '20/04/2022' }
]);

onMounted(() => {
    initChart();
});

function initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    chartData.value = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Income',
                data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
                fill: false,
                tension: 0.4,
                borderColor: documentStyle.getPropertyValue('--p-green-500')
            },
            {
                label: 'Expenses',
                data: [1200, 5100, 6200, 3300, 2100, 6200, 4500],
                fill: true,
                borderColor: '#6366f1',
                tension: 0.4,
                backgroundColor: 'rgba(99,102,220,0.2)'
            }
        ]
    };

    chartOptions.value = {
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }

                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

function formatCurrency(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

watch(
    [getPrimary, getSurface, isDarkTheme],
    () => {
        initChart();
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid grid-cols-12 gap-8"> 

        <div class="col-span-12 lg:col-span-6">
            <div class="card h-full">
                <div class="flex items-center justify-between mb-4">
                    <div class="text-surface-900 dark:text-surface-0 text-xl font-semibold">Membre de l'Agence</div>
                    <!-- <Button type="button" icon="pi pi-plus" label="Add New" size="small" outlined></Button> -->
                </div>
                <div class="flex flex-col gap-y-4">
                    <div class="flex flex-col lg:flex-row gap-4">
                        <div class="w-full lg:w-6/12 p-4 border rounded border-surface-200 dark:border-surface-700 flex items-center hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer border-radius">
                            <img alt="avatar" src="/demo/images/avatar/circle/avatar-m-11@2x.png" class="w-8 flex-shrink-0 mr-2" />
                            <span class="text-surface-900 dark:text-surface-0 text-lg font-medium">Moussa SIDIBE</span>
                        </div>
                        <div class="w-full lg:w-6/12 p-4 border rounded border-surface-200 dark:border-surface-700 flex items-center hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer border-radius">
                            <img alt="avatar" src="/demo/images/avatar/circle/avatar-f-2.png" class="w-8 flex-shrink-0 mr-2" />
                            <span class="text-surface-900 dark:text-surface-0 text-lg font-medium">Mariame SOW</span>
                        </div>
                    </div>
                    <div class="flex flex-col lg:flex-row gap-4">
                        <div class="w-full lg:w-6/12 p-4 border rounded border-surface-200 dark:border-surface-700 flex items-center hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer border-radius">
                            <img alt="avatar" src="/demo/images/avatar/circle/avatar-m-4@2x.png" class="w-8 flex-shrink-0 mr-2" />
                            <span class="text-surface-900 dark:text-surface-0 text-lg font-medium">Aliou DIALLO</span>
                        </div>
                        <div class="w-full lg:w-6/12 p-4 border rounded border-surface-200 dark:border-surface-700 flex items-center hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer border-radius">
                            <img alt="avatar" src="/demo/images/avatar/circle/avatar-m-7@2x-1.png" class="w-8 flex-shrink-0 mr-2" />
                            <span class="text-surface-900 dark:text-surface-0 text-lg font-medium">Mamdou BELLA BARRY</span>
                        </div>
                    </div>
                    <div class="flex flex-col lg:flex-row gap-4">
                        <div class="w-full lg:w-6/12 p-4 border rounded border-surface-200 dark:border-surface-700 flex items-center hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer border-radius">
                            <img alt="avatar" src="/demo/images/avatar/circle/avatar-f-7@2x.png" class="w-8 flex-shrink-0 mr-2" />
                            <span class="text-surface-900 dark:text-surface-0 text-lg font-medium">Aminata CAMARA</span>
                        </div>
                        <div class="w-full lg:w-6/12 p-4 border rounded border-surface-200 dark:border-surface-700 flex items-center hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer">
                            <img alt="avatar" src="/demo/images/avatar/circle/avatar-f-5@2x.png" class="w-8 flex-shrink-0 mr-2" />
                            <span class="text-surface-900 dark:text-surface-0 text-lg font-medium">Christine KAMANO</span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 mt-8">
                    <InputText type="text" placeholder="Email" fluid></InputText>
                    <Button type="button" label="Inviter"></Button>
                </div>
            </div>
        </div>

        <div class="col-span-12 lg:col-span-6">
            <div class="card">
                <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl my-2">Agence🚀</div>
                <div :style="{ height: '3px', background: 'linear-gradient(90deg, var(--primary-color) 0%, rgba(33, 150, 243, 0) 50%)' }"></div>
       
               <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between py-8">
                   <div class="mb-4 sm:mb-0">
                       <span class="font-medium text-xl text-surface-900 dark:text-surface-0 mr-2">Nom :</span>
                       <span class="font-medium text-xl text-blue-500">DSPAY-NABAYA</span>
                   </div>
                   <div> 
                       <Button label="Imprimer" icon="pi pi-print" outlined></Button>
                   </div>
               </div>
               <div class="rounded border-surface-200 dark:border-surface-700 border">
                   
               </div>
               <div class="flex flex-wrap mt-4 pb-4">
                   <div class="w-full lg:w-12/12 pl-4">  
                       <!-- <span class="font-medium text-surface-900 dark:text-surface-100">Géolocalisation :</span> -->
                       <div class="flex flex-col text-surface-900 dark:text-surface-0 mt-4 mb-4">
                        <ul class="list-none p-0 m-0 w-full">
                            <li class="mb-0">
                                <!-- <span class="font-medium text-surface-900 dark:text-surface-0">DSPAY-STRASBOURG</span> -->
                            </li>
                            <li class="flex justify-between mb-4">
                                <span class="text-surface-900 dark:text-surface-0">Pays  </span>
                                <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">Guinée-Conakry</span>
                            </li>
                            <li class="flex justify-between mb-4">
                                <span class="text-surface-900 dark:text-surface-0">Addresse  </span>
                                <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">Kankan Université</span>
                            </li>
                            <li class="flex justify-between mb-4">
                                <span class="text-surface-900 dark:text-surface-0">Telephone-agence</span>
                                <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">07 58 85 50 39</span>
                            </li>
                            <li class="flex justify-between mb-4">
                             <span class="text-surface-900 dark:text-surface-0">Email-agence</span>
                             <span class="text-surface-900 dark:text-surface-0 font-medium text-lg">ibra-strasbourg@dspay.fr</span>
                         </li>
                            <li class="border-t border-surface-200 dark:border-surface-700 py-4">
                                <span class="font-medium text-surface-900 dark:text-surface-0">Responssable</span>
                       <div class="flex flex-col text-surface-900 dark:text-surface-0 mt-4 mb-8">
                           <span class="mb-1 text-blue-500 ">Ibrahime BARRY</span>
                           <span class="mb-1">666 17 70 06</span> 
                           <span class="mb-1">ibrahim@gmail.com</span> 
                       </div>
                            </li>
                        </ul>
                       </div>
                   </div> 
               </div>
           </div>
        </div>
        <!-- <div class="col-span-12 lg:col-span-6">
            <div class="card">
                <div class="text-surface-900 dark:text-surface-0 text-xl font-semibold mb-4">Monthly Payments</div>

                <DataTable ref="dt" :value="payments" dataKey="id" :rows="5">
                    <template #empty> No products found.</template>
                    <Column field="name" header="Name" class="whitespace-nowrap w-4/12"> </Column>
                    <Column field="price" header="Amount" class="whitespace-nowrap w-4/12">
                        <template #body="{ data }">
                            {{ formatCurrency(data.amount) }}
                        </template>
                    </Column>
                    <Column field="date" header="Date" class="whitespace-nowrap w-4/12"> </Column>
                    <Column field="inventoryStatus" header="Status" class="whitespace-nowrap w-4/12 text-right">
                        <template #body="{ data }">
                            <Tag v-if="data.paid" value="COMPLETED" severity="success"></Tag>
                            <Tag v-else value="PENDING" severity="warn"></Tag>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div> -->
    </div>
</template>
