<template>
  <q-layout view="hHh lpR fFf">

      <q-drawer show-if-above v-model="sidebarExpand.left" side="left" bordered>
        <q-list class="q-pa-sm">
          <q-item-label header>
            <q-img src="~assets/logo.png" width="45%" />
          </q-item-label>
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
      }
    }
  },

  created() {
    this.essentialLink = [
      { label: 'home', icon: 'home', url: 'home' },
      { label: 'search', icon: 'search', url: 'search' },
      { label: 'explore', icon: 'explore', url: 'explore' },
      { label: 'reels', icon: 'slideshow', url: 'reels' },
      { label: 'messages', icon: 'chat', url: 'messages' },
      { label: 'notifications', icon: 'favorite', url: 'notifications' },
      { label: 'create', icon: 'add_box', url: 'create' },
      { label: 'profile', icon: 'explore', url: 'profile' },
      { label: 'settings', icon: 'settings', url: 'settings' },
      { label: 'your activity', icon: 'update', url: 'your activity' },
      { label: 'saved', icon: 'bookmark', url: 'saved' },
      { label: 'switch appearance', icon: 'dark_mode', url: 'saved' },
      { label: 'logout', icon: 'logout', url: 'logout' },
    ]
  },

  methods: {
    toggleLeftDrawer() {
      this.sidebarExpand.left = !this.sidebarExpand.left
    }
  }
}
</script>