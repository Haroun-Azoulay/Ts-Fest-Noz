<template>
    <div class="ecommerce-select-category row">
        <div class="col col-lg-3">
            <label>Groupe</label>
            <select class="form-select" aria-label="">
                <option selected value="none">Sélectionnez le groupe</option>
                <option v-for="group in allGroups" :key="group.name" :value="group.id">
                    {{ group.name }}
                </option>
            </select>
        </div>
        <div class="col col-lg-3">
            <label>Type</label>
            <select class="form-select" aria-label="">
                <option selected value="none">Sélectionnez le type</option>
                <option v-for="type in allGoodieTypes" :key="type.name" :value="type.id">
                    {{ type.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useJwt } from '@vueuse/integrations/useJwt';
import ApiService from '@/services/ApiService';

const isLoggedIn = ref(false);
const isAdmin = ref(false);
var allGoodieTypes = ref<GoodieType[]>([]);
var allGroups = ref<Group[]>([]);

interface GoodieType {
  id: string;
  name: string;
}

interface Group {
    id: string;
    name: string;
}

onMounted(async () => {
    try {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            const getAllGoodieTypes = await ApiService.get('/goodietype/get-all-types', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            getAllGoodieTypes.data.forEach((type : GoodieType) => allGoodieTypes.value.push(type));

            const getAllGroups = await ApiService.get('/group/get-all-groups', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            getAllGroups.data.forEach((group : Group) => allGroups.value.push(group));

            const { payload } = useJwt(authToken);
            const roleId = payload.value?.role;

            if (roleId === 'admin') {
                isAdmin.value = true;
            }
        }
    } catch (error) {
        console.error('Erreur lors de la requête :', error);
    }
});
</script>