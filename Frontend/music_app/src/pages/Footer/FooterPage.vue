<template>
  <footer data-bgimage="url(/images-dj/background/3.jpg)">
    <div class="container">
        <div class="row">
            <div class="col-md-3 col-sm-6 col-xs-1">
                <div class="widget">
                    <h5>Contact Info</h5>
                    <address class="s1">
                        <span><i class="id-color fa fa-map-marker fa-lg"></i>France</span>
                        <span><i class="id-color fa fa-phone fa-lg"></i>+33 4 73 21 46 79</span>
                        <span><i class="id-color fa fa-envelope-o fa-lg"></i><a href="mailto:Festnoz@gmail.com">Festnoz@gmail.com</a></span>
                    </address>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-1">
                <div class="widget">
                    <h5>Quick Links</h5>
                    <ul>
                        <li><a href="02_djfest-blog.html">Blog</a></li>
                        <li><a href="02_djfest-gallery.html">Gallery</a></li>
                        <li><a href="02_djfest-contact.html">Contact Us</a></li>
                        <li><a href="#section-tickets">Ticket</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-1">
                <div class="widget">
                    <h5>Latest Blog</h5>
                    <ul>
                        <li><a href="02_djfest-blog-single.html">Unreleased Footage of DJ Phenomenic</a></li>
                        <li><a href="02_djfest-blog-single.html">DJ Fritz Announce New Single</a></li>
                        <li><a href="02_djfest-blog-single.html">DJ Neurogenic Announce World Tour</a></li>
                        <li><a href="02_djfest-blog-single.html">Taxidermize New Collaboration</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-1">
                <div class="widget">
                    <h5>Newsletter</h5>
                    <p>Signup for our newsletter to get the latest news in your inbox.</p>
                    <form action="blank.php" class="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                        <div class="col text-center">
                            <input class="form-control" id="txt_subscribe" name="txt_subscribe" placeholder="enter your email" type="text" /> <a href="#" id="btn-subscribe"><i class="arrow_right bg-color-secondary"></i></a>
                            <div class="clearfix"></div>
                        </div>
                    </form>
                    <div class="spacer-10"></div>
                    <small>Your email is safe with us. We don't spam.</small>
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
                            <a href="02_djfest-index.html">
                                <img alt="" class="f-logo" src="../assets/images-dj/logo.png" /><span class="copy">&copy; 2024. Fest Noz. Tous droits réservés.</span>
                            </a>
                        </div>
                        <div class="de-flex-col">
                            <div class="social-icons">
                                <a href="#"><i class="fa fa-facebook fa-lg"></i></a>
                                <a href="#"><i class="fa fa-twitter fa-lg"></i></a>
                                <a href="#"><i class="fa fa-linkedin fa-lg"></i></a>
                                <a href="#"><i class="fa fa-pinterest fa-lg"></i></a>
                                <a href="#"><i class="fa fa-rss fa-lg"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
</template>

<style scoped>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .font-poppins {
    font-family: 'Poppins', sans-serif;
    }
</style>