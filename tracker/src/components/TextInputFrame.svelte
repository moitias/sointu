<script>
  import Frame from "./Frame.svelte";
	export let title = "";
	let input = "foo";
</script>
<style>
	#container {
			display: flex;
  }
	#header {
			flex: 1 1 auto;
			margin-right: 1em;
	}
	#input {
      flex: 1 1 100%;
			background: black;
	}
</style>

<Frame>
	<div id="container">
		<div id="header">{ title }</div>
		<div id="input" class="lowered" contenteditable="true" spellcheck="false"
					 bind:textContent={input}
		></div>
	</div>
</Frame>