<!-- @format -->

<script setup lang="ts">
import NcMonth from '@/components/month/nc-month.vue';
import NcWeek from '@/components/week/nc-week.vue';
import NcDate from '@/components/date/nc-date.vue';
import { ref } from 'vue';

const year = ref(2022);

const value = new Date();
</script>

<template>
  <div class="nc-year">
    <div class="month" v-for="i in 12">
      <nc-month :month="i - 1" :year="year">
        <template #default="{ date, outside }">
          <nc-date
            :value="date"
            :active="value.toDateString() == date.toDateString()"
            :secondary="outside"
          />
        </template>
      </nc-month>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nc-year {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 32px;
  grid-column-gap: 32px;
}
</style>
