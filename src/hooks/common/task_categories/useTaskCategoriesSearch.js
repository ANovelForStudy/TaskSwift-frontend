import { ref, computed } from "vue";

export default function useTaskCategoriesSearch(items) {
	const searchQuery = ref("");

	const searchedTaskCategories = computed(() => {
		if (!searchQuery.value) {
			return items.value;
		}

		return items.value.filter(
			(item) =>
				item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
				item.description.toLowerCase().includes(searchQuery.value.toLowerCase())
		);
	});

	return { searchedTaskCategories, searchQuery };
}
