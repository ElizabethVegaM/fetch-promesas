window.onload = () => {
  const loading = document.getElementById('imagen');

  document.getElementById('dogesBtn').addEventListener('click', function() {  
    obtenerDoges();
  })

  document.getElementById('gatosBtn').addEventListener('click', () => {
    obtenerGatos();
  })

  document.getElementById('ambosBtn').addEventListener('click', () => {
    dogesYCatesEnParalelo();
  })

  function obtenerDoges() {
    loading.style.display = 'inline';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        const dogeResponse = JSON.parse(xhttp.responseText);
        const dogeReceptorDiv = document.getElementById('dogeReceptor');
        loading.style.display = 'none';
        for (let dogeIndex = 0; dogeIndex < dogeResponse.length; dogeIndex++) {
          const dogeImg = document.createElement('img');
          dogeImg.src = dogeResponse[dogeIndex];
          dogeReceptorDiv.appendChild(dogeImg);
        }
      }
    };
    xhttp.open('GET', 'https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true', true)
    xhttp.send();
    // podemos seguir ejecutando código acá mientras esperamos la respuesta
    console.log('Holi soy Doge');
  };

  function obtenerGatos() {
    loading.style.display = 'block';
    // Fetch retorna una promesa, siempre obtiene una respuesta, aunque sea de error, solo falla si no hay conexión con el servidor
    fetch('https://cors-anywhere.herokuapp.com/http://shibe.online/api/cats?count=10&urls=true&httpsUrls=true')
      .then((response) => { // este then es de la promesa del fetch
        if (response.ok) {
          return response.json();
        } else {
          console.log('Los gatitos no pudieron ser descargados :c');
          throw new Error('Mala respuesta de gatitos');
        }
      }).then((catesJSON) => { // este then es de la promesa de response.json()    
        const cateReceptorDiv = document.getElementById('cateReceptor');
        loading.style.display = 'none';
        for (let cateIndex = 0; cateIndex < catesJSON.length; cateIndex++) {
          const cateImg = document.createElement('img');
          cateImg.src = catesJSON[cateIndex];
          cateReceptorDiv.appendChild(cateImg);
        }
      })
      .catch((error) => {
        console.error('Holi soy un error ' + error);
      });
  }

  function dogesYCatesEnParalelo() {
    loading.style.display = 'block';
    Promise.all([
      fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/cats?count=10&urls=true&httpsUrls=true`),
      fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true`),
      fetch(`https://cors-anywhere.herokuapp.com/http://shibe.online/api/birds?count=10&urls=true&httpsUrls=true`)
    ]).then((responses) => {
      return Promise.all(
        responses.map(
          (response) => {
            return response.json();
          }
        )
      );
    }).then((catesDogesJson) => {
      console.log("Respuesta en paralelo > " + JSON.stringify(catesDogesJson));
      const animalReceptorDiv = document.getElementById("animalReceptor");
      /*catesDogesJson.forEach((jsonElement)=>{
          jsonElement.forEach((animal)=>{
              const animalImg = document.createElement("img");
              animalImg.src = animal;
              animalReceptorDiv.appendChild(animalImg);
          });
      }); //Con forEach*/
      for (let i = 0; i < catesDogesJson.length; ++i) {
        for (let j = 0; j < catesDogesJson[i].length; ++j) {
          loading.style.display = 'none';
          const animalImg = document.createElement("img");
          animalImg.src = catesDogesJson[i][j];
          animalReceptorDiv.appendChild(animalImg);
        }
      }
    }).catch((error) => {
      animalReceptorDiv.innerHTML = '<h3>Perdón, se nos perdieron los animales :c</h3>';
    });
  }
}