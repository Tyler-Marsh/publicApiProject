// async await code
// url: https://randomuser.me/api/?results=12

// variable to insert users into
const gallery = document.getElementById("gallery");
// create the container
//document.body.appendChild(modalCont);
async function getRandoms() {
  // wrap in try catch
  try { 
    let response = await fetch('https://randomuser.me/api/?results=12');
    
    let resJson = await response.json();
    let personArray = await resJson.results;
    console.log(personArray)
  
    personArray.map( (person, index)  => {
      let arg = person
      // container for the entire profile
      const card = createElem('div', 'card', null, null);
      // container for just the image
      const cardImg = document.createElement('div', 'card-img-container', null, null);
      const img = createElem('img', 'card-img', null, null);
      img.src =  person.picture.medium;
      img.alt = "profile picture";
      // nest the img into its container
      cardImg.appendChild(img);
      const cardInfo = document.createElement('div');
      cardInfo.className = 'card-info-container';
      // create h3 for user name
      const name = createElem('h3', 'card-name cap', (person.name.first + " " + person.name.last), 'name')
      // create p for email
      const email = createElem('p', 'card-text', person.email, null)
      // create p for location 
      const location = createElem('p', 'card-text cap', (person.location.city + ", " + person.location.state), null)
     
      // add name, then email then location to info container
      cardInfo.appendChild(name);
      cardInfo.appendChild(email);
      cardInfo.appendChild(location);
      // append the img container
      // and then the card info in the outer most container
      card.appendChild(cardImg);
      card.appendChild(cardInfo);
      gallery.appendChild(card);
      // function to create the modals for each
      
    // add the event listeners in the mad so it will have access to the data
     card.addEventListener("click", (event) => {
       event.preventDefault();
      createModal(arg, index);
    });

  });
  }
  catch(err) {
    console.log(err)
    }
}

// duplication
/*
theElem -- string element type to create
theClass -- string class to apply
theText -- string text content
theId -- string id to apply
*/
function createElem(theElem, theClass, theText, theId) {
    const elem = document.createElement(theElem);
    elem.className = theClass;
    elem.id = theId;
    elem.textContent = theText;
    return elem;
}


getRandoms();


function createModal(person, i) {
  // create a container for everything
  const modalCont = createElem('div', 'modal-container', null, null);
  const modal = createElem('div', 'modal', null, null);
  modalCont.appendChild(modal);
  const removeButton = createElem('button', 'modal-close-btn', null, null);
  removeButton.appendChild(createElem('strong', null, "X", null));
  modal.appendChild(removeButton);

  const info = createElem('div', 'modal-info-container', null, null);
  modal.appendChild(info);
  const modalImg = createElem('img', 'modal-img', null, null)
  modalImg.src = person.picture.large;
  info.appendChild(modalImg);
  const modalName = createElem('h3', 'mdoal-name cap', (person.name.first + " " + person.name.last), "name");
  info.appendChild(modalName);

  const modalEmail = createElem('p', 'modal-text cap', person.email, null);
  
  info.appendChild(modalEmail);
  

  const city = createElem('p', 'modal-text cap', person.location.city, null);
  const phone = createElem('p', 'modal-text', person.phone, null);
  const address = createElem('p', 'modal-text', 
    (person.location.street.number + " " + person.location.street.name + ", " + person.location.city + " " + person.location.state + ", " + person.location.postcode));
  // format the birthday
  const dob = new Date(person.dob.date)
  const birthday = createElem('p', 'modal-text', ("Birthday: " + dob.toLocaleDateString()), null);
  // append city phone address and birthday

  info.appendChild(city)
  info.appendChild(createElem('hr',null , null, null));
  info.appendChild(phone)
  info.appendChild(address)
  info.appendChild(birthday)
  modalCont.appendChild(modal);
  document.body.appendChild(modalCont);

  // add an event listener to the X
  removeButton.addEventListener("click", event => {
    event.preventDefault();
    modalCont.remove();
  }
   );

  
// create modal btns
const modalBtns = createElem('div','modal-btn-container', null, null);
const prev = createElem('button', "modal-prev btn", "Prev", "modal-prev");
const next = createElem('button', 'modal-next btn', 'Next', 'modal-next');
modalBtns.appendChild(prev);
modalBtns.appendChild(next);
info.appendChild(modalBtns);

prevEventListener(prev, i);

nextEventListener(next, i);


}

// function to pass index buttons
// to go from start to finish and vice versa

function prevEventListener(element, index) {

  element.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.modal-container').remove()
    const deck = document.querySelectorAll('.card');
    if ((index - 1) === -1) {
      deck[deck.length -1].click();
    }
    else {
      deck[index -1].click();
    }
  });
}


// function to pass index buttons
// to go from start to finish and vice versa

function nextEventListener(element, index) {

  element.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.modal-container').remove()
    //document.getElementById("modal-close-btn").click()
    const deck = document.querySelectorAll('.card');
    if ((index + 1) === deck.length) {
      deck[0].click();
    }
    else {
      deck[index + 1].click();
    }
  });
}




// make a function to add an event listener to each .card

// query selector all to add the event listeners
// add an event listener to prev and next...
// when the event listener is called it will get the queryselector all
// test .click() in the browser
// const deck = document.querySelectorAll('.card')
