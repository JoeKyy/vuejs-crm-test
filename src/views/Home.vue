<script setup>
    import RouterLink from '../components/ui/RouterLink.vue'

    defineProps({
        title: {
            type: String,
            required: true
        }
    })
</script>

<template>
    <div class="flex flex-wrap gap-4 pt-4 justify-center items-center">
        <RouterLink to="list-client">
            Clientes
        </RouterLink>
        <RouterLink to="list-product">
            Produtos
        </RouterLink>
        <RouterLink to="list-association">
            Associações
        </RouterLink>
    </div>
</template>