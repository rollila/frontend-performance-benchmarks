frameworks = ['angular', 'blazor', 'react', 'svelte', 'vue', 'vue3']
scenarios = [
  'group1_create_components',
  'group1_create_elements',
  'group1_delete_components',
  'group1_add_one',
  'group1_change_component_type',
  'group2_update_parent',
  'group2_update_child',
  'group2_update_all',
  'group3_create_tree',
  'group3_update_leaf',
  'group3_update_root',
  'group4_update_single',
  'group4_update_all',
];


frameworks.each do |framework|
	scenarios.each do |scenario|
		`yarn run start -f #{framework} -s #{scenario} -r 10`
	end
end