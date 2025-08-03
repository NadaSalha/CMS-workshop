document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const xhr = new XMLHttpRequest();
       xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);
          for (let blogPost in data) {
            const postDiv = document.createElement('div');
            const postText = document.createElement('p');
            const thumbnail = document.createElement('img');
            const postContainer = document.getElementsByClassName(
              'post-container'
            )[0];

            thumbnail.src = './public/img/logo2.png';
            thumbnail.className = 'thumbnail';
            postText.innerHTML = data[blogPost];
            postDiv.className = 'post';

            postDiv.appendChild(thumbnail);
            postDiv.appendChild(postText);
            postContainer.appendChild(postDiv);
          }
        } else {
          console.error(xhr.responseText);
        }
      }
    };
    
    xhr.open('GET', '/posts', true);
    xhr.send();


    const form = document.getElementById('the-form');
    form.addEventListener('submit',(e)=>{
      e.preventDefault();
      const blogText = document.getElementById('blogText').value;

      const xhrPost = new XMLHttpRequest();

      xhrPost.open('POST','/create-post',true);
      xhrPost.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xhrPost.onreadystatechange =()=>{
       
        if(xhrPost.readyState === 4 ){
          location.reload();
          xhr.open('GET', '/posts', true);
          xhr.send();
        }
      }

      xhrPost.send(blogText);

    });
  }
};



// document.onreadystatechange =() =>{

//   if(document.readyState === 'complete'){
//     const xhr = new XMLHttpRequest();

//     xhr.open('POST','/create-post', true);
//     xhr.setRequestHeader('Content-Type' , 'application/json');
//     xhr.onreadystatechange = ()=>{
//       if(xhr.readyState === 4 && xhr.status === 200){
//         console.log('xhr status '+xhr.responseText);
//     const blogText = document.getElementById('blogText').value;

//     alert(blogText);
//     xhr.send(blogText);
//       }
//     }

    
//   }
// }


