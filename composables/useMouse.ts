
import { ref, onMounted, onUnmounted } from 'vue';

export const useMouse = ()=> {
  const mouseX = ref(0);

  const updateMouseX = (event: MouseEvent) => {
    mouseX.value = event.clientX;
  };

  onMounted(() => {
    window.addEventListener('mousemove', updateMouseX);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMouseX);
  });

  return { mouseX };
}