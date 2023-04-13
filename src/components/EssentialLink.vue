<template>
  <div>
    <q-item clickable :class="isActive ? 'text-bold': ''" style="border-radius: 5px;" @click="onClick(model)">
      <q-item-section v-if="model.icon" avatar>
        <q-icon :name="model.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-capitalize">{{ model.label }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-dialog v-model="searchModal" full-height >
      <q-card style="width: 500px;">
        <q-card-section>
          <div class="text-h6 text-bold row">
            <span class="q-mr-auto">Search</span> 
            <q-btn icon="close" flat @click="searchModal = !searchModal" />
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input autofocus filled v-model="modelSearch" label="Search" dense color="dark" @keyup="onSearch">
            <template v-slot:append>
              <q-icon name="close" @click="modelSearch = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: [ 'model' ],
  data() {
    return {
      isActive: false,
      searchState: false,
      searchModal: false,
      modelSearch: null
    }
  },
  created() {
    if(this.$route.name === this.model.slug) this.isActive = true
  },
  methods: {
    onClick(model) {
      if(model.url) {
        const url = model.url
        if(url === 'logout') {
          this.$Helper.destroyLocalStorage('token')
          this.$Helper.destroyLocalStorage('profile')
          this.$router.push({ name: 'login' })
        } else if(url === 'search') {
          this.searchModal = !this.searchModal
        }
      }
    },
    
    onSearch() {
      let endpoint = `http://127.0.0.1:8000/api/users?search=${this.modelSearch}`
      this.$axios.get(endpoint).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
