const text = (name) => {
    return `Добро пожаловать в ${name} – удивительное место, где встречаются традиции и современность. Этот регион славится своей богатой историей, захватывающими природными красотами и уникальной культурой. Здесь каждый уголок пропитан аутентичным колоритом, а местные достопримечательности не оставят вас равнодушными. Откройте для себя удивительные места, насладитесь гостеприимством местных жителей и создайте свои неповторимые воспоминания в ${name}.`
}

function turnVisibility(element){
    if(element.classList.contains('display-none')){
        element.classList.remove('display-none');
    }else{
        element.classList.add('display-none');
    }
}

function transit(){
    const Svg = document.getElementById('map-svg');
    const contentBox = document.getElementById('content');
    turnVisibility(Svg);
    turnVisibility(contentBox);
    turnVisibility(closeButton);
}


function toContent(district){
    const svgContent = document.getElementById('svg-content');

    const pathBounds = district.getBBox();

    transit();
    
    if(svgContent.childNodes.length > 0){
        svgContent.childNodes.forEach( (child) => { svgContent.removeChild(child) } );
    }
    svgContent.appendChild(district.cloneNode(true));
    svgContent.setAttribute('viewBox', `${pathBounds.x} ${pathBounds.y} ${pathBounds.width} ${pathBounds.height}`);
    
    const paragraph = document.getElementById('text-content')
    paragraph.textContent = text(district.getAttribute('data-title'));
}

const districtList = document.querySelectorAll('[data-code]');
districtList.forEach((district) => {
    district.addEventListener('mouseenter', () => {
        const Selected = document.getElementById('map-selected');
        Selected.textContent = district.getAttribute('data-title');
    });

    district.addEventListener('click', (event) => {
        if (event.button !== 0) return;
        toContent(district);
    });
});

const closeButton = document.getElementById('close-button');
closeButton.addEventListener('click', (event) => {
    if(event.button !== 0) return;
    transit();
})