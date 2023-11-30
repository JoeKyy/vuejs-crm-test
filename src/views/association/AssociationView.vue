<script setup>
    import { onMounted, ref, computed } from 'vue'
    import AssociationService from '../../services/AssociationService'
    import ClientService from '../../services/ClientService'
    import ProductService from '../../services/ProductService'
    import Association from '../../components/Association.vue'
    import Heading from '../../components/ui/Heading.vue'
    import RouterLink from '../../components/ui/RouterLink.vue'

    defineProps({
        title: {
            type: String,
            required: true
        }
    })

    const associations = ref([])
    const clients = ref([]);
    const products = ref([]);

    const selectedClient = ref(null);
    const selectedProduct = ref(null);

    onMounted(() => {
        AssociationService.getAssociation()
        .then( ({ data }) => associations.value = data )
        .catch( error => console.log('Error', error));

        ProductService.getProduct()
        .then( ({ data }) => products.value = data )
        .catch( error => console.log('Error', error));

        ClientService.getClient()
        .then( ({ data }) => clients.value = data )
        .catch( error => console.log('Error', error))
    })

    const existAssociation = computed( () => {
        return associations.value.length > 0
    })

    const createAssociation = async () => {
        if (selectedClient.value && selectedProduct.value) {
            const data = {
                client: selectedClient.value,
                product: selectedProduct.value
            };

            try {
                const response = await AssociationService.addAssociation(data);
                associations.value.push(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    };


    const deleteAssociation = (id) => {
        AssociationService.deleteAssociation(id)
        .then( () => {
            associations.value = associations.value.filter(client => client.id !== id)
        })
        .catch(error => console.log(error))
    }
</script>

<template>
    <div>
        <div class="flex gap-4 justify-end">
            <RouterLink to="home">
                Voltar
            </RouterLink>
        </div>

        <Heading>{{ title }}</Heading>

        <div class="mx-auto">
            <div class="mt-4">
                <label for="client-select" class="block mb-2">Selecione o Cliente:</label>
                <select id="client-select" class="form-select mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" v-model="selectedClient">
                    <option v-for="client in clients" :key="client.id" :value="client">{{ client.firstName }} {{ client.lastName }}</option>
                </select>
            </div>

            <div class="mb-4">
                <label for="product-select" class="block mb-2">Selecione o Produto:</label>
                <select id="product-select" class="form-select mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" v-model="selectedProduct">
                    <option v-for="product in products" :key="product.id" :value="product">{{ product.name }}</option>
                </select>
            </div>

            <button
                class="block md:inline-block rounded bg-blue-600 py-2 px-3 text-white uppercase font-bold text-sm shadow hover:bg-blue-500y"
                @click="createAssociation">
                Associar Produto
            </button>
        </div>

        <div v-if="existAssociation" class="flow-root mx-auto  mt-10 mb-5 p-5 pb-5 bg-white shadow">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Cliente</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Produto</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Ações</th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <Association
                                v-for="association in associations"
                                :key="association.id"
                                :association="association"
                                @delete-association="deleteAssociation"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <p v-else class="text-center mt-10">Sem associações</p>
    </div>
</template>