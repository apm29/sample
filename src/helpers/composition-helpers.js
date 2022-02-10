import { ref, unref } from "@vue/composition-api";
//弹窗model工具栏
export function useToggle() {
  const toggle = function () {
    const current = unref(show);
    show.value = !current;
  };
  const close = function () {
    show.value = false;
  };
  const open = function () {
    show.value = true;
  };
  const show = ref(false);
  return {
    toggle,
    close,
    open,
    show,
  };
}

export function useValueChange(init) {
  const value = ref(init);
  const onValueChange = function (newValue) {
    value.value = newValue;
  };
  return {
    value,
    onValueChange,
  };
}
