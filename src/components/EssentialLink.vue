<template>
  <div>
    <q-item v-if="model.url !== 'search'" clickable :class="isActive ? 'text-bold': ''" style="border-radius: 25px;" @click="onClick(model)">
      <q-item-section v-if="model.icon" avatar>
        <q-icon :name="model.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-capitalize">{{ model.label }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item v-else clickable :class="isActive ? 'text-bold' : ''" style="border-radius: 25px;">
      <q-popup-proxy v-model="searchState">
        <q-banner>
          <template v-slot:avatar>
            <q-icon name="signal_wifi_off" color="primary" />
          </template>
          You have lost connection to the internet. This app is offline.
        </q-banner>
      </q-popup-proxy>
      <q-item-section v-if="model.icon" avatar>
        <q-icon :name="model.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-capitalize">{{ model.label }}</q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: [ 'model' ],
  data() {
    return {
      isActive: false,
      searchState: false
    }
  },
  created() {
    if(this.$route.name === this.model.slug) this.isActive = true
  },
  watch: {
    'searchState'() {
      if(this.searchState) {
        this.$Helper.destroyLocalStorage('mini')
        this.$Helper.storeLocalStorage('mini', true)
        window.dispatchEvent(new CustomEvent('mini-local-storage-changed', {
          detail: {
            storage: this.$Helper.getLocalStorage('mini')
          }
        }))
      } else {
        this.$Helper.updateLocalStorage('mini', false)
        window.dispatchEvent(new CustomEvent('mini-local-storage-changed', {
          detail: {
            storage: this.$Helper.getLocalStorage('mini')
          }
        }))
      }
    }
  },
  methods: {
    onClick(model) {
      if(model.url) {
        const url = model.url
        if(url === 'logout') {
          this.$Helper.destroyLocalStorage('token')
          this.$router.push({ name: 'login' })
        }
      }
    }
  }
}
</script>
