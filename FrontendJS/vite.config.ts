import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // Désactiver les options de développement pour la génération du manifeste
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@views': fileURLToPath(new URL('./src/views', import.meta.url)),
    }
  },
})




// liste evenment avec table en lien avec maps=event dans levenement 
// stockage url hebergé sur dropbox par ex 
// si micro service user pas besoin du jtw user


/// renseigner uniquement adresse admin pourrait laisser lagitude lontitude et ou adresse je pense au plein air aussi 

// palette couleur pas de hexago palette couleur visible en front end 

// search pour utilisateur et admin et groupe si café ou concert voir plusieurs groupe click et lutilisateur dans le groupe et ou programme du concert si l epoint envoyé sur la page evemenet le lien de l'id organisateur ses coordonées etc 
//il fait la promo vient son annonce

