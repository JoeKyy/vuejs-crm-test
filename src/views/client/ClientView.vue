<script setup>
    import { onMounted, ref, computed } from 'vue'
    import ClientService from '../../services/ClientService'
    import Client from '../../components/Client.vue'
    import Heading from '../../components/ui/Heading.vue'
    import RouterLink from '../../components/ui/RouterLink.vue'

    defineProps({
        title: {
            type: String,
            required: true
        }
    })

    const clients = ref([])

    onMounted(() => {
        ClientService.getClient()
        .then( ({ data }) => clients.value = data )
        .catch( error => console.log('Error', error))
    })

    const existClient = computed( () => {
        return clients.value.length > 0
    })

    const updateStatus = ({id, status }) => {
        ClientService.changeStatus(id, {status: !status})
        .then( () => {
            const i = clients.value.findIndex( client => client.id === id)
            clients.value[i].status = !status
        })
        .catch( error => console.log(error))
    }

    const deleteClient = (id) => {
        ClientService.deleteClient(id)
        .then( () => {
            clients.value = clients.value.filter(client => client.id !== id)
        })
        .catch(error => console.log(error))
    }
</script>

<template>
    <div>
        <div class="flex gap-4 justify-end">
            <RouterLink to="add-client">
                Adicionar clientes
            </RouterLink>
            <RouterLink to="home">
                Voltar
            </RouterLink>
        </div>

        <Heading>{{ title }}</Heading>

        <div v-if="existClient" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nome</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Ações</th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <Client
                                v-for="client in clients"
                                :key="client.id"
                                :client="client"
                                @update-status="updateStatus"
                                @delete-client="deleteClient"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <p v-else class="text-center mt-10">Sem clientes</p>
    </div>
</template>