import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/',
              name: 'Home',
              label: '首页',
              icon: 's-home',
              url: 'CommonHome.vue'
            },
            {
              path: '/mall',
              name: 'Mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mall/Mall.vue'
            },
            {
              path: '/user',
              name: 'User',
              label: '用户管理',
              icon: 'user',
              url: 'User/User.vue'
            },
            {
              label: '其他',
              icon: 'location',
              children: [
                {
                  path: '/page1',
                  name: 'Page1',
                  label: '页面1',
                  icon: 'setting',
                  url: 'Page/Page1.vue'
                },
                {
                  path: '/page2',
                  name: 'Page2',
                  label: '页面2',
                  icon: 'setting',
                  url: 'Page/Page2.vue'
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/',
              name: 'Home',
              label: '首页',
              icon: 's-home',
              url: 'CommonHome.vue'
            },
            {
              // path: '/video',
              // name: 'video',
              path: '/mall',
              name: 'Mall',
              label: '商品管理',
              icon: 'video-play',
              url: 'Mall/Mall.vue'
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}    