<!-- src/routes/en/+page.svelte -->
<script>
  // Import the German homepage component and reuse it
  import Homepage from '../+page.svelte';
  
  export let data;
</script>

<!-- Reuse the main homepage component with English data -->
<Homepage {data} />