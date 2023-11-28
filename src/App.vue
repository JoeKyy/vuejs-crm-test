<script setup>
    import { RouterView } from 'vue-router'
</script>

<template>
    <header class="bg-slate-800">
        <div class="container mx-auto px-4 max-w-6xl py-10">
            <h1 class="text-4xl font-extrabold text-white">
                CRM
            </h1>
        </div>
    </header>

    <main class="container max-w-6xl mx-auto mt-10 px-4">
        <RouterView />
    </main>
</template>

<style scoped>

</style>