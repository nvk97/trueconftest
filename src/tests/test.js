import { mount } from '@vue/test-utils'
import vTrafficLight from '@/components/v-traffic-light.vue'


test('check props and data',()=>{// Микро тест компонента
    const wrapper = mount(vTrafficLight,{
        propsData:{
            routeContext:'blue',
            totalTicks:20,
            toRedirect:'red'
        }
    })
    expect(wrapper.vm.redirectTo).toBe('red')
    expect(wrapper.vm.ticksRemain).toBe(20)
})

   

