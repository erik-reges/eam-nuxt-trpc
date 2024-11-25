<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useUserStore } from "~/stores/user";
import { buttonStyle } from "~/common/styleProps";

definePageMeta({
    layout: "empty",
    title: "Login",
});

const { t } = useI18n();
const selectedOwnerId = ref<string | null>(null);
const userStore = useUserStore();

const owners = computed(() => {
    return userStore.owners
        .filter((x) => x.active)
        .map((x) => ({
            label: x.displayName,
            id: x.owner,
            logoUrl: x.logoUrl,
        }));
});

const selectedOwner = computed(() => {
    return owners.value.find((x) => x.id === selectedOwnerId.value);
});
</script>

<template>
    <div class="flex items-center fullscreen justify-center">
        <div class="flex items-center fullscreen justify-center">
            <q-card flat style="width: 320px">
                <q-card-section class="flex items-center">
                    <!-- <img src="/src/assets//logo.svg" width="40" class="q-ml-sm" /> -->
                    <div class="text-weight-bolder text-h5">EAM</div>
                    <q-separator vertical class="q-mx-md" />
                    <h5 class="q-my-sm" style="line-height: 16px">
                        {{ t("commons.login") }}
                    </h5>
                </q-card-section>

                <q-card-section>
                    <q-btn
                        ripple
                        outline
                        color="grey-4"
                        square
                        class="full-width"
                        style="border-radius: 8px"
                        padding="4px 12px 4px 4px"
                        no-caps
                    >
                        <q-btn padding="0" style="border-radius: 8px">
                            <q-avatar size="48px" rounded>
                                <img
                                    v-if="selectedOwner?.logoUrl"
                                    :src="selectedOwner.logoUrl"
                                />
                                <q-icon
                                    v-else
                                    name="mdi-arrow-right"
                                    color="grey-6"
                                    size="sm"
                                />
                            </q-avatar>
                        </q-btn>
                        <span
                            v-if="selectedOwner"
                            class="text-body2 text-black text-weight-medium"
                            style="flex: 1"
                            >{{ selectedOwner?.label }}</span
                        >
                        <span
                            v-else
                            class="text-body2 text-grey-8 text-weight-medium"
                            style="flex: 1"
                        >
                            {{ t("commons.choose_customer") }}
                        </span>
                        <AppCustomMenuSelect
                            cover
                            self="center middle"
                            :items="owners"
                            :active-id="selectedOwnerId"
                            @select="(id: string) => (selectedOwnerId = id)"
                        />
                    </q-btn>
                </q-card-section>

                <q-slide-transition>
                    <q-card-section v-if="selectedOwner" class="q-pa-none">
                        <div class="q-pa-md">
                            <q-btn
                                v-bind="buttonStyle"
                                :to="`sso/${selectedOwner.id}`"
                                >SSO</q-btn
                            >
                            <q-btn v-bind="buttonStyle" disable
                                >User/Password</q-btn
                            >
                        </div>
                    </q-card-section>
                </q-slide-transition>
            </q-card>
        </div>
    </div>
</template>
