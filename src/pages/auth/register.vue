<template>
	<div class="row justify-center q-pa-xl">
		<q-card class="col-10 col-md-4 col-lg-3 q-py-xl" flat bordered square>
      <q-card-section class="text-center">
				<q-img src="~assets/logo.png" width="200px" />
      </q-card-section>
			<q-card-section>
				<q-form @submit="register" class="row q-px-xl justify-center">
					<q-input class="col-12 col-lg-8" type="number" filled square dense color="grey-7" v-model="dataModel.phone" label="Phone Number" :error="errors.phone ? true : false" :error-message="errors.phone" />
					<q-input class="col-12 col-lg-8" filled square dense color="grey-7" v-model="dataModel.name" label="Full Name" :error="errors.name ? true : false" :error-message="errors.name" />
					<q-input class="col-12 col-lg-8" filled square dense color="grey-7" v-model="dataModel.username" label="Username" :error="errors.username ? true : false" :error-message="errors.username" />
					<q-input :type="!visiblePassword ? 'password' : 'text'" class="col-12 col-lg-8" filled square dense color="grey-7" v-model="dataModel.password" label="Password" :error="errors.password ? true : false" :error-message="errors.password">
						<template v-slot:append>
							<q-icon v-if="!visiblePassword" name="visibility" @click="visiblePassword = !visiblePassword" style="cursor: pointer" />
							<q-icon v-else name="visibility_off" @click="visiblePassword = !visiblePassword" style="cursor: pointer" />
						</template>
					</q-input>
					<q-btn label="Sign up" no-caps unelevated color="primary" class="col-12 col-lg-8" type="submit" :loading="btnLoading" />
				</q-form>
			</q-card-section>
    </q-card>

		<div class="col-12 row justify-center q-py-md">
			<q-card class="col-10 col-md-4 col-lg-3 q-px-xl q-py-sm" flat bordered square>
				<q-card-section class="row items-center justify-center">
					Already have an account? <q-btn flat label="Sign in" no-caps color="primary" @click="$router.push({ name: 'login' })" />
				</q-card-section>
			</q-card>
		</div>
	</div>
</template>
<script>
import { useMeta } from 'quasar'

export default {
	name: 'RegisterPage',
	data() {
		return {
			visiblePassword: false,
			btnLoading: false,
			dataModel: {
				phone: null,
				username: null,
				password: null,
				name: null
			},
			errors: {
				name: null,
				password: null,
				phone: null,
				username: null
			}
		}
	},
	created() {
		useMeta(() => {
			return {
				title: 'Register'
			}
		})
	},
	methods: {
		register() {
			this.btnLoading = !this.btnLoading
			this.$axios.post('http://127.0.0.1:8000/api/users', this.dataModel)
			.then((response) => {
				console.log(response)
				if(response.status === 201) {
					const data = response.data
					this.btnLoading = !this.btnLoading
					this.dataModel = { username: null, password: null, phone: null, name: null }
					this.$Helper.showNotify(data.message, 'You can login now.')
				}
			})
			.catch((error) => {
				if(error.response.status === 400) {
					this.btnLoading = !this.btnLoading
					const e = error.response.data.message
					e.name ? this.errors.name = e.name[0] : this.errors.name = null
					e.username ? this.errors.username = e.username[0] : this.errors.username = null
					e.password ? this.errors.password = e.password[0] : this.errors.password = null
					e.phone ? this.errors.phone = e.phone[0] : this.errors.phone = null
				}
			})
		}
	}
}
</script>