class AWButtonRender {

  classVars = {}
  domElements = {}

  paramsConfig = {
    id: {readonly: true, type: 'string'},
    text: {type: 'string'},
    action: {readonly: true, type: 'string'},
    primary: {default: 'true', type: 'boolean'},
    disabled: {default: 'false', type: 'boolean'},
    formId: {readonly: true, type: 'string'}
  }

  constructor (params = {id: null, text: null, action: null, primary: null, disabled: null, formId: null}, updateState, renderElement, registerElement, inputElementChanges) {
    this.paramValuesResolver(params);
    this.updateState = updateState;
    this.renderElement = renderElement;
    this.registerElement = registerElement;
    this.inputElementChanges = inputElementChanges;
  }

  render(document) {
    if (this.solveBooleanExp('{ "var": "' + this.solveValue("primary") + '", "value": "true", "op": "==" }')) {
      this.classVars.vars['class'] = this.solveValue('btn btn-primary')
    } else {
      this.classVars.vars['class'] = this.solveValue('btn btn-secondary')
    }
    let button1 = this.createElementIfNotExists(document, 'button', 'button1', undefined);
    button1.className = this.solveValue('class');
    button1.innerHTML = this.solveValue('text');
    button1.action = this.solveValue('action');
    if (this.solveValue('disabled')) button1.disabled = true;
    let self = this;
    button1.onclick = function () {
      if (button1.disabled) {
        return;
      }
      let changedElements = self.inputElementChanges();
      self.updateState({ action: this.action, data: changedElements });
    }
    return button1;
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
export default AWButtonRender;