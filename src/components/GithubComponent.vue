<script>
export default {
    data(){
        return {
            repoList : [],
            sortedRepoList : [],
            sortType : ["name", "stars", "fork"],
            sortIndex: 0,
        }
    },

    watch: {
        sortIndex() {
            this.sortBy(this.repoList, this.sortIndex   );
        },
        repoList() {
            this.sortBy(this.repoList, this.sortIndex   );
        }
  },

    methods: {
        getRepositories() {

            const url = "https://api.github.com/users/maxime-mp4/repos"

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
                    this.repoList = repositories
                        .filter(repo => !repo.private)
                        .map(repo => ({
                            name: repo.name,
                            id: repo.id,
                            description: repo.description,
                            owner: repo.owner.login,
                            fork: repo.fork,
                            language: repo.language,
                            stars: repo.stargazers_count
                        })
                    );
                })
                .catch(error => {
                    console.error(error);
                    return "An error has occurred. Please refresh the page or contact the developer.";
                });
        },
        sortBy(repositoriesList, sortIndex) {
            this.sortedRepoList = [...repositoriesList].sort((b,a) => a[this.sortType[sortIndex]] - b[this.sortType[sortIndex]])
        },
    },

    async mounted() {
        await this.getRepositories()
    }
}


</script>

<template>
    <section id="git-projects" class="flex flex-col items-center">
        <div class=" h-[calc(100vh-2rem)] divide-y divide-white/30 hover:outline-white/30 outline-white/20 outline active:scale-[1.02] transition-all duration-500 p-4 bg-neutral-800 rounded-xl">
            <div class="flex flex-col items-center pb-2">
            <span class="font-black text-white/70">GitHub Projects</span>
        <span @click="sortIndex >= sortType.length - 1 ? sortIndex = 0 : sortIndex++" class=" hover:not-italic text-xs italic text-white/20">Sorted by {{ this.sortType[sortIndex] }}</span>
        </div>
        <div class="py-2 flex flex-col ">
            <a class="group rounded-lg transition-all duration-50 flex items-center justify-between hover:bg-white/20 p-2" target="_blank" :href="`https://github.com/maxime-mp4/${r.name}`" v-for="r in sortedRepoList">
                <div class="flex flex-col">
                  <span :class="r.fork ? 'group-hover:text-green-500' : ''" class="transition-all pt-0.5 text-neutral-200 font-bold ">{{  r.name  }}</span>
                <span :class="r.fork ? 'group-hover:text-green-500/50' : ''" class="transition-all pb-0.5 text-white/50 text-xs">{{  r.description ?? "No description provided."  }}</span>
                </div>
                <div class="transition duration-100 flex items-center">
                    <i v-if="r.fork" class="transition-all group-hover:text-green-500 mx-2 fa-solid fa-code-fork"></i>
                    <div class="transition-all flex p-2 justify-center items-center hover:text-yellow-500 hover:bg-white/20 rounded-lg">
                        <span class="mx-0.5">{{  r.stars }}</span>
                        <i class="mx-0.5 fa-regular fa-star"></i>
                    </div>
                </div>
            </a>
            <a href="https://github.com/maxime-mp4" target="_blank" class="my-2 text-md text-center hover:text-gray-300 transition duration-100 font-bold">Get more...</a>
        </div>
        </div>
    </section>
</template>