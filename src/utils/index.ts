import Vue from 'vue'
const vm = new Vue();


// 1.深拷贝
export function deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

// 2.错误处理


export function handelError(message: string) {
    vm.$message.error(message);
}

