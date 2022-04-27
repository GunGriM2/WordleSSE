<template>
  <div class="simple-keyboard"></div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { ref, onMounted, watch } from "vue";

const emit = defineEmits(["onKeyPress"]);

const props = defineProps({
  guessedLetters: Object,
});

const keyboard = ref(null);

const onKeyPress = (button) => {
  emit("onKeyPress", button);
};

onMounted(() => {
  keyboard.value = new Keyboard("simple-keyboard", {
    layout: {
      default: [
        "q w e r t y u i o p",
        "a s d f g h j k l",
        "{enter} z x c v b n m {bksp}",
      ],
    },
    onKeyPress: onKeyPress,
  });
});

watch(
  () => props.guessedLetters,
  (guessedLetters, prevGuessedLetters) => {
    keyboard.value.addButtonTheme(
      guessedLetters.miss.join(" "), 
      "miss"
    );
    keyboard.value.addButtonTheme(
      guessedLetters.found.join(" "), 
      "found"
    );
    keyboard.value.addButtonTheme(
      guessedLetters.hint.join(" "), 
      "hint"
    );
  },
  { deep: true }
);
</script>

<style>
div.miss {
  @apply bg-gray-500 !important;
  @apply text-white;
}

div.found {
  @apply bg-green-600 !important;
  @apply text-white;
}

div.hint:not(.found) {
  @apply bg-yellow-500 !important;
  @apply text-white;
} 
</style>
