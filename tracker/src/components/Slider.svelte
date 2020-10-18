<script>
  export let value;
  export let type = "float";
  export let min;
  export let max;
  let barWidth = 0;

  function handleMouseMove(e) {
    if (e.buttons === 1) {
      const rect = e.currentTarget.getBoundingClientRect()
      const val = e.clientX - rect.x - 4;
      if (val >= 0 && val <= barWidth - 8) {
        value = min + (val / (barWidth - 8) * (max - min));
        if (type === "int") {
          value = Math.floor(value);
        }
        e.preventDefault();
      }
    }
  }
</script>
<style>
    .container {
        height: 12px;
        width: 100%;
        position: relative;
    }

    .bar {
        position: absolute;
        background: black;
        height: 4px;
        top: 4px;
        left: 4px;
        width: calc(100% - 8px);
    }

    .slider {
        width: 4px;
        height: 12px;
        left: 2px;
        background: white;
        position: absolute;
        pointer-events: none;
    }

    .value {
        flex: 0 0 32px;
        text-align: center;
        overflow: hidden;
    }
</style>
<div class="flex center-items">
	<div class="value">
		{value}
	</div>
	<div class="container flex-fill" on:mousemove={handleMouseMove}>
		<div class="bar" bind:clientWidth={barWidth}></div>
		<div class="slider" style="left: {((value-min)/(max-min))*(barWidth)}px;"></div>
	</div>
</div>