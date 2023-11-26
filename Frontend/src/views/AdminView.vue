    <template>
        <Navbar />

        <div v-if="isAdmin">
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
                    <thead class="text-xs text-white uppercase bg-blue-600 dark:text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Utilisateur
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Pseudo
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-blue-500 border-b border-blue-400" v-for="user in users" :key="user.id">
                            <th scope="row" class="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100">
                                {{ user.user }}
                            </th>
                            <td class="px-6 py-4">
                                {{ user.pseudo }}
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
                                <form @submit.prevent="updateRole(user.id)">
          <select v-model="userRoles[user.id]" class="text-black">
            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
          </select>
          <button type="submit" class="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
            Update
          </button>
        </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else>
            <p>Vous n'êtes pas un administrateur.</p>
        </div>
    </template>
    <script setup lang="ts">
    import { ref, onMounted } from "vue";
    import Navbar from '../components/Navbar.vue';
    // @ts-ignore
    import ApiService from "@/services/ApiService";
    import { stringLiteral } from "@babel/types";

    interface User {
        id: number;
        user: string;
        pseudo: string;
        email: string;
        role: string;
        createdAt: string;
        updatedAt: string;

    }
    

    const roles = ['user', 'moderator', 'artist', 'admin'];

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

        await ApiService.put(`/admin/update-role/${userId}`, { newRole: role }, config);
        window.location.reload()
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
    }
    };

    const users = ref<User[]>([]); 
    const isAdmin = ref<boolean>(false);



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
                    Origin: "http://localhost:9000",
                },
            };

            const response = await ApiService.get("/admin/all-users", config);
            isAdmin.value = response.data.some((user: any) => user.role === 'admin');
            users.value = response.data;
            response.data.forEach((user: any) => {
      userRoles.value[user.id] = user.role;
    });
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        }
    });

    </script>