<template>
  <HeaderPage/>
  <section id="subheader" class="text-light" data-bgimage="url(/images-dj/background/subheader.jpg) bottom">
      <div class="center-y relative text-center">
          <div class="container">
              <div class="row">
                  <div class="col-md-12 text-center">
                    <h1>Détails produit</h1>
                  </div>
                  <div class="clearfix"></div>
              </div>
        </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 rounded-lg">
          <img :src="`http://${goodieDetails.goodieImage}`" style="position:sticky;top:100px;"/>
        </div>
        <div class="col-lg-6 bg-white shadow-md rounded-lg">
          <h2 class="text-2xl font-bold text-black">{{ goodieDetails.goodieName }}</h2>
          <span class="text-xl text-black">{{ goodieDetails.goodiePrice }} €</span>
          <br>
          <span class="text-xl text-black">Groupe : {{ groupName }}</span>
          <br>
          <span class="text-xl text-black">Type : {{ goodieType }}</span>
          <br>
          <span class="text-xl text-black">Description : {{ goodieDetails.goodieDescription }}</span>
          <div class="flex justify-center mb-6">
            <div v-if="goodieDetails.goodieQuantity > 0" class="row ecommerce-card-button">
              <a href="" v-on:click.prevent="addToCart" class="col btn btn-secondary pl-0 pr-0"><i class="bi bi-cart"></i></a>
            </div>
            <div v-if="goodieDetails.goodieQuantity <= 0" class="row ecommerce-card-button-disabled">
              <button disabled class="col btn btn-secondary pl-0 pr-0">En rupture de stock</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ModalConfirm v-model="showError" title="Erreur" @confirm="confirmError">
      <p>{{ errorMessage }}</p>
  </ModalConfirm>
  <ModalConfirm v-model="showSuccess" title="Confirmation" @confirm="confirmSuccess">
      <p>{{ successMessage }}</p>
  </ModalConfirm>
  <FooterPage/>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import HeaderPage from '../../composables/Header/HeaderPage.vue';
import FooterPage from '../../composables/Footer/FooterPage.vue';
import ModalConfirm from '../../components/pModal/ModalConfirm.vue';
import { useRouter, useRoute } from 'vue-router';
import type { GoodieType, GoodieInCart, Goodie } from 'models/goodie';
import type { Cart } from 'models/cart';
import ApiService from '@/services/ApiService';

const route = useRoute();
const router = useRouter();
const showError = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const showSuccess = ref(false);
const goodieId = route.params.goodieId;
const goodieDetails = ref<Goodie>({
  goodieName: '',
  goodiePrice: 0,
  goodieQuantity: 0,
  goodieImage: undefined,
  goodieTypeId: '',
  goodieAvailable: false,
  goodieDescription: ''
});
const goodieInCart = ref<GoodieInCart>({
  goodieName: '',
  goodiePrice: 0,
  goodieQuantity: 0,
  goodieImage: undefined,
  goodieId: '',
  goodieGroupId: '',
  goodieTypeId: ''
});
const groupName = ref('');
const goodieType = ref('');

const confirmError = () => {
    showError.value = false;
};

const confirmSuccess = () => {
    showSuccess.value = false;
};

const addToCart = () => {
    try {
      if (goodieDetails.value.goodieQuantity <= 0) {
        throw new Error("Il n'en reste plus en stock !");
      }
      var festnozCart : Cart = JSON.parse(localStorage.getItem('festnozCart')!);
      var alreadyExists = false;
      festnozCart.content.forEach((goodie) => {
        if (goodieId === goodieInCart.value.goodieId) {
          alreadyExists = true;
          if (goodie.goodieQuantity < goodieDetails.value.goodieQuantity) {
            goodie.goodieQuantity += goodieInCart.value.goodieQuantity;
            goodie.goodiePrice += goodieInCart.value.goodiePrice;
            festnozCart.totalPrice += goodieDetails.value.goodiePrice;
          } else {
            throw new Error("Votre panier contient la quantité maximale en stock de ce goodie.");
          }
        }
      });
      if (alreadyExists === false) {
        festnozCart.content.push(goodieInCart.value);
        festnozCart.totalPrice += goodieDetails.value.goodiePrice;
      }
      localStorage.setItem('festnozCart', JSON.stringify(festnozCart));
      successMessage.value = "Le goodie a été ajouté au panier !";
      showSuccess.value = true; 
    } catch (error) {
      errorMessage.value = (error as Error).message;
      showError.value = true;
    }
}

onMounted(async () => {
  try {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
          const getGoodieDetails = await ApiService.get(`/goodie/get-goodie-details/${goodieId}`, {
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
          });
          goodieDetails.value.goodieName = goodieInCart.value.goodieName = getGoodieDetails.data.name;
          goodieDetails.value.goodieDescription = getGoodieDetails.data.description;
          goodieDetails.value.goodiePrice = goodieInCart.value.goodiePrice = getGoodieDetails.data.price;
          goodieDetails.value.goodieQuantity = getGoodieDetails.data.quantity, goodieInCart.value.goodieQuantity = 1;
          goodieDetails.value.goodieTypeId = goodieInCart.value.goodieTypeId = getGoodieDetails.data.goodieTypeId;
          goodieDetails.value.goodieImage = goodieInCart.value.goodieImage = getGoodieDetails.data.path;
          goodieDetails.value.goodieAvailable = getGoodieDetails.data.available;
          goodieInCart.value.goodieId = getGoodieDetails.data.id;
          goodieInCart.value.goodieGroupId = getGoodieDetails.data.groupId;
          const getAllGoodieTypes = await ApiService.get('/goodietype/get-all-types', {
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
          });
          getAllGoodieTypes.data.forEach((type : GoodieType) => type.id === goodieDetails.value.goodieTypeId ? goodieType.value = type.name : null);
          const getGroup = await ApiService.get(`/group/get-group/${getGoodieDetails.data.groupId}`, {
              headers: {
                  Authorization: `Bearer ${authToken}`,
              },
          });
          groupName.value = getGroup.data.name;
      }
  } catch (error) {
      console.error('Erreur lors de la requête :', error);
      router.push('/erreur').then(() => {
      });
  }
});

</script>
