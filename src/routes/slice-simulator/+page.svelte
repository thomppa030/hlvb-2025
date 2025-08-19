<script>
  import { SliceSimulator } from "@slicemachine/adapter-sveltekit/simulator";
  import { SliceZone } from "@prismicio/svelte";
  import { components } from "$lib/slices";
  
  // Ensure components object has proper typing
  const sliceComponents = components || {};
</script>

<SliceSimulator let:slices>
  <SliceZone {slices} components={sliceComponents} />
</SliceSimulator>
