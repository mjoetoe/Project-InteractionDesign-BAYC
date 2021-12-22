let error, loading = false;

const init = () => {
    document.querySelector('.c-card-app__button').addEventListener('click', requestApe);
	requestApe(false);
}

const requestApe = async event => {
    if(event) event.preventDefault();
	if(error) errorNode.style.visibility = 'hidden';

	if(!loading){
	loading = true;
	const loadingElement = document.querySelector('.c-card-app__loading');
	loadingElement.style.visibility = 'visible';

    //getting the values
	let randomApe = Math.floor(Math.random() * 10001);
	let url = "https://api.opensea.io/api/v1/assets?asset_contract_address=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&format=json&limit=20&token_ids="+ randomApe
    let urlString = url

    const tmpData = await getData(urlString);

	//om de loading animatie te tonen
	sleep(1000)
	.then(() => {setData(tmpData, loadingElement)})

	}
}

const setData = (data, loadingElement) => {

	if(data	)
	{
		const titleNode = document.querySelector('.c-card-app__title');
		const typeNode = document.querySelector('.c-card-app__type');
		const subTitle = document.querySelector('.c-card-app__subtitle');
		const participantNode = document.querySelector('.c-card-app__participants-data');
		const priceNode = document.querySelector('.c-card-app__price progress');
		const difficultyNode = document.querySelector('.c-card-app__difficulty progress');
		const img = document.querySelector('.c-card-app__img'); 
		const cardappscreen = document.querySelector('.c-card-app__screen')

		
		let app = "";
		
		for (let i = 0; i <  data.assets[0]["traits"].length; i++) {
			app += '<div class="c-card-app__data c-card-app__participants">'+
						'<p class="c-card-app__subtitle">'+data.assets[0]["traits"][i].trait_type+ '</p>'+
						'<p class="c-card-app__participants-data-right c-card-app__type"> '+data.assets[0]["traits"][i].trait_count+'/10000</p>'+
						'<p class="c-card-app__participants-data">'+data.assets[0]["traits"][i].value+'</p>'+
						'<progress value="'+data.assets[0]["traits"][i].trait_count+'" max="10000"></progress>'+	
					'</div>'

		}
		cardappscreen.innerHTML = app
		titleNode.innerHTML = "Bored Ape Yacht Club"
		typeNode.textContent = "#" + data.assets[0].token_id;
		img.src = data.assets[0].image_url
		
		loading = false;
		loadingElement.style.visibility = 'hidden';

	}else {
		const errorNode = document.querySelector('.c-card-app__error');
		errorNode.style.visibility = 'visible';
	}

	
	
}

const getData = (url) =>{
	return fetch(url)
	.then(response => response.json())
	.then(data => {return (data)});
};

const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
  }


document.addEventListener('DOMContentLoaded', function () {
    init();
});
