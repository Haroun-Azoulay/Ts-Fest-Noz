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
              <h1>Contact</h1>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </section>
    <section aria-label="section">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <form
              name="contactForm"
              @submit.prevent="sendEmail"
              id="contact_form"
              class="form-border"
              method="post"
            >
              <div class="row g-custom-x">
                <div class="col-md-12">
                  <h3>Envoyez un message</h3>
                </div>
                <div class="col-md-6">
                  <div id="name_error" class="error">Please enter your name.</div>
                  <div>
                    <input
                      type="text"
                      name="Name"
                      id="name"
                      v-model="name"
                      class="form-control"
                      placeholder="Votre Nom"
                      required
                    />
                  </div>

                  <div id="email_error" class="error">Please enter your valid E-mail ID.</div>
                  <div>
                    <input
                      type="email"
                      name="Email"
                      id="email"
                      v-model="email"
                      class="form-control"
                      placeholder="Votre Mail"
                      required
                    />
                  </div>

                  <div id="phone_error" class="error">Please enter your phone number.</div>
                  <div>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      v-model="phone"
                      class="form-control"
                      placeholder="Votre Telephone"
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6">
                <select v-model="selected" required>
                <option value="" class="bg-violet-400">--Motif de la demande--</option>
                  <option value="Vous êtes un groupe" class="bg-violet-400">Vous êtes un groupe</option>
                  <option value="Vous êtes un organisateur" class="bg-violet-400">Vous êtes un organisateur</option>
                  <option value="Questions techniques" class="bg-violet-400">Questions techniques</option>
                  <option value="Partenariat" class="bg-violet-400">Partenariat</option>
                  <option value="Autre" class="bg-violet-400">Autre</option>
                </select>
                </div>
                
                <div class="col-md-6">
                  <div id="message_error" class="error">Please enter your message.</div>
                  <div>
                    <textarea
                      name="message"
                      id="message"
                      v-model="message"
                      class="form-control"
                      placeholder="Votre Message"
                      required
                    ></textarea>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="g-recaptcha" data-sitekey="copy-your-sitekey-here"></div>
                  <p id="submit" class="mt20">
                    <input type="submit" id="send_message" value="Envoyez" class="btn btn-main" />
                  </p>
                  <div id="mail_success" class="success">
                    Your message has been sent successfully.
                  </div>
                  <div id="mail_fail" class="error">
                    Sorry, error occured this time sending your message.
                  </div>
                </div>
              </div>
            </form>

            <div id="success_message" class="success">
              Your message has been sent successfully. Refresh this page if you want to send more
              messages.
            </div>
            <div id="error_message" class="error">Sorry there was an error sending your form.</div>
          </div>

          <div id="sidebar" class="col-md-4">
            <div class="widget widget_text">
              <h3>Informations de contact</h3>
              <address>
                <span><strong>Téléphone:</strong>+33 4 73 21 46 79</span>
                <span
                  ><strong>Email:</strong
                  ><a href="mailto:contact@example.com">Festnoz@gmail.com</a></span
                >
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <FooterPage></FooterPage>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderPage from '../../composables/Header/HeaderPage.vue'
import { useRouter, useRoute } from 'vue-router'
import ApiService from '@/services/ApiService'
import { useJwt } from '@vueuse/integrations/useJwt.mjs'
import { provide } from 'vue'
import FooterPage from '../../composables/Footer/FooterPage.vue'
import Email from '../../assets/smtp/smtp.js'


const name = ref('')
const email = ref('')
const subjects = ref('')
const message = ref('')
const phone = ref('')
const selected = ref('')
const smtpUsername: string | undefined = import.meta.env.VITE_SMTP_USERNAME as string;
const smtpPort: number = Number(import.meta.env.VITE_SMTP_PORT);
const smtpPassword: string | undefined = import.meta.env.VITE_SMTP_PASSWORD as string;
const smtpFrom: string | undefined = import.meta.env.VITE_SMTP_FROM as string;

const sendEmail = (): void => {
  Email.send({
    Host: 'smtp.elasticemail.com',
    Username: smtpUsername,
    Port: smtpPort,
    Password: smtpPassword,
    To: email.value,
    From: smtpFrom,
    Name: name.value,
    Subject: subjects.value,
    Body: `
            <h4>Nouveau message de contact</h4>
            <p><strong>Nom :</strong> ${name.value}</p>
            <p><strong>Email :</strong> ${email.value}</p>
            <p><strong>Phone :</strong> ${phone.value}</p>
            <p><strong>Raison :</strong> ${selected.value}</p>
            <p><strong>Sujet :</strong> ${subjects.value}</p>
            <p><strong>Message :</strong> ${message.value}</p>
        `
  }).then((message: string) => alert(message))
}
</script>
