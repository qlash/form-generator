export class FormValidator {
  #target
  #schema
  #callback

  constructor(formClass, callback) {
    this.#target = formClass.getTarget()
    this.#schema = formClass.getSchema()
    this.#callback = callback

    this.#target.addEventListener('submit', this.#onSubmit.bind(this))
    this.#target.addEventListener('input', this.#onInput.bind(this))
    this.#target.addEventListener('reset', this.#onReset.bind(this))
  }

  #onSubmit(ev) {
    ev.preventDefault()

    const formData = Object.fromEntries(new FormData(ev.target))
    const validate = Object.entries(formData).map(([key, value]) => {
      const elSchema = this.#schema.find(element => element.name === key)

      return this.#validate(value, elSchema)
    })

    const isValidated = validate.every(Boolean)

    if (isValidated) {
      this.#callback()
    }
  }

  #onInput(ev) {
    const elSchema = this.#schema.find(element => element.id === ev.target.id)
    const value = ev.target.value

    this.#validate(value, elSchema)
  }

  #onReset() {
    this.#target.querySelectorAll('.form-validation').forEach(input => {
      input.innerText = ''
    })
  }

  #validate(value, schema) {
    let message = ''

    if (schema.required && value.trim().length === 0) {
      message = 'This field is required'
    }

    this.#target.querySelector(`#${schema.id}-validation`).innerText = message

    return message === ''
  }
}

