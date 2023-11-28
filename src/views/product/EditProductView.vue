<script setup>
    import { onMounted, reactive } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { FormKit } from '@formkit/vue'
    import ProductService from '../../services/ProductService';
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
        ProductService.getOneProduct(id)
        .then( ({ data }) => Object.assign(formData, data))
        .catch( error => console.log(error))
    })

    const handleSubmit = ( data ) => {
        ProductService.updateProduct(id, data)
        .then( () => router.push({ name: 'list-product'}))
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
                    :value="formData"
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
                        v-model="formData.name"
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