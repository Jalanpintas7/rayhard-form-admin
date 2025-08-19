<script>
	import PageHeader from '../PageHeader.svelte';
	import Button from '../Button.svelte';
	import Badge from '../Badge.svelte';
	import Input from '../Input.svelte';
	import FormCard from '../FormCard.svelte';

	let formData = {
		name: '',
		email: ''
	};

	function handleSubmit() {
		alert('Form submitted!');
	}
</script>

<div class="space-y-6">
	<PageHeader 
		title="Contoh Komponen" 
		subtitle="Demo penggunaan komponen" 
	/>

	<FormCard title="Form Contoh">
		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<Input
				label="Nama"
				bind:value={formData.name}
				placeholder="Masukkan nama"
				required
				fullWidth
			/>

			<Input
				type="email"
				label="Email"
				bind:value={formData.email}
				placeholder="email@example.com"
				required
				fullWidth
			/>

			<div class="flex gap-3">
				<Button type="submit" variant="primary">
					Simpan
				</Button>
				<Button variant="outline">
					Batal
				</Button>
			</div>
		</form>
	</FormCard>

	<FormCard title="Badge Examples">
		<div class="flex flex-wrap gap-2">
			<Badge variant="success">Success</Badge>
			<Badge variant="warning">Warning</Badge>
			<Badge variant="danger">Danger</Badge>
			<Badge variant="umrah">Umrah</Badge>
			<Badge variant="pelancongan">Pelancongan</Badge>
		</div>
	</FormCard>
</div>
