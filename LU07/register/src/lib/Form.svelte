<script>
  let { programs, formats } = $props();
  let showOnCampusOptions = true;
  let mealPlans = ["Warrior Plan", "Maroon Plan", "Gold Plan"];
  let dormOptions = ["Oak", "Trustee", "Keokuk"];
</script>

<div class="bg-white shadow-lg border-t-4 border-red-900 p-6 rounded-lg">
  <h2 class="text-2xl font-bold mb-4">Student Registration</h2>
  <form class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input type="text" id="name" name="name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
    </div>
    <div>
      <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
      <input type="text" id="address" name="address" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500" />
    </div>
    <div>
      <label for="program" class="block text-sm font-medium text-gray-700">Program</label>
      <select id="program" name="program" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500">
        {#each programs as program}
          <option value={program.id}>{program.name}</option>
        {/each}
      </select>
    </div>
    <div>
      <label for="format" class="block text-sm font-medium text-gray-700">Class Format</label>
      <select id="format" name="format" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500">
        {#each formats as format}
          <option value={format}>{format}</option>
        {/each}
      </select>
    </div>
    {#if showOnCampusOptions}
      <div class="bg-red-50 border-l-4 border-red-900 p-4 mt-4">
        <h3 class="text-lg font-semibold mb-2">On-Campus Options</h3>
        <div class="space-y-4">
          <div>
            <label for="mealPlan" class="block text-sm font-medium text-gray-700">Meal Plan</label>
            <select id="mealPlan" name="mealPlan" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500">
              {#each mealPlans as plan}
                <option value={plan}>{plan}</option>
              {/each}
            </select>
          </div>
          <div>
            <label for="dorm" class="block text-sm font-medium text-gray-700">Dorm Options</label>
            <select id="dorm" name="dorm" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500">
              {#each dormOptions as dorm}
                <option value={dorm}>{dorm}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
    {/if}
  </form>
</div>