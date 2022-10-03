import Mock from 'mockjs'
import homeApi from './mockServerDate/home'
import userApi from './mockServerDate/user'
import permissionApi from './mockServerDate/permission'

Mock.mock('/getDate',homeApi.getStatisticalData)
// Mock.mock('/api/user/getUser',userApi.getUserList)

Mock.mock(/user\/add/,'post', userApi.createUser)
Mock.mock(/user\/edit/,'post', userApi.updateUser)

Mock.mock(/user\/getUser/,'get', userApi.getUserList)
Mock.mock(/user\/del/,'post', userApi.deleteUser)
// 权限相关
Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)