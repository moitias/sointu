<script lang="ts">
  import { trackColumns } from "./constants";
  import { formatDataValue } from "./format";

  export let events = [];
  export let active = false;
</script>

<style>
    .row {
        display: flex;
        height: 16px;
    }

    .note {
        flex: 1 1 30px;
        margin-left: 8px;
    }

    .instrument {
        flex: 1 1 22px;
        text-align: right;
        padding-right: 8px;
    }

    .volume {
        flex: 1 1 22px;
    }

    .parameter {
        flex: 1 1 30px;
    }

</style>

<div class="row { active ? 'text-white' : ''}">
	{#each trackColumns as column,index}
		<div class="{column}">
			{ formatDataValue(column, events?.[trackColumns.indexOf(column)] ?? null) }
		</div>
	{/each}
</div>
