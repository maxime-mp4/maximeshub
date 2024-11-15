<template>
  <!-- <nav class="fixed top-0 p-1 bg-white/10 px-4 backdrop-blur-xl w-full m-0 flex items-center justify-between">
    <span class="font-bold"> maxime/{{ $route.fullPath.slice(1) != "" ? $route.fullPath.slice(1) : "home" }}.html</span>
    <ul class="text-white/80">
      <RouterLink class="py-1 px-2 hover:bg-white/30 rounded-sm transition duration-100" to="/">Home</RouterLink>
      <RouterLink class="py-1 px-2 hover:bg-white/30 rounded-sm transition duration-100" to="/about">About</RouterLink>
      <a class="py-1 px-2 hover:bg-white/30 rounded-sm transition duration-100">Linkedin <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
    </ul>
  </nav> -->
    <RouterView class="h-screen flex items-center overflow-hidden" />
</template>