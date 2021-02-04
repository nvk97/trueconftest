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
    <!-- Связываю оставшиеся количество секунд с таймером-->
  </div>
</template>

<script>
import vTimer from "@/components/v-timer";
export default {
  components: {
    vTimer,
  },
  props: {
    routeContext: {   //Компонент принимает пропсы с роутера
      type: String,
      default: "red", //Параметры роута
    },
    totalTicks:{
      type:Number,
      required:true //Общее время для каждого роута
    },
    toRedirect:{    //Следующий редирект
      type: String,
      required: true,
    }
  },
  methods:{
    ticking(){         //Рекурсивная функция отсчета времени
      if (this.ticksRemain > 0) {
        if (this.ticksRemain <= 4) { //Если осталось меньше 3-ех секунд(равно 3-секундам будет происходит в промежутке 3 -> 2 секунды, а это меньше 3) Происходит добавление класса для мерцания света
          this.flickering = true;
        }
          sessionStorage.setItem("savedTick", this.ticksRemain); //Текущая секунда сохраняет в sessionStorage для корректной работы с того же места при перезагрузке(Решение сохранять в сессионое хранилище, а не в локальное потому что если бы были открыты несколько окон они бы перезаписывали значения друг другу)
          this.ticksRemain--; // Cнижение оставщихся секунд на 1
          setTimeout(()=>this.ticking(),1000) 
      }else{          
          this.$router.push(`/${this.redirectTo}`);// При окончании времени происходит редирект на следующую страницу
      }
    }
  },
  data() {
    return {
      ticksRemain:this.routeContext == sessionStorage.getItem("savedLight")? sessionStorage.getItem("savedTick"): null, //Количесвто оставшихся тиков если оно сохранилось в локальном хранилище и при совпадении с текущим роутом
      flickering: false,  // Мигание для <3 секунд
      from: sessionStorage.getItem("from"), // Прошлый роут для определния куда пойти после желтого цвета
      redirectTo:this.toRedirect!='needToComputed'?this.toRedirect:sessionStorage.getItem("from") === "green" ? "red" : "green"
    };
  },
  created() {
    this.ticksRemain = this.ticksRemain === null ? this.totalTicks : this.ticksRemain; // если же в сессионом хранилище нет сохраннего тика(с совпадением роута) ставится максимально возможное время для текущего цвета
    sessionStorage.setItem("savedLight", this.routeContext); //Сохранение текущего цвета(для валидации при перезагрузке страницы(если прошлый цвет сопадает с сохраненным))
    if (this.routeContext != "yellow") { //Сохранение в локальное хранилище с какого конца идет цикл(если не в середине цикла)
      sessionStorage.setItem("from", this.routeContext); 
    }
  },
  mounted() {
    // let tiking = setInterval(() => {   //Не самое удачно решение потому что отсчет времени начинается спустя секунду
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
    setTimeout(()=> {          //Предполагаю, что для реализации отсчета времени это оптимальный вариант
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
        fill-opacity: 1;
      }
    }
  }
}
</style>