<template>
  <div class="traffic">
    <div
      class="traffic-light"
      :class="{
        redLightOn: routeContext == 'red',
        yellowLightOn: routeContext == 'yellow',
        greenLightOn: routeContext == 'green',
        flickering: flickering,
      }"
    >
      <svg
        width="120"
        height="300"
        viewBox="0 0 120 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="120" height="300" rx="25" fill="#3A3A3A" />
        <circle id="redLight" cx="60" cy="59" r="35" fill="#FF0000" />
        <circle id="yellowLight" cx="60" cy="150" r="35" fill="#FFF500" />
        <circle id="greenLight" cx="60" cy="241" r="35" fill="#00FF19" />
      </svg>
    </div>
    <vTimer :ticksRemain="ticksRemain" />
  </div>
</template>

<script>
import vTimer from "@/components/v-timer";
export default {
  components: {
    vTimer,
  },
  props: {
    routeContext: {
      type: String,
      default: "red",
    },
  },
  methods:{
    ticking(){
      if (this.ticksRemain > 0) {
        if (this.ticksRemain <= 4) {
          this.flickering = true;
        }
          localStorage.setItem("savedTick", this.ticksRemain);
          this.ticksRemain--;
          setTimeout(()=>this.ticking(),1000)
      }else{
          this.$router.push(`/${this.redirectTo}`);
      }
    }
  },
  computed: {
    totalTimeTick: function () {
      let time;
      switch (this.routeContext) {
        case "red":
          time = 10;
          break;
        case "yellow":
          time = 3;
          break;
        case "green":
          time = 15;
          break;
        default:
          break;
      }
      return time;
    },
    redirectTo: function () {
      let to;
      switch (this.routeContext) {
        case "red":
          to = "yellow";
          break;
        case "yellow":
          to = localStorage.getItem("from") === "green" ? "red" : "green";
          break;
        case "green":
          to = "yellow";
          break;
        default:
          break;
      }
      return to;
    },
  },
  data() {
    return {
      ticksRemain:
        this.routeContext == localStorage.getItem("savedLight")
          ? localStorage.getItem("savedTick")
          : null,
      flickering: false,
      from: localStorage.getItem("from"),
    };
  },
  created() {
    this.ticksRemain =
      this.ticksRemain === null ? this.totalTimeTick : this.ticksRemain;
    localStorage.setItem("savedLight", this.routeContext);
    if (this.routeContext != "yellow") {
      localStorage.setItem("from", this.routeContext);
    }
  },
  mounted() {
    // let tiking = setInterval(() => {
    //   if (this.ticksRemain > 0) {
    //     console.log(this.ticksRemain);
    //     if (this.ticksRemain <= 4) {
    //       this.flickering = true;
    //     }
    //     this.ticksRemain--;
    //     localStorage.setItem('savedTick',this.ticksRemain)
    //   } else {
    //     this.$router.push(`/${this.redirectTo}`);
    //     clearInterval(tiking);
    //   }
    // }, 1000);
    setTimeout(()=> {
      this.ticking(1000)
    },0);
  },
};
</script>

<style lang="scss" scoped>
.traffic {
  display: flex;
  &-light {
    &.redLightOn {
      #redLight {
        fill-opacity: 1;
      }
      #yellowLight {
        fill-opacity: 0.2;
      }
      #greenLight {
        fill-opacity: 0.2;
      }
      &.flickering {
        #redLight {
          animation: flickering 1s steps(1, end) infinite;
        }
      }
    }
    &.yellowLightOn {
      #redLight {
        fill-opacity: 0.2;
      }
      #yellowLight {
        fill-opacity: 1;
      }
      #greenLight {
        fill-opacity: 0.2;
      }
      &.flickering {
        #yellowLight {
          animation: flickering 1s steps(1, end) infinite;
        }
      }
    }
    &.greenLightOn {
      #redLight {
        fill-opacity: 0.2;
      }
      #yellowLight {
        fill-opacity: 0.2;
      }
      #greenLight {
        fill-opacity: 1;
      }
      &.flickering {
        #greenLight {
          animation: flickering 1s steps(1, end) infinite;
        }
      }
    }
    @keyframes flickering {
      0% {
        fill-opacity: 1;
      }
      50% {
        fill-opacity: 0.2;
      }
      100% {
        fill-opacity: 0.2;
      }
    }
  }
}
</style>