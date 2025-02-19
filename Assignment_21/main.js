function display(){
    let form = document.getElementById('post-form');
    form.style.display = 'block';


}
function post() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const postElement = document.createElement('div');
    postElement.classList.add('post-item');

    const titleElement = document.createElement('h3');
    titleElement.textContent = title;

    const contentElement = document.createElement('p');
    contentElement.textContent = content;

    postElement.appendChild(titleElement);
    postElement.appendChild(contentElement);

    document.getElementById('posts').appendChild(postElement);

   document.getElementById('title').value = '';
    document.getElementById('content').value = '';

    let form = document.getElementById('post-form');
    form.style.display = 'none';
}
