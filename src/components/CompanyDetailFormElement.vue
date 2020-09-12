<template>
  <div class="flex items-center mb-6">
    <div class="block w-6/12 text-gray-500 font-bold mb-1 md:mb-0 pr-4">
      {{ label }}
    </div>
    <input
      class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      type="text"
      :disabled="disabled"
      :value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "CompanyDetailFormElement",
  props: ["value", "label", "disabled"]
};
</script>
