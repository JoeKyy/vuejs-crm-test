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
    <div class="flex justify-center items-center">
        <div class="flex gap-4">
            <RouterLink>
                Adicionar cliente
            </RouterLink>
            <RouterLink>
                Listar clientes
            </RouterLink>
        </div>
    </div>
</template>