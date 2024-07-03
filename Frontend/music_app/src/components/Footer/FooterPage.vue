<template>
    <footer class="bg-white py-8 border-t">
      <div class="container mx-auto flex flex-wrap items-center justify-between">
        <div class="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <img src="../../assets/logo.png" alt="Fest-Noz Logo" class="w-25 h-20 mr-5" />
          <div class="flex items-center mb-4 mt-2">
            <img src="../../assets/téléchargement.jpg" alt="Google Pagespeed" class="w-15 h-10 mr-2" />
            <span class="text-green-500 text-xl font-bold">100</span>
          </div>
        </div>
        <div class="flex flex-col md:flex-row w-full md:w-auto justify-center items-center mx-auto font-poppins">
          <div class="text-center md:text-left mb-4 md:mb-0 md:mr-8">
            <h5 class="font-bold mb-2">Links</h5>
            <ul>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">About Us</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Blog</a></li>
              <li><a href="#" class="text-gray-600 hover:text-gray-800">Areas We Serve</a></li>

              <li><a href="#" class="text-gray-600 hover:text-gray-800">Case Studies</a></li>
            </ul>
          </div>
          <div class="text-center md:text-left mb-10 md:mb-0">
            <h5 class="font-bold mb-6">Contact nous</h5>
            <p class="text-gray-600 mb-2">Contactez nous au :</p>
            <p class="text-gray-600 mb-2">+08493913405</p>
            <p class="text-gray-600">Email : Festnoz@gmail.com</p>
            <p class="text-gray-600"></p>
          </div>
        </div>
  
        <!-- Move Social Media Icons Slightly to the Left -->
        <div class="flex space-x-4 mt-6 md:mt-0 md:ml-8">
          <a href="#" class="bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-gray-800">
            <i class="fab fa-facebook-f"></i>
            <img src="../../assets/appli.png" alt="Appli"  />
          </a>
          <a href="#" class="bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-gray-800">
            <i class="fab fa-instagram"></i>
            <img src="../../assets/instagram (1).png" alt="instagram"  />
          </a>
          <a href="#" class="bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-gray-800">
            <i class="fab fa-twitter"></i>
            <img src="../../assets/twitter (1).png" alt="twitter"  />
          </a>
          <a href="#" class="bg-white rounded-full p-2 shadow-lg text-gray-600 hover:text-gray-800">
            <i class="fab fa-linkedin-in"></i>
            <img src="../../assets/linkedin (1).png" alt="Linkedin"  />
          </a>
        </div>
      </div>
      <div class="border-t mt-8 pt-4 text-center text-gray-600 font-poppins">
        © 2024. Fest Noz. All rights reserved.
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  
  .font-poppins {
    font-family: 'Poppins', sans-serif;
  }
  </style>