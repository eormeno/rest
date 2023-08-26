class ApplicationManager {
	constructor() {
		this.map = {};
		this.registerComponent("paragraph");
		//this.registerComponent("button");
		//this.registerComponent("input");
		console.log("ApplicationManager initialized");
	}

	async registerComponent(component) {
		let componentDefinition = await this.loadComponentDefinition(component);
		this.map[component] = componentDefinition;
		let code = this.generateCode(componentDefinition);
		console.log(code);
	}

	loadComponentDefinition(component) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open("GET", `views/components/${component}.component.html.json`);
			xhr.onload = () => {
				if (xhr.status == 200) {
					resolve(JSON.parse(xhr.responseText)['template']);
				} else {
					reject(xhr.statusText);
				}
			};
			xhr.onerror = () => reject(xhr.statusText);
			xhr.send();
		});
	}

	generateCode(template) {
		let code = "";
		for (let key in template) {
			if (key == "$" || key == "_") {
				continue;
			}
			if (key == "if") {
				code += `if (${template[key]["$"].op}) {\n`;
				code += this.generateCode(template[key]);
				code += "}\n";
			} else if (key == "do") {
				code += `${template[key]["$"].st}\n`;
			} else {
				let elementName = key;
				if (elementName.startsWith("_")) {
					elementName = "`${" + elementName + "}`";
				}
				code += `let ${key}_1 = document.createElement(${elementName});\n`;
				for (let attr in template[key]["$"]) {
					code += `${key}_1.setAttribute("${attr}", ${template[key]["$"][attr]});\n`;
				}
				code += `${key}_1.innerHTML = ${template[key]["_"]};\n`;
			}
		}
		return code;
	}
}