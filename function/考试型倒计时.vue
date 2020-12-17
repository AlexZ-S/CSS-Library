<template>
        <div class="MyText1ConRight_Top">
          <p><i class="el-icon-time"></i> {{ `${hr}: ${min}: ${sec}` }}</p>
          <el-button v-show="isshow1" @click="begin" round type="primary">开始答题</el-button>
          <el-button v-show="!isshow1" @click="open" round type="danger">交卷</el-button>
        </div>
</template>

<script>
  export default {
    data() {
      return {
        isshow1: true,
      }
    },
    methods: {
      begin() {
        this.time = (Date.parse(new Date()) + ((3.5 * 60 * 60)) * 1000);
        this.countdown();
        this.isshow1 = false;

        this.$message({
          type: 'success',
          message: '开始答题'
        });
      },
      countdown() {
        const end = this.time; // 定义开始时间且延长1小时
        const now = Date.parse(new Date()); // 获取本地时间
        const msec = end - now;
        // 将时间戳进行格式化00：00的形式
        let hr = parseInt(msec / 1000 / 60 / 60 % 24);
        let min = parseInt(msec / 1000 / 60 % 60);
        let sec = parseInt(msec / 1000 % 60);
        // 倒计时结束时的操作
        const that = this;
        if (this.hr == 0 && this.min == 0 && this.sec == 0) {
          console.log('时间已经结束，答题完毕');
          this.hr = 3;
          this.min = 30;
          this.sec = 0;
        } else {
          this.hr = hr > 9 ? hr : '0' + hr;
          this.min = min > 9 ? min : '0' + min;
          this.sec = sec > 9 ? sec : '0' + sec;
          setTimeout(that.countdown, 1000)
        }
      },
      open() {
        this.$confirm('即将结束答卷, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((action) => {
          if (action === 'confirm') {
            this.hr = 0;
            this.min = 0;
            this.sec = 0;
            console.log(this.hr + ',' + this.min + ',' + this.sec);
            this.isshow1 = true;
          }
          this.$message({
            type: 'success',
            message: '交卷成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消交卷'
          });
        });

      }
    }
  }
</script>