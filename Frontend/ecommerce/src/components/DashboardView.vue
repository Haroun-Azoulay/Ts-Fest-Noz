<template>
  <HeaderPage />
  <div class="no-bottom no-top" id="content">
    <div id="top"></div>

    <!-- section begin -->
    <section
      id="subheader"
      class="text-light"
      data-bgimage="url(images-dj/background/subheader.jpg) bottom"
    >
      <div class="center-y relative text-center">
        <div class="container">
          <div class="row">
            <div class="col-md-12 text-center">
              <h1>Tableau de bord</h1>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </section>
    <section aria-label="section">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h3>Groupe</h3>
            <div v-if="allGroupMembers.length > 0">
              <h4>{{ groupName }}</h4>
              <p v-for="member in allGroupMembers" :key="member">
                {{ member.email }}
                <b v-if="member.owner">Créateur</b>
              </p>
              <a @click="deleteGroup" class="btn-main" style="background-color:red;">Supprimer</a>
            </div>
            <p v-if="allGroupMembers.length === 0">Vous n'appartenez à aucun groupe.</p>
          </div>
          <div class="col-md-4">
            <h3>Vos produits</h3>
            <a @click="addGoodie" class="btn-main"><i class="bi bi-plus-circle-fill"></i></a>
          </div>
          <div id="sidebar" class="col-md-4">
            <div class="widget widget_text">
              <h3>Historique d'achats</h3>
              <div>
                Vous n'avez rien acheté ici.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ModalAddGoodie v-model="showAddGoodie" title="Ajouter Goodie" @confirm="confirmAddGoodie">
      <option v-for="type in allGoodieTypes" :key="type.name" :value="type.id">
          {{ type.name }}
      </option>
    </ModalAddGoodie>
    <ModalConfirm v-model="showError" title="Erreur" @confirm="confirmError">
        <p>{{ errorMessage }}</p>
    </ModalConfirm>
    <ModalConfirm v-model="showSuccess" title="Confirmation" @confirm="confirmSuccess">
        <p>{{ successMessage }}</p>
    </ModalConfirm>
  </div>
  <FooterPage></FooterPage>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import HeaderPage from '../pages/Header/HeaderPage.vue'
  import { useRouter, useRoute } from 'vue-router'
  import ApiService from '@/services/ApiService'
  import { useJwt } from '@vueuse/integrations/useJwt'
  import ModalConfirm from './pModal/ModalConfirm.vue';
  import ModalAddGoodie from './pModal/ModalAddGoodie.vue';
  import FooterPage from '../pages/Footer/FooterPage.vue'

  const router = useRouter();
  const route = useRoute();
  const groupName = ref('');
  const allGroupMembers = ref([]);
  const showError = ref(false);
  const errorMessage = ref('');
  const successMessage = ref('');
  const showSuccess = ref(false);
  const showAddGoodie = ref(false);
  var addGoodiesCalledOnce = ref(false);
  var allGoodieTypes = ref<GoodieType[]>([]);

  interface GoodieType {
    id: string;
    name: string;
  }

  const confirmAddGoodie = () => {
      showAddGoodie.value = false;
  };

  const confirmError = () => {
      showError.value = false;
  };

  const confirmSuccess = () => {
      showSuccess.value = false;
  };

  const deleteGroup = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const getGroupDetail = await ApiService.get('/groupdetail/me', {
          headers: {
              Authorization: `Bearer ${authToken}`,
          },
      });
      await ApiService.delete(`/group/delete-group/${getGroupDetail.data[0].groupId}`, {
          headers: {
              Authorization: `Bearer ${authToken}`,
          },
      });
      successMessage.value = "Le groupe a été supprimé !";
      showSuccess.value = true;
      window.location.reload();
    } catch (error) {
      console.error(error);
      errorMessage.value = error.response?.data?.message || error.message;
      showError.value = true;
    }
  }

  const addGoodie = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      showAddGoodie.value = true;
      if (!addGoodiesCalledOnce.value) {
        const getAllGoodieTypes = await ApiService.get('/goodietype/get-all-types', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        getAllGoodieTypes.data.forEach((type : GoodieType) => allGoodieTypes.value.push(type));
        addGoodiesCalledOnce.value = true;
      }
    } catch (error) {
    }
  }
  
  onMounted(async () => {
    try {
        const authToken = localStorage.getItem('authToken');
        if (!authToken)  {
            router.push({ path : '/' });
        } else {
            const { payload } = useJwt(authToken);
            const role = payload.value?.role;
            if (role !== "artist") {
              router.push({ path : '/' });
            }
            const response = await ApiService.get('/group/me', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            groupName.value = response.data.name;
            const response2 = await ApiService.get('/groupdetail/me', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            response2.data.forEach(element => {
              allGroupMembers.value.push({ email: element.email, owner: element.owner});
            });
        }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  });
</script>
