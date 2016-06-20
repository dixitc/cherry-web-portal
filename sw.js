console.log('SERVICE WORKER IS RUNNING');
importScripts('dexie.min.js');

var db = new Dexie('mytest_database');
db.version(1).stores({
	memories: "id,owner,title,members,image,isPublished,visibility,coverUrl"

});
db.open();
console.log(db);









self.addEventListener('install' , event => {
	event.waitUntil(
		caches.open('cherry-dynamic')
		.then(cache => cache.addAll(
			[
				'./offline.html',
				'./',
				'./bundle.js',
				'./dexie.min.js'
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
 	- if present serve and start network request
		- if network success return new data and update cache
		- if false show something to the user saying network not present
	- if absent start network request
		- if network success return new data and update cache
		- if false show something to the user saying network not present
*/

self.addEventListener('fetch' , event => {
	var requestURL = new URL(event.request.url);
//	console.log(event.request);
	console.log(requestURL);

		if(requestURL.pathname == '/memrousel/v2/memory/allmemories.json'){
			event.respondWith(
				caches.open('cherry-dynamic').then(function(cache) {
					return fetch(event.request).then(function(response) {
						console.log(response.clone());
						cache.put(event.request, response.clone());
						return response;
					});
				})
				.catch(function(err) {
					console.log('SW : ERROR FETCHING MEMORIES');
					return {};
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
