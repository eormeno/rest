import AWButtonRender from './button.component.js';
import AWFormRender from './form.component.js';
import AWInputRender from './input.component.js';
import AWParagraphRender from './paragraph.component.js';

let currentPageName = '';

let inputElements = {};

let elementRender = {};

window.onload = function () {
   document.getElementById("version").innerHTML = "BUILDeF - Version 1.0.0 - Instituto de Informática - UNSJ - 2023";
   updateState({ reload: true });
};

function updateState(data = {}) {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function () {

      if (this.readyState == 4 && this.status == 200) {
         let syncData = JSON.parse(this.responseText);
         if (syncData.syncType == "full") {
            currentPageName = syncData.page;
            renderPage(syncData);
         } else if (syncData.syncType == "part") {
            updatePage(syncData);
         }
      } else if (this.status == 403) {
         try {
            let response = JSON.parse(this.responseText);
            alert(response.message);
         } catch (e) {
         }
      }
   };

   xhttp.open("POST", "page", true);
   xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
   xhttp.send(JSON.stringify(data));
}

function updatePage(syncData) {
   if (syncData.page == currentPageName) {
      for (let i = 0; i < syncData.changes.length; i++) {
         let change = syncData.changes[i];
         switch (change.change) {
            case 0: // create
               createdElement(change)
               break;
            case 1: // update
               updatedElement(change);
               break;
            case 2:
               addedElement(change);
               break;
            case 3:
               removedElement(change);
               break;
         }
      }
   }
}

function inputElementChanges() {
   let changedElements = [];
   for (let key in inputElements) {
      let inputElement = inputElements[key];
      if (inputElement.element.value != inputElement.logicalElement.value) {
         inputElement.logicalElement.value = inputElement.element.value;
         changedElements.push(inputElement.logicalElement);
      }
   }
   return changedElements;
}

function renderPage(page) {
   let content = document.getElementById("content");
   inputElements = {};
   window.title = page.title;
   content.innerHTML = "";
   content.className = "container mt-3";
   for (let i = 0; i < page.elements.length; i++) {
      content.appendChild(renderElement(page.elements[i], document));
   }
}

function findOrCreateElementRender(element) {
   let render = elementRender[element.id];
   if (render == null) {
      let renderClassName = element.class + "Render";
      render = eval(`new ${renderClassName}(element, updateState, renderElement, registerElement, inputElementChanges)`);
      elementRender[element.id] = render;
   }
   return render;
}

function renderElement(element, document) {
   return findOrCreateElementRender(element).render(document);
   /*
   switch (element.class) {
      case "Paragraph":

         return new ParagraphRender(element, updateState, renderElement, registerElement, inputElementChanges).render(document);
      case "Button":
         return new ButtonRender(element, updateState, renderElement, registerElement, inputElementChanges).render(document);
      case "Input":
         let inputComponent = new InputRender(element, updateState, renderElement, registerElement, inputElementChanges);
         return inputComponent.render(document);
      case "Form":
         return new FormRender(element, updateState, renderElement, registerElement, inputElementChanges).render(document);
   }*/
}

function registerElement(element, logicalElement) {
   inputElements[element.id] = {
      element: element,
      logicalElement: logicalElement,
      value: element.value
   };
}

/*
function renderParagraph(element) {
   let elementType = element.level = 0 ? "p" : "h" + element.level;
   let p = document.getElementById(element.id);
   if (p == null) {
      p = document.createElement(elementType);
      p.id = element.id;
   }
   if (element.text)
      p.innerHTML = element.text;
   if (element.level)
      p.className = elementType
   return p;
}

function renderButton(element) {
   let button = document.createElement("button");

   button.className = element.level == 1 ? "btn btn-primary" : "btn btn-secondary";
   button.action = element.action;
   button.onclick = function () {
      let changedElements = inputElementChanges();
      updateState({ action: this.action, data: changedElements });
   };
   button.innerHTML = element.text;
   return button;
}

function renderInput(element) {
   let input = document.getElementById(element.id);
   if (input == null) {
      let container = document.createElement("div");
      container.className = "input-field";
      input = document.createElement("input");
      input.id = element.id;
      container.appendChild(input);
   }

   let inputContainer = input.parentElement;

   if (element.type)
      input.type = element.type;
   if (element.value)
      input.value = element.value;
   if (element.placeholder)
      input.placeholder = element.placeholder;
   if (element.name)
      input.name = element.name;
   if (element.readonly)
      input.readonly = element.readonly;
   if (element.required)
      input.required = element.required;
   if (element.label)
      input.label = element.label;
   if (element.error) {
      input.className = "input-field-error";
      input.error = element.error;
   } else {
      input.className = "form-control";
   }
   inputElements[element.id] = { element: input, logicalElement: element, value: element.value };
   return inputContainer;
}

function renderForm(element) {
   let form = document.createElement("div");
   form.id = element.id;
   form.className = "form";
   let formRow = document.createElement("div");
   formRow.className = "form-row";
   form.appendChild(formRow);
   for (let i = 0; i < element.elements.length; i++) {
      let formElement = renderElement(element.elements[i]);
      let formGroup = document.createElement("div");
      formGroup.className = "form-group col-md-6";
      formGroup.appendChild(formElement);
      formRow.appendChild(formGroup);
   }
   return form;
}
*/

function createdElement(change) {
   console.log(change)
}

function updatedElement(change) {
   //console.log(change)
   let render = elementRender[change.id];
   if (render != null) {
      render.update(document, change);
   }
   /*console.log(change)
   switch (change.class) {
      case "Paragraph":
         findOrCreateElementRender(change).render(change);
         break;
      case "Input":
         renderInput(change);
         break;
   }*/
}