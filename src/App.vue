<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
      <a class="navbar-brand" href="#">DualCube</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" aria-controls="navbarNav" 
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">首页</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <RouterView />
  </div>

  <footer class="bg-dark text-light mt-5 py-3">
    <div class="container text-center">
      <p class="mb-0">DualCube &copy; 2024</p>
    </div>
  </footer>
</template>

<style scoped>
.router-link-active {
  font-weight: bold;
  color: white !important;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
</style>
