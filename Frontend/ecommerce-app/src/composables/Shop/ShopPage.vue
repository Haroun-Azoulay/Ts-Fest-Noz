<template>
    <div class="ecommerce-select-category row">
        <div class="col col-lg-3">
            <label>Groupe</label>
            <select class="form-select" @change="goodieFilter" v-model="filters.selectedGroup" aria-label="">
                <option selected value="null">Sélectionnez le groupe</option>
                <option v-for="group in allGroups" :key="group.name" :value="group.id">
                    {{ group.name }}
                </option>
            </select>
        </div>
        <div class="col col-lg-3">
            <label>Type</label>
            <select class="form-select" @change="goodieFilter" v-model="filters.selectedType" aria-label="">
                <option selected value="null">Sélectionnez le type</option>
                <option v-for="type in allGoodieTypes" :key="type.name" :value="type.id">
                    {{ type.name }}
                </option>
            </select>
        </div>
    </div>
    <div class="ecommerce-shop">
        <div class="ecommerce-cards" v-for="goodie in allGoodies">
            <div class="ecommerce-card card">
                <img :src="`http://0.0.0.0:3000/${goodie.path}`" alt="Goodie Image" />
                <div class="card-body ecommerce-card-body">
                    <h5 class="card-title" style="color:black;">{{ goodie.name }}</h5>
                    <h5 class="card-title" style="color:black;">{{ goodie.price }} €</h5>
                    <p class="card-text ecommerce-card-text-description" style="color:black;">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div class="row ecommerce-card-button">
                        <a :href="`/goodie-details/${goodie.id}`" class="col btn btn-info pl-0 pr-0"><i class="bi bi-three-dots"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useJwt } from '@vueuse/integrations/useJwt.mjs';
    import ApiService from '@/services/ApiService';
    import type { Group } from '../../../models/goup';
    import type { Goodie, GoodieType } from '../../../models/goodie';

    const isAdmin = ref(false);
    var allGoodieTypes = ref<GoodieType[]>([]);
    var allGroups = ref<Group[]>([]);
    var allGoodies = ref<Goodie[]>([]);

    var filters = ref({
        selectedGroup: 'null',
        selectedType: 'null'
    });

    const goodieFilter = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            var url = "";
            if (filters.value.selectedGroup === "null" && filters.value.selectedType === "null") {
                url = "/get-all-goodies"
            } else {
                url = `/get-filtered-goodies?selectedGroup=${filters.value.selectedGroup}&selectedType=${filters.value.selectedType}`;
            }
            const getAllGoodies = await ApiService.get(`${url}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            allGoodies.value = getAllGoodies.data;
        } catch (error) {
            console.error('Erreur lors de la requête avec filtres :', error);
        }
    }

    onMounted(async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const getAllGoodieTypes = await ApiService.get('/get-all-types', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            getAllGoodieTypes.data.forEach((type : GoodieType) => allGoodieTypes.value.push(type));
            const getAllGroups = await ApiService.get('/get-all-groups', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            getAllGroups.data.forEach((group : Group) => allGroups.value.push(group));

            const getAllGoodies = await ApiService.get('/get-all-goodies', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            allGoodies.value = getAllGoodies.data;
            if (authToken) {

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