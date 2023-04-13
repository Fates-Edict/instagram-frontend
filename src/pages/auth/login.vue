<template>
	<div class="row justify-center q-pa-xl">
		<q-card class="col-10 col-md-4 col-lg-3 q-py-xl" flat bordered square>
      <q-card-section class="text-center">
				<q-img src="~assets/logo.png" width="200px" />
      </q-card-section>
			<q-card-section>
				<q-form @submit="login" class="row q-px-lg justify-center">
					<q-input class="col-12 col-md-8 col-lg-12" filled square dense color="grey-7" v-model="dataModel.credential" label="Phone Number / Username" :error="errors.credentials ? true : false" :error-message="errors.credentials" />
					<q-input :type="visiblePassword ? 'text' : 'password'" class="col-12 col-md-8 col-lg-12" filled square dense color="grey-7" v-model="dataModel.password" label="Password" :error="errors.password ? true : false" :error-message="errors.password">
						<template v-slot:append>
							<q-icon v-if="!visiblePassword" name="visibility" @click="visiblePassword = !visiblePassword" style="cursor: pointer" />
							<q-icon v-else name="visibility_off" @click="visiblePassword = !visiblePassword" style="cursor: pointer" />
						</template>
					</q-input>
					<q-btn label="Log in" no-caps unelevated color="primary" class="col-12 col-md-8 col-lg-12" type="submit" />
				</q-form>
			</q-card-section>
    </q-card>

		<div class="col-12 row justify-center q-py-md">
			<q-card class="col-10 col-md-4 col-lg-3 q-px-xl q-py-sm" flat bordered square>
				<q-card-section class="text-center">
					Don't have an account? <q-btn flat label="Sign up" no-caps color="primary" @click="$router.push({ name: 'register' })" />
				</q-card-section>
			</q-card>
		</div>
	</div>
</template>
<script>
import { useMeta } from 'quasar'
export default {
	name: 'LoginPage',
	data() {
		return {
			dataModel: {
				credential: null,
				password: null
			},
			errors: {
				credentials: null,
				password: null
			},
			visiblePassword: false
		}
	},
	created() {
		const isLoggedIn = this.$Helper.isLoggedIn()
		if(isLoggedIn) {
			this.$router.push({ name: 'home' })
		}
		useMeta(() => {
			return {
				title: 'Login'
			}
		})
	},
	methods: {
		// isLoggedIn() {
		// 	this.$Helper.checkLocalStorage()
		// 	// 1. Ketika akses halaman login cek dulu ada token atau ngga
		// 	// 2. Kalau gaada biarin
		// 	// 3. Kalau ada, ambil token, lalu check kebenaran token dan expirednya
		// 	// 4. Kalau ok redirect ke halaman utama
		// 	// 5. Kalau tokennya salah, hapus token & stay di halaman login
		// },
		login() {
			this.$axios.post('http://127.0.0.1:8000/api/authenticate', this.dataModel)
			.then((response) => {
				const data = response.data.data
				if(response.status === 200 && data.token) {
					const token = data.token
					const user = data.data
					this.$Helper.storeLocalStorage('token', token)
					this.$Helper.storeLocalStorage('profile', user)
					this.$router.push({ name: 'home' })
				}
			}).catch((error) => {
				if(error.response.status === 404)  {
					this.$Helper.showNotify(error.response.data.message, '', 'red', 'sms_failed')
					const e = error.response.data.data
					e.credential ? this.errors.credentials = e.credential : this.errors.credentials = null
					e.password ? this.errors.password = e.password : this.errors.password = null
				} else if(error.response.status === 400) {
					this.$Helper.showNotify(error.response.data.data, '', 'red', 'sms_failed')
					const e = error.response.data.message
					e.credential ? this.errors.credentials = e.credential[0] : this.errors.credentials = null
					e.password ? this.errors.password = e.password[0] : this.errors.password = null
				}
			})
		}
	}
}
</script>