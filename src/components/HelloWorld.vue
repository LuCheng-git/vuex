<template>
  <div class="box">
    <canvas id="canvas" width="300" height="200"></canvas>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      
    };
  },

  mounted() {
    var canvas = new fabric.Canvas('canvas');
    var rect = new fabric.Rect({
        top : 50,
        left : 100,
        width : 100,
        height : 70,
        fill : 'red'
    });
    canvas.add(rect);
  },
  computed: {
    
  },
  watch: {
    
  },
  methods: {
  
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
