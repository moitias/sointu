<style>
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

  const dispatch = createEventDispatcher();

  let hovering = false;
  let pressed = false;

  function enter() {
    hovering = true;
  }

  function leave() {
    hovering = false;
    pressed = false;
  }

  function press() {
    pressed = true;
  }

  function release() {
    pressed = false;
    dispatch("click");
  }

</script>
<div class="{ pressed ? 'lowered' : 'raised-narrow'} {hovering ? 'text-highlight' : 'text-white'}" on:mouseenter={enter}
		 on:mouseleave={leave} on:mousedown={press} on:mouseup={release}>
	<slot/>
</div>