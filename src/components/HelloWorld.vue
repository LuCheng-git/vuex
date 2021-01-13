<template>
  <div class="box">
    <video 
      src="../assets/cover.mp4"  
      ref="v1" 
      @loadeddata="durationchangeEvent"
      @timeupdate= "timeupdateEvent"
      @canplay= "canplayEvent1"
      style="display:none;width:1920px;height:1080px"
    ></video>
    <video 
      src="../assets/movie.mp4"  
      ref="v2" 
      @loadeddata="durationchangeEvent2"
      @canplay= "canplayEvent2"
      style="display:none;width:1920px;height:1080px"
      ></video>
    <canvas ref="canvas" class="canvas" width="1200px" height="360px">
    </canvas>
    <!-- <el-progress ref="progress" :percentage="percent" @click.native="clickFn($event)" :stroke-width="30" :text-inside="true"></el-progress> -->

    <div class="video-control" >
          <span
            class="timing"
          >{{ currentTime}}/{{ durationTime}}</span>
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
              v-model="percent"
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
        <svg-icon icon-class="volume" />
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
      timer:null,
      //视频进度条的时长
      percent:0,
       // 当前时间
      currentTime:  0,
      currentTimeV1:  0,
      currentTimeV2:  0,
      //总时长
      durationTime: 0,
      dT1:0,
      dt2:0,
      //当前videoDom
      v1:'',
      v2:'',
      //两个视频是否加载完成
      isloadV1:false,
      isloadV2:false,
    }
  },
  async mounted(){
    //重绘视频
    
    await this.canvasFun()

  },
  methods:{
    
    canvasFun(){
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
       
       let ratio = this.getPixelRatio(ctx);
        console.log(ratio)

        this.currentTimeV1 = this.v1.currentTime
        this.currentTimeV2 = this.v2.currentTime

        ctx.clearRect(0, 0,canvas.width,canvas.height)
				ctx.drawImage(this.v1, 0, 0,(canvas.width/2 -10)*ratio,canvas.height*ratio)  //绘制视频
        ctx.drawImage(this.v2, canvas.width/2, 0 ,(canvas.width/2 -10)*ratio,canvas.height*ratio)

        // let currentPercent = this.currentTimeV1
        // this.percent = currentPercent
     
        requestAnimationFrame(this.canvasFun)
      
    },

    //是否都加载完成


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

   
    // clickFn(e){
    //   console.log(e)
    //   let progress = this.$refs.progress
    //   console.log(progress)
    // },

    // 播放位置发生改变时触发
    timeupdateEvent(val) {
    this.currentTime = val.target.currentTime;
    this.percent = this.currentTime;
    console.log('111111111111111111')
  },

    //视频可以播放时触发
    canplayEvent1(){
      this.isloadV1 = true;
      console.log(new Date(),'QQQQQQQQQQQQQQQQQ');
      this.durationTime = this.dT1 > this.dT2 ? this.dT1 : this.dT2
      this.currentTime = this.dT1 > this.dT2 ? this.currentTimeV1 : this.currentTimeV2
      this.v1.play();
      this.v2.play();
    },

    canplayEvent2(){
      this.isloadV2 = true;
      console.log(new Date(),'QQQQQQQQQQQQQQQQQ');
    },

   

    //时长数据发生变化时
    durationchangeEvent() {
    
    this.dt2 = this.v2.duration
    
    console.log(this.durationTime,this.v1.duration,';;;;;;;;;;;;;;;;;;;;;')
    
  },

    durationchangeEvent2(){
      this.dt2 = this.v2.duration
    },

    //改变slider改变视频当前时间
    changeSliderProgressEvent(val) {
    console.log(val)
    let num = val - this.currentTime;
    if (num != 0) {
      this.v1.currentTime = val;
      this.v2.currentTime = val;
      this.v1.play();
      this.v2.play();
    }
  }
    
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
