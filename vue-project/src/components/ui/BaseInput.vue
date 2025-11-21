<template>
  <div :class="['input-container', sizeClasses]">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
      <span v-if="required" class="required-marker">*</span>
    </label>

    <!-- Input Text -->
    <input
      v-if="type === 'text' || type === 'email' || type === 'password' || type === 'number'"
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :class="['input-field', { 'input-error': hasError }]"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- Textarea -->
    <textarea
      v-else-if="type === 'textarea'"
      :id="inputId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      :class="['input-field', 'textarea-field', { 'input-error': hasError }]"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    ></textarea>

    <!-- Select / Combo Box -->
    <select
      v-else-if="type === 'select'"
      :id="inputId"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :class="['input-field', 'select-field', { 'input-error': hasError }]"
      @change="handleChange"
      @blur="handleBlur"
      @focus="handleFocus"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="getOptionValue(option)"
        :value="getOptionValue(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>

    <!-- Checkbox -->
    <div v-else-if="type === 'checkbox'" class="checkbox-container">
      <input
        :id="inputId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :required="required"
        class="checkbox-field"
        @change="handleCheckboxChange"
      />
      <label :for="inputId" class="checkbox-label">
        <span class="checkbox-custom"></span>
        {{ checkboxLabel || label }}
      </label>
    </div>

    <!-- Radio Group -->
    <div v-else-if="type === 'radio'" class="radio-group">
      <div
        v-for="option in options"
        :key="getOptionValue(option)"
        class="radio-item"
      >
        <input
          :id="`${inputId}-${getOptionValue(option)}`"
          type="radio"
          :name="inputId"
          :value="getOptionValue(option)"
          :checked="modelValue === getOptionValue(option)"
          :disabled="disabled"
          :required="required"
          class="radio-field"
          @change="handleRadioChange"
        />
        <label :for="`${inputId}-${getOptionValue(option)}`" class="radio-label">
          <span class="radio-custom"></span>
          {{ getOptionLabel(option) }}
        </label>
      </div>
    </div>

    <!-- Date -->
    <input
      v-else-if="type === 'date' || type === 'datetime-local' || type === 'time'"
      :id="inputId"
      :type="type"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :class="['input-field', 'date-field', { 'input-error': hasError }]"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <!-- File -->
    <input
      v-else-if="type === 'file'"
      :id="inputId"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      :required="required"
      :class="['input-field', 'file-field']"
      @change="handleFileChange"
    />

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- Message d'aide -->
    <div v-if="helpText" class="help-text">
      {{ helpText }}
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array, File],
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => [
        'text', 'email', 'password', 'number', 'textarea', 
        'select', 'checkbox', 'radio', 'date', 'datetime-local', 
        'time', 'file'
      ].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    helpText: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    optionValue: {
      type: String,
      default: 'value'
    },
    optionLabel: {
      type: String,
      default: 'label'
    },
    checkboxLabel: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 4
    },
    accept: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'focus', 'blur', 'change'],
  setup(props, { emit }) {
    const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)
    const isFocused = ref(false)

    const sizeClasses = computed(() => `input-${props.size}`)
    
    const hasError = computed(() => !!props.errorMessage)

    const getOptionValue = (option) => {
      if (typeof option === 'object' && option !== null) {
        return option[props.optionValue]
      }
      return option
    }

    const getOptionLabel = (option) => {
      if (typeof option === 'object' && option !== null) {
        return option[props.optionLabel]
      }
      return option
    }

    const handleInput = (event) => {
      let value = event.target.value
      if (props.type === 'number') {
        value = event.target.value === '' ? '' : Number(value)
      }
      emit('update:modelValue', value)
      emit('change', value)
    }

    const handleChange = (event) => {
      emit('update:modelValue', event.target.value)
      emit('change', event.target.value)
    }

    const handleCheckboxChange = (event) => {
      emit('update:modelValue', event.target.checked)
      emit('change', event.target.checked)
    }

    const handleRadioChange = (event) => {
      emit('update:modelValue', event.target.value)
      emit('change', event.target.value)
    }

    const handleFileChange = (event) => {
      const files = event.target.files
      if (props.multiple) {
        emit('update:modelValue', Array.from(files))
      } else {
        emit('update:modelValue', files[0] || null)
      }
      emit('change', files)
    }

    const handleFocus = (event) => {
      isFocused.value = true
      emit('focus', event)
    }

    const handleBlur = (event) => {
      isFocused.value = false
      emit('blur', event)
    }

    return {
      inputId,
      isFocused,
      sizeClasses,
      hasError,
      getOptionValue,
      getOptionLabel,
      handleInput,
      handleChange,
      handleCheckboxChange,
      handleRadioChange,
      handleFileChange,
      handleFocus,
      handleBlur
    }
  }
}
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
  width: 100%;
}

