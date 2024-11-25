<script setup lang="ts">
import { useTRPC } from "~/composables/useTRPC";

const trpc = useTRPC();
const { data } = trpc.hello.useQuery({ text: "tanstack" });
</script>

<template>
    <div>
        <q-card class="my-card">
            <q-card-section>
                <div v-if="data">{{ data.greeting }}</div>
                <q-spinner v-else color="primary" />
            </q-card-section>
        </q-card>
    </div>
</template>
