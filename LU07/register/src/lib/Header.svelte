<script>
  let { formats } = $props();
</script>

<h1 class="text-red-900">Register for Courses</h1>
<p>The college offers classes in various formats.</p>
<ul>
  {#each formats as format}
    <li>{format}</li>
  {/each}
</ul>