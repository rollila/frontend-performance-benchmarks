<script>
  import { createEventDispatcher } from "svelte";

  import Group1AddOne from "../../assets/group1_add_one.csv";
  import Group1CreateComponents from "../../assets/group1_create_components.csv";
  import Group1CreateElements from "../../assets/group1_create_elements.csv";
  import Group1DeleteComponents from "../../assets/group1_delete_components.csv";
  import Group1ChangeComponentType from "../../assets/group1_change_component_type.csv";
  import Group2UpdateAll from "../../assets/group2_update_all.csv";
  import Group2UpdateChild from "../../assets/group2_update_child.csv";
  import Group2UpdateParent from "../../assets/group2_update_parent.csv";
  import Group3CreateTree from "../../assets/group3_create_tree.csv";
  import Group3UpdateRoot from "../../assets/group3_update_root.csv";
  import Group3UpdateLeaf from "../../assets/group3_update_leaf.csv";
  import Group4UpdateAll from "../../assets/group4_update_all.csv";
  import Group4UpdateSingle from "../../assets/group4_update_single.csv";
  import Group5UpdateAll from "../../assets/group5_update_all.csv";
  import Group5UpdateLeaf from "../../assets/group5_update_leaf.csv";
  import Group5UpdateRoot from "../../assets/group5_update_root.csv";

  const dispatch = createEventDispatcher();

  function onSelect(event) {
    switch (event.target.value) {
      case "group1_create_components":
        dispatch("change", {
          scenario: event.target.value,
          data: Group1CreateComponents,
        });
        return;
      case "group1_create_elements":
        dispatch("change", {
          scenario: event.target.value,
          data: Group1CreateElements,
        });
        return;
      case "group1_delete_components":
        dispatch("change", {
          scenario: event.target.value,
          data: Group1DeleteComponents,
        });
        return;
      case "group1_add_one":
        dispatch("change", {
          scenario: event.target.value,
          data: Group1AddOne,
        });
        return;
      case "group1_change_component_type":
        dispatch("change", {
          scenario: event.target.value,
          data: Group1ChangeComponentType,
        });
      case "group2_update_parent":
        dispatch("change", {
          scenario: event.target.value,
          data: Group2UpdateParent,
        });
        return;
      case "group2_update_child":
        dispatch("change", {
          scenario: event.target.value,
          data: Group2UpdateChild,
        });
        return;
      case "group2_update_all":
        dispatch("change", {
          scenario: event.target.value,
          data: Group2UpdateAll,
        });
        return;
      case "group2_update_child_rows":
        dispatch("change", {
          scenario: event.target.value,
          data: Group2UpdateChildRows,
        });
        return;
      case "group3_create_tree":
        dispatch("change", {
          scenario: event.target.value,
          data: Group3CreateTree,
        });
        return;
      case "group3_update_leaf":
        dispatch("change", {
          scenario: event.target.value,
          data: Group3UpdateLeaf,
        });
        return;
      case "group3_update_root":
        dispatch("change", {
          scenario: event.target.value,
          data: Group3UpdateRoot,
        });
        return;
      case "group4_update_single":
        dispatch("change", {
          scenario: event.target.value,
          data: Group4UpdateSingle,
        });
        return;
      case "group4_update_all":
        dispatch("change", {
          scenario: event.target.value,
          data: Group4UpdateAll,
        });
        return;
      case "group5_update_all":
        dispatch("change", {
          scenario: event.target.value,
          data: Group5UpdateAll,
        });
        return;
      case "group5_update_root":
        dispatch("change", {
          scenario: event.target.value,
          data: Group5UpdateRoot,
        });
        return;
      case "group5_update_leaf":
        dispatch("change", {
          scenario: event.target.value,
          data: Group5UpdateLeaf,
        });
        return;
    }
  }
</script>

<div class={$$props.class}>
  <label for="scenario-select">Select scenario</label>
  <select id="scenario-select" on:change={(event) => onSelect(event)}>
    <option value="" />
    <option value="group1_create_components">group1_create_components</option>
    <option value="group1_create_elements">group1_create_elements</option>
    <option value="group1_delete_components">group1_delete_components</option>
    <option value="group1_change_component_type"
      >group1_change_component_type</option
    >
    <option value="group1_add_one">group1_add_one</option>
    <option value="group2_update_parent">group2_update_parent</option>
    <option value="group2_update_child">group2_update_child</option>
    <option value="group2_update_all">group2_update_all</option>
    <option value="group3_create_tree">group3_create_tree</option>
    <option value="group3_update_leaf">group3_update_leaf</option>
    <option value="group3_update_root">group3_update_root</option>
    <option value="group4_update_single">group4_update_single</option>
    <option value="group4_update_all">group4_update_all</option>
    <option value="group5_update_all">group5_update_all</option>
    <option value="group5_update_root">group5_update_root</option>
    <option value="group5_update_leaf">group5_update_leaf</option>
  </select>
</div>
