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
		caches.open('static-v2')
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



self.addEventListener('fetch' , event => {


	console.log(event.request.url);
	event.respondWith(
		caches.match(event.request)
			.then(response => response || fetch(event.request).then(reseponse => {
				//var newresponse = reseponse.clone();
				if(event.request.url == "http://172.16.1.174:8080/memrousel/v2/memory/allmemories.json"){
					//console.log(newresponse);
					var responseToCache = reseponse.clone();

			            caches.open('static-v2')
			              .then(function(cache) {
			                cache.put(event.request, responseToCache);
			              });
					// /console.log(JSON.parse(reseponse));
				}
				return reseponse;
			}))

		.catch(() => {
			if(event.request.url == "http://172.16.1.174:8080/memrousel/v2/memory/allmemories.json"){
				console.log('INTERCEPTING ALL MEMORIES REQUEST : inspect request below');
				console.log(event.request);

			}
			if(event.request.mode == 'navigate'){

				return caches.match(event.request)
			}
		})
	)
} )
