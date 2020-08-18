<template>
    <div class="search-contain">
        <div class="search-top">
            <h4>{{searchInfo.title}}</h4>
            <span>操作日志导出</span>
        </div>
        <div class="search-content">
            <el-form ref="form" :model="searchForm" label-width="80px" inline>

                <el-form-item label="时间：" prop="searchTime">
                    <el-date-picker
                            v-model="searchForm.searchTime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>


                <el-form-item label="操作人：" prop="operator">
                    <el-select v-model="searchForm.operator" placeholder="请选择" filterable>
                        <el-option label="全部" value=""></el-option>
                        <el-option :label="item.name" :value="item.accountId" v-for="item in operators"
                                   :key="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作：" prop="operation">
                    <el-select v-model="searchForm.operation">
                        <el-option label="全部" value=""></el-option>
                        <el-option :label="item.description" :value="item.operation" v-for="item in operations"
                                   :key="item.operation"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="搜索：" prop="searchValue" v-if="searchInfo.keywords!=='ACCOUNT'">
                    <el-input v-model="searchForm.keywords" :placeholder="searchInfo.searchPlaceholder"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">搜索</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {httpGet} from '@/utils/http.ts';
    import moment from 'moment';

    export default {
        name: "search",
        data() {
            return {
                searchInfo: {
                    title: '电子签约文件',                   //搜索对应的大标题
                    keywords: "CONTRACT",                  //多选框内容对应的关键词
                    searchPlaceholder: '印章名称/签约文件主题' //搜索组件中搜索框的placeholder
                },
                searchForm: {
                    searchTime: '',
                    operator: '',
                    operation: '',
                    keywords: ""
                },
                operators: [],  //操作人
                operations: []  //操作类型
            }
        },
        mounted() {
            //监听点击了左边的菜单栏
            this.$bus.$on('receiveMenuProps', (item) => {
                const {title, keywords, searchPlaceholder} = item;
                this.searchInfo = {title, keywords, searchPlaceholder}
                this.getSearchInfo();
                this.resetForm('form'); //切换左边菜单清空上次搜索内容
            })
            this.getSearchInfo()
        },
        methods: {
            // 1.获取搜索里面的内容
            async getSearchInfo() {
                const result = await httpGet('api/system/audit/operation', {
                    auditType: this.searchInfo.keywords,
                    companyId: '2697675620831965209'
                });
                const {operators, operations} = result?.data?.result;
                this.operators = operators;
                this.operations = operations;
            },
            // 2.提交搜索
            submitForm() {
                const {operator, operation, keywords} = this.searchForm;
                const finalSearchForm = {
                    operator,
                    operation,
                    keywords,
                    createTimeFrom: this.searchForm.searchTime ? moment(this.searchForm.searchTime[0]).format('YYYY-MM-DD+HH:mm:ss') : '',
                    createTimeTo: this.searchForm.searchTime ? moment(this.searchForm.searchTime[1]).format('YYYY-MM-DD+HH:mm:ss') : ''
                }
                this.$bus.$emit('doSearch', finalSearchForm);
            },
            //3.重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less">
    .search-contain {
        padding: 30px 0 30px 30px;
        border-bottom: 1px solid #e4e7ed;
        background-color: #ffffff;

        .search-top {
            display: flex;
            justify-content: space-between;

            h4 {
                font-size: 20px;
            }

            span {
                margin-right: 14px;
                margin-top: 7px;
                color: #2489f2;
            }

            margin-bottom: 30px;
        }

        .search-content {
            .el-form-item:nth-child(1) {
                .el-form-item__label {
                    width: 56px !important;
                }
            }

            .el-form-item:nth-child(2), .el-form-item:nth-child(3) {
                .el-select {
                    width: 130px;

                }
            }

            .el-form-item:nth-child(4) {
                margin-right: 20px;

                .el-input {
                    width: 180px;
                }
            }
        }
    }
</style>