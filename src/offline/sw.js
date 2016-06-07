console.log('SERVICE WORKER IS RUNNING');












self.addEventListener('install' , event => {
	event.waitUntil(
		caches.open('static-v2')
		.then(cache => cache.addAll(
			[
				'./offline.html',
				'./index.html',
				'./bundle.js'
			]
		))
	)
})



self.addEventListener('fetch' , event => {
	event.respondWith(
		caches.match(event.request)
			.then(reseponse => reseponse || fetch(event.request))
			.catch(() => {
				console.log('NOTHING WORKS');
				console.log(event.request);
				if(event.request.mode == 'navigate'){
					console.log('EVERYTHING WORKS');
					return caches.match('index.html');
				}else if (event.request.url = 'http://localhost/cherryweb/bundle.js'){
					return caches.match('bundle.js');
				}
			})

	)
	console.log('SERVICE-WORKER IS RUNNING INSIDE TOO');
})
