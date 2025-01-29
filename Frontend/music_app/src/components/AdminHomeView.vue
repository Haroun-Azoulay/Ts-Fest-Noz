<template>
  <HeaderPage></HeaderPage>
  <section id="subheader" class="text-light" data-bgimage="url(/images-dj/background/subheader.jpg) bottom">
      <div class="center-y relative text-center">
          <div class="container">
              <div class="row">
                  
                  <div class="col-md-12 text-center">
                    <h1>Gestion des utilisateurs</h1>
                  </div>
                  <div class="clearfix"></div>
              </div>
          </div>
      </div>
    </section>
  <section>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
        <thead class="text-xs text-white uppercase bg-red-500 dark:text-white">
          <tr>
            <th scope="col" class="px-6 py-3">
              Nom
            </th>
            <th scope="col" class="px-6 py-3">
              Prénom
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Date de création
            </th>
            <th scope="col" class="px-6 py-3">
              Date de modification
            </th>
            <th scope="col" class="px-6 py-3">
              Role
            </th>
            <th scope="col" class="px-6 py-3">
              Pseudo
            </th>
            <th scope="col" class="px-6 py-3">
             Role
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-violet-600 border-b border-blue-400" v-for="user in users" :key="user">
            <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
              {{ user.lastname }}
            </th>
            <td class="px-6 py-4">
              {{ user.firstname }}
            </td>
            <td class="px-6 py-4">
              {{ user.email }}
            </td>
            <td class="px-6 py-4">
              {{ user.createdAt }}
            </td>
            <td class="px-6 py-4">
              {{ user.updatedAt }}
            </td>
            <td class="px-6 py-4">
              {{ user.role }}
            </td>
            <td class="px-6 py-4">
              {{ user.pseudo }}
            </td>
            <td class="px-6 py-4">
              <form @submit.prevent="updateRole(user.id)">
                <select v-model="userRoles[user.id]" class="text-black">
                  <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
                </select>
                <button type="submit" class="bg-red-500  hover:bg-red-600 text-white font-bold py-2 px-4 mx-2 rounded">
                  Modifier
                </button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <FooterPage/>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ApiService from "@/services/ApiService";
import HeaderPage from '../pages/Header/HeaderPage.vue';
import FooterPage from '../pages/Footer/FooterPage.vue';

const users = ref([]);

onMounted(async () => {
  const authToken = localStorage.getItem("authToken");
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

  try {
    const response = await ApiService.get("/all-users", config);
    users.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});


const roles = ['user', 'organizer', 'artist', 'admin'];

const userRoles = ref<Record<number, string>>({});

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

    const role = userRoles.value[userId];

    await ApiService.put(`/update-role/${userId}`, { newRole: role }, config);
    window.location.reload()
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
};

</script>
