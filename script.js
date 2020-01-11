if (!localStorage.quoteBg){
	localStorage.quoteBg = './'+7+'.jpg';
}
document.getElementById("bg").src = localStorage.quoteBg;

var d = new Date();
document.getElementById("date").innerHTML = d.toDateString();

if (!localStorage.quoteColor){
	localStorage.quoteColor = 'rgb(50,50,50)';
}
document.getElementById("color").style.background = 'linear-gradient('+localStorage.quoteColor+',black)';

fetch('https://quotes.rest/qod').then(response => {
	return response.json();
}).then(data => {
	var obj = data.contents.quotes[0];
	// document.getElementById("bg").src = obj.background;
	document.getElementById("quote").innerHTML = obj.quote;
	document.getElementById("author").innerHTML = '- '+obj.author;
	document.getElementById("copyright").innerHTML = '('+data.contents.copyright+')';
	document.getElementById("quoteblock").style.display = 'block';
}).catch(err => {
	console.log(err);
});

if (!localStorage.quotesPetal){
	localStorage.quotesPetal = 'Friend';
}
document.getElementById("name").innerHTML = localStorage.quotesPetal;

if (!localStorage.welcomeMessage){
	localStorage.welcomeMessage = 'Have a good day.';
}
document.getElementById("welcome").innerHTML = localStorage.welcomeMessage;

function clock(){
	document.getElementById("clock-face").setAttribute("r", "130");
	document.getElementById("clock-face").setAttribute("filter", "url(#f1)");
	//calculate angle
	var d, h, m, s;
	d = new Date();
	
	h = 30 * ((d.getHours() % 12) + d.getMinutes() / 60);
	m = 6 * d.getMinutes();
	s = 6 * d.getSeconds();

	
	//move hands
	setAttr('h-hand', h);
	setAttr('m-hand', m);
	setAttr('s-hand', s);
	setAttr('s-tail', s+180);
	
	//display time
	h = d.getHours();
	m = d.getMinutes();
	s = d.getSeconds();
	
	if(h >= 12){
	    setText('suffix', 'PM');
	}else{
	    setText('suffix', 'AM');
	}
	
	if(h != 12){
	    h %= 12;
	}
	
	setText('sec', s);
	setText('min', m);
	setText('hr', h);
	
	//call every second
	setTimeout(clock, 1000);
	
  }
  
  function setAttr(id,val){
	var v = 'rotate(' + val + ', 140, 140)';
	document.getElementById(id).setAttribute('transform', v);
  }
  
  function setText(id,val){
	if(val < 10){
	    val = '0' + val;
	}
	document.getElementById(id).innerHTML = val;
  }
  
  window.onload=clock;
  

document.getElementById("name").addEventListener("click",function(){
	var nm = prompt('Please enter your name to display:');
	if (nm !== null){
		localStorage.quotesPetal = nm;
		window.location.reload();
	}
});

document.getElementById("welcome").addEventListener("click",function(){
	var nm = prompt('Please enter the message to display:');
	if (nm !== null){
		localStorage.welcomeMessage = nm;
		window.location.reload();
	}
});

document.getElementById("cPalette").addEventListener("change",function(){
	localStorage.quoteColor = this.value;
	window.location.reload();
});

var flag = 0;
  document.getElementById("change").addEventListener("click",function(){
	  document.getElementById("bgPalette").style.visibility = 'visible';
	  		  if (flag == 0){
				for (var i=1; i<=10; i++){
					var img = document.createElement("IMG");
					var href = document.createAttribute("src");
					href.value = './'+i+'.jpg';
					img.setAttributeNode(href);
					var c = document.createAttribute("class");
					c.value = 'bglist';
					img.setAttributeNode(c);
					var a = document.createAttribute("alt");
					a.value = 'Image not loaded';
					img.setAttributeNode(a);
					document.getElementById("images").appendChild(img);
					document.getElementById("images").appendChild(document.createTextNode(" "));
				}
				flag += 1;
			}
			var imageList = document.getElementsByClassName("bglist");
  			for (var f=0; f<imageList.length; f++){
				  imageList[f].addEventListener("click",function(){
					var check = confirm("Proceed to change the background?");
					  if (check){
						localStorage.quoteBg = this.src;
						window.location.reload();
					  }
				  });
			  }
			  document.getElementById("userUpload").addEventListener("change",function(){
				  var check = confirm("Proceed to change the background?");
				  if (check && this.files && this.files[0]){
					var reader = new FileReader();
					reader.onload = function (e) {
						localStorage.quoteBg = e.target.result;
						window.location.reload();
					};
					reader.readAsDataURL(this.files[0]);
				  }
			  });
  });
  document.getElementById("close").addEventListener("click",function(){
	document.getElementById("bgPalette").style.visibility = 'hidden';
  });

