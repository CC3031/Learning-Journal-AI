<script>
  let { description, date, time, location } = $props();
</script>

<div class="bg-white rounded-lg shadow-lg border p-4">
  <p class="text-gray-700 mb-4">{description}</p>
  <div class="space-y-2">
    <p><strong>Date:</strong> {date}</p>
    <p><strong>Time:</strong> {time}</p>
    <p><strong>Location:</strong> {location}</p>
  </div>
</div>