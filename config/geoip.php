<?php

return array(

	/*
	|--------------------------------------------------------------------------
	| Service
	|--------------------------------------------------------------------------
	|
	| Current only supports 'maxmind'.
	|
	*/

	'service' => 'maxmind',

	/*
	|--------------------------------------------------------------------------
	| Services settings
	|--------------------------------------------------------------------------
	|
	| Service specific settings.
	|
	*/

	'maxmind' => array(
		'type'          => env('GEOIP_DRIVER', 'database'), // database or web_service
		'user_id'       => env('GEOIP_USER_ID'),
		'license_key'   => env('GEOIP_LICENSE_KEY'),
		'database_path' => storage_path('app/geoip.mmdb'),
		'update_url'    => 'https://geolite.maxmind.com/download/geoip/database/GeoLite2-City.mmdb.gz',
	),

	/*
	|--------------------------------------------------------------------------
	| Default Location
	|--------------------------------------------------------------------------
	|
	| Return when a location is not found.
	|
	*/

	'default_location' => array (
		"ip"           => "150.162.232.4",
		"isoCode"      => "BR",
		"country"      => "Brazil",
		"city"         => "Araranguá",
		"state"        => "SC",
		"postal_code"  => "88906-000",
		"lat"          => 41.31,
		"lon"          => -72.92,
		"timezone"     => "America/Brazil",
		"continent"    => "NA",
	),
);