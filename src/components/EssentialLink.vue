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
              <q-icon :name="searchIcon" @click="clearSearch" class="cursor-pointer" />
            </template>
          </q-input>

          <q-separator class="q-my-md" />

          <div v-if="responseSearch && responseSearch.length > 0">
            <q-list v-for="(val, i) in responseSearch" :key="i">
              <q-item clickable>
                <q-item-section top avatar>
                  <q-avatar>
                    <q-img v-if="val.profile" :src="val.profile" />
                    <q-icon else name="account_circle" color="grey" size="xl" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ val.username }}</q-item-label>
                  <q-item-label caption>{{ val.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-else-if="responseSearch && responseSearch.length <= 0">No matching data found.</div>
          <div v-else>No recent searches.</div>
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
      modelSearch: null,
      responseSearch: null,
      searchIcon: 'close'
    }
  },
  created() {
    if(this.$route.name === this.model.slug) this.isActive = true
  },

  watch: {
    'modelSearch'() {
      if(!this.modelSearch || this.modelSearch === '') this.clearSearch()
    }
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
          this.modelSearch = null
          this.responseSearch = null
          this.searchModal = !this.searchModal
        }
      }
    },

    clearSearch() {
      this.responseSearch = null
      this.modelSearch = null
    },
    
    onSearch() {
      this.searchIcon = 'pending'
      this.responseSearch = null
      const baseUrlApi = this.$Helper.getBaseUrlApi()
      let endpoint = `${baseUrlApi}/api/users?search=${this.modelSearch}`
      this.$axios.get(endpoint).then((response) => {
        if(response.status === 200) {
          const data = response.data.data
          this.responseSearch = data
          this.searchIcon = 'close'
        }
      })
    }
  }
}
</script>
