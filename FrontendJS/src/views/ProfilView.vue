<template>
    <main>
        <Navbar />
        <h2>{{ profil.music_style }}</h2>
            <p>{{ profil.groupe_name }}</p>
            <p>{{ profil.town }}</p>
            <p>{{ profil.country }}</p>
            <p>{{ profil.userId }}</p>
    </main>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
// @ts-ignore
import ApiService from "@/services/ApiService";
import Navbar from '../components/Navbar.vue';


interface Profil {
    music_style: string,
    groupe_name: string,
    town: string,
    country: string,
    userId: number
}

const profil = ref<Profil>({
    music_style:'',
    groupe_name:'',
    town:'',
    country:'',
    userId: 0,
})

const userId = ref<number>(0); 

onMounted(async () => {
    try {
        const authToken = localStorage.getItem("authToken");
        console.log("Token d'authentification :", authToken);
        if (!authToken) {
            console.error("L'utilisateur n'est pas authentifié.");
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
                Origin: "http://localhost:5173",
            },
        };

        userId.value = 1; 

        const response = await ApiService.get(`/profil/my-profil/${userId.value}`, config);
        profil.value = response.data;
        console.log(profil.value);
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
    }
});

const updateRole = async (userId: number) => {
    try {
        const authToken = localStorage.getItem('authToken');
        console.log("Token d'authentification :", authToken);
        if (!authToken) {
        console.error("L'utilisateur n'est pas authentifié.");
        return;
        }

        const config = {
        headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            Origin: "http://localhost:5173",
        },
        };


        await ApiService.put(`/profil/update-profil/1`, config);
        window.location.reload()
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
    };

</script>
