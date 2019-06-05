const uportConnect = require('uport-connect');
const qrcode = require('qrcode-terminal');

const mnidAddress = '2ojEtUXBK2J75eCBazz4tncEWE18oFWrnfJ';
const signingKey = 'cb89a98b53eec9dc58213e67d04338350e7c15a7f7643468d8081ad2c5ce5480';

const appName = 'The Blockchain Institute';


const uriHandler = (uri) => {
  displayQRCodeDiv (uri)
  console.log(uri)
}

const uport = new uportConnect.Connect(appName, {
	uriHandler,
    clientId: mnidAddress,
    network: 'rinkeby',
    signer: uportConnect.SimpleSigner(signingKey)
});

function setCredentials ( ) {
	// Request credentials
	uport.requestCredentials({
	  requested: ['name'],
	}).then((credentials) => {
	  console.log(credentials);

	  console.log('finished')

	})

}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('this function ran, yes')
    var uportButton 			= document.createElement('input');
		uportButton.className 	= "button button-primary button-large uportButton";
		uportButton.value		= "uPort Login";
		uportButton.type 		= "button";
		uportButton.style 		= "margin-right: 0.25em;";
		uportButton.id 			= "loginWithUportButton";

	document.getElementsByClassName('submit')[0].appendChild(uportButton);

	document.getElementById('loginWithUportButton').addEventListener('click', startUportLoginSequence);

});

function startUportLoginSequence() {
	console.log('this function also ran, yes')
	console.log('button clicked');
	setCredentials()
}

function displayQRCodeDiv (address) {

	var overlayDiv 				= document.createElement('div')
		overlayDiv.className 	= 'uport-backdrop'
		overlayDiv.id 			= "canvasBackdrop"

	var foreGroundDiv 			= document.createElement('div')
		foreGroundDiv.className = 'loginWindow'

	var title 					= document.createElement('div')
		title.className 		= "title"

	var titleImage 				= document.createElement('img')
		titleImage.src 			= "https://cdn-images-1.medium.com/max/200/1*oeYDrEAgm1TKr8o4Lvyjlg@2x.png"

	var titleHint				= document.createElement('span')
		titleHint.innerHTML		= "Scan the QR Code with your uPort App to Login"

	var closeButton				= document.createElement('span')
		closeButton.innerHTML 	= "✕"
		closeButton.id 			= "cancel-uport-login"

	var canvas 					= document.createElement('canvas')
		canvas.id 				= "uport-login-canvas"



	title.appendChild(titleImage)
	title.appendChild(titleHint)

	// foreGroundDiv.appendChild(closeButton)
	foreGroundDiv.appendChild(title)
	foreGroundDiv.appendChild(canvas)

	overlayDiv.appendChild(closeButton)
	overlayDiv.appendChild(foreGroundDiv)

	document.body.appendChild(overlayDiv)

	document.getElementById('cancel-uport-login').addEventListener('click', cancelUportLogin)

	var canvas = document.getElementById('uport-login-canvas')

	QRCode.toCanvas(canvas, address, function (error) {
	  if (error) return console.error(error)

	})
}

function cancelUportLogin () {
	console.log('cancelUportLogin clicked')
	document.getElementById('canvasBackdrop').remove()

}