<!-- @format -->

<script setup lang="ts">
import NcMonth from '@/components/month/nc-month.vue';
import NcDate from '@/components/date/nc-date.vue';
/** Свойства */
const props = defineProps({
  /** Год */
  year: { type: Number, default: new Date().getFullYear() },
});
</script>

<template>
  <div class="nc-year">
    <div class="month" v-for="i in 12">
      <p>
        {{ new Date(year, i - 1, 1).getMonthName() }}
      </p>
      <nc-month :month="i - 1" :year="year">
        <template #default="{ date, outside }">
          <!-- :active="value.toDateString() == date.toDateString()" -->
          <nc-date :secondary="outside">
            {{ date.getDate() }}
          </nc-date>
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
  .month {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
</style>
