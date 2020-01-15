<template>
  <div>
    
    <p>{{ strategy.name }}</p>
      <button v-on:click="onSubmit">Test</button>
    
  </div>
</template>

<script>
import FormHelper from '../../common/helpers/FormHelper';

export default {
        beforeRouteEnter(to, from, next) {
            next(vm => {
                FormHelper.onBeforeRouteEnter(vm);
            })
        },        
    data() {
        return {
         strategy: {}
        }
    },
    methods:
    {
      onSubmit: async function()
      {
          const oResult = await FormHelper.onSubmit(this, {married:0,
            no_dependents:0,
            disability:0,
            base_salary:1000,
            twelfths:"Percent0",
            meal_allowance:"card",
            meal_allowance_value:0,
            meal_allowance_days:0,
            holiday_allowance:0,
            Christmas_subsidy:0});
          alert(oResult.data.msg);
      }
    }    
}
</script>
