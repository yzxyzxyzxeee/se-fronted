<template>

  <el-row>

    <el-col :span="24" style="padding-left: 5px">
      <el-card style="height: 80px">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="选择月份">
            <el-input v-model="form.month" placeholder="请输入月份"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>


    <el-col :span="24" style="padding-left: 5px">
      <div class="graph">

        <el-card style="height: 260px">
          <div ref="what" style="height: 260px">
            <el-table
                height="250"
                :data="tableData"
                style="width: 100%">
              <el-table-column
                  prop="project"
                  label="绩效项目"
                  width="100">
              </el-table-column>
              <el-table-column
                  prop="score"
                  label="分数"
                  width="80">
              </el-table-column>
            </el-table>

          </div>
        </el-card>

        <!-- 雷达图 -->
        <el-card style="height: 260px">
          <div ref="echarts2" style="height: 240px"></div>
        </el-card>
      </div>

      <el-card style="height: 280px">
        <!-- 折线图 -->
        <span>当年月份绩效图</span>
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>

    </el-col>
  </el-row>
</template>

<script>
import { getData,getMonthData } from '../api'
import * as echarts from 'echarts'
import {getPerformanceByname} from "@/network/staff";
export default {
  data(){
    return{
      form:{
        month:'',
        name:''
      },
      rules:{
        Fname1:[
          {required:true,message:'请选择年月'}
        ],
      },
      tableData:[],
      gData:[]
    }
  },
  methods:{
    onSubmit(){
      //折线图数据
      getData({params: {...this.form}}).then(({data}) => {
        //基于准备好的dom，初始化echats实例
        this.gData=data
        console.log(this.gData,"onsubmit_gData")
        var  echarts1=echarts.init(this.$refs.echarts1)
        //指定图表的配置项和数据
        var echarts1Option={}
        //处理数据xAxis
        const {orderData} = data.data
        const orderData2=data.data1
        const xAxisData ={
          data:orderData.date
        }
        echarts1Option.xAxis =xAxisData
        echarts1Option.yAxis={}
        //图例
        echarts1Option.series=[{
          name:"绩效",
          data:orderData.data.map(item => item["绩效"]),
          type:'line'
        }]



        //根据刚刚指定的配置项和数据显示图表
        echarts1.setOption(echarts1Option)

        //雷达图
        //基于准备好的dom，初始化echats实例
        var  echarts2=echarts.init(this.$refs.echarts2)
        //指定图表的配置项和数据
        var echarts1Option1={}
        echarts1Option1.serious=[
          {
            name: '绩效',
            type: 'radar',
            data: [orderData2]
          }
        ]
      })
    },
  },

  mounted(){

    let name1=sessionStorage.getItem("name")
    this.form.name=name1
    getPerformanceByname({params: {...this.form}}).then(({data}) => {
      this.gData=data
      console.log(this.gData.data1.value[0],"mounted_gData")
      console.log({...this.form},"lyh")

      let a=["团队合作意识","自主学习能力","创造和灵活性","按时完成工作","出勤率"]
      for(let i=0;i<5;i++)
      {
        this.tableData.push({project:a[i],score:this.gData.data1.value[0]})
      }

      console.log(this.tableData,"表单数据")

      const {orderData} = data.data
      const orderData2=data.data1
      console.log(orderData2,"orderData2")
      //折线图
      //基于准备好的dom，初始化echats实例
      console.log(orderData,"orderData")
      var  echarts1=echarts.init(this.$refs.echarts1)
      //指定图表的配置项和数据
      var option={}
      option = {
        legend: {
          orient: 'vertical',
          x:'right',      //可设定图例在左、右、居中
          y:'center',     //可设定图例在上、下、居中
          padding:[0,50,0,0],
          data: ['绩效' ]
        },
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: orderData.title
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: orderData.date
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10
          }
        ],
        series: [
          //真实数据
          {
            name: '绩效',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            },
            data: orderData.data.map(item => item["绩效"]),
          },
        ]
      };
      //根据刚刚指定的配置项和数据显示图表
      echarts1.setOption(option)

      //雷达图
      var  echarts2=echarts.init(this.$refs.echarts2)
      //指定图表的配置项和数据
      var option1={}
      option1 = {
        title: {
          text: '当月各项绩效'
        },
        legend: {
          data: ['绩效']
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'cooperation', max: 20 },
            { name: 'self_learning', max: 20 },
            { name: 'creativity', max: 20 },
            { name: 'work_on_scedule', max: 20 },
            { name: 'attendance', max: 20 },
          ]
        },
        series: [
          {
            name: '绩效',
            type: 'radar',
            data: [orderData2]
          }
        ]
      };
      console.log("好好好")
      echarts2.setOption(option1)

    }).catch(err=>{
      console.log(err,"err")
    })
  }



}
</script>


<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .el-card {
    width: 48%;
  }
}
</style>