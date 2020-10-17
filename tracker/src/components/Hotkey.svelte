<script lang="ts">
  import { onMount, createEventDispatcher, onDestroy } from 'svelte';
	export let key = "???";
  export let modifier = "";

  const dispatch = createEventDispatcher();
  const {focusGroup, current} = focus;

	function pressed(e : KeyboardEvent) {
	  if (e.key === key && (
			(!modifier && !e.shiftKey && !e.altKey && !e.ctrlKey) ||
			(modifier === "shift" && e.shiftKey && !e.altKey && !e.ctrlKey) ||
      (modifier === "alt" && !e.shiftKey && e.altKey && !e.ctrlKey) ||
      (modifier === "ctrl" && !e.shiftKey && !e.altKey && e.ctrlKey)
		)) {
			dispatch("click");
			e.preventDefault();
		}
	}

  onMount(() => {
    document.addEventListener("keydown", pressed);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", pressed);
  });

</script>
