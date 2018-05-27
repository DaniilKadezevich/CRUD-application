class htmlElement {
    constructor(tag, attributes, text) {
        this.tagName = tag;
        this.attributes = attributes;
        this.text = text;
        this.generateElement();
    }

    generateElement() {
        this.element = document.createElement(this.tagName);
        if (this.attributes) {
            this.addAttributes();
        }
        if (this.text || this.text === 0) {
            this.element.innerText = this.text;
        }
        return this.element;
    }
    addAttributes() {
        for (let attribute in this.attributes) {
            this.addAttribute( attribute, this.attributes[attribute]);
        }
    }
    addAttribute(attributeName, attributeValue) {
        this.element.setAttribute(attributeName, attributeValue);
    }
    appendTo(parent) {
        parent.append(this.element);
    }
}

