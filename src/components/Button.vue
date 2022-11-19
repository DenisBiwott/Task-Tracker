<template>
    <button :style="{background: color}" class=btn >{{ text }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        color: String,
        text: String
    }
}
</script>