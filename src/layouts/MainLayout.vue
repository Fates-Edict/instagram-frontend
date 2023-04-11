<template>
  <q-layout view="hHh lpR fFf">

      <q-drawer show-if-above v-model="sidebarExpand.left" side="left" bordered :mini="miniState" :width="350" :mini-width="100">
        <q-list class="q-pa-sm">
          <q-item v-if="!miniState" clickable dark class="q-pa-lg" @click="$router.push({ name: 'home' })">
            <q-img src="~assets/logo.png" width="45%" />
          </q-item>
          <q-item v-else clickable dark class="q-pa-lg" @click="$router.push({ name: 'home' })">
            <q-img src="~assets/icon.png" width="45%" />
          </q-item>
        </q-list>
        <q-scroll-area :style="'height: ' + ($q.screen.height - 120) + 'px'" class="q-px-md">
          <EssentialLink v-for="(val, i) in essentialLink" :key="i" :model="val" />
        </q-scroll-area>
      </q-drawer>

      <q-drawer show-if-above v-model="sidebarExpand.right" side="right" bordered>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>

    </q-layout>
</template>

<script>
import EssentialLink from '../components/EssentialLink.vue'

export default {
  name: 'MainLayout',
  components: {
    EssentialLink
  },

  data() {
    return {
      essentialLink: null,
      sidebarExpand: {
        left: false,
        rght: false
      },
      miniState: false
    }
  },

  mounted() {
    window.addEventListener('mini-local-storage-changed', (event) => {
      if(event.detail.storage) this.miniState = true
      else this.miniState = false
    })
  },

  watch: {
    '$q.screen.width'() {
      if(this.$q.screen.width > 760 && this.$q.screen.width < 1360) this.miniState = true
      else this.miniState = false
    }
  },

  created() {
    this.essentialLink = [
      { label: 'home', slug: 'home', icon: 'home', url: 'home' },
      { label: 'search', slug: 'search', icon: 'search', url: 'search' },
      { label: 'explore', slug: 'explore', icon: 'explore', url: 'explore' },
      { label: 'reels', slug: 'reels', icon: 'slideshow', url: 'reels' },
      { label: 'messages', slug: 'messages', icon: 'chat', url: 'messages' },
      { label: 'notifications', slug: 'notifications', icon: 'favorite', url: 'notifications' },
      { label: 'create', slug: 'create', icon: 'add_box', url: 'create' },
      { label: 'profile', slug: 'profile', icon: 'explore', url: 'profile' },
      { label: 'settings', slug: 'settings', icon: 'settings', url: 'settings' },
      { label: 'your activity', slug: 'activities', icon: 'update', url: 'your activity' },
      { label: 'saved', slug: 'saved', icon: 'bookmark', url: 'saved' },
      { label: 'switch appearance', slug: 'switch', icon: 'dark_mode', url: 'saved' },
      { label: 'logout', slug: 'logout', icon: 'logout', url: 'logout' },
    ]
  },

  methods: {
    toggleLeftDrawer() {
      this.sidebarExpand.left = !this.sidebarExpand.left
    }
  }
}
</script>