/* Tailles des conteneurs */
.input-small {
  font-size: 1.8vh;
}

.input-medium {
  font-size: 2vh;
}

.input-large {
  font-size: 2.4vh;
}

.input-xlarge {
  font-size: 2.8vh;
}

/* Labels */
.input-label {
  font-weight: 600;
  color: var(--dark-color);
  margin-bottom: 0.5vh;
  display: block;
}

.required-marker {
  color: var(--danger-color);
  margin-left: 0.2vw;
}

/* Champs de saisie communs */
.input-field {
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: 0.5vh;
  background-color: white;
  color: var(--dark-color);
  font-family: inherit;
  transition: all 0.3s ease;
  outline: none;
}

.input-field:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2vh rgba(52, 152, 219, 0.25);
}

.input-field:disabled {
  background-color: #f8f9fa;
  color: #6c757d;
  cursor: not-allowed;
}

.input-field.input-error {
  border-color: var(--danger-color);
  box-shadow: 0 0 0 0.2vh rgba(220, 53, 69, 0.25);
}

/* Tailles spécifiques pour les champs */
.input-small .input-field {
  padding: 0.8vh 1.2vw;
  font-size: 1.8vh;
}

.input-medium .input-field {
  padding: 1vh 1.5vw;
  font-size: 2vh;
}

.input-large .input-field {
  padding: 1.2vh 1.8vw;
  font-size: 2.4vh;
}

.input-xlarge .input-field {
  padding: 1.5vh 2vw;
  font-size: 2.8vh;
}

/* Textarea spécifique */
.textarea-field {
  resize: vertical;
  min-height: 8vh;
}

/* Select spécifique */
.select-field {
  cursor: pointer;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1vw center;
  background-size: 1.5vh;
  padding-right: 4vw;
}

/* Checkbox */
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 1vw;
}

.checkbox-field {
  display: none;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 1vw;
  cursor: pointer;
  font-weight: normal;
}

.checkbox-custom {
  width: 2.5vh;
  height: 2.5vh;
  border: 2px solid #ced4da;
  border-radius: 0.3vh;
  position: relative;
  transition: all 0.3s ease;
}

.checkbox-field:checked + .checkbox-label .checkbox-custom {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkbox-field:checked + .checkbox-label .checkbox-custom::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.8vh;
  font-weight: bold;
}

/* Radio */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: 1vh;
}

.radio-item {
  display: flex;
  align-items: center;
}

.radio-field {
  display: none;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 1vw;
  cursor: pointer;
  font-weight: normal;
}

.radio-custom {
  width: 2.5vh;
  height: 2.5vh;
  border: 2px solid #ced4da;
  border-radius: 50%;
  position: relative;
  transition: all 0.3s ease;
}

.radio-field:checked + .radio-label .radio-custom {
  border-color: var(--primary-color);
}

.radio-field:checked + .radio-label .radio-custom::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.2vh;
  height: 1.2vh;
  background-color: var(--primary-color);
  border-radius: 50%;
}

/* File input */
.file-field {
  cursor: pointer;
}

.file-field::file-selector-button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5vh 1vw;
  border-radius: 0.3vh;
  margin-right: 1vw;
  cursor: pointer;
  font-size: inherit;
}

/* Messages */
.error-message {
  color: var(--danger-color);
  font-size: 1.6vh;
  margin-top: 0.5vh;
}

.help-text {
  color: #6c757d;
  font-size: 1.6vh;
  margin-top: 0.5vh;
}

/* Responsive */
@media (max-width: 768px) {
  .input-small .input-field {
    padding: 0.6vh 1vw;
    font-size: 1.6vh;
  }
  
  .input-medium .input-field {
    padding: 0.8vh 1.2vw;
    font-size: 1.8vh;
  }
  
  .input-large .input-field {
    padding: 1vh 1.5vw;
    font-size: 2.2vh;
  }
  
  .input-xlarge .input-field {
    padding: 1.2vh 1.8vw;
    font-size: 2.6vh;
  }
}
</style>
