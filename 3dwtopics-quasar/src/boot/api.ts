import { boot } from 'quasar/wrappers'
import { userService, currentUser } from '../services/user-service'
import { courseService } from '../services/course-service'
import { progressService } from '../services/progress-service'

export default boot(async ({ app }) => {
  // 初始化用戶服務
  await userService.initialize()
  
  // 如果用戶已登入，載入課程和進度數據
  if (currentUser.value) {
    await Promise.all([
      courseService.getCourses(),
      progressService.getProgress()
    ])
  }
  
  // 將服務注入到 app 中
  app.config.globalProperties.$userService = userService
  app.config.globalProperties.$courseService = courseService
  app.config.globalProperties.$progressService = progressService
}) 