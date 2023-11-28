<script setup>
    import { computed } from 'vue';
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        product: {
            type: Object,
            required: true
        }
    })

    defineEmits([
        'update-status',
        'delete-product'
    ])

    const statusProduct = computed( () => {
        return props.product.status
    })
</script>

<template>
    <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
            <p class="font-medium text-gray-900">{{ product.name }}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm">
            <button
                @click="$emit('update-status', { id: product.id, status: product.status })"
                class="inline-flex rounded-full px-2 text-xs font-semibold leading-5"
                :class="[ statusProduct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']"
            >
                {{ statusProduct ? 'Ativo' : 'Inativo' }}
            </button>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
            <RouterLink
                :to="{ name: 'edit-product', params: { id: product.id } }"
                class="text-indigo-600 hover:text-indigo-900 mr-5"
            >
                Editar
            </RouterLink>

            <button
                @click="$emit('delete-client', product.id)"
                class="text-red-600 hover:text-red-900"
            >
                Deletar
            </button>
        </td>
    </tr>
</template>