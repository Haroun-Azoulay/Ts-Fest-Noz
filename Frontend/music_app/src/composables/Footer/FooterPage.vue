<template>
  <footer data-bgimage="url(/images-dj/background/3.jpg)">
    <div class="container">
        <div class="row">
            <div class="col-md-3 col-sm-6 col-xs-1">
                <div class="widget">
                    <h5>Informations</h5>
                    <address class="s1">
                        <span><i class="id-color fa fa-map-marker fa-lg"></i>France</span>
                        <span><i class="id-color fa fa-phone fa-lg"></i>+33 4 73 21 46 79</span>
                        <span><i class="id-color fa fa-envelope-o fa-lg"></i><a href="mailto:Festnoz@gmail.com">Festnoz@gmail.com</a></span>
                    </address>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-1">
                <div class="widget">
                    <h5>Liens rapides</h5>
                    <ul>
                        <li><a @click="goToCityPage" href="">Plan</a></li>
                        <li><a @click="goToEventsPage" href="">Liste d'évènements</a></li>
                        <li><a @click="goToForumPage" href="">Annonces</a></li>
                        <li><a @click="goToContactPage" href="">Contactez-nous</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-1">
                <div class="widget">
                    <h5>Latest Blog</h5>
                    <ul>
                        <li><a href="">Unreleased Footage of DJ Phenomenic</a></li>
                        <li><a href="">DJ Fritz Announce New Single</a></li>
                        <li><a href="">DJ Neurogenic Announce World Tour</a></li>
                        <li><a href="">Taxidermize New Collaboration</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-1">
                <div class="widget">
                    <h5>Newsletter</h5>
                    <p>Inscrivez-vous dans notre newsletter pour recevoir les dernières nouveautés.</p>
                    <form action="blank.php" class="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                        <div class="col text-center">
                            <input class="form-control" id="txt_subscribe" name="txt_subscribe" placeholder="Entrez votre email" type="text" /> <a href="#" id="btn-subscribe"><i class="arrow_right bg-color-secondary"></i></a>
                            <div class="clearfix"></div>
                        </div>
                    </form>
                    <div class="spacer-10"></div>
                    <small>Votre email est en sécurité avec nous. Nous n'envoyons jamais de spam.</small>
                </div>
            </div>
        </div>
    </div>
    <div class="subfooter">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="de-flex">
                        <div class="de-flex-col">
                            <a href="/" style="display: flex; align-items: center;">
                                <img alt="" class="f-logo" style="height:90px;" src="../../assets/images/logo.png" />
                                <span class="copy">&copy; 2024. Fest Noz. Tous droits réservés.</span>
                            </a>
                        </div>
                        <div class="de-flex-col">
                            <div class="social-icons">
                                <a href="https://x.com/fest_noz_app"><i class="fa fa-twitter fa-lg"></i></a>
                                <!--<a href="#"><i class="fa fa-facebook fa-lg"></i></a>
                                <a href="#"><i class="fa fa-linkedin fa-lg"></i></a>
                                <a href="#"><i class="fa fa-pinterest fa-lg"></i></a>
                                <a href="#"><i class="fa fa-rss fa-lg"></i></a>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();

const goToCityPage = (event: Event) => {
    event.preventDefault()
    router.push({ path : '/city' });
};

const goToEventsPage = (event: Event) => {
    event.preventDefault()
    router.push({ path : '/event' });
};

const goToForumPage = (event: Event) => {
    event.preventDefault()
    router.push({ path : '/announcements' });
};

const goToContactPage = (event: Event) => {
    event.preventDefault()
    router.push({ path : '/contact' });
};

router.afterEach(() => {
    const existingScript = document.getElementById('designesiajs');
    if (existingScript) {
        existingScript.remove();
    }
    const designesiajs = document.createElement('script');
    designesiajs.id = 'designesiajs';
    designesiajs.src = '/js/designesia.js';
    document.body.appendChild(designesiajs);
});
</script>

<style scoped>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .font-poppins {
    font-family: 'Poppins', sans-serif;
    }
</style>