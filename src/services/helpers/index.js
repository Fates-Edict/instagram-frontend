import alert from './alert'
import storage from './storage'
import config from './config'

export const Helper = {
  ...alert,
  ...storage,
  ...config
}