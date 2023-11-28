<script setup>
    import { onMounted, reactive } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { FormKit } from '@formkit/vue'
    import ClientService from '../../services/ClientService';
    import Heading from '../../components/ui/Heading.vue';
    import RouterLink from '../../components/ui/RouterLink.vue';

    const route = useRoute()
    const router = useRouter()

    const { id } = route.params

    defineProps({
        title: {
            type: String,
            required: true
        }
    })

    const formData = reactive({})

    onMounted( () => {
        ClientService.getOneClient(id)
        .then( ({ data }) => Object.assign(formData, data))
        .catch( error => console.log(error))
    })

    const handleSubmit = ( data ) => {
        ClientService.updateClient(id, data)
        .then( () => router.push({ name: 'list-client'}))
        .catch( error => console.log(error))
    }
</script>

<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="list-client">
                Voltar
            </RouterLink>
        </div>
        <Heading>{{ title }}</Heading>

        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit
                    type="form"
                    :actions="false"
                    incomplete-message="Não é possivel salvar cliente"
                    @submit="handleSubmit"
                    :value="formData"
                >
                    <FormKit
                        type="text"
                        label="Nome"
                        name="firstName"
                        placeholder="Nome"
                        prefix-icon="avatarMan"
                        help="Escreva o nome do cliente"
                        validation="required"
                        :validation-messages="{ required: 'Nome do cliente é obrigatorio' }"
                        validation-visibility="blur"
                        v-model="formData.firstName"
                    />

                    <FormKit
                        type="text"
                        label="Sobrenome"
                        name="lastName"
                        placeholder="Sobrenome"
                        prefix-icon="avatarMan"
                        help="Escreva o sobrenome do cliente"
                        validation="required"
                        :validation-messages="{ required: 'Sobrenome do cliente é obrigatorio' }"
                        validation-visibility="blur"
                        v-model="formData.lastName"
                    />

                    <FormKit
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Email"
                        prefix-icon="email"
                        help="Escreva o email  do cliente"
                        validation="required|email"
                        :validation-messages="{ required: 'Email do cliente é obrigatorio', email: 'Email do cliente não é valido' }"
                        validation-visibility="blur"
                        v-model="formData.email"
                    />

                    <FormKit
                        type="text"
                        label="Documento"
                        name="document"
                        placeholder="Documento"
                        prefix-icon="tag"
                        help="Escreva o docuento do cliente"
                        validation="required"
                        :validation-messages="{ required: 'Documento do cliente é obrigatorio' }"
                        validation-visibility="blur"
                        v-model="formData.document"
                    />

                    <FormKit
                        type="text"
                        label="Telefone"
                        name="phone"
                        placeholder="Telefone do cliente"
                        prefix-icon="telephone"
                        help="Escreva o telefone do cliente"
                        v-model="formData.phone"
                    />

                    <FormKit
                        type="text"
                        label="Empresa"
                        name="company"
                        placeholder="Empresa do cliente"
                        prefix-icon="folder"
                        help="Escreva a empresa do cliente"
                        v-model="formData.company"
                    />

                    <FormKit
                        type="text"
                        label="Cargo"
                        name="position"
                        placeholder="Cargo do cliente"
                        prefix-icon="check"
                        help="Escreva o cargo do cliente"
                        v-model="formData.position"
                    />

                    <FormKit
                        type="submit"
                        label="Salvar"
                        prefix-icon="add"
                    />
                </FormKit>
            </div>

        </div>
    </div>
</template>


<style>
    .formkit-wrapper {
        max-width: 100%;
    }
</style>