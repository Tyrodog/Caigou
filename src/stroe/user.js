export default {
    namespaced: true,
    actions: {},
    mutations: {
        addUser(state){
            state.isShow = true
            state.operateType = 'add'
            state.operateForm = {
                name:'',
                addr:'',
                age:'',
                birth:'',
                sex:''
            }
        }
    },
    state: {
        operateType: 'add',
        isShow: false,
        operateFormLabel: [
            {
                model: 'name',
                label: '姓名',
                type: 'input'
            },
            {
                model: 'age',
                label: '年龄',
                type: 'input'
            },
            {
                model: 'sex',
                label: '性别',
                type: 'select',
                opts: [
                    {
                        label: '男',
                        value: 1
                    },
                    {
                        label: '女',
                        value: 0
                    }
                ]
            },
            {
                model: 'birth',
                label: '出生日期',
                type: 'date'
            },
            {
                model: 'addr',
                label: '地址',
                type: 'input'
            }
        ],
        operateForm: {
            name: '',
            addr: '',
            age: '',
            birth: '',
            sex: ''
        },
        formLabel: [
            {
                model: 'keyword',
                label: '',
                type: 'input',
            }
        ]
        ,
        searchForm: {
            keyword: ''
        },
    },
    getters: {}
}