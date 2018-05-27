'use strict';
function OwnersTable() {
    this.generateTable = () => {
        let ownersTable = document.getElementById('owners_table');

        this.clearTable(ownersTable);

        this.generateHeader(ownersTable, {
            inners: ['Name', 'Balance $', 'Type', 'Cars'],
            classes: [
                'col-2 align-self-center tac',
                'col-2 align-self-center tac',
                'col-2 align-self-center tac',
                'col-1 align-self-center tac',
            ]
            }, {
            value: 'Add Owner',
            classes: 'col-5 align-self-center tac',
            formId: 'form_owner',
            wrapperFunc: this.eventHideAddForm,
            btnSaveParentId: 'btn_save_block'
            }, owners, this);

        this.generateRows(ownersTable, owners, [
                'element_info col-2 align-self-center tac',
                'element_info col-2 align-self-center tac',
                'element_info col-2 align-self-center tac',
                'element_info col-1 align-self-center tac'
            ], {
            buttons: {
                values: ['View', 'Edit', 'Car market', 'Garage', 'Delete'],
                classes: [
                    'btn btn-info',
                    'btn btn-warning',
                    'btn btn-success',
                    'btn btn-secondary',
                    'btn btn-danger'
                ],
                events: [
                    this.eventBtnViewElementInfo,
                    this.eventBtnEditOwnersInfo,
                    this.eventBtnCarMarket,
                    this.eventBtnGarage,
                    this.eventBtnDeleteElement.bind(this, this)
                ] },
            classes: 'actions col-5' });
    };
    // --- BUTTON EVENTS ---
    // -- Events Button Edit Owners Info --
    this.eventBtnEditOwnersInfo = (i) => {
        let [formEdit, blockBtnEdit] = [document.getElementById('form_owner'), document.getElementById('btn_save_block')];

        this.generateWrapper(this.eventHideAddForm, formEdit);

        this.fillFormEdit(formEdit, i);
        this.showAndHide(formEdit);

        this.generateBtn(blockBtnEdit, 'btn btn-success', 'Edit', this.eventBtnEditOwner, i, 'editOwner')
    };
    this.eventBtnEditOwner = (i) => {
        let editForm = document.getElementById('form_owner');

        if (/^[A-Z][A-Za-z]{2,}$/.test(editForm.name.value) && /^[1-9][0-9]*$/.test(editForm.balance.value)){

            this.eventUpdateElement(editForm, i);

            this.eventHideAddForm(editForm);

            this.removeWrapper();

            this.generateTable();

            this.clearFormFields(editForm);

            this.updateLocalStorage();
        } else {
            this.incorrectValueError(editForm, owners);
        }
    };
    this.eventUpdateElement = (form, i) => {
        owners[i].name = form.name.value;
        owners[i].balance = parseInt(form.balance.value);
        owners[i].type = form.type.value;
    };
    this.fillFormEdit = function (form, i) {
        form.name.value = owners[i].name;
        form.balance.value = owners[i].balance;
        form.type.value = owners[i].type;
    };
    //----
    // --- CARS ---
    // -- Event Btn Buy --
    this.eventBtnCarMarket = (ownersIndex) => {
        let shopContainer = new htmlElement('div', {class: 'col-8 offset-2 shop_container'});

       this.generateWrapper(this.hideContainer, shopContainer.element);

       if (cars.length >= 1) {
           this.generateHeader(shopContainer.element, {
               inners: ['Make', 'Model', 'Colour', 'Year', 'Price $'],
               classes: [
                   'col-3 align-self-center tac',
                   'col-2 align-self-center tac',
                   'col-2 align-self-center tac',
                   'col-1 align-self-center tac',
                   'col-2 align-self-center tac'
               ]
           }, {
               value: '',
               classes: 'col-2 align-self-center tac',
               formId: '',
               wrapperFunc: '',
               btnSaveParentId: ''
           }, cars);
           this.generateRows(shopContainer.element, cars, [
               'element_info col-3 align-self-center tac',
               'element_info col-2 align-self-center tac',
               'element_info col-2 align-self-center tac',
               'element_info col-1 align-self-center tac',
               'element_info col-2 align-self-center tac'
           ], {
               buttons: {
                   values: ['Buy'],
                   classes: [
                       'btn btn-success'
                   ],
                   events: [
                       this.eventBtnBuyCar.bind(this, ownersIndex, shopContainer.element)
                   ] },
               classes: 'actions col-2' });
           this.generateBtnHideContainer(shopContainer.element);
       } else {
           let row = new htmlElement('div', {class: 'row'});

           this.generateRowElement(row.element, 'All cars are sold, come tomorrow', 'element_info col-12 tac');

           row.appendTo(shopContainer.element);

           this.generateBtnHideContainer(shopContainer.element);
       }

       shopContainer.appendTo(document.body);
    };
    this.hideContainer = (shopContainer) => {
        this.removeElement(shopContainer)
    };
    this.eventBtnBuyCar = (ownersIndex, shopContainer, carsIndex) => {
        if (parseInt(owners[ownersIndex].balance) >= cars[carsIndex].price) {
            this.updateElementsInfoBuy(ownersIndex, carsIndex);

            this.removeWrapper();

            this.updateShop(ownersIndex, shopContainer);

            this.generateTable();

            this.updateLocalStorage();
        } else {
            alert('Do not have enough money, work harder');
        }
    };
    this.updateElementsInfoBuy = (ownersIndex, carsIndex) => {
        owners[ownersIndex].balance -= cars[carsIndex].price;

        cars[carsIndex].price /= 2;

        owners[ownersIndex].cars.push(cars[carsIndex]);

        cars.splice(carsIndex, 1);
    };
    this.updateShop = (ownersIndex, shopContainer) => {
        this.hideContainer(shopContainer);

        this.eventBtnCarMarket(ownersIndex)
    };
    // ----
    // -- Event Btn Garage --
    this.eventBtnGarage = (ownersIndex) => {
        let garage =  new htmlElement('div', {class: 'col-8 offset-2 garage'});

        this.generateWrapper(this.hideContainer, garage.element);

        if (owners[ownersIndex].cars.length >= 1) {
            this.generateHeader(garage.element, {
                inners: ['Make', 'Model', 'Colour', 'Year', 'Price $'],
                classes: [
                    'col-3 align-self-center tac',
                    'col-2 align-self-center tac',
                    'col-2 align-self-center tac',
                    'col-1 align-self-center tac',
                    'col-2 align-self-center tac'
                ]
            }, {
                value: '',
                classes: 'col-2 align-self-center tac',
                formId: '',
                wrapperFunc: '',
                btnSaveParentId: ''
            }, cars);
            this.generateRows(garage.element, owners[ownersIndex].cars, [
                'element_info col-3 align-self-center tac',
                'element_info col-2 align-self-center tac',
                'element_info col-2 align-self-center tac',
                'element_info col-1 align-self-center tac',
                'element_info col-2 align-self-center tac'
            ], {
                buttons: {
                    values: ['Sell'],
                    classes: [
                        'btn btn-danger'
                    ],
                    events: [
                        this.eventBtnSellCar.bind(this, ownersIndex, garage.element)
                    ] },
                classes: ['actions', 'col-2'] });
            this.generateBtnHideContainer(garage.element);
        } else {
            let row = new htmlElement('div', {class: 'row'});

            this.generateRowElement(row.element, 'You have no cars (', 'element_info col-12 tac');

            row.appendTo(garage.element);

            this.generateBtnHideContainer(garage.element);
        }

        garage.appendTo(document.body);
    };
    this.eventBtnSellCar = (ownersIndex, garage, carsIndex) => {
        if (confirm('Are you sure?')) {
            this.updateElementsInfoSell(ownersIndex, carsIndex);

            this.removeWrapper();

            this.updateGarage(ownersIndex, garage);

            this.generateTable();

            this.updateLocalStorage();
        }
    };
    this.updateElementsInfoSell = (ownersIndex, carsIndex) => {
        owners[ownersIndex].balance +=  owners[ownersIndex].cars[carsIndex].price;

        owners[ownersIndex].cars[carsIndex].price *= 2;

        cars.push(owners[ownersIndex].cars[carsIndex]);

        owners[ownersIndex].cars.splice(carsIndex, 1);
    };
    this.updateGarage = (ownersIndex, garage) => {
        this.hideContainer(garage);

        this.eventBtnGarage(ownersIndex);
    };
    // ----
    this.hideContainer = (shopContainer) => {
        this.removeElement(shopContainer)
    };
    this.generateBtnHideContainer = (element) => {
        let [row, column] = [new htmlElement('div', {class: 'row view_owner_row_btn'}), new htmlElement('div', {class: 'col-12 tac'})];

        this.generateBtn(column.element, 'btn btn-warning justify-content-center', 'Exit', this.eventHideWrapperAndCaller.bind(this, this.hideContainer, element));

        column.appendTo(row.element);
        row.appendTo(element);
    };
    // ------
}
OwnersTable.prototype = new Table();