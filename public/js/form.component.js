class AWFormRender {

  classVars = {}
  domElements = {}

  paramsConfig = {
    id: {readonly: true, type: 'string'},
    title: {type: 'string'},
    submit: {readonly: true, type: 'string'},
    elements: {readonly: true, type: 'array'},
    submitButton: {readonly: true, type: 'Button'},
    class: {default: 'form', readonly: true, type: 'string'}
  }

  constructor (params = {id: null, title: null, submit: null, elements: null, submitButton: null, class: null}, updateState, renderElement, registerElement, inputElementChanges) {
    this.paramValuesResolver(params);
    this.updateState = updateState;
    this.renderElement = renderElement;
    this.registerElement = registerElement;
    this.inputElementChanges = inputElementChanges;
  }

  render(document) {
    let form1 = this.createElementIfNotExists(document, 'div', 'form1');
    if (this.solveValue('form')) form1.className = this.solveValue('form');
    let h41 = this.createElementIfNotExists(document, 'h4', 'h41', form1);
    h41.innerHTML = this.solveValue('title');
    let div1 = this.createElementIfNotExists(document, 'div', 'div1', form1);
    if (this.solveValue('undefined') !== 'undefined') div1.style = 'undefined';
    div1.setAttribute('class', this.solveValue('form-row'));
    let arr = this.solveValue('elements');
    arr.forEach((item) => {
      this.classVars.vars['element'] = item;
      let div2 = this.createElementIfNotExists(document, 'div', 'div2', div1);
      if (this.solveValue('undefined') !== 'undefined') div2.style = 'undefined';
      div2.setAttribute('class', this.solveValue('form-group col-md-6'));
      let container1 = this.createElementIfNotExists(document, 'div', 'container1', div2);
      let element1 = this.solveValue('element');
      let child = this.renderElement(element1, document);
      container1.appendChild(child);


    });

    let hr1 = this.createElementIfNotExists(document, 'hr', 'hr1', form1);
    let container2 = this.createElementIfNotExists(document, 'div', 'container2', form1);
    let element2 = this.solveValue('submitButton');
    let child = this.renderElement(element2, document);
    container2.appendChild(child);
    return form1;
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
export default AWFormRender;