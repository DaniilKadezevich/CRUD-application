'use strict';

getElementsFromLs();

let btnShowOwners = document.querySelector('.show_owners');
let btnShowCars = document.querySelector('.show_cars');

btnShowOwners.addEventListener('click', createOwnersTable);
btnShowOwners.addEventListener('click', hideCarsTable);

btnShowCars.addEventListener('click', createCarsTable);
btnShowCars.addEventListener('click', hideOwnerTable);





