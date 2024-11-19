
<template>
    <div id="wrapper">
        <HeaderPage />
        <!-- content begin -->
        <div class="no-bottom no-top" id="content">
            <div id="top"></div>
            <!-- Carousel wrapper -->
            <section id="de-carousel" class="no-top no-bottom carousel slide carousel-fade shadow-2-strong" data-mdb-ride="carousel">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-mdb-target="#de-carousel" data-mdb-slide-to="0" class="active"></li>
                    <li data-mdb-target="#de-carousel" data-mdb-slide-to="1"></li>
                    <li data-mdb-target="#de-carousel" data-mdb-slide-to="2"></li>
                </ol>
                <!-- Inner -->
                <div class="carousel-inner">
                    <!-- Single item -->
                    <div class="carousel-item active" data-bgimage="url(/images-dj/slider/1.jpg)">
                        <div class="mask">
                            <div class="d-flex justify-content-center align-items-center h-100">
                                <div class="container text-white text-center">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h1 class="ultra-big mb-3 wow fadeInUp">Goodies<br><span class="id-color">en vente</span></h1>
                                            <div class="col-md-6 offset-md-3">
                                                <p class="lead wow fadeInUp" data-wow-delay=".3s">Retrouvez à disposition toutes les offres proposées par vos groupes favoris !</p>
                                            </div>                                            <div class="spacer-10"></div>
                                            <a href="#section-artists" class="btn-main wow fadeInUp" data-wow-delay=".6s">Explore</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Single item -->
                    <div class="carousel-item" data-bgimage="url(images-dj/slider/2.jpg)">
                        <div class="mask">
                            <div class="d-flex justify-content-center align-items-center h-100 wow f">
                                <div class="container text-white text-center">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <h1 class="ultra-big mb-3 wow fadeInUp">Achetez et<br><span class="id-color">recevez</span></h1>
                                            <div class="col-md-6 offset-md-3">
                                                <p class="lead wow fadeInUp" data-wow-delay=".3s">La confidentialité et la sécurité de chacun sont très importants pour nous, passez des transactions pour alimenter votre plaisir grâce au pouvoir des paiements sécurisés.</p>
                                            </div>                                            <div class="spacer-10"></div>
                                            <a href="#section-artists" class="btn-main wow fadeInUp" data-wow-delay=".6s">Explore</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Inner -->
                <!-- Controls -->
                <a class="carousel-control-prev" href="#de-carousel" role="button" data-mdb-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#de-carousel" role="button" data-mdb-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </section>
            <!-- Carousel wrapper -->

            <div class="arrow_wrap">
                <div class="arrow__up"></div>
            </div>
            <section id="section-date" class="bg-color pt40 pb30">
                <div class="container">
                    <div class="row g-custom-x align-items-center">
                        <div class="col-lg-12">
                            <div class="text-center">
                                <h2 class="s2 text-black wow fadeInUp" data-wow-delay="0s"><i style="margin-right: 5%;color:black;" class="fa fa-apple"></i><i style="color:black;" class="fa fa-android"></i></h2>
                                <h3 class="text-black wow fadeInUp" data-wow-delay=".2s">Bientôt disponible sur iOS et Android</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="section-shop" aria-label="section-services-tab" data-bgimage="url(images-dj/background/1.jpg)">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="text-center">
                                <div class="wm wow slideInUp">Boutique</div>
                                <h2 class="wow fadeInUp" data-wow-delay=".2s"><span class="id-color">01</span> Boutique</h2>
                                <div class="small-border bg-color wow zoomIn" data-wow-delay=".4s"></div>
                            </div>
                        </div>
                        <div class="spacer-single"></div>
                        <ShopPage />
                    </div>
                </div>
            </section>
            
            <section>
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <div class="wm wow slideInUp">Sponsors</div>
                            <h2 class="wow fadeInUp" data-wow-delay=".2s"><span class="id-color">03</span> Sponsorisé par :</h2>
                            <div class="small-border bg-color wow zoomIn" data-wow-delay=".4s"></div>
                        </div>
                        <div class="spacer-single"></div>
                    </div>
                    <div class="row g-custom-x">
                        <div class="col-lg-2 col-md-4 col-6 mb-sm-30">
                            <img src="../assets/images/sponsors/logo-1.png" class="img-fluid" alt="">
                        </div>
                        <div class="col-lg-2 col-md-4 col-6 mb-sm-30">
                            <img src="../assets/images/sponsors/logo-2.png" class="img-fluid" alt="">
                        </div>
                        <div class="col-lg-2 col-md-4 col-6 mb-sm-30">
                            <img src="../assets/images/sponsors/logo-3.png" class="img-fluid" alt="">
                        </div>
                        <div class="col-lg-2 col-md-4 col-6 mb-sm-30">
                            <img src="../assets/images/sponsors/logo-4.png" class="img-fluid" alt="">
                        </div>
                        <div class="col-lg-2 col-md-4 col-6 mb-sm-30">
                            <img src="../assets/images/sponsors/logo-5.png" class="img-fluid" alt="">
                        </div>
                        <div class="col-lg-2 col-md-4 col-6 mb-sm-30">
                            <img src="../assets/images/sponsors/logo-6.png" class="img-fluid" alt="">
                        </div>
                    </div>
                </div>
            </section>
            <section id="section-countdown" aria-label="section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-10 offset-md-1">
                            <div class="wm wow slideInUp">Begins in</div>
                            <div id="defaultCountdown" class="wow fadeInUp" data-wow-delay=".2s"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!-- content close -->
        <a href="#" id="back-to-top"></a>
        <FooterPage />
    </div>
</template>

<script setup lang="ts">
    import HeaderPage from '../pages/Header/HeaderPage.vue';
    import FooterPage from '../pages/Footer/FooterPage.vue';
    import ShopPage from '../pages/Shop/ShopPage.vue';
    import { useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import { useJwt } from '@vueuse/integrations/useJwt';

    const isAuthorized = ref(false);
    const isFullAuthorized = ref(false);
    const router = useRouter();

    const goToCityPage = () => {
        router.push('/city').then(() => {
            window.location.reload();
        });
    };

    const goAddEventPage = () => {
        if (isFullAuthorized.value) {
            router.push('/add').then(() => {
                window.location.reload();
            });
        }
    };

    const goForumPage = () => {
        if (isFullAuthorized.value) {
            router.push('/forum').then(() => {
                window.location.reload();
            });
        }
    };

    onMounted(async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            if (authToken) {
                const { payload } = useJwt(authToken);
                const roleId = payload.value?.role;

                if (roleId === 'admin' || roleId === 'artist' || roleId === 'organizer') {
                    isAuthorized.value = true;
                    isFullAuthorized.value = true;
                } else if (roleId === 'user') {
                    isFullAuthorized.value = true;
                }
            }
        } catch (error) {
            console.error('Erreur lors de la requête :', error);
        }
    });
</script>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>