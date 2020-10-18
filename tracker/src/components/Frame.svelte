<script>
  export let fill = false;
</script>
<div class="frame text-shadow raised text-shadow { fill ? 'h-full': ''}">
	<slot/>
</div>