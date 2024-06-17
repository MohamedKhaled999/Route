
const layer = document.querySelector(".layer");
const nexOrPre = document.querySelectorAll(".nexOrPre");
const closeBtn = document.getElementById("closeBtn");

function doWork() {
const items = document.querySelectorAll(".item");
items.forEach((item, i) => {
    item.addEventListener("click", (e) => {
      console.log(e.currentTarget.children[0].src);
      layer.classList.remove("d-none");
      index = i;
      layer.children[0].style.cssText = `background-image:url(${e.currentTarget.children[0].src})`;
    });
  });
  
  nexOrPre.forEach((dir) => {
    dir.addEventListener("click", (e) => {
      displayImage(e.currentTarget);
    });
  });
  
  closeBtn.addEventListener("click", () => {
    layer.classList.add("d-none");
  });
  layer.addEventListener('click',(e)=>{
      layer.classList.add("d-none");
  })
  
  layer.children[0].addEventListener('click',(e)=>{
      e.stopPropagation()
  })
  
  document.addEventListener('keyup',(e)=>{
      console.log(e.key)
      if (e.key=='Escape') {
          layer.classList.add("d-none");
      }
      if (e.key=='ArrowRight') {
          displayImage(nexOrPre[1])
      }
      if (e.key=='ArrowLeft') {
          displayImage(nexOrPre[0])
      }
  })
  
  function displayImage(ele) {
    //    console.log( Array.from(items).indexOf(ele))
  
    if (ele.classList.contains("fa-chevron-right")) {
      console.log(items[index]);
      index = (index + 1) % items.length;
      
    }else{
      index = (index - 1+items.length) % items.length;
    }
    layer.children[0].style.cssText = `background-image:url(${items[index].children[0].src})`;
  }
   
}




// var img = document.createElement('img'); 
// img.setAttribute('src',"images/5.jpg")
// img.classList.add('w-50')
// document.body.appendChild(img)




var https= new XMLHttpRequest(); // Create an XMLHttpRequest Object



// method https --> GET , POST , PUT , DELETE 
https.open("GET", "https://forkify-api.herokuapp.com/api/search?q=pizza"); // connection established
https.send(); // send request
https.addEventListener("load", (e) => {
    console.log(e);
    console.log(https.readyState);
    
    recipesList=  JSON.parse(https.response).recipes
    displayData();
    
  });


  https.addEventListener('error',()=>{ // fire if there error in api

  })

  function displayData() {
    let temp =''
    for (let index = 0; index < recipesList.length; index++) {
        temp +=`
         <div class="col-md-4 col-sm-6 ">
          <div class="item text-center">
            <img class="w-100 bg-light" src="${recipesList[index].image_url}" alt="" />
            <div class="bg-info  caption">
              <h2 class="h6">${recipesList[index].title}</h2>
              <p>
              ${recipesList[index].publisher}
              </p>
            </div>
          </div>
        </div>
        `
        
    }

    document.querySelector('.row').innerHTML=temp;

    doWork();
  }







  