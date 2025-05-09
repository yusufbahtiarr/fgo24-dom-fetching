const imageBox = document.querySelector('.image')
const formSearch = document.getElementById('formSearch')
const search = document.getElementById('search')
const dataUser = document.createElement('div')
const imgUser = document.createElement('img')
const spanText = document.createElement('span')

const btnFind = document.querySelector('#formSearch > button')
const btnSubmit = document.getElementById('submit1')
const btnReset = document.getElementById('reset1')

btnReset.style.display = 'none'

async function fetchData(){
  try {
    document.querySelector('.image').innerHTML = ''
    const response =  await fetch('https://rickandmortyapi.com/api/character')
    const result = await response.json()
    const data = result.results
    const names = data.map(character => character.name);
    const images = data.map(character => character.image);

    // memasukkan data api ke dalam local storage
    localStorage.setItem('arrayData', JSON.stringify(data));
    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('images', JSON.stringify(images));

    // menampilkan data nama dan image
    showData(data)
    btnReset.style.display = 'none'
    btnSubmit.style.display = 'flex'
  } catch (error) {
    console.log(error.message);
  }
}
fetchData()


function showData(data){
  data.forEach(item => {
    const dataUser = document.createElement('div')
    const imgUser = document.createElement('img')
    const spanText = document.createElement('span')
    imageBox.append(dataUser)
    dataUser.append(imgUser)
    dataUser.append(spanText)
    imgUser.src = item.image
    spanText.textContent = item.name
  });  
}

formSearch.addEventListener('submit', function(e) {
  e.preventDefault();
  const dataUser = document.createElement('div')
  const spanText = document.createElement('span')
  const nameFrom = e.target.search.value
  
  const dataStorage = JSON.parse(localStorage.getItem('arrayData'))
  if (nameFrom === "" || nameFrom === " ") {
    return
  }
  const result = dataStorage.find(item => 
  item.name.toLowerCase().includes(nameFrom.toLowerCase())
  );

  let filteredName = (() => {
  const r = dataStorage.find(item => item.name.toLowerCase().includes(nameFrom.toLowerCase()));
  return r ? { name: r.name, image: r.image } : null;
  })();
  if (filteredName) {
    localStorage.setItem('nameFind', filteredName.name)
    localStorage.setItem('imageFind', filteredName.image)
    // console.log(filteredName);
  }
  let nameFind = localStorage.getItem('nameFind');
  let urlImage = localStorage.getItem('imageFind');
  
  if(nameFind){
    console.log(`Data dengan ${nameFind} ditemukan`);
    imageBox.innerHTML = ''
    imageBox.style.alignItems = "flex-start"
    const dataUser = document.createElement('div')
    const imgUser = document.createElement('img')
    const spanText = document.createElement('span')
    imageBox.append(dataUser)
    dataUser.append(imgUser)
    dataUser.append(spanText)
    imgUser.src = urlImage
    spanText.textContent = nameFind
    localStorage.removeItem('nameFind')    
    localStorage.removeItem('imageFind')    

   }else {
    // console.log(`Data dengan ${nameFrom} tidak ditemukan`);
    imageBox.innerHTML = `Data dengan ${nameFrom} tidak ditemukan`
    imageBox.style.alignItems = "flex-start"
    
  }
  btnReset.style.display = 'flex'
  btnSubmit.style.display = 'none'
  })