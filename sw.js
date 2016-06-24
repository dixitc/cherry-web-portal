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
				'/cherry-web-portal/',
				'/cherry-web-portal/index.html',
				'/cherry-web-portal/bundle.js',
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
	var newEvent = event.request.clone()
	var requestURL = new URL(newEvent.url);
//	console.log(event.request);
	console.log(requestURL);

		if(requestURL.pathname == '/memrousel/v2/memory/allmemories.json'){
			event.respondWith(
				caches.open('cherry-dynamic').then(function(cache) {
					var fetchRequest = event.request.clone();
					return fetch(fetchRequest).then(function(response) {
						console.log(response.clone());
						if(response){
							cache.put(fetchRequest, response.clone());

							return response;
						}
					})
					.catch(function(err) {
						console.log('SW : ERROR FETCHING MEMORIES');
						return caches.match(event.request.clone())
					})
				})
			);
		}else if(event.request.mode == 'navigate' || requestURL.pathname == '/bundle.js' || requestURL.pathname ==  '/cherry-web-portal/' || requestURL.pathname ==  '/cherry-web-portal/bundle.js'  || requestURL.pathname ==  '/cherry-web-portal/index.html'){
			console.log('SW : NAVIGATING TREACHEROUS WATERS (get basic assets)');
			event.respondWith(
				caches.match(event.request.clone()).then((res) => {
					console.log('SW : NAVIGATING TREACHEROUS WATERS (get basic assets.cache MATCH!)');
					if(res){
						return res;
					}

				}).catch((err) => {
					console.log('SW : NAVIGATING TREACHEROUS WATERS (get basic assets.cache MISS!)');
					return fetch(event.request.clone()).then(function(response) {
						console.log('SW : BASIC ASSETS FETCH RESPONSE');
						console.log(response.clone());
						if(response){
							cache.put(event.request.clone(), response.clone());
							return response;
						}

					})
					.catch(function(err) {
						console.log('SW : BASIC ASSETS ERROR FETCH');
					})
				})


			);
		}else if(requestURL.pathname.split('/')[requestURL.pathname.split('/').length - 1] == 'allmoments.json'){

			console.log('SW : ***************************');
			console.log("SW : INTERCEPTING MOMENTS REQUEST");
			event.respondWith(
				caches.open('cherry-dynamic').then(function(cache) {

					var fetchMomentsRequest = event.request.clone();
					return fetch(fetchMomentsRequest).then((response) => {
						console.log(response.clone());
						if(response){
							cache.put(fetchMomentsRequest, response.clone());
							return response;
						}

					})
					.catch(function(err) {
						console.log('SW : ERROR FETCHING MOMENTS');
						return caches.match(event.request.clone()).then((res) => {
							 console.log('SW : ERROR FETCHING MOMENTS CACHE FALLBACK MATCH');
							 console.log(res.clone());
							 if(res){
								 return res.clone();
							 }
						 }).catch((err) => {
							 console.log('SW : ERROR FETCHING MOMENTS CACHE FALLBACK MISS');
							return {moments:[]};
						})
					})
				})
			);
		}else if(requestURL.pathname == '/thumbnail' && requestURL.href.substring(requestURL.href.length-9,requestURL.href.length) == "&mem=true"){
			console.log('***************************');
			console.log("INTERCEPTING ONLY MEMORY THUMBNAIL IMAGE REQUEST");
			event.respondWith(
				caches.match(event.request.clone()).then((response) => {
					console.log('CACHE MATCH');
					console.log(response.clone());
					if(response){
						return response.clone();
					}
				}).catch((err) => {

					console.log('CACHE MISS');
					return caches.open('cherry-dynamic').then(function(cache) {
						console.log('CACHE OPEN');
						return fetch(event.request.clone()).then(function(response) {
							console.log('CACHE OPEN FETCH RESPONSE');
							console.log(response.clone());
							if(response){
								cache.put(event.request.clone(), response.clone());

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
		fetch(event.request).then(response => {
			return response
		})
	)
	event.respondWith(
		caches.match(event.request)
			.then(response => response || fetch(event.request).then(reseponse => {
				//var newresponse = reseponse.clone();
				if(event.request.url == "https://172.16.1.174:8443/memrousel/v2/memory/allmemories.json"){

					var responseToCache = reseponse.clone();
					console.log(responseToCache);

			            caches.open('static-v2')
			              .then(function(cache) {
			                cache.put(event.request, responseToCache);
			              });
					// /console.log(JSON.parse(reseponse));
				}
				return reseponse;
			})

		)

		.catch(() => {
			if(event.request.url == "https://172.16.1.174:8443/memrousel/v2/memory/allmemories.json"){
				console.log('INTERCEPTING ALL MEMORIES REQUEST : inspect request below');
				console.log(event.request);
				return caches.match(event.request)

			}
			if(event.request.mode == 'navigate'){

				return caches.match(event.request)
			}
		})
	)
	*/
} )
