<!-- Redirect to the main reviews page component -->
<script>
  import ReviewsPage from '../../reviews/+page.svelte';
  export let data;
</script>

<ReviewsPage {data} />