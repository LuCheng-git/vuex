<template>
  <div class="box">
    <video 
      src="../assets/cover.mp4"  
      ref="v1" 
      @durationchange="durationchangeEvent"
      @timeupdate= "timeupdateEvent"
      @canplay= "canplayEvent1"
      @ended="endedEvent"
      style="display:none;width:1920px;height:1080px"
    ></video>
    <video 
      src="../assets/movie.mp4"  
      ref="v2" 
      @durationchange="durationchangeEvent2"
      @timeupdate= "timeupdateEvent2"
      @canplay= "canplayEvent2"
      @ended="endedEvent2"
      style="display:none;width:1920px;height:1080px"
      ></video>
    <canvas ref="canvas" class="canvas" width="1200px" height="360px">
    </canvas>
    <!-- <el-progress ref="progress" :percentage="percent" @click.native="clickFn($event)" :stroke-width="30" :text-inside="true"></el-progress> -->

    <div class="video-control" >
          <span
            class="timing"
          >{{ videoNum}}/{{ durationTime}}</span>
          <!-- <div class="control-controller">
            <svg-icon class="icon-class" iconClass="player-control-rewind" @click.native="rewindEvent" />
            <span class="is-video-play-icon" @click="switchVideoPlayEvent">
              <svg-icon
                class="icon-class"
                iconClass="player-control-play"
                v-show="isSwitchVideoPlay"
              />
              <svg-icon
                class="icon-class"
                iconClass="player-control-pause"
                v-show="!isSwitchVideoPlay"
              />
            </span>
            <svg-icon class="icon-class" iconClass="player-control-forward" @click.native="forwardEvent" />
          </div> -->
          <div class="control-slider">
            <el-slider
              v-model="videoNum"
              :max="durationTime"
              @input="changeSliderProgressEvent"
              
            ></el-slider>
          </div>
          <div class="control-voice">
            <!-- <div class="voice-icon" @click="muteEvent">
              <svg-icon class="icon-class" iconClass="player-control-mute" v-show="!isMute" />
              <svg-icon class="icon-class" iconClass="player-control-volume" v-show="isMute" />
            </div> -->
            <!-- <div class="voice-slider">
              <el-slider v-model="voiceNum" @input="changeSliderVoiceProgressEvent"></el-slider>
            </div> -->
          </div>
        </div>
        
        <div @click="isBegin()" style="width:100px;height:100px;background:red">开始暂停</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      //视频进度条的时长
      videoNum:0,
       // 当前时间
      currentTime:  0,
      currentTime1: 0,
      currentTime2: 0,
      //总时长
      durationTime: 0,
      durationTime1: 0,
      durationTime2: 0,
      //是否能可以播放
      isPlay: false,
      //当前videoDom
      v1: '',
      v2: '',
      //视频是否加载完成
      v1Ready: false,
      v2Ready: false,
      // 开关
      bg:true
    }
  },

  // computed:{
  //   currentTime:{
  //     get: function() {
  //       return this.videoNum
  //     },
  //     set: function(){
  //       return this.videoNum
  //     }
  //   },
  // },
  async mounted(){
    this.readyToPlayVideo()
    //绘制视频
    this.canvasFun()
  },
  methods:{
    //暂停，开始
    isBegin(){
      if(this.bg ){
        this.v1.pause()
        this.v2.pause()
        this.bg = !this.bg
        console.log(this.bg)
      }else{
        this.v1.play()
        this.v2.play()
        this.bg = !this.bg
        console.log(this.bg)
      }
      
    },

    async canvasFun(){
      let canvas = this.$refs.canvas
      this.v1 = this.$refs.v1
      this.v2 = this.$refs.v2
      // console.log(canvas,this.v1,this.v2)
      //二维上画
      let ctx = canvas.getContext('2d');

      // console.log(ctx)
      // this.v1.addEventListener('loadedmetadata', function(e) {
      // console.log('提示视频的元数据已加载')
      // console.log(e)
      // console.log(e.target.duration)
      // })
      // this.v1.addEventListener('durationchange', function(e) {
      // console.log('提示视频的时长已改变')
      // console.log(e)
      // console.log(this.v1.duration)          
      // })
      // this.v1.play()
      // this.v2.play();

      // this.readyToPlayVideo()
 
      // 如果都加载完成两个视频播放
      // if(this.isPlay){
      //   this.v1.play()
      //   this.v2.play()
      // }else{
      //   this.v1.pause()
      //   this.v2.pause()
      // }

      //确定用总时长，当前时长
      this.durationTime = this.durationTime1 > this.durationTime2 ? this.durationTime1 : this.durationTime2
      // console.log(this.durationTime,'总时长')
      this.currentTime = this.durationTime1 > this.durationTime2 ? this.v1.currentTime : this.v2.currentTime
      // console.log(this.currentTime,'当前时长')
      this.videoNum = this.currentTime
      this.currentTime1 = this.currentTime
      this.currentTime2 = this.currentTime
      

      let ratio = this.getPixelRatio(ctx);

      // this.currentTimeV1 = this.v1.currentTime
      // this.currentTimeV2 = this.v2.currentTime
      ctx.clearRect(0, 0,canvas.width,canvas.height)
			ctx.drawImage(this.v1, 0, 0,(canvas.width/2 -10)*ratio,canvas.height*ratio)  //绘制视频
      ctx.drawImage(this.v2, canvas.width/2, 0 ,(canvas.width/2 -10)*ratio,canvas.height*ratio)
      // let currentPercent = this.currentTimeV1
      // this.percent = currentPercent
      requestAnimationFrame(this.canvasFun)
      
    },

    //两个视频都加载完成了
    async readyToPlayVideo(){
      // console.log(this.isPlay,'是否能播放',new Date())
      await this.canplayEvent1()
      await this.canplayEvent2()
      this.isPlay = (this.v1Ready && this.v2Ready && this.v1 && this.v2)   
      // console.log(this.isPlay,'是否能播放',new Date())

      // 如果都加载完成两个视频播放
      if(this.isPlay){
        this.v1.play()
        this.v2.play()
      }else{
        this.v1.pause()
        this.v2.pause()
      }
    },

    //是否都加载完成
    canplayEvent1(){
      this.v1Ready = true
      // console.log('v1加载完成',new Date(),this.v1Ready)
    },
    canplayEvent2(){
      this.v2Ready = true
      //  console.log('v2加载完成',new Date(),this.v2Ready)
    },

    //获得设备像素比
    getPixelRatio(context) {
    var backingStore = context.backingStorePixelRatio 
    || context.webkitBackingStorePixelRatio 
    || context.mozBackingStorePixelRatio 
    || context.msBackingStorePixelRatio 
    || context.oBackingStorePixelRatio 
    || context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
 
    },


  // 播放位置发生改变时触发
    timeupdateEvent(val) {
      this.currentTime1 = val.target.currentTime
      // console.log(this.currentTime1,'111111111111111111')
  },

  timeupdateEvent2(val) {
      this.currentTime2 = val.target.currentTime
      // console.log(this.currentTime2,'22222222222222')
  },

   

    //时长数据发生变化时
    durationchangeEvent() {
      this.durationTime1 = this.v1.duration
      console.log(this.durationTime1,'==================')
    
  },

    durationchangeEvent2(){
      this.durationTime2 = this.v2.duration
      console.log(this.durationTime2,'-----------------')
    },

    //改变slider改变视频当前时间
    async changeSliderProgressEvent(val) {
    this.isPlay=false
    console.log(val,this.currentTime,this.videoNum,'uuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
    this.currentTime = val;
    this.currentTime1 = val;
    this.currentTime2 = val;
    this.videoNum = val;
    // this.v1.play();
    // this.v2.play();
  },
    
    //播放完成
    endedEvent(){
      this.v1.pause()
    },
    endedEvent2(){
      this.v2.pause()
    }
  },

  watch:{

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.canvas {
    
        }

 /* .video-control {
    height: 50px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;
    .timing {
      flex: 2;
    }
    .control-controller {
      flex: 1;
      .is-video-play-icon {
        padding: 0 10px;
      }
    }
    .control-slider {
      flex: 4;
    }
    .control-voice {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      .voice-slider {
        width: 70%;
        /deep/ .el-slider{
          .el-slider__runway{
            height:3px;
            width:85%;
            .el-slider__bar{
              height:3px;
            }
            .el-slider__button-wrapper{
              top:-16px;
              .el-slider__button{
                height:8px;
                width:8px;
              }
            }
          }
        }
      }
    }
    .icon-class {
      font-size: 16px;
      color: #fff;
      cursor: pointer;
    }
  } */



</style>
