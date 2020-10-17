
<style>
	div {
			display: flex;
  }

	div > :global(*) {
			flex: 1 1 100%;
	}
</style>

<div>
	<slot/>
</div>