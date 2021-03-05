
<span>Prop value: { value }, internal value: { count }<button class="cell-btn-increment" on:click="{increment}">Update child</button></span>

<script>
let count = 0;
export let value;

function  increment() {
    count += 1;
}
</script>
