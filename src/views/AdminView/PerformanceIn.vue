<template>
  <div style="width:100%;height:100%; background-color: white;">
      <span>
<!--  前端页面导入文件的入口-->
        <input
            class="input-file"
            type="file"
            @change="exportData"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
        <button @click="btnClick">导入EXCEL</button>
      </span>
<!--    导入文件后需要渲染的表格-->
    <!-- 表格组件 -->
    <div class="myTable">
      <el-table
          max-height="600"
          :data="dataArr"
          v-loading="tableLoading"
          border
          style="width: 100%"
      >
        <el-table-column
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            v-for="(item, i) in tableColumn"
            :key="i"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import XLSX from 'xlsx'
import * as xlsx from 'xlsx'
import {PERFORMANCE_IN} from "@/apis";
import {PerformaceInport} from "@/network/admin";

export default {
  name: 'HelloWorld',
  props: {
    type: String,
    default: '选择excel文件'
  },
  data () {
    return {
      dataArr: [], // 表格内容数据数组
      // countArr: {}, // 分析表格数据以及表头，得到一个对照数组，用来进行自定义合并，本文暂时只写基础，不介绍自动合并单元格了哟~~我的其他文章有写自定义合并实现方法~
      tableColumn: [], // 表格表头配置数组
      tableLoading: false ,// 表格是否loading
      excellist:[]
    }
  },
  methods: {
    // 点击上传文件事件
    btnClick () {
      document.querySelector('.input-file').click()
    },
    PerformanceLoad(list){
      PerformaceInport(list).then(_res =>{
        if(_res.message === 'Success'){
          this.$message.success("上传成功！");
        }
        else{
          this.$message.error("上传失败！");
        }
      })
    },

    //  获取表格表头

    getHeader (sheet) {
      const XLSX = xlsx
      const headers = []
      const range = XLSX.utils.decode_range(sheet["!ref"]) // worksheet['!ref'] 是工作表的有效范围
      let C
      /* 获取单元格值 start in the first row */
      const R = range.s.r // 行 // C 列
      let i = 0
      for (C = range.s.c; C <= range.e.c; ++C) {
        var cell =
            sheet[
                XLSX.utils.encode_cell({ c: C, r: R })
                ] /* 根据地址得到单元格的值find the cell in the first row */
        var hdr = "UNKNOWN" + C // 如果有空表头，会替换为您想要的默认值replace with your desired default
        // XLSX.utils.format_cell 生成单元格文本值
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        if (hdr.indexOf('UNKNOWN') > -1) {
          if (!i) {
            hdr = '__EMPTY'
          } else {

            hdr = '__EMPTY_' + i
          }
          i++
        }
        headers.push(hdr)
      }
      return headers
    },
    // 获取表格内容
    setTable (headers, excellist) {
      const tableTitleData = [] // 存储表格表头数据
      const tableMapTitle = {} // 设置表格内容中英文对照用
      headers.forEach((_, i) => {
        tableMapTitle[_] = "prop" + i
        tableTitleData.push({
          prop: "prop" + i,
          label: _,
          width: 100
        })
      })
      console.log("tableTitleData", tableTitleData)
      // 映射表格内容属性名为英文
      const newTableData = []
      excellist.forEach(_ => {
        const newObj = {}
        Object.keys(_).forEach(key => {
          newObj[tableMapTitle[key]] = _[key]
        })
        newTableData.push(newObj)
      })
      console.log('newTableData', newTableData)
      this.tableColumn = tableTitleData
      this.dataArr = newTableData
      this.excellist = excellist
      this.PerformanceLoad(excellist)
    },

    //  读取文件
    exportData (event) {
      if (!event.currentTarget.files.length) {
        return
      }
      const that = this
      // 拿取文件对象
      var f = event.currentTarget.files[0]
      // 用FileReader来读取
      var reader = new FileReader()
      // 重写FileReader上的readAsBinaryString方法
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = ''
        var wb // 读取完成的数据
        var outdata // 你需要的数据
        var reader = new FileReader()
        reader.onload = function (e) {
          // 读取成Uint8Array，再转换为Unicode编码（Unicode占两个字节）
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          // 接下来就是xlsx了，具体可看api
          wb = xlsx.read(binary, {
            type: 'binary'
          })
          outdata = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          const excellist = [] //清空接收数据
          // 自定义方法向父组件传递数据
          // console.log('outdata = ' + JSON.stringify(outdata))
          for (var i = 0; i < outdata.length; i++) {
            console.log(outdata[i])
            excellist.push(outdata[i])
          }
          console.log("读取结果", excellist)
          that.$emit('getResult', outdata)
          const a = wb.Sheets[wb.SheetNames[0]]
          const headers = that.getHeader(a)
          console.log("headers", headers)
          that.setTable(headers, excellist)
        }
        reader.readAsArrayBuffer(f)
      }
      reader.readAsBinaryString(f)
    }
  }
}
</script>

<style scoped>
.input-file {
  display: none;
}
</style>
