<template>
  <div class="input-container">
    <label class="input-label">{{ label }}</label>
    <input
      class="input-field"
      :type="type"
      :value="value"
      @input="updateValue($event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class InputComponent extends Vue {
  @Prop({ required: true })
  label!: string

  @Prop({ default: 'text' })
  type!: string

  @Prop({ default: '' })
  value!: string

  updateValue(newValue: string): void {
    this.$emit('input', newValue)
  }
}
</script>

<style scoped>
.input-container {
  position: relative;
  margin: 20px 0;
}

.input-label {
  position: absolute;
  top: -12px;
  left: 10px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: bold;
  color: #888;
  background-color: transparent;
}

.input-field {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
}

.input-field:focus {
  outline: none;
  border-bottom-color: #888;
}
</style>
