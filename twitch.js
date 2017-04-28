$(document).ready(function() {
	function getChannel() {
		var channels = ["food", "comster404", "bobross", "freecodecamp", "brunofin"];
		var clientID = "s5oyuf9dj5yk44g7glx4ors5lzk04e";
		var baseUrl = "https://api.twitch.tv/kraken/";
		
		channels.forEach(function(channel) {
			var name;
			var description;
			
			function createUrl(type, name) {
				return baseUrl + type + "/" + name + "?client_id=" + clientID;
			}

			$.getJSON(createUrl("channels", channel))
				.done(function(data) {
					var channelUrl = data.url;
					var logo = data.logo;
					name = data.display_name;
					description = data.status;

					// Need to get the status
					$.getJSON(createUrl("streams", channel), function(data2) {
						
						if (data2.stream === null) {
							status = "offline";
							description = status;
						} else {
							status = "online";
						}
						html = '<div class="row ' + status + '"><div class="col-xs-2 col-sm-1"><img src="' +
								logo + '"id="logo"></div><div class="col-xs-4 col-sm-3" id="channel"><a href="' +
								channelUrl + '" target="_blank">' +
								name + '</a></div><div class="col-xs-6 col-sm-8 hidden-xs" id="description">' +
								description + '</div></div>';

						$("#display").prepend(html);
						 
					});
					
				})
				.fail(function(err) {
					name = channel;
					status = "notFound";
					description = " does not exist";

					html = '<div class="row ' + status + '"><div class="col-xs-4 col-sm-3 col-xs-offset-2 col-sm-offset-1" id="channel">' +
							name + '</div><div class="col-xs-6 col-sm-8" id="description">' +
							description + '</div></div>';	

					$("#display").append(html);				
				});
		});
	};

	getChannel();
});