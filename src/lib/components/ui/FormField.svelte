<!-- src/lib/components/ui/FormField.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  export let id;
  export let label;
  export let type = 'text';
  export let value;
  export let options = null; // for select fields
  export let required = false;
  export let min = null;
  export let max = null;
  export let placeholder = '';
  export let disabled = false;

  const dispatch = createEventDispatcher();

  function handleInput(event) {
    value = event.target.value;
    dispatch('input', { value, id });
  }

  function handleChange(event) {
    value = event.target.value;
    dispatch('change', { value, id });
  }
</script>

<div class="form-group">
  <label for={id}>{label}</label>
  {#if type === 'select'}
    <select
      {id}
      {value}
      {required}
      {disabled}
      on:change={handleChange}
    >
      {#each options as option}
        <option value={option.value}>{option.label}</option>
      {/each}
    </select>
  {:else}
    <input
      {id}
      {type}
      {value}
      {required}
      {min}
      {max}
      {placeholder}
      {disabled}
      on:input={handleInput}
      on:change={handleChange}
    />
  {/if}
</div>

<style>
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .form-group label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    cursor: pointer;
    transition: color var(--transition-fast);
  }

  .form-group:hover label {
    color: var(--color-secondary);
  }

  .form-group input,
  .form-group select {
    padding: var(--space-sm) var(--space-md);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-background);
    color: var(--color-text);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    transition: all var(--transition-fast);
    min-height: 40px;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
  }

  .form-group select {
    padding-right: var(--space-2xl);
  }

  .form-group input:hover,
  .form-group select:hover {
    border-color: var(--color-secondary);
    background-color: var(--color-background-elevated);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(26, 74, 107, 0.08);
  }

  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(26, 74, 107, 0.1);
  }

  .form-group input:disabled,
  .form-group select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .form-group input:disabled:hover,
  .form-group select:disabled:hover {
    transform: none;
    box-shadow: none;
    border-color: var(--color-border);
    background-color: var(--color-background);
  }
</style>