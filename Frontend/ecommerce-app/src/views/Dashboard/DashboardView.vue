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
            <h4 v-if="groupName">{{ groupName }}</h4>
            <p v-if="!groupName">Vous n'appartenez à aucun groupe.</p>
          </div>
          <div class="col-md-4">
            <h3>Vos produits</h3>
            <div v-if="myGoodies.length > 0">
              <div v-for="goodie in myGoodies" :key="goodie">
                <div class="row" style="display:flex;align-items:center;">
                  <div class="col goodieSmallImage">
                    <img :src="`http://0.0.0.0:3000/${goodie.path}`"/>
                  </div>
                  <div class="col">
                    <span>Nom : {{ goodie.name }}</span>
                    <br>
                    <span>Type : {{ goodie.goodieTypeId }}</span>
                    <br>
                    <span>Quantité : {{ goodie.quantity }}</span>
                    <br>
                    <span>Disponible : {{ goodie.available }}</span>
                  </div>
                </div>
                <hr style="color:white;border-top:solid 1px #FFF;padding:0;margin:20px 0 20px 0;">
              </div>
            </div>
            <p v-if="myGoodies.length === 0">Vous n'avez aucun goodies en vente.</p>
            <a @click="addGoodie" class="btn-main"><i class="bi bi-plus-circle-fill"></i></a>
          </div>
          <div id="sidebar" class="col-md-4">
            <div class="widget widget_text">
              <h3>Historique d'achats</h3>
              <div v-if="allMyOrders.length > 0">
                <div v-for="order in allMyOrders">
                  <div class="row" style="display:flex;align-items:center;">
                    <div class="col">
                      <span>Transaction id : {{ order.id }}</span>
                      <br>
                      <span>Date : {{ order.createdAt }}</span>
                    </div>
                  </div>
                  <hr style="color:white;border-top:solid 1px #FFF;padding:0;margin:20px 0 20px 0;">
                </div>
              </div>
              <div v-if="allMyOrders.length <= 0">
                Vous n'avez rien acheté ici.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ModalAddGoodie v-model="showAddGoodie" title="Ajouter Goodie" @confirm="confirmAddGoodie">
    <template #goodieTypes>
        <option v-for="type in allGoodieTypes" :key="type.name" :value="type.id">
            {{ type.name }}
        </option>
    </template>
    <template #groupOptions>
        <option v-for="group in allGroups" :key="group.name" :value="group.id">
            {{ group.name }}
        </option>
    </template>
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
  import HeaderPage from '../../composables/Header/HeaderPage.vue'
  import { useRouter, useRoute } from 'vue-router'
  import ApiService from '@/services/ApiService'
  import { useJwt } from '@vueuse/integrations/useJwt.mjs'
  import ModalConfirm from '../../components/pModal/ModalConfirm.vue';
  import ModalAddGoodie from '../../components/pModal/ModalAddGoodie.vue';
  import FooterPage from '../../composables/Footer/FooterPage.vue'
  import type { Goodie, GoodieType } from '../../../models/goodie';
  import type { OrdersAndDetails } from 'models/order'

  const router = useRouter();
  const groupName = ref('');
  const showError = ref(false);
  const errorMessage = ref('');
  const successMessage = ref('');
  const showSuccess = ref(false);
  const showAddGoodie = ref(false);
  var allGroupMembers = ref([]);
  var allGroups = ref([]);
  var myGoodies = ref<Goodie[]>([]);
  var addGoodiesCalledOnce = ref(false);
  var allGoodieTypes = ref<GoodieType[]>([]);
  var allMyOrders = ref<OrdersAndDetails[]>([]);

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
      await ApiService.delete(`/delete-group/${getGroupDetail.data[0].groupId}`, {
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
      showAddGoodie.value = true;
      if (!addGoodiesCalledOnce.value) {
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
            const userId = payload.value?.userId;
            const role = payload.value?.role;
            // if (role !== "artist") {
            //   router.push({ path : '/' });
            // }
            const getMyGroupDetails = await ApiService.get('/get-my-group', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            groupName.value = getMyGroupDetails.data.group.name;
            // const getMyGroupDetails = await ApiService.get('/groupdetail/me', {
            //     headers: {
            //         Authorization: `Bearer ${authToken}`,
            //     },
            // });
            // getMyGroupDetails.data.forEach((element: { email: any; owner: any }) => {
            //   allGroupMembers.value.push({ email: element.email, owner: element.owner});
            // });
            const getAllGoodieTypes = await ApiService.get('/get-all-types', {
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
            });
            const getAllGroups = await ApiService.get('/get-all-groups', {
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
            });
            allGoodieTypes.value = getAllGoodieTypes.data;
            allGroups.value = getAllGroups.data;
            const getMyGoodies = await ApiService.get(`/me/${userId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            getMyGoodies.data.forEach((element : Goodie) => {
              allGoodieTypes.value.forEach((goodieType) => {
                if (element.goodieTypeId === goodieType.id) {
                  element.goodieTypeId = goodieType.name;
                  myGoodies.value.push(element);
                }
              }) 
            });

            const getMyOrders = await ApiService.get('/order/me', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            allMyOrders.value = getMyOrders.data;
        }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
  });
</script>
