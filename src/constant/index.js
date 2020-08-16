//配置整体左侧菜单栏
export const menuList = [
    {
        name: '首页',
        icon: '&#xe613;',
        router: '/home',
        children: []
    },
    {
        name: '文件',
        icon: '&#xe604;',
        router: '',
        children: [
            {name: '电子签约', router: ''},
            {name: '文件统计', router: ''}
        ]
    },
    {
        name: '印控',
        icon: '&#xe695;',
        router: '',
        children: [
            {name: '电子印章', router: ''}
        ]
    },
    {
        name: '组织',
        icon: '&#xe608;',
        router: '',
        children: [
            {name: '基本信息', router: ''},
            {name: '组织与成员', router: '/employee'},
            {name: '分支机构管理', router: ''},
            {name: '权限管理', router: ''},
            {name: '费用中心', router: ''}
        ]
    },
    {
        name: '配置',
        icon: '&#xe6d8;',
        router: '',
        children: [
            {name: '模板库配置', router: ''},
            {name: '业务流配置', router: ''}
        ]
    },
    {
        name: '审计',
        icon: '&#xe683;',
        router: '/audit',
        children: []
    }
]

// 审计功能左侧菜单栏
export const auditMenu = [
    {
        title: '电子签约文件',
        keywords: 'CONTRACT',
        searchPlaceholder: '印章名称/签约文件主题',
        tableTitles: [
            {name: '时间', prop: 'createTime'},
            {name: '操作人', prop: 'operator'},
            {name: '操作人IP', prop: 'operatorIp'},
            {name: '操作', prop: 'operationDesc'},
            {name: '操作对象', prop: 'entityName'},
            {name: '使用印章', prop: 'sealNames'},
            {name: '详细操作数据', prop: 'detailedOperation'}
        ]
    },
    {
        title: '物理用印申请',
        keywords: 'PHYSICAL',
        searchPlaceholder: '印章名称/用印申请主题',
        tableTitles: [
            {name: '时间', prop: 'createTime'},
            {name: '操作人', prop: 'operator'},
            {name: '操作人IP', prop: 'operatorIp'},
            {name: '操作', prop: 'operationDesc'},
            {name: '申请标题', prop: 'entityName'},
            {name: '使用印章', prop: 'sealNames'},
            {name: '详细操作数据', prop: 'detailedOperation'}
        ]
    },
    {
        title: '业务流配置',
        keywords: 'CATEGORY',
        searchPlaceholder: '业务分类名称',
        tableTitles: [
            {name: '时间', prop: 'createTime'},
            {name: '操作人', prop: 'operator'},
            {name: '操作人IP', prop: 'operatorIp'},
            {name: '操作', prop: 'operationDesc'},
            {name: '业务分类名称', prop: 'entityName'},
            {name: '详细操作数据', prop: 'detailedOperation'}
        ]
    },
    {
        title: '印章管理',
        keywords: 'SEAL',
        searchPlaceholder: '印章名称',
        tableTitles: [
            {name: '时间', prop: 'createTime'},
            {name: '操作人', prop: 'operator'},
            {name: '操作人IP', prop: 'operatorIp'},
            {name: '操作', prop: 'operationDesc'},
            {name: '印章名称', prop: 'entityName'},
            {name: '详细操作数据', prop: 'detailedOperation'}
        ]
    },
    {
        title: '权限管理',
        keywords: 'ROLE',
        searchPlaceholder: '角色名称',
        tableTitles: [
            {name: '时间', prop: 'createTime'},
            {name: '操作人', prop: 'operator'},
            {name: '操作人IP', prop: 'operatorIp'},
            {name: '操作', prop: 'operationDesc'},
            {name: '角色名称', prop: 'entityName'},
            {name: '详细操作数据', prop: 'detailedOperation'}
        ]
    },
    {
        title: '模板库管理',
        keywords: 'TEMPLATE',
        searchPlaceholder: '模板名称',
        tableTitles: [
            {name: '时间', prop: 'createTime'},
            {name: '操作人', prop: 'operator'},
            {name: '操作人IP', prop: 'operatorIp'},
            {name: '操作', prop: 'operationDesc'},
            {name: '模板名称', prop: 'entityName'},
            {name: '详细操作数据', prop: 'detailedOperation'}
        ]
    },
    {
        title: '组织与成员',
        keywords: 'EMPLOYEE',
        searchPlaceholder: '员工姓名',
        tableTitles: [
            {name: '时间', prop: 'createTime'},
            {name: '操作人', prop: 'operator'},
            {name: '操作人IP', prop: 'operatorIp'},
            {name: '操作', prop: 'operationDesc'},
            {name: '员工姓名', prop: 'entityName'},
            {name: '详细操作数据', prop: 'detailedOperation'}
        ]
    },
    {
        title: '账号登陆',
        keywords: 'ACCOUNT',
        searchPlaceholder: '',
        tableTitles: [
            {name: '时间', prop: 'createTime'},
            {name: '操作人', prop: 'operator'},
            {name: '操作人IP', prop: 'operatorIp'},
            {name: '操作', prop: 'operationDesc'},
            {name: 'IP地址', prop: 'entityName'},
            {name: '详细操作数据', prop: 'detailedOperation'}
        ]
    }
]

// 初始化表格查询数据
export const initQueryForm = {
    keyword: '',
    auditType: 'CONTRACT',
    operator: '',
    createTimeFrom: '',
    createTimeTo: '',
    operation: '',
    pageNo: 1,
    pageSize: 10,
    companyId: '2697675620831965209'
}

// 初始化表头数据
export const initTableTitles = [
    {name: '时间', prop: 'createTime'},
    {name: '操作人', prop: 'operator'},
    {name: '操作人IP', prop: 'operatorIp'},
    {name: '操作', prop: 'operationDesc'},
    {name: '操作对象', prop: 'entityName'},
    {name: '使用印章', prop: 'sealNames'},
    {name: '详细操作数据', prop: 'detailedOperation'}
]