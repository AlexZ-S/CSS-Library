function<template>
    <div class="time-wrapper">
        <div class="time-hour">
            <span>{{hour}}</span>
        </div>
        <div class="time-separate">
            <span>:</span>
        </div>
        <div class="time-minute">
            <span>{{minute}}</span>
        </div>
        <div class="time-separate">
            <span>:</span>
        </div>
        <div class="time-second">
            <span>{{second}}</span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'TimeCountDown',
  data() {
    return {
      day: '0',
      hour: '0',
      minute: '0',
      second: '0',
    };
  },
  props: {
    dateNumber: {
      type: String,
      default: new Date().getTime(),
    },
  },
  methods: {
    countTime() {
      const nowDate = new Date();
      const endDate = new Date(this.dateNumber);
      const date = endDate - nowDate;
      if (date > 0) {
        this.day = this.checkedZero(Math.floor(date / 1000 / 60 / 60 / 24));
        this.hour = this.checkedZero(Math.floor((date / 1000 / 60 / 60) % 24));
        this.minute = this.checkedZero(Math.floor((date / 1000 / 60) % 60));
        this.second = this.checkedZero(Math.floor((date / 1000) % 60));
      }
      // console.log(this.day, this.hour, this.minute, this.second);
      setTimeout(this.countTime, 1000);
    },
    checkedZero(number) {
      if (number < 9) {
        // eslint-disable-next-line no-param-reassign
        number = `0${number}`;
      }
      return number;
    },
  },
  mounted() {
    this.countTime();
  },
};
</script>

<style lang="scss" scoped>
    .time-wrapper{
        @include flex(center);
        .time-hour,.time-minute,.time-second{
            text-align: center;
            width: 46px;
            height: 46px;
            background: #605751;
            span{
                color: $colorG;
                font-size: $fontE;
                line-height: 46px;
            }
        }
        .time-separate{
            text-align: center;
            width: 15px;
            height: 46px;
            span{
                line-height: 46px;
                color: #605751;
                font-size: $fontC;
                font-style: normal;
            }
        }
    }
</style>