'use strict';

function CarsTable() {
    this.generateTable =  () => {
        let carsTable = document.getElementById('cars_table');

        this.clearTable(carsTable);

        this.generateHeader(carsTable, {
                inners: ['Make', 'Model', 'Colour', 'Year', 'Price $'],
                classes: [
                    'col-2 align-self-center tac',
                    'col-2 align-self-center tac',
                    'col-2 align-self-center tac',
                    'col-1 align-self-center tac',
                    'col-2 align-self-center tac',
                ]
            }, {
            value: 'Add Car',
            classes: 'col-3 align-self-center tac',
            formId: 'form_cars',
            wrapperFunc: this.eventHideAddForm,
            btnSaveParentId: 'btn_save_car_block'
            }, cars, this);

        this.generateRows(carsTable, cars, [
            'element_info col-2 align-self-center tac',
            'element_info col-2 align-self-center tac',
            'element_info col-2 align-self-center tac',
            'element_info col-1 align-self-center tac',
            'element_info col-2 align-self-center tac',
        ], {
            buttons: {
                values: ['View', 'Edit', 'Remove'],
                classes: [
                    'btn btn-info',
                    'btn btn-warning',
                    'btn btn-danger',
                ],
                events: [
                    this.eventBtnViewElementInfo,
                    this.eventBtnEditOwnersInfo,
                    this.eventBtnDeleteElement.bind(this, this)
                ] },
            classes: 'actions col-3'
        });
    };
    // -- Events Button Edit Owners Info --
    this.eventBtnEditOwnersInfo = (i) => {
        let [formEdit, blockBtnEdit] = [document.getElementById('form_cars'), document.getElementById('btn_save_car_block')];

        this.generateWrapper(this.eventHideAddForm, formEdit);

        this.fillFormEdit(formEdit, i);
        this.showAndHide(formEdit);

        this.generateBtn(blockBtnEdit, 'btn btn-success', 'Edit', this.eventBtnEditOwner, i, 'editCar')
    };
    this.eventBtnEditOwner = (i) => {
        let editForm = document.getElementById('form_cars');

        if (/^[A-Z][A-Za-z]+$/.test(editForm.make.value) && /^[A-Za-z0-9]+$/.test(editForm.model.value) && /^[A-Za-z][a-z]{2,}$/.test(editForm.colour.value) && /^(19[0-9]{2}|20[0-9][0-8])$/.test(editForm.year.value) && /^[1-9][0-9]{2,8}$/.test(editForm.price.value)){

            this.eventUpdateElement(editForm, i);

            this.eventHideAddForm(editForm);

            this.removeWrapper();

            this.generateTable();

            this.clearFormFields(editForm);

            this.updateLocalStorage();
        } else {
            this.incorrectValueError(editForm, cars);
        }
    };
    this.eventUpdateElement = (form, i) => {
        let n = 0;
        for (let key in cars[i]){
            cars[i][key] = form.elements[n].value;
            n++;
        }
    };
    this.fillFormEdit = (form, i) => {
        let n = 0;
        for (let key in cars[i]){
            form.elements[n].value = cars[i][key] ;
            n++;
        }
    };

}
CarsTable.prototype = new Table();