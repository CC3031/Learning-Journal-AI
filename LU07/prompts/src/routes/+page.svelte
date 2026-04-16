<script>
	import Header from '$lib/Header.svelte';
	import EventDetails from '$lib/EventDetails.svelte';
</script>

<div class="min-h-screen bg-gray-100 flex items-center justify-center">
	<div class="bg-white p-8 rounded-lg shadow-lg max-w-md">
		<Header eventName="Iowa Tech Summit" />
		<EventDetails
			description="Connect, Learn and Grow at Iowa's Premier Technology Conference"
			date="September 15, 2026"
			time="10:00 AM"
			location="Iowa Event Center"
		/>
	</div>
</div>
