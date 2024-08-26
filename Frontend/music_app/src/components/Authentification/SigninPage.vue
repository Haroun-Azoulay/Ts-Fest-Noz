signinpage.vue:<template>
    <ModalConfirm v-model="show" title="Erreur" @confirm="confirm">
        <p>{{ errorMessage }}</p>
    </ModalConfirm>
    <div class="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <div class="px-16 bg-white rounded-2xl shadow-md flex flex-col justify-center items-center gap-1"
            style="height: 60rem">
            <a href="/" class="flex items-center justify-center mb-8">
                <img src="../../assets/images/logo.png" style="height: 200px">
            </a>
            <div class="font-semibold mb-8 text-2xl">
                Connexion
            </div>
            <div class="w-96 h-24 px-2.5 pt-2.5 flex-col justify-start items-start gap-1 flex mb-8">
                <label class="w-96 text-gray-800 text-sm font-medium leading-tight">Votre Pseudo</label>
                <input
                    class="self-stretch h-11 p-4 bg-white rounded-lg border border-neutral-400 text-sm leading-tight bg-slate-50"
                    placeholder="Saisissez votre pseudo" v-model="request.pseudo" />
            </div>
            <div class="w-96 h-24 px-2.5 pb-2.5 flex-col justify-start items-start gap-2.5 flex">
                <label class="w-96 text-gray-800 text-sm font-medium leading-tight">Mot de passe</label>
                <input
                    class="self-stretch h-11 p-4 bg-white rounded-lg border border-neutral-400 text-sm leading-tight bg-slate-50"
                    id="password" type="password" placeholder="********" v-model="request.password" />
            </div>
            <button
                :class="['w-80 h-12 px-12 py-2.5 rounded-lg flex justify-center items-center gap-2.5 mb-8 mt-8', buttonClass]"
                :disabled="isButtonDisabled" @click="signin">
                <span class="text-white text-base font-bold">Connexion</span>
            </button>
            <div class="flex justify-center items-center gap-2.5">
                <span class="text-slate-900">Nouveau venu ?</span>
                <a href="/signup" class="text-violet-600">Inscrivez vous !</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { Signin } from '../../../models/authentification';
import ApiService from "@/services/ApiService";
import { ref, computed } from 'vue';
import ModalConfirm from '../pModal/ModalConfirm.vue';

const show = ref(false);
const errorMessage = ref('');

const confirm = () => {
    show.value = false;
};

const router = useRouter();

const request = ref<Signin>({
    pseudo: '',
    password: '',
});

const isButtonDisabled = computed(() => {
    return !(request.value.pseudo && request.value.password);
});

const buttonClass = computed(() => {
    return isButtonDisabled.value ? 'bg-gray-400' : 'bg-violet-600';
});

const signin = async () => {
    if (!isButtonDisabled.value) {
        try {
            const response = await ApiService.post('/users/signin', request.value);
            const token = response.data.token;
            router.push({ path: "/" });
            localStorage.setItem('authToken', token);
        } catch (error: any) {
            console.error(error);
            errorMessage.value = error.response?.data?.message || error.message;
            show.value = true;
        }
    }
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.ButtonPrimary:disabled {
    cursor: not-allowed;
}
</style>