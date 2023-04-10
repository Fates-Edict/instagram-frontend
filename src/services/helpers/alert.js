import { Notify } from "quasar"

export default {
	showNotify(message = '', caption = '', color = 'primary', icon = 'check', position = 'bottom') {
		Notify.create({
			message,
			icon,
			color,
			position,
			caption
		})
	}
}