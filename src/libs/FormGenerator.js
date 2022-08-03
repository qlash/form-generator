export class FormGenerator {
  #target
  #schema

  constructor(target = '', schema = []) {
    this.#target = document.querySelector(target)
    this.#schema = schema

    this.#generate()
  }

  #generate() {
    this.#schema.forEach(element => {
      switch (element.type) {
        case 'text':
        case 'email':
        case 'password': 
          this.#createInput(element)
          break

        case 'reset':
        case 'submit': 
          this.#createButton(element)
          break
      }
    })

    this.#setAutofocus()
  }

  #createInput(element) {
    const el = document.createElement('div')

    el.className = 'form-group'

    el.append(this.#getInputLabel(element))
    el.append(this.#getFormInput(element))
    el.append(this.#getValidationField(element))

    this.#target.append(el)
  }

  #getFormInput(element) {
    const input = document.createElement('input')

    input.id = element.id
    input.className = 'form-input'
    input.type = element.type
    input.name = element.name

    return input
  }

  #getInputLabel(element) {
    const label = document.createElement('label')

    label.htmlFor = element.id
    label.className = 'form-label'
    label.innerText = element.label

    return label
  }

  #getValidationField(element) {
    const validationField = document.createElement('div')

    validationField.className = 'form-validation'
    validationField.id = `${element.id}-validation`

    return validationField
  }

  #createButton(element) {
    const btn = document.createElement('button')

    btn.innerText = element.label
    btn.type = element.type

    this.#target.append(btn)
  }
  
  #setAutofocus() {
    const field = this.#schema.find(({ autofocus }) => autofocus)

    if (field) {
      this.#target.querySelector(`#${field.id}`).focus()
    }
  }

  getTarget() {
    return this.#target
  }

  getSchema() {
    return JSON.parse(JSON.stringify(this.#schema))
  }
}
