import { boot } from "quasar/wrappers";
import { Helper } from '../services/helpers/index'

export default boot(({ app }) => {
	app.config.globalProperties.$Helper = Helper
})