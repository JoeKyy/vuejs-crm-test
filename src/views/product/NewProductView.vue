<script setup>
    import { useRouter } from 'vue-router'
    import { FormKit } from '@formkit/vue'
    import ProductService from '../../services/ProductService';
    import Heading from '../../components/ui/Heading.vue';
    import RouterLink from '../../components/ui/RouterLink.vue';

    const router = useRouter()

    defineProps({
        title: {
            type: String,
            required: true
        }
    })

    const handleSubmit = ( data ) => {
        data.status = 1
        ProductService.addProduct( data )
        .then( res => {
            console.log(res);
            router.push({ name: 'list-product' })
        })
        .catch( error => console.log(error))
    }
</script>

<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="list-product">
                Voltar
            </RouterLink>
        </div>
        <Heading>{{ title }}</Heading>

        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit
                    type="form"
                    :actions="false"
                    incomplete-message="Não é possivel salvar produto"
                    @submit="handleSubmit"
                >
                    <FormKit
                        type="text"
                        label="Nome"
                        name="name"
                        placeholder="Nome"
                        help="Escreva o nome do produto"
                        validation="required"
                        :validation-messages="{ required: 'Nome do produto é obrigatorio' }"
                        validation-visibility="blur"
                    />

                    <FormKit
                        type="submit"
                        label="Adicionar produto"
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