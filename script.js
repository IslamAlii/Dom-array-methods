var main = document.querySelector('main'),
    addUserBtn = document.getElementById('add-user'),
    doubleBtn = document.getElementById('double'),
    showMillionairesBtn = document.getElementById('show-millionaires'),
    sortBtn = document.getElementById('sort'),
    claculateWealthBtn = document.getElementById('calculate-wealth'),
    data = new Array();


getRandomUser();
getRandomUser();
getRandomUser();

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
claculateWealthBtn.addEventListener('click', calculateWealth);

async function getRandomUser() {
    var res = await fetch('https://randomuser.me/api');
    var data = await res.json();
    var user = data.results[0];
    var newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

function addData(obj) {
    data.push(obj);

    updateDom();
}

function updateDom(providedData = data) {
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
    
    providedData.forEach(item => {
        var divElement = document.createElement('div');
        divElement.classList.add('person');
        divElement.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(divElement);
    });
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2};
    });

    updateDom();
}

function showMillionaires() {
    data = data.filter(user => user.money >= 1000000);

    updateDom();
}

function sortByRichest() {
    data.sort((a, b) => b.money - a.money);

    updateDom();
}

function calculateWealth() {
    var totalWealth = data.reduce((acc, user) => (acc += user.money), 0);

    console.log(totalWealth);

    var wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total wealth: <strong>${formatMoney(totalWealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}