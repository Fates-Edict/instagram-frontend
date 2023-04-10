<template>
  <q-scroll-area :style="'height: ' + ($q.screen.height) + 'px'" :visible="false">
    <div class="q-py-xl q-px-md row">
      <div class="row q-px-xl">
        <div class="col-12 q-px-xl" v-for="val in 20" :key="val">
          <q-card class="q-px-xl" flat>
            <q-card-section class="q-px-none">
              <div class="row items-center no-wrap">
                <div class="col">
                  <div class="text-subtitle2">Mutaqin Yusuf</div>
                </div>

                <div class="col-auto">
                  <q-btn color="grey-7" round flat icon="more_vert">
                    <q-menu cover auto-close>
                      <q-list>
                        <q-item clickable>
                          <q-item-section>Remove Card</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Send Feedback</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>Share</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </q-card-section>

            <img src="https://cdn.quasar.dev/img/mountains.jpg">
            
            <q-card-section class="q-px-none">
              <q-btn flat round icon="favorite" />
              <q-btn flat round icon="sms" />
              <q-btn flat round icon="send" />
              <q-btn flat round icon="bookmark" />
            </q-card-section>

            <q-card-section class="q-pt-none">
              <p class="text-bold">219 likes</p>
              <p class="q-my-none">
                <span class="text-bold">Mutaqin Yusuf</span>
                <span class="q-ml-sm">Caption</span>
              </p>
              <q-btn label="View 21 comments" flat no-caps />
              <q-input v-model="text" label="Add a comment..." color="grey-6" dense />
            </q-card-section>

            <q-separator />
          </q-card>
        </div>
      </div>
    </div>
  </q-scroll-area>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
