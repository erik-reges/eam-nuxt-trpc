<template>
    <q-menu
        :offset="[0, 16]"
        position="top bottom"
        transition-show="jump-down"
        transition-hide="jump-up"
    >
        <q-card flat class="full-width">
            <q-card-section class="q-pa-sm">
                <q-list>
                    <q-item
                        v-close-popup
                        v-for="item of items"
                        :key="item.id"
                        clickable
                        class="rounded-borders"
                        :active="activeId === item.id"
                        :active-class="$style.active"
                        @click="$emit('select', item.id)"
                    >
                        <q-item-section side>
                            <q-btn
                                padding="0"
                                style="border-radius: 8px; margin-left: -8px"
                            >
                                <q-avatar size="30px" rounded>
                                    <img
                                        v-if="item.logoUrl"
                                        :src="item.logoUrl"
                                    />
                                </q-avatar>
                            </q-btn>
                        </q-item-section>
                        <q-item-section>{{ item.label }}</q-item-section>
                        <q-item-section side v-if="item.caption">
                            <q-item-label caption>{{
                                item.caption
                            }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
    </q-menu>
</template>

<script setup lang="ts">
type ItemId = any;

defineEmits<{
    select: [id: ItemId];
}>();

defineProps<{
    items: {
        label: string;
        id: ItemId;
        caption?: string;
        logoUrl?: string | null;
    }[];
    activeId: ItemId | null;
}>();
</script>

<style lang="scss" module>
.active {
    color: black;
    background: rgba($primary, 0.1);
}
</style>
