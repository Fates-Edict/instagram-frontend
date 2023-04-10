<template>
	<div class="row justify-center q-pa-xl">
		<q-card class="col-10 col-md-4 col-lg-3 q-py-xl" flat bordered square>
      <q-card-section class="text-center">
				<q-img src="~assets/logo.png" width="200px" />
      </q-card-section>
			<q-card-section>
				<q-form @submit="login" class="row q-px-xl justify-center">
					<q-input class="col-12 col-lg-8" filled square dense color="grey-7" v-model="dataModel.credential" label="Phone Number / Username" :error="errors.credentials ? true : false" :error-message="errors.credentials" />
					<q-input :type="visiblePassword ? 'text' : 'password'" class="col-12 col-lg-8" filled square dense color="grey-7" v-model="dataModel.password" label="Password" :error="errors.password ? true : false" :error-message="errors.password">
						<template v-slot:append>
							<q-icon v-if="!visiblePassword" name="visibility" @click="visiblePassword = !visiblePassword" style="cursor: pointer" />
							<q-icon v-else name="visibility_off" @click="visiblePassword = !visiblePassword" style="cursor: pointer" />
						</template>
					</q-input>
					<q-btn label="Log in" no-caps unelevated color="primary" class="col-12 col-lg-8" type="submit" />
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
		useMeta(() => {
			return {
				title: 'Login'
			}
		})
	},
	methods: {
		login() {
			this.$axios.post('http://127.0.0.1:8000/api/authenticate', this.dataModel)
			.then((response) => {
				if(response.status === 200) {
					console.log(response)
					// this.$Helper.showNotify(response.data.data)
				}
			})
			.catch((error) => {
				if(error.response.status === 404) {
					this.$Helper.showNotify(error.response.data.message, '', 'red', 'sms_failed')
					const e = error.response.data.data
					e.credential ? this.errors.credentials = e.credential : this.errors.credentials = null
					e.password ? this.errors.password = e.password : this.errors.password = null
				}
			})
		}
	}
}
</script>