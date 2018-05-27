'use strict';
// --- m... = Array ---
// --- obj... = Object ---
function Table() {
    // --- Generate Header ---
    this.generateHeader = (parent, objElements, objActionElement, array, self) => {
        let header = new htmlElement('div', {class: 'row header'});

        this.generateHeaderElements(header.element, objElements.inners, objElements.classes);
        this.generateActionsHeaderElement(header.element, objActionElement.value, objActionElement.classes, objActionElement.formId, objActionElement.wrapperFunc, objActionElement.btnSaveParentId, array, self);

        header.appendTo(parent);
    };
    this.generateHeaderElements = (parent, inners, classes) => {
        for (let n = 0; n < inners.length; n++) {
            this.generateHeaderElement(parent, inners[n], classes[n]);
        }
    };
    this.generateHeaderElement = (parent, inner, classes) => {
        let headerElement = new htmlElement('div', {class: classes}, inner);

        headerElement.appendTo(parent);
    };
    this.generateActionsHeaderElement = (parent, btnValue, classes, formId, wrapperFunc, btnSaveParentId, array, self) => {
        let headerElement = new htmlElement('div', {class: classes});

        if (btnValue) {
            this.generateBtn(headerElement.element, 'btn btn-primary', btnValue, this.eventBtnAdd.bind(this, formId, wrapperFunc, btnSaveParentId, array, self));
        }

        headerElement.appendTo(parent);
    };
    // ------
    // --- Generate Rows ---
    this.generateRows = (parent, array, mClasses, objActionElement) => {
        for (let i = 0; i < array.length; i++){
            this.generateRow(parent, array[i], mClasses, objActionElement, i, array);
        }
    };
    this.generateRow = (parent, objElement, mClasses, objActionElement, i, array) => {
        let row = new htmlElement('div', {class: 'row'});

        this.generateRowElements(row.element, objElement, mClasses);
        this.generateActionsRowElement(row.element, objActionElement.classes, objActionElement.buttons, i, array);

        row.appendTo(parent);
    };
    this.generateRowElements = (parent, objElement, mClasses) => {
        let n = 0;
        for (let key in objElement) {
            if (key === 'cars'){
                this.generateRowElement(parent, objElement[key].length, mClasses[n])
            } else {
                this.generateRowElement(parent, objElement[key], mClasses[n]);
            }
            n++;
        }
    };
    this.generateRowElement = (parent, inner, classes) => {
        let rowElement = new htmlElement('div', {class: classes}, inner);

        rowElement.appendTo(parent);
    };
    this.generateActionsRowElement = (parent, classes, objButtons, i, array) => {
        let rowElement = new htmlElement('div', {class: classes});

        this.generateBtns(rowElement.element, objButtons, i, array);

        rowElement.appendTo(parent);
    };
    //------
    // --- Btns ---
    this.generateBtns = (parent, objButtons, i, array) => {
        for (let n = 0; n < objButtons.values.length; n++) {
            this.generateBtn(parent, objButtons.classes[n], objButtons.values[n], objButtons.events[n], i, '', array);
        }
    };
    this.generateBtn = (parent, classes, value, func, i, name, array) => {
        let btn = new htmlElement('input', {class: classes, type: 'button', value: value, name: name});

        btn.element.addEventListener('click', func.bind(this, i, array));

        btn.appendTo(parent);
    };
    // --- BUTTON EVENTS ---
    // -- Events Button Add And Save Element --
    this.eventBtnAdd = (formId, wrapperFunc, btnSaveParentId, array, self) => {
        let [formAdd, blockBtnSave] = [document.getElementById(formId), document.getElementById(btnSaveParentId)];

        this.generateWrapper(wrapperFunc, formAdd);

        this.showAndHide(formAdd);

        this.generateBtn(blockBtnSave, 'btn btn-success', 'Save', this.eventBtnSaveElement.bind(this, formAdd, array, self), 'none', 'saveElement');
    };
    this.eventBtnSaveElement = (formAdd, array, self) => {
        let regexp;

        if (array === owners) {
            regexp = /^[A-Z][A-Za-z]{2,}$/.test(formAdd.name.value) && /^[1-9][0-9]*$/.test(formAdd.balance.value);
        } else {
            regexp = /^[A-Z][A-Za-z]+$/.test(formAdd.make.value) && /^[A-Za-z0-9]+$/.test(formAdd.model.value) && /^[A-Za-z][a-z]{2,}$/.test(formAdd.colour.value) && /^(19[0-9]{2}|20[0-9][0-8])$/.test(formAdd.year.value) && /^[1-9][0-9]{2,8}$/.test(formAdd.price.value);
        }
        if (regexp) {
            this.eventSetNewElement(formAdd, array);

            this.eventHideAddForm(formAdd);

            this.removeWrapper();

            self.generateTable();

            this.clearFormFields(formAdd);

            this.updateLocalStorage();
        } else {
            this.incorrectValueError(formAdd, array);
        }
    };
    this.eventSetNewElement = (formAdd, array) => {
        let property = "", strElement = "";

        for (let n = 0; n < (formAdd.elements.length - 1); n++) {
            if (formAdd.elements[n].type !== 'radio') {
                property += `${JSON.stringify(formAdd.elements[n].getAttribute('name'))}: ${JSON.stringify(formAdd.elements[n].value)}, `;
            } else {
                if (formAdd.elements[n].checked) {
                    property += `${JSON.stringify(formAdd.elements[n].getAttribute('name'))}: ${JSON.stringify(formAdd.elements[n].value)}, `;
                }
            }
        }
        if (array === owners) {
            strElement = `{${property}${JSON.stringify('cars')}: []}`;
        } else {
            strElement = `{${property.slice(0, -2)}}`;
        }

        let objElement = JSON.parse(strElement);

        array.push(objElement);
    };
    this.eventHideAddForm = (formAdd) => {
        this.removeElement(formAdd.elements[formAdd.elements.length - 1]);
        this.showAndHide(formAdd);
        this.clearFormFields(formAdd);
    };
    // ----
    // -- Events Button View Element Info --
    this.eventBtnViewElementInfo = (i, array) => {
        let [body, viewBlockParent] = [document.body, new htmlElement('div', {class: 'col-4 offset-4 view_block'})];

        this.generateWrapper(this.eventDeleteViewBlock, viewBlockParent.element);

        this.generateViewElementRows(viewBlockParent.element, i, array[i]);


        viewBlockParent.appendTo(body);
    };
    this.generateViewElementRows = (viewBlockParent, i, element) => {
        let viewOwnerRow = new htmlElement('div', {class: 'row'});

        this.generateViewOwnerRowElements(viewOwnerRow.element, element);

        this.generateViewOwnerRowActionElement(viewOwnerRow.element, 'col-12 view_owner_row_btn tac', viewBlockParent);

        viewOwnerRow.appendTo(viewBlockParent);
    };
    this.generateViewOwnerRowElements = (parent, element) => {
        for (let key in element) {
            if (key === 'cars') {
                let [categoryName, categoryValue] = [key[0].toUpperCase() + key.slice(1), element[key].lengt];

                this.generateViewOwnerRowElement(parent, categoryName, 'col-6 view_owner_row_category');
                this.generateViewOwnerRowElement(parent, categoryValue, 'col-6 view_owner_row_value');
            } else {
                let [categoryName, categoryValue] = [key[0].toUpperCase() + key.slice(1), element[key]];

                this.generateViewOwnerRowElement(parent, categoryName, 'col-6 view_owner_row_category');
                this.generateViewOwnerRowElement(parent, categoryValue, 'col-6 view_owner_row_value');
            }

        }
    };
    this.generateViewOwnerRowElement = (parent, inner, classes) => {
        let viewOwnerRowElement = new htmlElement('div', {class: classes}, inner);

        viewOwnerRowElement.appendTo(parent);
    };
    this.generateViewOwnerRowActionElement = (parent, classes, viewBlockParent) => {
        let viewElementRowElement = new htmlElement('div', {class: classes});

        this.generateBtn(viewElementRowElement.element, 'btn btn-secondary', 'Hide', this.eventHideWrapperAndCaller.bind(this, this.eventDeleteViewBlock, viewBlockParent));

        viewElementRowElement.appendTo(parent);
    };
    this.eventDeleteViewBlock = (viewBlockParent) => {
        this.removeElement(viewBlockParent);
    };
    // ----
    // -- Event Button Delete Element --
    this.eventBtnDeleteElement = (self, i, array) => {
        if (confirm('Are you sure?')) {
            array.splice(i, 1);

            self.generateTable();

            this.updateLocalStorage();
        }
    };
    // ----
    // ------
    // --- Wrapper ---
    this.generateWrapper = (func, callerBlock) => {
        let [body, formWrapper] = [document.body, new htmlElement('div', {id: 'wrapper', class: 'wrapper'})];

        formWrapper.element.addEventListener('click', this.eventHideWrapperAndCaller.bind(this, func, callerBlock));

        formWrapper.appendTo(body);
    };
    this.removeWrapper = () => {
        let wrapper = document.getElementById('wrapper');

        this.removeElement(wrapper);
    };
    this.eventHideWrapperAndCaller = (func, callerBlock) => {
        func(callerBlock);

        this.removeWrapper();
    };
    // ------
    // --- Form fields ---
    this.incorrectValueError = (formAdd, array) => {
        if (array === owners) {
            if (!/^[A-Z][A-Za-z]{2,}$/.test(formAdd.name.value)) {
                this.showIncorrectValueError(formAdd.name);
            }
            if (!/^[1-9][0-9]*$/.test(formAdd.balance.value)) {
                this.showIncorrectValueError(formAdd.balance);
            }
        } else {
            if (!/^[A-Z][A-Za-z]+$/.test(formAdd.make.value)) {
                this.showIncorrectValueError(formAdd.make);
            }
            if (!/^[A-Za-z0-9]+$/.test(formAdd.model.value)) {
                this.showIncorrectValueError(formAdd.model);
            }
            if (!/^[A-Za-z][a-z]{2,}$/.test(formAdd.colour.value)) {
                this.showIncorrectValueError(formAdd.colour);
            }
            if (!/^(19[0-9]{2}|20[0-9][0-8])$/.test(formAdd.year.value)) {
                this.showIncorrectValueError(formAdd.year);
            }
            if (!/^[1-9][0-9]{2,8}$/.test(formAdd.price.value)) {
                this.showIncorrectValueError(formAdd.price);
            }
        }

    };
    this.showIncorrectValueError = (element) => {
        element.value = '';
        element.setAttribute('placeholder', `Enter the correct ${element.getAttribute('name')} to finish`);
    };
    this.clearFormFields = (form) => {
        for (let i = 0; i < form.elements.length; i++) {
            if (form.elements[i].getAttribute('type') !== 'radio'){
                form.elements[i].value = '';
                form.elements[i].setAttribute('placeholder', '');
            }
        }
    };
    // ------
    this.clearTable = (parent) => {
        parent.innerHTML = '';
    };
    this.removeElement = (element) => {
        element.parentNode.removeChild(element)
    };
    this.showAndHide = (element) => {
        element.classList.toggle('hidden');
    };
    this.updateLocalStorage = () => {
        localStorage.setItem('owners', JSON.stringify(owners));
        localStorage.setItem('cars', JSON.stringify(cars));
    };
}