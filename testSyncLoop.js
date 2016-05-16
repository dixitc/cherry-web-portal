let i = 0;
let addMomentsReponse = [{"caption":"asdf"},{"caption":"asdf"},{"caption":"asdf"},{"caption":"asdf"},{"caption":"asdf"}];
syncLoop = (i) => {
	 setTimeout(() => {
		console.log(i+'th image successfully uploaded');
		if(addMomentsReponse[i+1]){
			i = i+1;
			syncLoop(i)
		}
	},1000);

}
syncLoop(0)
