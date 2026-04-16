<script>
  import Header from '$lib/Header.svelte';
  import Form from '$lib/Form.svelte';

  let formats = ["Face-to-Face", "Live Virtual Learning", "Online learning (WWW)"];
  let programs = [
    { id: 'welding', name: 'Welding' },
    { id: 'csd', name: 'Computer Software Development' },
    { id: 'cyber', name: 'Cyber Security' },
    { id: 'multimedia', name: 'Multimedia Design' }
  ];
</script>

<Header {formats} />

<Form {programs} {formats} />

<button class="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800">Register</button>
