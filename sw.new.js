console.log('SERVICE WORKER IS RUNNING');
//importScripts('dexie.min.js');

/*var db = new Dexie('mytest_database');
db.version(1).stores({
	memories: "id,owner,title,members,image,isPublished,visibility,coverUrl"

});
db.open();
console.log(db);*/









self.addEventListener('install' , event => {
	event.waitUntil(
		caches.open('cherry-dynamic')
		.then(cache => cache.addAll(
			[

				'./',

				'./bundle.js'

			]
		))
	)
})

const networkAndCache = (event) => {
	let networkDataReceived = false;

	//startSpinner();

	// fetch fresh data
	var networkUpdate = fetch(event.request).then(function(response) {
	  return response.json();
	}).then(function(data) {
	  networkDataReceived = true;
	  //update cache

	});

	// fetch cached data
	caches.match(event.request).then(function(response) {
	  if (!response) throw Error("No data");
	  return response.json();
	}).then(function(data) {
	  // don't overwrite newer network data
	  if (!networkDataReceived) {
	    //updatePage(data);
	  }
	}).catch(function() {
	  // we didn't get cached data, the network is our last hope:
	  return networkUpdate;
	}).catch(showErrorMessage).then(stopSpinner);
}


/*
 - listen for fetch
 - intercept allmemories.json request
 - check in cache
 	- if present serve , update state and start network request
		- if network success return new data and update cache and state
		- if false show something to the user saying network not present
	- if absent start network request
		- if network success return new data and update cache and state
		- if false show something to the user saying network and offline data not present
*/


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin

        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});



