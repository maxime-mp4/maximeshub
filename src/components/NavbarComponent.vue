<script setup>
import { computed } from 'vue'

const props = defineProps({
    scrollY: Number,
    headerRef: Object,
    navbarElements: Array
})




const getHeaderHeight = computed(() => {
    if (props.headerRef?.value) {
        return props.headerRef.value.clientHeight
    }
    return 0
})

</script>

<template>
    <nav id="navbar" :class='[scrollY > getHeaderHeight ? "border-neutral-400/50 bg-neutral-200/75 dark:bg-neutral-800/75" : "border-transparent"]'>
    
    <div class="navbar-highlight"></div>
    
    <a v-for="element in navbarElements" :key="element.href" :href="'#' + element.href" class="navbar-child">
      <i :class="['fa', 'fa-solid', element.icon]"></i><span class="hidden mx-1 lg:block">{{ element.text }}</span>
    </a>

  </nav>
</template>