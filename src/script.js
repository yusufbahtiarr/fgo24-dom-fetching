async function fetchData(){
  try {
    const response =  await fetch('https://rickandmortyapi.com/api/character')
    const result = await response.json()
    const data = result.results
    const container = document.querySelector('.container')
    // console.log(container);
    
    data.forEach(item => {
      const dataUser = document.createElement('div')
      const imgUser = document.createElement('img')
      const spanText = document.createElement('span')
      container.append(dataUser)
      dataUser.append(imgUser)
      dataUser.append(spanText)
      imgUser.src = item.image
      spanText.textContent = item.name
      
      // console.log(item.name);
      // console.log(item.image);
    });
  } catch (error) {
    console.log(error.message);
  }
}
fetchData()