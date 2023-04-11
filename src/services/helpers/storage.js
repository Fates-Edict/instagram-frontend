import { LocalStorage } from "quasar"

export default {
	storeLocalStorage(key, value) {
		let result = false
		if(key && value) {
			LocalStorage.set(key, value)
			result = true
		}
		return result
	},

	checkLocalStorage(key) {
		let result = false
		if(LocalStorage.has(key)) result = true
		return result
	},

	destroyLocalStorage(key) {
		let result = false
		if(LocalStorage.has(key)) {
			LocalStorage.remove(key)
			result = true
		}

		return result
	},

	getLocalStorage(key) {
		let result = false
		if(LocalStorage.has(key)) {
			result = LocalStorage.getItem(key)
		}
		return result
	},

	updateLocalStorage(key, value) {
		if(LocalStorage.has(key)) LocalStorage.set(key, value)
	},

	isLoggedIn() {
		let result = false
		const check = this.checkLocalStorage('token')
		if(check) result = true
		return result
	}
}