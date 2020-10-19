<style>
    .big {
        font-size: 18px;
        line-height: 16px;
        height: 20px;
        padding: 1px 2px;
    }

    div {
        height: 16px;
        font-size: 13px;
        line-height: 13px;
        text-align: center;
        min-width: 16px;
        margin: 2px;
        padding: 1px;
        cursor: pointer;
        user-select: none;
    }

</style>
<script>
  import { createEventDispatcher } from "svelte";

  export let pressed = false;
  export let disabled = false;
  export let big = false;

  const dispatch = createEventDispatcher();

  let hovering = false;
  let pressedDown = false;

  function enter() {
    hovering = true;
  }

  function leave() {
    hovering = false;
    pressedDown = false;
  }

  function press() {
    if (pressed || disabled) {
      return
    }
    pressedDown = true;
  }

  function release() {
    pressedDown = false;
    dispatch("click");
  }

</script>
<div class:big
		 class:disabled
		 class="{ (pressed || pressedDown) ? 'lowered' : 'raised-narrow'} {(hovering || pressed) ? 'text-highlight' : 'text-white'}"
		 on:mouseenter={enter}
		 on:mouseleave={leave} on:mousedown={press} on:mouseup={release}>
	<slot/>
</div>