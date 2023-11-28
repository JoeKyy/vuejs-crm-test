<script setup>
    //*** Route is only local, Router is for all app */
    import { useRouter } from 'vue-router'
    import { FormKit } from '@formkit/vue'
    import ClientService from '../services/ClientService';
    import Heading from '../components/ui/Heading.vue';
    import RouterLink from '../components/ui/RouterLink.vue';

    const router = useRouter()

    defineProps({
        title: {
            type: String,
            required: true
        }
    })

    const handleSubmit = ( data ) => {
        data.status = 1
        ClientService.addClient( data )
        .then( res => {
            console.log(res);
            router.push({ name: 'list-client' })
        })
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
                    />

                    <FormKit
                        type="text"
                        label="Telefone"
                        name="phone"
                        placeholder="Telefone do cliente"
                        prefix-icon="telephone"
                        help="Escreva o telefone do cliente"
                    />

                    <FormKit
                        type="text"
                        label="Empresa"
                        name="company"
                        placeholder="Empresa do cliente"
                        prefix-icon="folder"
                        help="Escreva a empresa do cliente"
                    />

                    <FormKit
                        type="text"
                        label="Cargo"
                        name="position"
                        placeholder="Cargo do cliente"
                        prefix-icon="check"
                        help="Escreva o cargo do cliente"
                    />

                    <FormKit
                        type="submit"
                        label="Adicionar cliente"
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