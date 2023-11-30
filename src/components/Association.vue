<script setup>
    const props = defineProps({
        association: {
            type: Object,
            required: true
        }
    })

    defineEmits([
        'delete-association'
    ])
</script>

<template>
    <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">{{ association.client.firstName }} {{ association.client.lastName }}</td>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">{{ association.product.name }}</td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
            <button
                @click="$emit('delete-association', association.id)"
                class="text-red-600 hover:text-red-900"
            >
                Desassociar
            </button>
        </td>
    </tr>
</template>
