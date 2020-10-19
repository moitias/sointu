<script lang="ts">
  import { onMount, createEventDispatcher, onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  import { togglePlay } from "../playerStore";
  import { displayPattern } from "./trackerStore";

  const noteMap = {
    "z": "C",
    "s": "C#",
    "x": "D",
    "d": "D#",
    "c": "E",
    "v": "F",
    "g": "F#",
    "b": "G",
    "h": "G#",
    "n": "A",
    "j": "A#",
    "m": "B"
  }

  const dispatch = createEventDispatcher();
  const {focusGroup, current} = focus;

  function pressed(e: KeyboardEvent) {
    console.log(e.key, e.code)
    switch (e.key) {
      case "Alt":
        if (e.code === "AltLeft") {
          // TODO: handle alt-tab stop first (or figure out how to keep state properly?!?)
          //togglePlay();
        }
        e.preventDefault();
        return
      case " ":
        togglePlay(get(displayPattern));
        break;
      default:
        const mapped = noteMap[e.key];
        if (mapped) {
          dispatch("note", mapped)
        }
        if (e.key.length === 1 && e.key >= "0" && e.key <= "9") {
          dispatch("value", e.key - "0")
        } else if (e.key.length === 1 && e.key.toLowerCase() >= "a" && e.key.toLowerCase() <= "f") {
          dispatch("value", e.key.charCodeAt(0) - 87) // "a" = 97; v- 97+10
        }
    }
  }

  onMount(() => {
    document.addEventListener("keydown", pressed);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", pressed);
  });


</script>