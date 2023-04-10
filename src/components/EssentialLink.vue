<template>
  <q-item clickable style="border-radius: 25px;">
    <q-item-section v-if="model.icon" avatar>
      <q-icon :name="model.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-capitalize">{{ model.label }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'EssentialLink',
  props: [ 'model' ]
}
</script>
