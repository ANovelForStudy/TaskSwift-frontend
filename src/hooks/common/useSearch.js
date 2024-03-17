import { ref, computed } from "vue";

export default function useSearch(items) {
	const searchQuery = ref("");

	const searchedItems = computed(() => {
		if (!searchQuery.value) {
			return items.value;
		}

		return items.value.filter(
			(item) =>
				item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
		);
	});

	return { searchedItems, searchQuery };
}