self.addEventListener('fetch' , event => {
	var newEvent =  event.request.clone();
	var requestURL = new URL(newEvent.url);
//	console.log(newEvent);
	console.log(requestURL);

		if(requestURL.pathname == '/memrousel/v2/memory/allmemories.json'){
			event.respondWith(
				caches.match(newEvent).then(function(res){
					if(res){
						return res;
					}
					return fetch(newEvent).then(function(response) {
						console.log(response.clone());
						if(response){
							caches.open('cherry-dynamic').then(function(cache) {
								cache.put(newEvent, response.clone());
							})

							return response;
						}
					})
					.catch(function(err) {
						console.log('SW : ERROR FETCHING MEMORIES');
						//return caches.match(newEvent)
					})
				})
					/*return fetch(newEvent).then(function(response) {
						console.log(response.clone());
						if(response){
							caches.open('cherry-dynamic').then(function(cache) {
								cache.put(newEvent, response.clone());
							})

							return response;
						}
					})
					.catch(function(err) {
						console.log('SW : ERROR FETCHING MEMORIES');
						return caches.match(newEvent)
					}) */
			);
		}else if(requestURL.origin == 'http://localhost'){
		//	console.log('SW : NAVIGATING TREACHEROUS WATERS (get basic assets)');
			event.respondWith(
				caches.match(newEvent).then((res) => {
		//			console.log('SW : NAVIGATING TREACHEROUS WATERS (get basic assets.cache MATCH!)');
					if(res){
						return res;
					}

				}).catch((err) => {
		//			console.log('SW : NAVIGATING TREACHEROUS WATERS (get basic assets.cache MISS!)');
					return fetch(newEvent).then(function(response) {
		//				console.log('SW : BASIC ASSETS FETCH RESPONSE');
		//				console.log(response.clone());
						if(response){
							cache.put(newEvent, response.clone());
							return response;
						}

					})
					.catch(function(err) {
						console.log('SW : BASIC ASSETS ERROR FETCH');
					})
				})


			);
		}else if(requestURL.search == '?page=0&rp=40'){

			console.log('SW : ***************************');
			console.log("SW : INTERCEPTING MOMENTS REQUEST");
			event.respondWith(
					//console.log("SW : INTERCEPTING MOMENTS REQUEST CACHE OPEN");

					//var fetchMomentsRequest = newEvent;
					caches.open('cherry-dynamic').then(function(cache) {
						console.log('CACHE OPEN');
					return cache.match(newEvent).then(function(res){
						console.log('CACHE MATCH');

						return res || fetch(newEvent).then(function(response) {
							console.log('CACHE MISS NOW FETCH');
							console.log(response.clone());
							if(response){
								console.log('CACHE MISS NOW FETCH SUCCESS');
									cache.put(newEvent, response.clone());

								return response;
							}
						}).catch(function(err) {
							console.log('CACHE MISS NOW FETCH FAIL RETURN EMPTY');
							//console.log('SW : ERROR FETCHING MOMENTS (returning empty moments for now)');
							var fallbackResponse = {
							  moments: []
							};

							// Construct the fallback response via an in-memory variable. In a real application,
							// you might use something like `return fetch(FALLBACK_URL)` instead,
							// to retrieve the fallback response via the network.
							return new Response(JSON.stringify(fallbackResponse), {
							  headers: {'Content-Type': 'application/json'}
							});
							//return caches.match(newEvent)
						})
					})
				})
		/*			fetch(newEvent).then(function(momentResponse){
						console.log("SW : INTERCEPTING MOMENTS REQUEST FETCH EXECUTED");
						console.log(momentResponse.clone());
						if(momentResponse){
							console.log("SW : INTERCEPTING MOMENTS REQUEST FETCH SUCCESS");
							caches.open('cherry-dynamic').then(function(cache) {
								cache.put(newEvent, momentResponse.clone());
							})
							return momentResponse;
						}

					})
					.catch(function(err) {
						console.log('SW : ERROR FETCHING MOMENTS');
						return caches.match(newEvent).then((res) => {
							 console.log('SW : ERROR FETCHING MOMENTS CACHE FALLBACK MATCH');
							 console.log(res.clone());
							 if(res){
								 return res.clone();
							 }
						 }).catch((err) => {
							 console.log('SW : ERROR FETCHING MOMENTS CACHE FALLBACK MISS');
							 // For demo purposes, use a pared-down, static YouTube API response as fallback.
							 var fallbackResponse = {
							   moments: []
							 };

							 // Construct the fallback response via an in-memory variable. In a real application,
							 // you might use something like `return fetch(FALLBACK_URL)` instead,
							 // to retrieve the fallback response via the network.
							 return new Response(JSON.stringify(fallbackResponse), {
							   headers: {'Content-Type': 'application/json'}
							 });
						})
					}) */
			);
		}else if(requestURL.pathname == '/thumbnail' && requestURL.href.substring(requestURL.href.length-9,requestURL.href.length) == "&mem=true"){
			console.log('***************************');
			console.log("INTERCEPTING ONLY MEMORY THUMBNAIL IMAGE REQUEST");
			event.respondWith(
				caches.match(newEvent).then((response) => {
					console.log('CACHE MATCH');
					console.log(response.clone());
					if(response){
						return response.clone();
					}
				}).catch((err) => {

					console.log('CACHE MISS');
					return caches.open('cherry-dynamic').then(function(cache) {
						console.log('CACHE OPEN');
						return fetch(newEvent).then(function(response) {
							console.log('CACHE OPEN FETCH RESPONSE');
							console.log(response.clone());
							if(response){
								cache.put(newEvent, response.clone());

								return response;
							}
						})
						.catch(function(err) {
							console.log('SW : ERROR FETCHING MEMORY THUMBNAIL');
						})
					})
				})
			);
		}


	/*
	event.respondWith(
		fetch(newEvent).then(response => {
			return response
		})
	)
	event.respondWith(
		caches.match(newEvent)
			.then(response => response || fetch(newEvent).then(reseponse => {
				//var newresponse = reseponse.clone();
				if(newEvent.url == "https://172.16.1.174:8443/memrousel/v2/memory/allmemories.json"){

					var responseToCache = reseponse.clone();
					console.log(responseToCache);

			            caches.open('static-v2')
			              .then(function(cache) {
			                cache.put(newEvent, responseToCache);
			              });
					// /console.log(JSON.parse(reseponse));
				}
				return reseponse;
			})

		)

		.catch(() => {
			if(newEvent.url == "https://172.16.1.174:8443/memrousel/v2/memory/allmemories.json"){
				console.log('INTERCEPTING ALL MEMORIES REQUEST : inspect request below');
				console.log(newEvent);
				return caches.match(newEvent)

			}
			if(newEvent.mode == 'navigate'){

				return caches.match(newEvent)
			}
		})
	)
	*/
} )
