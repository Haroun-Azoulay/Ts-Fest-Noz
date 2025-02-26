<template>
  <HeaderPage/>
  <section id="subheader" class="text-light" data-bgimage="url(/images-dj/background/subheader.jpg) bottom">
      <div class="center-y relative text-center">
          <div class="container">
              <div class="row">
                  <div class="col-md-12 text-center">
                    <h1>Panier</h1>
                  </div>
                  <div class="clearfix"></div>
              </div>
        </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div v-if="festnozCart.content.length > 0">
        <div class="row d-flex justify-content-center" v-for="goodie in festnozCart.content">
          <div class="col-lg-1 rounded-lg d-flex justify-content-center align-items-center">
            <i class="bi bi-x-lg" @click="removeGoodieFromCart(goodie.goodieId)" style="color:red;cursor:pointer;"></i>
          </div>
          <div class="col-lg-4 rounded-lg">
            {{ goodie }}
            <img :src="`http://${goodie.goodieImage}`" style="position:sticky;top:100px;"/>
          </div>
          <div class="col-lg-4 bg-white shadow-md rounded-lg">
            <h2 class="text-2xl font-bold text-black">{{ goodie.goodieName }}</h2>
            <span class="text-xl text-black">Prix : {{ goodie.goodiePrice }} €</span>
            <br>
            <span class="text-xl text-black">Quantité : {{ goodie.goodieQuantity }}</span>=
          </div>
          <hr style="color:white;border-top:solid 1px #FFF;padding:0;margin:20px 0 20px 0;">
        </div>
        <div>
          <span style="font-size:1.5em;"><strong>Sous-total :</strong> {{ festnozCart.totalPrice }} €</span>
          <div class="payment-methods-logos">
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/mastercard.svg?sanitize=true"/>
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/visa.svg?sanitize=true"/>
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/cartes-bancaires.svg?sanitize=true"/>
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/mastercard-alt.svg?sanitize=true"/>
            <img src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/apm/paypal.svg?sanitize=true"/>
          </div>
          <span><em>Avec FestNoz, vos données sont en sécurité garantie et resteront toujours confidentielles.</em> <i class="bi bi-file-lock"></i></span>
          <br>
          <div class="mt-4 row ecommerce-card-button">
              <a @click="checkout" class="col btn btn-success pl-0 pr-0"><i class="bi bi-bag-check"></i></a>
          </div>
        </div>
      </div>
      <div v-if="festnozCart.content.length <= 0">
        <p class="d-flex justify-content-center"><strong>Votre panier est vide.</strong></p>
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
const showError = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const showSuccess = ref(false);
const festnozCart = ref<Cart>({
  totalPrice: 0,
  content: []
});

const confirmError = () => {
    showError.value = false;
};

const confirmSuccess = () => {
    showSuccess.value = false;
};

const removeGoodieFromCart = (goodieId : string) => {
  festnozCart.value.content = festnozCart.value.content.filter((goodie) => goodie.goodieId !== goodieId);
  festnozCart.value.totalPrice = 0;
  festnozCart.value.content.forEach((goodie) => {
    festnozCart.value.totalPrice += goodie.goodiePrice;
  })
  localStorage.setItem('festnozCart', JSON.stringify(festnozCart.value))
}

const checkout = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const checkoutRequest = await ApiService.post('/order/checkout', festnozCart.value, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    festnozCart.value.totalPrice = 0;
    festnozCart.value.content = [];
    localStorage.setItem('festnozCart', JSON.stringify(festnozCart.value));
    successMessage.value = "Achat réussi !";
    showSuccess.value = true; 
  } catch (error) {
    console.error('Erreur lors de la requête :', error);
    successMessage.value = "Votre achat n'a pas pu être abouti.";
    showError.value = true; 
  }
}

onMounted(async () => {
  try {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        const festnozCartLocalStorage : Cart = JSON.parse(localStorage.getItem('festnozCart')!);
        festnozCart.value = festnozCartLocalStorage;
      }
  } catch (error) {
      console.error('Erreur lors de la requête :', error);
  }
});

</script>
