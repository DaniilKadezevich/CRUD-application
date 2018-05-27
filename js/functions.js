'use strict';
// --- Owner ---
let createOwnersTable = (e) => {
    setActiveClass(e);
    document.getElementById('owners_table').classList.remove('hidden');
    let ownersTable = new OwnersTable();

        ownersTable.generateTable();
};
let hideOwnerTable = () => {
    document.getElementById('owners_table').innerHTML = '';
};
// --- Cars ---
let createCarsTable = (e) =>  {
    setActiveClass(e);

    let carsTable = new CarsTable();

    carsTable.generateTable()
};
let hideCarsTable = () => {
    document.getElementById('cars_table').innerHTML = '';
};
let setActiveClass = (e) =>  {
    clearActiveClass();

    e.target.classList.add('btn_on')
};
let clearActiveClass = () => {
    let btnShowTable = document.querySelectorAll('.show_table');

    btnShowTable.forEach(function (value) { value.classList.remove('btn_on') });
};
let getElementsFromLs = () => {
    if (localStorage.getItem('owners')) {
        owners = JSON.parse(localStorage.getItem('owners'));
    }
    if (localStorage.getItem('cars')) {
        cars = JSON.parse(localStorage.getItem('cars'));
    }
};