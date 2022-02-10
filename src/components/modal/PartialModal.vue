<template>
  <div
    class="
      absolute
      top-0
      right-0
      w-full
      h-full
      overflow-hidden
      z-10
      flex
      justify-end
    "
    :class="value ? 'pointer-events-auto' : 'pointer-events-none'"
  >
    <transition name="el-fade-in">
      <div
        v-if="value"
        class="bg-gray-600 bg-opacity-30 absolute left-0 top-0 right-0 bottom-0"
        @click="$emit('input', false)"
      ></div>
    </transition>
    <transition name="el-fade-in">
      <div v-if="value" class="flex-grow"></div>
    </transition>
    <transition name="slide-fade">
      <div
        class="flex flex-col shadow bg-white min-w-96 p-3 z-5"
        :class="containerClass"
        v-if="value"
      >
        <slot name="title">
          <div class="flex px-3">
            <div class="flex-grow font-bold text-gray-700 text-base pb-2">
              {{ title }}
            </div>
            <button v-if="closeable" @click="$emit('input', false)">
              <i class="mdi mdi-close text-gray-500 text-xl" />
            </button>
          </div>
        </slot>
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "PartialModal",
  props: {
    value: Boolean,
    closeable: Boolean,
    title: String,
    containerClass: String,
  },
};
</script>

<style scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>
