class AWParagraphRender {

  classVars = {}
  domElements = {}

  paramsConfig = {
    id: {readonly: true, type: 'string'},
    level: {default: '0', readonly: true, type: 'number'},
    text: {type: 'string'}
  }

  constructor (params = {id: null, level: null, text: null}, updateState, renderElement, registerElement, inputElementChanges) {
    this.paramValuesResolver(params);
    this.updateState = updateState;
    this.renderElement = renderElement;
    this.registerElement = registerElement;
    this.inputElementChanges = inputElementChanges;
  }

  render(document) {
    let div5 = this.createElementIfNotExists(document, 'div', 'div5', undefined);
    if (this.solveValue('undefined') !== 'undefined') div5.style = 'undefined';
    if (this.solveBooleanExp('{ "var": "' + this.solveValue("level") + '", "value": "' + this.solveValue("0") + '", "op": "==" }')) {
      let p1 = this.createElementIfNotExists(document, 'p', 'p1', div5);
      p1.innerHTML = this.solveValue('text');

    }
    if (this.solveBooleanExp('{ "var": "' + this.solveValue("level") + '", "value": "' + this.solveValue("1") + '", "op": "==" }')) {
      let h11 = this.createElementIfNotExists(document, 'h1', 'h11', div5);
      h11.innerHTML = this.solveValue('text');

    }
    if (this.solveBooleanExp('{ "var": "' + this.solveValue("level") + '", "value": "' + this.solveValue("2") + '", "op": "==" }')) {
      let h21 = this.createElementIfNotExists(document, 'h2', 'h21', div5);
      h21.innerHTML = this.solveValue('text');

    }
    if (this.solveBooleanExp('{ "var": "' + this.solveValue("level") + '", "value": "' + this.solveValue("3") + '", "op": "==" }')) {
      let h31 = this.createElementIfNotExists(document, 'h3', 'h31', div5);
      h31.innerHTML = this.solveValue('text');

    }
    if (this.solveBooleanExp('{ "var": "' + this.solveValue("level") + '", "value": "' + this.solveValue("3") + '", "op": ">" }')) {
      let h42 = this.createElementIfNotExists(document, 'h4', 'h42', div5);
      h42.innerHTML = this.solveValue('text');

    }
    return div5;
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
export default AWParagraphRender;