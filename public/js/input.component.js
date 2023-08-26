class AWInputRender {

  classVars = {}
  domElements = {}

  paramsConfig = {
    id: {readonly: true, type: 'string'},
    name: {readonly: true, type: 'string'},
    label: {default: '', type: 'string'},
    help: {default: '', type: 'string'},
    placeholder: {default: '', type: 'string'},
    value: {default: '', type: 'string'},
    required: {default: 'false', type: 'boolean'},
    disabled: {default: 'false', type: 'boolean'},
    readonly: {default: 'false', type: 'boolean'},
    type: {default: 'input', readonly: true, type: 'string'},
    formId: {readonly: true, type: 'string'}
  }

  constructor (params = {id: null, name: null, label: null, help: null, placeholder: null, value: null, required: null, disabled: null, readonly: null, type: null, formId: null}, updateState, renderElement, registerElement, inputElementChanges) {
    this.paramValuesResolver(params);
    this.updateState = updateState;
    this.renderElement = renderElement;
    this.registerElement = registerElement;
    this.inputElementChanges = inputElementChanges;
  }

  render(document) {
    this.classVars.vars['divClass'] = this.solveValue('mb-3')
    this.classVars.vars['inputClass'] = this.solveValue('form-control')
    this.classVars.vars['labelClass'] = this.solveValue('form-label')
    if (this.solveBooleanExp('{ "var": "' + this.solveValue("type") + '", "value": "' + this.solveValue("checkbox") + '", "op": "==" }')) {
      this.classVars.vars['divClass'] = this.solveValue('mb-3 form-check')
      this.classVars.vars['inputClass'] = this.solveValue('form-check-input')
      this.classVars.vars['labelClass'] = this.solveValue('form-check-label')
    }
    let div3 = this.createElementIfNotExists(document, 'div', 'div3', undefined);
    if (this.solveValue('undefined') !== 'undefined') div3.style = 'undefined';
    div3.setAttribute('class', this.solveValue('divClass'));
    if (this.solveBooleanExp('{ "var": "' + this.solveValue("label") + '", "value": "null", "op": "!=" }')) {
      let label1 = this.createElementIfNotExists(document, 'label', 'label1', div3);
      label1.setAttribute('for', this.solveValue('id'));
      label1.setAttribute('class', this.solveValue('labelClass'));
      label1.textContent = this.solveValue('label');

    }
    if (this.solveBooleanExp('{ "var": "' + this.solveValue("help") + '", "value": "null", "op": "!=" }')) {
      this.classVars.vars['helpId'] = this.solveValue('id_+_help')
      let input1 = this.createElementIfNotExists(document, 'input', 'input1', div3);
      input1.id = this.solveValue('id');
      input1.name = this.solveValue('name');
      input1.type = this.solveValue('type');
      input1.className = this.solveValue('inputClass');
      input1.value = this.solveValue('value');
      input1.setAttribute('aria-describedby', this.solveValue('helpId'));
      input1.placeholder = this.solveValue('placeholder');
      if (this.solveValue('required')) input1.setAttribute('required', '');
      if (this.solveValue('readonly')) input1.setAttribute('readonly', '');
      if (this.solveValue('disabled')) input1.setAttribute('disabled', '');
      this.registerElement(input1, this.logicalInstance);

      let div4 = this.createElementIfNotExists(document, 'div', 'div4', div3);
      if (this.solveValue('undefined') !== 'undefined') div4.style = 'undefined';
      div4.setAttribute('class', this.solveValue('form-text'));
      div4.setAttribute('id', this.solveValue('helpId'));
      div4.innerHTML = this.solveValue('help');

    } else {
      let input2 = this.createElementIfNotExists(document, 'input', 'input2', div3);
      input2.id = this.solveValue('id');
      input2.name = this.solveValue('name');
      input2.type = this.solveValue('type');
      input2.className = this.solveValue('inputClass');
      input2.value = this.solveValue('value');
      input2.setAttribute('aria-describedby', this.solveValue('undefined'));
      input2.placeholder = this.solveValue('placeholder');
      if (this.solveValue('required')) input2.setAttribute('required', '');
      if (this.solveValue('readonly')) input2.setAttribute('readonly', '');
      if (this.solveValue('disabled')) input2.setAttribute('disabled', '');
      this.registerElement(input2, this.logicalInstance);

    }
    return div3;
  }

  solveValue(name) {
    let value = this.classVars.params[name]
    if (value !== undefined && value !== null) {
      let type = this.paramsConfig[name].type
      if (type === 'string') {
        return value
      } else if (type === 'boolean') {
        return value === 'true'
      } else if (type === 'number') {
        return Number(value)
      }
      return value;
    }
    value = this.classVars.vars[name]
    if (value !== undefined && value !== null) {
      return value;
    }
      return name;
  }

  paramValuesResolver(params) {
    this.logicalInstance = params;
    this.classVars.vars = {};
    this.classVars.params = {};
    for (let key in this.paramsConfig) {
      let param = this.paramsConfig[key]
      let value = params[key]
      if (value !== undefined && value !== null) {
        this.classVars.params[key] = value
      } else {
        if (param.default !== undefined && param.default !== null) {
          this.classVars.params[key] = param.default
        } else {
          // console.log('Param ' + key + ' is required')
          this.classVars.params[key] = null
        }
      }
    }
  }

  solveBooleanExp(booleanExpression) {
    try {
      let exp = JSON.parse(booleanExpression);
      let evalExpression = '"' + exp.var + '" ' + exp.op + ' "' + exp.value + '"';
      let result = eval(evalExpression);
      // console.log(evalExpression + " = " + result);
      return result;
    } catch (e) {
      console.error(booleanExpression);
      return false;
    }
  }

  createElementIfNotExists(document, elementType, elementName, container) {
  	if (!this.domElements[elementName]) {
  	  this.domElements[elementName] = document.createElement(elementType);
  	  if (container) {
  		 container.appendChild(this.domElements[elementName]);
  	  }
  	}
  	return this.domElements[elementName];
  }

  update(document, changes) {
    for (let key in this.paramsConfig) { 
  	  let value = changes[key];
  	  if (value !== undefined && value !== null) {
  	    this.classVars.params[key] = value;
  	  }
    }
    this.render(document);
  }
}
export default AWInputRender;