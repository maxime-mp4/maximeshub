<script setup>
import { ref, onMounted } from 'vue'
const url = "https://api.github.com/users/maxime-mp4/repos"
let repoList = ref([]);

function getJsRepos() {
    return fetch(url, {
        headers: {
            'Authorization': `token ${import.meta.env.VITE_TOKEN}`
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("An error has occurred. Please refresh the page or contact the developer.");
        return res.json();
    })
    .then(repositories => {
        const parsedRepositories = repositories
            .filter(repo => !repo.private)
            .map(repo => ({
                name: repo.name,
                id: repo.id,
                description: repo.description,
                owner: repo.owner.login,
                language: repo.language,
                stars: repo.stargazers_count
            }));
        return parsedRepositories;
    })
    .catch(error => {
        console.error(error);
        return "An error has occurred. Please refresh the page or contact the developer.";
    });
}

onMounted(() => {
    getJsRepos().then(data => {
        repoList.value = data.sort((b,a) => a.stars - b.stars);
        console.log(data)
    });

    console.log(repoList.value)
})


</script>

<template>
    <section class="flex flex-col items-center divide-y divide-white/30 hover:outline-white/30 outline-offset-2 outline outline-white/10 hover:scale-[1.01] transition-all duration-100 p-4 bg-neutral-800 rounded-xl w-1/6">
        <div class="flex flex-col items-center pb-2">
            <span class="font-black text-white/70">GitHub Projects</span>
        <span class="text-xs italic text-white/20">Sorted by stars</span>
        </div>
        <div class="py-2 flex flex-col">
            <a class="group rounded-lg transition duration-50 flex items-center justify-between hover:bg-white/20 p-2" target="_blank" :href="`https://github.com/maxime-mp4/${r.name}`" v-for="r in repoList">
                <div class="flex flex-col">
                  <span class="pt-0.5 text-neutral-200 font-bold ">{{  r.name  }}</span>
                <span class="pb-0.5 text-white/50 text-xs">{{  r.description ?? "No description provided."  }}</span>
                </div>
                <div class="group-hover:text-yellow-500 transition duration-100 flex flex items-center">
                  <span class="mx-1">{{  r.stars }}</span>
                  <i class="fa-regular fa-star"></i>
                </div>
            </a>
            <a href="https://github.com/maxime-mp4" target="_blank" class="my-2 text-md text-center hover:text-gray-300 transition duration-100 font-bold">Get more...</a>
        </div>
    </section>
</template>