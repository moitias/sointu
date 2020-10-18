<script>
  import Frame from "./Frame.svelte";
  import Hotkey from "./Hotkey.svelte";
  import Button from "./Button.svelte";

  export let value = 0;
  export let upKey = "";
  export let downKey = "";
  export let min = undefined;
  export let max = undefined;

  let input = "foo";

  function up() {
    if (min === undefined || value > 0) {
      value = value - 1;
    }
  }

  function down() {
    if (max === undefined || value < max) {
      value = value + 1;
    }
  }
</script>
<style>
    #container {
        display: flex;
    }

    #header {
        flex: 1 1 auto;
        margin-right: 1em;
    }

    #value {
        flex: 1 1 100%;
    }
</style>

<Frame>
	<div id="container">
		{#if downKey}
			<Hotkey key={downKey} on:click={down}/>
		{/if}
		{#if upKey}
			<Hotkey key={upKey} on:click={up}/>
		{/if}
		<div id="header">
			<slot/>
		</div>
		<div id="value">
			{ value }
		</div>
		<Button on:click={up}>▲</Button>
		<Button on:click={down}>▼</Button>
	</div>
</Frame>