
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.35.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/scenario-1/Child.svelte generated by Svelte v3.35.0 */

    const file = "src/scenario-1/Child.svelte";

    function create_fragment(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "-";
    			add_location(div, file, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Child", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Child> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Child extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Child",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    /* src/scenario-1/Child2.svelte generated by Svelte v3.35.0 */

    const file$1 = "src/scenario-1/Child2.svelte";

    function create_fragment$1(ctx) {
    	let span;
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(/*id*/ ctx[0]);
    			add_location(span, file$1, 4, 0, 37);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*id*/ 1) set_data_dev(t, /*id*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Child2", slots, []);
    	let { id } = $$props;
    	const writable_props = ["id"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Child2> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    	};

    	$$self.$capture_state = () => ({ id });

    	$$self.$inject_state = $$props => {
    		if ("id" in $$props) $$invalidate(0, id = $$props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [id];
    }

    class Child2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { id: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Child2",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*id*/ ctx[0] === undefined && !("id" in props)) {
    			console.warn("<Child2> was created without expected prop 'id'");
    		}
    	}

    	get id() {
    		throw new Error("<Child2>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Child2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/scenario-1/Scenario1.svelte generated by Svelte v3.35.0 */
    const file$2 = "src/scenario-1/Scenario1.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    // (66:6) {:else}
    function create_else_block(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value_2 = /*children*/ ctx[0];
    	validate_each_argument(each_value_2);
    	const get_key = ctx => /*child*/ ctx[14].id;
    	validate_each_keys(ctx, each_value_2, get_each_context_2, get_key);

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		let child_ctx = get_each_context_2(ctx, each_value_2, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_2(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 1) {
    				each_value_2 = /*children*/ ctx[0];
    				validate_each_argument(each_value_2);
    				group_outros();
    				validate_each_keys(ctx, each_value_2, get_each_context_2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_2, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block_2, each_1_anchor, get_each_context_2);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(66:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (62:6) {#if childType === 1}
    function create_if_block(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*children*/ ctx[0];
    	validate_each_argument(each_value_1);
    	const get_key = ctx => /*child*/ ctx[14].id;
    	validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		let child_ctx = get_each_context_1(ctx, each_value_1, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 1) {
    				each_value_1 = /*children*/ ctx[0];
    				validate_each_argument(each_value_1);
    				group_outros();
    				validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 0, ctx, each_value_1, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block_1, each_1_anchor, get_each_context_1);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(62:6) {#if childType === 1}",
    		ctx
    	});

    	return block;
    }

    // (67:8) {#each children as child (child.id)}
    function create_each_block_2(key_1, ctx) {
    	let first;
    	let child2;
    	let current;

    	child2 = new Child2({
    			props: { id: /*child*/ ctx[14].id },
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(child2.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(child2, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const child2_changes = {};
    			if (dirty & /*children*/ 1) child2_changes.id = /*child*/ ctx[14].id;
    			child2.$set(child2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(child2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(child2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(child2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(67:8) {#each children as child (child.id)}",
    		ctx
    	});

    	return block;
    }

    // (63:8) {#each children as child (child.id)}
    function create_each_block_1(key_1, ctx) {
    	let first;
    	let child;
    	let current;
    	child = new Child({ $$inline: true });

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(child.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(child, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(child.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(child.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(child, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(63:8) {#each children as child (child.id)}",
    		ctx
    	});

    	return block;
    }

    // (71:6) {#each elements as element}
    function create_each_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "-";
    			add_location(div, file$2, 71, 8, 1747);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(71:6) {#each elements as element}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let main;
    	let div4;
    	let div0;
    	let label;
    	let t1;
    	let input;
    	let t2;
    	let button0;
    	let t4;
    	let button1;
    	let t6;
    	let button2;
    	let t8;
    	let div2;
    	let div1;
    	let button3;
    	let t10;
    	let button4;
    	let t12;
    	let div3;
    	let current_block_type_index;
    	let if_block;
    	let t13;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*childType*/ ctx[2] === 1) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	let each_value = /*elements*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			main = element("main");
    			div4 = element("div");
    			div0 = element("div");
    			label = element("label");
    			label.textContent = "Number of components or elements to create";
    			t1 = space();
    			input = element("input");
    			t2 = space();
    			button0 = element("button");
    			button0.textContent = "Generate components";
    			t4 = space();
    			button1 = element("button");
    			button1.textContent = "Generate static elements";
    			t6 = space();
    			button2 = element("button");
    			button2.textContent = "Change child component type";
    			t8 = space();
    			div2 = element("div");
    			div1 = element("div");
    			button3 = element("button");
    			button3.textContent = "Delete all components";
    			t10 = space();
    			button4 = element("button");
    			button4.textContent = "Add one component";
    			t12 = space();
    			div3 = element("div");
    			if_block.c();
    			t13 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(label, file$2, 37, 6, 692);
    			attr_dev(input, "id", "input-num-to-create");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "1");
    			add_location(input, file$2, 38, 6, 756);
    			attr_dev(button0, "id", "btn-generate-components");
    			add_location(button0, file$2, 44, 6, 901);
    			attr_dev(button1, "id", "btn-generate-elements");
    			add_location(button1, file$2, 47, 6, 1019);
    			attr_dev(button2, "id", "btn-switch-child-type");
    			add_location(button2, file$2, 50, 6, 1138);
    			add_location(div0, file$2, 36, 4, 680);
    			attr_dev(button3, "id", "btn-delete");
    			add_location(button3, file$2, 56, 8, 1289);
    			attr_dev(button4, "id", "btn-add-one");
    			add_location(button4, file$2, 57, 8, 1370);
    			add_location(div1, file$2, 55, 6, 1275);
    			add_location(div2, file$2, 54, 4, 1263);
    			add_location(div3, file$2, 60, 4, 1468);
    			add_location(div4, file$2, 35, 2, 670);
    			add_location(main, file$2, 34, 0, 661);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div4);
    			append_dev(div4, div0);
    			append_dev(div0, label);
    			append_dev(div0, t1);
    			append_dev(div0, input);
    			append_dev(div0, t2);
    			append_dev(div0, button0);
    			append_dev(div0, t4);
    			append_dev(div0, button1);
    			append_dev(div0, t6);
    			append_dev(div0, button2);
    			append_dev(div4, t8);
    			append_dev(div4, div2);
    			append_dev(div2, div1);
    			append_dev(div1, button3);
    			append_dev(div1, t10);
    			append_dev(div1, button4);
    			append_dev(div4, t12);
    			append_dev(div4, div3);
    			if_blocks[current_block_type_index].m(div3, null);
    			append_dev(div3, t13);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div3, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*change_handler*/ ctx[9], false, false, false),
    					listen_dev(button0, "click", /*generateComponents*/ ctx[5], false, false, false),
    					listen_dev(button1, "click", /*generateElements*/ ctx[6], false, false, false),
    					listen_dev(button2, "click", /*switchType*/ ctx[8], false, false, false),
    					listen_dev(button3, "click", /*remove*/ ctx[4], false, false, false),
    					listen_dev(button4, "click", /*addOne*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div3, t13);
    			}

    			if (dirty & /*elements*/ 2) {
    				const old_length = each_value.length;
    				each_value = /*elements*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = old_length; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (!each_blocks[i]) {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div3, null);
    					}
    				}

    				for (i = each_value.length; i < old_length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if_blocks[current_block_type_index].d();
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Scenario1", slots, []);
    	let children = [];
    	let elements = [];
    	let numChildren = 0;
    	let childType = 1;

    	function addOne() {
    		$$invalidate(0, children = [...children, { id: children.length + 1 }]);
    	}

    	function remove() {
    		$$invalidate(0, children = []);
    	}

    	function generateComponents() {
    		$$invalidate(0, children = new Array(numChildren).fill(null).map((_, i) => ({ id: i })));
    	}

    	function generateElements() {
    		$$invalidate(1, elements = new Array(numChildren).fill(null));
    	}

    	function onUpdateValue(event) {
    		numChildren = parseInt(event.target.value, 10);
    	}

    	function switchType() {
    		$$invalidate(2, childType = 2);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Scenario1> was created with unknown prop '${key}'`);
    	});

    	const change_handler = event => onUpdateValue(event);

    	$$self.$capture_state = () => ({
    		Child,
    		Child2,
    		children,
    		elements,
    		numChildren,
    		childType,
    		addOne,
    		remove,
    		generateComponents,
    		generateElements,
    		onUpdateValue,
    		switchType
    	});

    	$$self.$inject_state = $$props => {
    		if ("children" in $$props) $$invalidate(0, children = $$props.children);
    		if ("elements" in $$props) $$invalidate(1, elements = $$props.elements);
    		if ("numChildren" in $$props) numChildren = $$props.numChildren;
    		if ("childType" in $$props) $$invalidate(2, childType = $$props.childType);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		children,
    		elements,
    		childType,
    		addOne,
    		remove,
    		generateComponents,
    		generateElements,
    		onUpdateValue,
    		switchType,
    		change_handler
    	];
    }

    class Scenario1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scenario1",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/scenario-2/Cell.svelte generated by Svelte v3.35.0 */

    const file$3 = "src/scenario-2/Cell.svelte";

    function create_fragment$3(ctx) {
    	let span;
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t0 = text("Prop value: ");
    			t1 = text(/*value*/ ctx[0]);
    			t2 = text(", internal value: ");
    			t3 = text(/*count*/ ctx[1]);
    			button = element("button");
    			button.textContent = "Update child";
    			attr_dev(button, "class", "cell-btn-increment");
    			add_location(button, file$3, 1, 54, 55);
    			add_location(span, file$3, 1, 0, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t0);
    			append_dev(span, t1);
    			append_dev(span, t2);
    			append_dev(span, t3);
    			append_dev(span, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*increment*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*value*/ 1) set_data_dev(t1, /*value*/ ctx[0]);
    			if (dirty & /*count*/ 2) set_data_dev(t3, /*count*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Cell", slots, []);
    	let count = 0;
    	let { value } = $$props;

    	function increment() {
    		$$invalidate(1, count += 1);
    	}

    	const writable_props = ["value"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Cell> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    	};

    	$$self.$capture_state = () => ({ count, value, increment });

    	$$self.$inject_state = $$props => {
    		if ("count" in $$props) $$invalidate(1, count = $$props.count);
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, count, increment];
    }

    class Cell extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { value: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Cell",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*value*/ ctx[0] === undefined && !("value" in props)) {
    			console.warn("<Cell> was created without expected prop 'value'");
    		}
    	}

    	get value() {
    		throw new Error("<Cell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Cell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/scenario-2/Row.svelte generated by Svelte v3.35.0 */
    const file$4 = "src/scenario-2/Row.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[7] = i;
    	return child_ctx;
    }

    // (25:4) {#each columns as column, i (column.id)}
    function create_each_block$1(key_1, ctx) {
    	let first;
    	let cell;
    	let current;

    	cell = new Cell({
    			props: { value: /*i*/ ctx[7] + /*offset*/ ctx[2] },
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(cell.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(cell, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const cell_changes = {};
    			if (dirty & /*columns, offset*/ 5) cell_changes.value = /*i*/ ctx[7] + /*offset*/ ctx[2];
    			cell.$set(cell_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cell.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cell.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(cell, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(25:4) {#each columns as column, i (column.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let t1;
    	let t2;
    	let button0;
    	let t4;
    	let button1;
    	let t6;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*columns*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*column*/ ctx[5].id;
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text("Row count: ");
    			t1 = text(/*count*/ ctx[1]);
    			t2 = space();
    			button0 = element("button");
    			button0.textContent = "Update children";
    			t4 = space();
    			button1 = element("button");
    			button1.textContent = "Upate parent";
    			t6 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(button0, "class", "row-btn-update-children");
    			add_location(button0, file$4, 19, 6, 240);
    			attr_dev(button1, "class", "row-btn-update-self");
    			add_location(button1, file$4, 22, 6, 350);
    			add_location(div0, file$4, 17, 4, 201);
    			add_location(div1, file$4, 16, 2, 191);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, button0);
    			append_dev(div0, t4);
    			append_dev(div0, button1);
    			append_dev(div1, t6);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*updateRow*/ ctx[4], false, false, false),
    					listen_dev(button1, "click", /*onInput*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*count*/ 2) set_data_dev(t1, /*count*/ ctx[1]);

    			if (dirty & /*columns, offset*/ 5) {
    				each_value = /*columns*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div1, outro_and_destroy_block, create_each_block$1, null, get_each_context$1);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Row", slots, []);
    	let { columns } = $$props;
    	let count = 0;
    	let offset = 0;

    	function onInput() {
    		$$invalidate(1, count += 1);
    	}

    	function updateRow() {
    		$$invalidate(2, offset += 1);
    	}

    	const writable_props = ["columns"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Row> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("columns" in $$props) $$invalidate(0, columns = $$props.columns);
    	};

    	$$self.$capture_state = () => ({
    		Cell,
    		columns,
    		count,
    		offset,
    		onInput,
    		updateRow
    	});

    	$$self.$inject_state = $$props => {
    		if ("columns" in $$props) $$invalidate(0, columns = $$props.columns);
    		if ("count" in $$props) $$invalidate(1, count = $$props.count);
    		if ("offset" in $$props) $$invalidate(2, offset = $$props.offset);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [columns, count, offset, onInput, updateRow];
    }

    class Row extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { columns: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Row",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*columns*/ ctx[0] === undefined && !("columns" in props)) {
    			console.warn("<Row> was created without expected prop 'columns'");
    		}
    	}

    	get columns() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set columns(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/scenario-2/Scenario2.svelte generated by Svelte v3.35.0 */
    const file$5 = "src/scenario-2/Scenario2.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (23:2) {#each rows as row (row.id)}
    function create_each_block$2(key_1, ctx) {
    	let first;
    	let row;
    	let current;

    	row = new Row({
    			props: { columns: /*row*/ ctx[8].columns },
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(row.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const row_changes = {};
    			if (dirty & /*rows*/ 1) row_changes.columns = /*row*/ ctx[8].columns;
    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(23:2) {#each rows as row (row.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let div2;
    	let div0;
    	let label0;
    	let t1;
    	let input0;
    	let t2;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let button;
    	let t7;
    	let div1;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*rows*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*row*/ ctx[8].id;
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Number of rows";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			label1 = element("label");
    			label1.textContent = "Number of columns";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			button = element("button");
    			button.textContent = "Generate";
    			t7 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(label0, file$5, 3, 4, 19);
    			attr_dev(input0, "id", "input-rows");
    			attr_dev(input0, "type", "number");
    			attr_dev(input0, "min", "1");
    			add_location(input0, file$5, 4, 4, 53);
    			add_location(label1, file$5, 10, 4, 191);
    			attr_dev(input1, "id", "input-columns");
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "min", "1");
    			add_location(input1, file$5, 11, 4, 228);
    			attr_dev(button, "id", "btn-generate");
    			add_location(button, file$5, 17, 4, 372);
    			add_location(div0, file$5, 2, 2, 9);
    			add_location(div1, file$5, 21, 2, 461);
    			add_location(div2, file$5, 1, 0, 1);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t1);
    			append_dev(div0, input0);
    			append_dev(div0, t2);
    			append_dev(div0, label1);
    			append_dev(div0, t4);
    			append_dev(div0, input1);
    			append_dev(div0, t5);
    			append_dev(div0, button);
    			append_dev(div2, t7);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*change_handler*/ ctx[4], false, false, false),
    					listen_dev(input1, "change", /*change_handler_1*/ ctx[5], false, false, false),
    					listen_dev(button, "click", /*generate*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*rows*/ 1) {
    				each_value = /*rows*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div1, outro_and_destroy_block, create_each_block$2, null, get_each_context$2);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Scenario2", slots, []);
    	let numRows = 0;
    	let numColumns = 0;
    	let rows = [];

    	function generate() {
    		$$invalidate(0, rows = new Array(numRows).fill(null).map((_, i) => ({
    			id: i,
    			columns: new Array(numColumns).fill(null).map((_, y) => ({ id: `row${i}-col${y}` }))
    		})));
    	}

    	function onUpdateColumns(value) {
    		numColumns = parseInt(value, 10);
    	}

    	function onUpdateRows(value) {
    		numRows = parseInt(value, 10);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Scenario2> was created with unknown prop '${key}'`);
    	});

    	const change_handler = event => onUpdateRows(event.target.value);
    	const change_handler_1 = event => onUpdateColumns(event.target.value);

    	$$self.$capture_state = () => ({
    		Row,
    		numRows,
    		numColumns,
    		rows,
    		generate,
    		onUpdateColumns,
    		onUpdateRows
    	});

    	$$self.$inject_state = $$props => {
    		if ("numRows" in $$props) numRows = $$props.numRows;
    		if ("numColumns" in $$props) numColumns = $$props.numColumns;
    		if ("rows" in $$props) $$invalidate(0, rows = $$props.rows);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		rows,
    		generate,
    		onUpdateColumns,
    		onUpdateRows,
    		change_handler,
    		change_handler_1
    	];
    }

    class Scenario2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scenario2",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src/scenario-3/Node.svelte generated by Svelte v3.35.0 */

    const file$6 = "src/scenario-3/Node.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (9:4) {:else}
    function create_else_block$1(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(/*count*/ ctx[2]);
    			t1 = space();
    			button = element("button");
    			button.textContent = "Update leaf";
    			attr_dev(button, "class", "btn-increment-leaf");
    			add_location(button, file$6, 11, 8, 275);
    			add_location(div, file$6, 9, 4, 243);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*increment*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*count*/ 4) set_data_dev(t0, /*count*/ ctx[2]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(9:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (3:4) {#if subtreeDepth > 0}
    function create_if_block$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = Array(/*branchingFactor*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subtreeDepth, branchingFactor*/ 3) {
    				each_value = Array(/*branchingFactor*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(3:4) {#if subtreeDepth > 0}",
    		ctx
    	});

    	return block;
    }

    // (4:8) {#each Array(branchingFactor) as _ }
    function create_each_block$3(ctx) {
    	let node;
    	let current;

    	node = new Node({
    			props: {
    				subtreeDepth: /*subtreeDepth*/ ctx[1] - 1,
    				branchingFactor: /*branchingFactor*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(node, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node_changes = {};
    			if (dirty & /*subtreeDepth*/ 2) node_changes.subtreeDepth = /*subtreeDepth*/ ctx[1] - 1;
    			if (dirty & /*branchingFactor*/ 1) node_changes.branchingFactor = /*branchingFactor*/ ctx[0];
    			node.$set(node_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(4:8) {#each Array(branchingFactor) as _ }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*subtreeDepth*/ ctx[1] > 0) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			add_location(div, file$6, 1, 2, 3);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Node", slots, []);
    	let { branchingFactor } = $$props;
    	let { subtreeDepth } = $$props;
    	let count = 0;

    	function increment() {
    		$$invalidate(2, count += 1);
    	}

    	const writable_props = ["branchingFactor", "subtreeDepth"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Node> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("branchingFactor" in $$props) $$invalidate(0, branchingFactor = $$props.branchingFactor);
    		if ("subtreeDepth" in $$props) $$invalidate(1, subtreeDepth = $$props.subtreeDepth);
    	};

    	$$self.$capture_state = () => ({
    		branchingFactor,
    		subtreeDepth,
    		count,
    		increment
    	});

    	$$self.$inject_state = $$props => {
    		if ("branchingFactor" in $$props) $$invalidate(0, branchingFactor = $$props.branchingFactor);
    		if ("subtreeDepth" in $$props) $$invalidate(1, subtreeDepth = $$props.subtreeDepth);
    		if ("count" in $$props) $$invalidate(2, count = $$props.count);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [branchingFactor, subtreeDepth, count, increment];
    }

    class Node extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { branchingFactor: 0, subtreeDepth: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Node",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*branchingFactor*/ ctx[0] === undefined && !("branchingFactor" in props)) {
    			console.warn("<Node> was created without expected prop 'branchingFactor'");
    		}

    		if (/*subtreeDepth*/ ctx[1] === undefined && !("subtreeDepth" in props)) {
    			console.warn("<Node> was created without expected prop 'subtreeDepth'");
    		}
    	}

    	get branchingFactor() {
    		throw new Error("<Node>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set branchingFactor(value) {
    		throw new Error("<Node>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get subtreeDepth() {
    		throw new Error("<Node>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subtreeDepth(value) {
    		throw new Error("<Node>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/scenario-3/Node2.svelte generated by Svelte v3.35.0 */

    const file$7 = "src/scenario-3/Node2.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (7:2) {#if subtreeDepth > 0}
    function create_if_block$2(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = Array(/*branchingFactor*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subtreeDepth, branchingFactor*/ 3) {
    				each_value = Array(/*branchingFactor*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(7:2) {#if subtreeDepth > 0}",
    		ctx
    	});

    	return block;
    }

    // (8:4) {#each Array(branchingFactor) as _}
    function create_each_block$4(ctx) {
    	let node2;
    	let current;

    	node2 = new Node2({
    			props: {
    				subtreeDepth: /*subtreeDepth*/ ctx[1] - 1,
    				branchingFactor: /*branchingFactor*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(node2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node2_changes = {};
    			if (dirty & /*subtreeDepth*/ 2) node2_changes.subtreeDepth = /*subtreeDepth*/ ctx[1] - 1;
    			if (dirty & /*branchingFactor*/ 1) node2_changes.branchingFactor = /*branchingFactor*/ ctx[0];
    			node2.$set(node2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(8:4) {#each Array(branchingFactor) as _}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let div;
    	let t;
    	let current;
    	let if_block = /*subtreeDepth*/ ctx[1] > 0 && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block) if_block.c();
    			t = text("\n  -");
    			add_location(div, file$7, 5, 0, 77);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block) if_block.m(div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*subtreeDepth*/ ctx[1] > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*subtreeDepth*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div, t);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Node2", slots, []);
    	let { branchingFactor } = $$props;
    	let { subtreeDepth } = $$props;
    	const writable_props = ["branchingFactor", "subtreeDepth"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Node2> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("branchingFactor" in $$props) $$invalidate(0, branchingFactor = $$props.branchingFactor);
    		if ("subtreeDepth" in $$props) $$invalidate(1, subtreeDepth = $$props.subtreeDepth);
    	};

    	$$self.$capture_state = () => ({ branchingFactor, subtreeDepth });

    	$$self.$inject_state = $$props => {
    		if ("branchingFactor" in $$props) $$invalidate(0, branchingFactor = $$props.branchingFactor);
    		if ("subtreeDepth" in $$props) $$invalidate(1, subtreeDepth = $$props.subtreeDepth);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [branchingFactor, subtreeDepth];
    }

    class Node2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { branchingFactor: 0, subtreeDepth: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Node2",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*branchingFactor*/ ctx[0] === undefined && !("branchingFactor" in props)) {
    			console.warn("<Node2> was created without expected prop 'branchingFactor'");
    		}

    		if (/*subtreeDepth*/ ctx[1] === undefined && !("subtreeDepth" in props)) {
    			console.warn("<Node2> was created without expected prop 'subtreeDepth'");
    		}
    	}

    	get branchingFactor() {
    		throw new Error("<Node2>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set branchingFactor(value) {
    		throw new Error("<Node2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get subtreeDepth() {
    		throw new Error("<Node2>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subtreeDepth(value) {
    		throw new Error("<Node2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/scenario-3/Scenario3.svelte generated by Svelte v3.35.0 */
    const file$8 = "src/scenario-3/Scenario3.svelte";

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    // (48:2) {#if initialized}
    function create_if_block$3(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*nodeType*/ ctx[4] === 1) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(48:2) {#if initialized}",
    		ctx
    	});

    	return block;
    }

    // (55:4) {:else}
    function create_else_block$2(ctx) {
    	let div;
    	let current;
    	let each_value_1 = Array(/*branchingFactor*/ ctx[0]);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(div, file$8, 55, 6, 1363);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*branchingFactor, treeDepth*/ 3) {
    				each_value_1 = Array(/*branchingFactor*/ ctx[0]);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(55:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (49:4) {#if nodeType === 1}
    function create_if_block_1(ctx) {
    	let div;
    	let current;
    	let each_value = Array(/*branchingFactor*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(div, file$8, 49, 6, 1200);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*branchingFactor, treeDepth*/ 3) {
    				each_value = Array(/*branchingFactor*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(49:4) {#if nodeType === 1}",
    		ctx
    	});

    	return block;
    }

    // (57:8) {#each Array(branchingFactor) as _}
    function create_each_block_1$1(ctx) {
    	let node2;
    	let current;

    	node2 = new Node2({
    			props: {
    				branchingFactor: /*branchingFactor*/ ctx[0],
    				subtreeDepth: /*treeDepth*/ ctx[1] - 1
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node2.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(node2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node2_changes = {};
    			if (dirty & /*branchingFactor*/ 1) node2_changes.branchingFactor = /*branchingFactor*/ ctx[0];
    			if (dirty & /*treeDepth*/ 2) node2_changes.subtreeDepth = /*treeDepth*/ ctx[1] - 1;
    			node2.$set(node2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(57:8) {#each Array(branchingFactor) as _}",
    		ctx
    	});

    	return block;
    }

    // (51:8) {#each Array(branchingFactor) as _}
    function create_each_block$5(ctx) {
    	let node;
    	let current;

    	node = new Node({
    			props: {
    				branchingFactor: /*branchingFactor*/ ctx[0],
    				subtreeDepth: /*treeDepth*/ ctx[1] - 1
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(node, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node_changes = {};
    			if (dirty & /*branchingFactor*/ 1) node_changes.branchingFactor = /*branchingFactor*/ ctx[0];
    			if (dirty & /*treeDepth*/ 2) node_changes.subtreeDepth = /*treeDepth*/ ctx[1] - 1;
    			node.$set(node_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(51:8) {#each Array(branchingFactor) as _}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div1;
    	let label0;
    	let t1;
    	let input0;
    	let t2;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let button0;
    	let t7;
    	let button1;
    	let t9;
    	let div0;
    	let t10;
    	let t11;
    	let button2;
    	let t13;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*initialized*/ ctx[2] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			label0 = element("label");
    			label0.textContent = "Select branching factor";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			label1 = element("label");
    			label1.textContent = "Select tree depth";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			button0 = element("button");
    			button0.textContent = "Generate tree";
    			t7 = space();
    			button1 = element("button");
    			button1.textContent = "Generate simpler component tree";
    			t9 = space();
    			div0 = element("div");
    			t10 = text(/*count*/ ctx[3]);
    			t11 = space();
    			button2 = element("button");
    			button2.textContent = "Update root";
    			t13 = space();
    			if (if_block) if_block.c();
    			add_location(label0, file$8, 29, 2, 585);
    			attr_dev(input0, "id", "input-branching-factor");
    			attr_dev(input0, ":value", "branchingFactor");
    			add_location(input0, file$8, 30, 2, 626);
    			add_location(label1, file$8, 35, 2, 741);
    			attr_dev(input1, "id", "input-tree-depth");
    			attr_dev(input1, ":value", "treeDepth");
    			add_location(input1, file$8, 36, 2, 776);
    			attr_dev(button0, "id", "btn-generate");
    			add_location(button0, file$8, 41, 2, 873);
    			attr_dev(button1, "id", "btn-generate-simple");
    			add_location(button1, file$8, 42, 2, 944);
    			add_location(div0, file$8, 45, 2, 1054);
    			attr_dev(button2, "id", "btn-increment-root");
    			add_location(button2, file$8, 46, 2, 1075);
    			add_location(div1, file$8, 28, 0, 577);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, label0);
    			append_dev(div1, t1);
    			append_dev(div1, input0);
    			append_dev(div1, t2);
    			append_dev(div1, label1);
    			append_dev(div1, t4);
    			append_dev(div1, input1);
    			append_dev(div1, t5);
    			append_dev(div1, button0);
    			append_dev(div1, t7);
    			append_dev(div1, button1);
    			append_dev(div1, t9);
    			append_dev(div1, div0);
    			append_dev(div0, t10);
    			append_dev(div1, t11);
    			append_dev(div1, button2);
    			append_dev(div1, t13);
    			if (if_block) if_block.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*onUpdateBranchingFactor*/ ctx[5], false, false, false),
    					listen_dev(input1, "change", /*onUpdateTreeDepth*/ ctx[6], false, false, false),
    					listen_dev(button0, "click", /*generate*/ ctx[7], false, false, false),
    					listen_dev(button1, "click", /*generateSimple*/ ctx[8], false, false, false),
    					listen_dev(button2, "click", /*increment*/ ctx[9], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*count*/ 8) set_data_dev(t10, /*count*/ ctx[3]);

    			if (/*initialized*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*initialized*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Scenario3", slots, []);
    	let branchingFactor = 0;
    	let treeDepth = 0;
    	let initialized = false;
    	let count = 0;
    	let nodeType = 0;

    	function onUpdateBranchingFactor(event) {
    		$$invalidate(0, branchingFactor = parseInt(event.target.value, 10));
    	}

    	function onUpdateTreeDepth(event) {
    		$$invalidate(1, treeDepth = parseInt(event.target.value, 10));
    	}

    	function generate() {
    		$$invalidate(2, initialized = true);
    	}

    	function generateSimple() {
    		$$invalidate(4, nodeType = 2);
    		$$invalidate(2, initialized = true);
    	}

    	function increment() {
    		$$invalidate(3, count += 1);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Scenario3> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Node,
    		Node2,
    		branchingFactor,
    		treeDepth,
    		initialized,
    		count,
    		nodeType,
    		onUpdateBranchingFactor,
    		onUpdateTreeDepth,
    		generate,
    		generateSimple,
    		increment
    	});

    	$$self.$inject_state = $$props => {
    		if ("branchingFactor" in $$props) $$invalidate(0, branchingFactor = $$props.branchingFactor);
    		if ("treeDepth" in $$props) $$invalidate(1, treeDepth = $$props.treeDepth);
    		if ("initialized" in $$props) $$invalidate(2, initialized = $$props.initialized);
    		if ("count" in $$props) $$invalidate(3, count = $$props.count);
    		if ("nodeType" in $$props) $$invalidate(4, nodeType = $$props.nodeType);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		branchingFactor,
    		treeDepth,
    		initialized,
    		count,
    		nodeType,
    		onUpdateBranchingFactor,
    		onUpdateTreeDepth,
    		generate,
    		generateSimple,
    		increment
    	];
    }

    class Scenario3 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scenario3",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src/scenario-4/Child.svelte generated by Svelte v3.35.0 */

    const file$9 = "src/scenario-4/Child.svelte";

    function create_fragment$9(ctx) {
    	let div;
    	let span0;
    	let span1;
    	let span2;
    	let span3;
    	let span4;
    	let span5;
    	let span6;
    	let span7;
    	let span8;
    	let span9;
    	let span10;
    	let span11;
    	let span12;
    	let span13;
    	let span14;
    	let span15;
    	let span16;
    	let span17;
    	let span18;
    	let span19;
    	let span20;
    	let span21;
    	let span22;
    	let span23;
    	let span24;
    	let span25;
    	let span26;
    	let span27;
    	let span28;
    	let span29;
    	let span30;
    	let span31;
    	let span32;
    	let span33;
    	let span34;
    	let span35;
    	let span36;
    	let span37;
    	let span38;
    	let span39;
    	let span40;
    	let span41;
    	let span42;
    	let span43;
    	let span44;
    	let span45;
    	let span46;
    	let span47;
    	let span48;
    	let span49;
    	let span50;
    	let t50;
    	let span51;
    	let span52;
    	let span53;
    	let span54;
    	let span55;
    	let span56;
    	let span57;
    	let span58;
    	let span59;
    	let span60;
    	let span61;
    	let span62;
    	let span63;
    	let span64;
    	let span65;
    	let span66;
    	let span67;
    	let span68;
    	let span69;
    	let span70;
    	let span71;
    	let span72;
    	let span73;
    	let span74;
    	let span75;
    	let span76;
    	let span77;
    	let span78;
    	let span79;
    	let span80;
    	let span81;
    	let span82;
    	let span83;
    	let span84;
    	let span85;
    	let span86;
    	let span87;
    	let span88;
    	let span89;
    	let span90;
    	let span91;
    	let span92;
    	let span93;
    	let span94;
    	let span95;
    	let span96;
    	let span97;
    	let span98;
    	let span99;
    	let span100;

    	const block = {
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			span0.textContent = "-";
    			span1 = element("span");
    			span1.textContent = "-";
    			span2 = element("span");
    			span2.textContent = "-";
    			span3 = element("span");
    			span3.textContent = "-";
    			span4 = element("span");
    			span4.textContent = "-";
    			span5 = element("span");
    			span5.textContent = "-";
    			span6 = element("span");
    			span6.textContent = "-";
    			span7 = element("span");
    			span7.textContent = "-";
    			span8 = element("span");
    			span8.textContent = "-";
    			span9 = element("span");
    			span9.textContent = "-";
    			span10 = element("span");
    			span10.textContent = "-";
    			span11 = element("span");
    			span11.textContent = "-";
    			span12 = element("span");
    			span12.textContent = "-";
    			span13 = element("span");
    			span13.textContent = "-";
    			span14 = element("span");
    			span14.textContent = "-";
    			span15 = element("span");
    			span15.textContent = "-";
    			span16 = element("span");
    			span16.textContent = "-";
    			span17 = element("span");
    			span17.textContent = "-";
    			span18 = element("span");
    			span18.textContent = "-";
    			span19 = element("span");
    			span19.textContent = "-";
    			span20 = element("span");
    			span20.textContent = "-";
    			span21 = element("span");
    			span21.textContent = "-";
    			span22 = element("span");
    			span22.textContent = "-";
    			span23 = element("span");
    			span23.textContent = "-";
    			span24 = element("span");
    			span24.textContent = "-";
    			span25 = element("span");
    			span25.textContent = "-";
    			span26 = element("span");
    			span26.textContent = "-";
    			span27 = element("span");
    			span27.textContent = "-";
    			span28 = element("span");
    			span28.textContent = "-";
    			span29 = element("span");
    			span29.textContent = "-";
    			span30 = element("span");
    			span30.textContent = "-";
    			span31 = element("span");
    			span31.textContent = "-";
    			span32 = element("span");
    			span32.textContent = "-";
    			span33 = element("span");
    			span33.textContent = "-";
    			span34 = element("span");
    			span34.textContent = "-";
    			span35 = element("span");
    			span35.textContent = "-";
    			span36 = element("span");
    			span36.textContent = "-";
    			span37 = element("span");
    			span37.textContent = "-";
    			span38 = element("span");
    			span38.textContent = "-";
    			span39 = element("span");
    			span39.textContent = "-";
    			span40 = element("span");
    			span40.textContent = "-";
    			span41 = element("span");
    			span41.textContent = "-";
    			span42 = element("span");
    			span42.textContent = "-";
    			span43 = element("span");
    			span43.textContent = "-";
    			span44 = element("span");
    			span44.textContent = "-";
    			span45 = element("span");
    			span45.textContent = "-";
    			span46 = element("span");
    			span46.textContent = "-";
    			span47 = element("span");
    			span47.textContent = "-";
    			span48 = element("span");
    			span48.textContent = "-";
    			span49 = element("span");
    			span49.textContent = "-";
    			span50 = element("span");
    			t50 = text(/*value*/ ctx[0]);
    			span51 = element("span");
    			span51.textContent = "-";
    			span52 = element("span");
    			span52.textContent = "-";
    			span53 = element("span");
    			span53.textContent = "-";
    			span54 = element("span");
    			span54.textContent = "-";
    			span55 = element("span");
    			span55.textContent = "-";
    			span56 = element("span");
    			span56.textContent = "-";
    			span57 = element("span");
    			span57.textContent = "-";
    			span58 = element("span");
    			span58.textContent = "-";
    			span59 = element("span");
    			span59.textContent = "-";
    			span60 = element("span");
    			span60.textContent = "-";
    			span61 = element("span");
    			span61.textContent = "-";
    			span62 = element("span");
    			span62.textContent = "-";
    			span63 = element("span");
    			span63.textContent = "-";
    			span64 = element("span");
    			span64.textContent = "-";
    			span65 = element("span");
    			span65.textContent = "-";
    			span66 = element("span");
    			span66.textContent = "-";
    			span67 = element("span");
    			span67.textContent = "-";
    			span68 = element("span");
    			span68.textContent = "-";
    			span69 = element("span");
    			span69.textContent = "-";
    			span70 = element("span");
    			span70.textContent = "-";
    			span71 = element("span");
    			span71.textContent = "-";
    			span72 = element("span");
    			span72.textContent = "-";
    			span73 = element("span");
    			span73.textContent = "-";
    			span74 = element("span");
    			span74.textContent = "-";
    			span75 = element("span");
    			span75.textContent = "-";
    			span76 = element("span");
    			span76.textContent = "-";
    			span77 = element("span");
    			span77.textContent = "-";
    			span78 = element("span");
    			span78.textContent = "-";
    			span79 = element("span");
    			span79.textContent = "-";
    			span80 = element("span");
    			span80.textContent = "-";
    			span81 = element("span");
    			span81.textContent = "-";
    			span82 = element("span");
    			span82.textContent = "-";
    			span83 = element("span");
    			span83.textContent = "-";
    			span84 = element("span");
    			span84.textContent = "-";
    			span85 = element("span");
    			span85.textContent = "-";
    			span86 = element("span");
    			span86.textContent = "-";
    			span87 = element("span");
    			span87.textContent = "-";
    			span88 = element("span");
    			span88.textContent = "-";
    			span89 = element("span");
    			span89.textContent = "-";
    			span90 = element("span");
    			span90.textContent = "-";
    			span91 = element("span");
    			span91.textContent = "-";
    			span92 = element("span");
    			span92.textContent = "-";
    			span93 = element("span");
    			span93.textContent = "-";
    			span94 = element("span");
    			span94.textContent = "-";
    			span95 = element("span");
    			span95.textContent = "-";
    			span96 = element("span");
    			span96.textContent = "-";
    			span97 = element("span");
    			span97.textContent = "-";
    			span98 = element("span");
    			span98.textContent = "-";
    			span99 = element("span");
    			span99.textContent = "-";
    			span100 = element("span");
    			span100.textContent = "-";
    			add_location(span0, file$9, 5, 2, 48);
    			add_location(span1, file$9, 5, 16, 62);
    			add_location(span2, file$9, 5, 30, 76);
    			add_location(span3, file$9, 5, 44, 90);
    			add_location(span4, file$9, 5, 58, 104);
    			add_location(span5, file$9, 5, 72, 118);
    			add_location(span6, file$9, 7, 3, 140);
    			add_location(span7, file$9, 7, 17, 154);
    			add_location(span8, file$9, 7, 31, 168);
    			add_location(span9, file$9, 7, 45, 182);
    			add_location(span10, file$9, 7, 59, 196);
    			add_location(span11, file$9, 7, 73, 210);
    			add_location(span12, file$9, 9, 3, 232);
    			add_location(span13, file$9, 9, 17, 246);
    			add_location(span14, file$9, 9, 31, 260);
    			add_location(span15, file$9, 9, 45, 274);
    			add_location(span16, file$9, 9, 59, 288);
    			add_location(span17, file$9, 9, 73, 302);
    			add_location(span18, file$9, 11, 3, 324);
    			add_location(span19, file$9, 11, 17, 338);
    			add_location(span20, file$9, 11, 31, 352);
    			add_location(span21, file$9, 11, 45, 366);
    			add_location(span22, file$9, 11, 59, 380);
    			add_location(span23, file$9, 11, 73, 394);
    			add_location(span24, file$9, 13, 3, 416);
    			add_location(span25, file$9, 13, 17, 430);
    			add_location(span26, file$9, 13, 31, 444);
    			add_location(span27, file$9, 13, 45, 458);
    			add_location(span28, file$9, 13, 59, 472);
    			add_location(span29, file$9, 13, 73, 486);
    			add_location(span30, file$9, 15, 3, 508);
    			add_location(span31, file$9, 15, 17, 522);
    			add_location(span32, file$9, 15, 31, 536);
    			add_location(span33, file$9, 15, 45, 550);
    			add_location(span34, file$9, 15, 59, 564);
    			add_location(span35, file$9, 15, 73, 578);
    			add_location(span36, file$9, 17, 3, 600);
    			add_location(span37, file$9, 17, 17, 614);
    			add_location(span38, file$9, 17, 31, 628);
    			add_location(span39, file$9, 17, 45, 642);
    			add_location(span40, file$9, 17, 59, 656);
    			add_location(span41, file$9, 17, 73, 670);
    			add_location(span42, file$9, 19, 3, 692);
    			add_location(span43, file$9, 19, 17, 706);
    			add_location(span44, file$9, 19, 31, 720);
    			add_location(span45, file$9, 19, 45, 734);
    			add_location(span46, file$9, 19, 59, 748);
    			add_location(span47, file$9, 19, 73, 762);
    			add_location(span48, file$9, 21, 3, 784);
    			add_location(span49, file$9, 21, 17, 798);
    			add_location(span50, file$9, 21, 31, 812);
    			add_location(span51, file$9, 21, 51, 832);
    			add_location(span52, file$9, 21, 65, 846);
    			add_location(span53, file$9, 22, 3, 863);
    			add_location(span54, file$9, 22, 17, 877);
    			add_location(span55, file$9, 22, 31, 891);
    			add_location(span56, file$9, 22, 45, 905);
    			add_location(span57, file$9, 22, 59, 919);
    			add_location(span58, file$9, 22, 73, 933);
    			add_location(span59, file$9, 24, 3, 955);
    			add_location(span60, file$9, 24, 17, 969);
    			add_location(span61, file$9, 24, 31, 983);
    			add_location(span62, file$9, 24, 45, 997);
    			add_location(span63, file$9, 24, 59, 1011);
    			add_location(span64, file$9, 24, 73, 1025);
    			add_location(span65, file$9, 26, 3, 1047);
    			add_location(span66, file$9, 26, 17, 1061);
    			add_location(span67, file$9, 26, 31, 1075);
    			add_location(span68, file$9, 26, 45, 1089);
    			add_location(span69, file$9, 26, 59, 1103);
    			add_location(span70, file$9, 26, 73, 1117);
    			add_location(span71, file$9, 28, 3, 1139);
    			add_location(span72, file$9, 28, 17, 1153);
    			add_location(span73, file$9, 28, 31, 1167);
    			add_location(span74, file$9, 28, 45, 1181);
    			add_location(span75, file$9, 28, 59, 1195);
    			add_location(span76, file$9, 28, 73, 1209);
    			add_location(span77, file$9, 30, 3, 1231);
    			add_location(span78, file$9, 30, 17, 1245);
    			add_location(span79, file$9, 30, 31, 1259);
    			add_location(span80, file$9, 30, 45, 1273);
    			add_location(span81, file$9, 30, 59, 1287);
    			add_location(span82, file$9, 30, 73, 1301);
    			add_location(span83, file$9, 32, 3, 1323);
    			add_location(span84, file$9, 32, 17, 1337);
    			add_location(span85, file$9, 32, 31, 1351);
    			add_location(span86, file$9, 32, 45, 1365);
    			add_location(span87, file$9, 32, 59, 1379);
    			add_location(span88, file$9, 32, 73, 1393);
    			add_location(span89, file$9, 34, 3, 1415);
    			add_location(span90, file$9, 34, 17, 1429);
    			add_location(span91, file$9, 34, 31, 1443);
    			add_location(span92, file$9, 34, 45, 1457);
    			add_location(span93, file$9, 34, 59, 1471);
    			add_location(span94, file$9, 34, 73, 1485);
    			add_location(span95, file$9, 36, 3, 1507);
    			add_location(span96, file$9, 36, 17, 1521);
    			add_location(span97, file$9, 36, 31, 1535);
    			add_location(span98, file$9, 36, 45, 1549);
    			add_location(span99, file$9, 36, 59, 1563);
    			add_location(span100, file$9, 36, 73, 1577);
    			add_location(div, file$9, 4, 0, 40);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(div, span1);
    			append_dev(div, span2);
    			append_dev(div, span3);
    			append_dev(div, span4);
    			append_dev(div, span5);
    			append_dev(div, span6);
    			append_dev(div, span7);
    			append_dev(div, span8);
    			append_dev(div, span9);
    			append_dev(div, span10);
    			append_dev(div, span11);
    			append_dev(div, span12);
    			append_dev(div, span13);
    			append_dev(div, span14);
    			append_dev(div, span15);
    			append_dev(div, span16);
    			append_dev(div, span17);
    			append_dev(div, span18);
    			append_dev(div, span19);
    			append_dev(div, span20);
    			append_dev(div, span21);
    			append_dev(div, span22);
    			append_dev(div, span23);
    			append_dev(div, span24);
    			append_dev(div, span25);
    			append_dev(div, span26);
    			append_dev(div, span27);
    			append_dev(div, span28);
    			append_dev(div, span29);
    			append_dev(div, span30);
    			append_dev(div, span31);
    			append_dev(div, span32);
    			append_dev(div, span33);
    			append_dev(div, span34);
    			append_dev(div, span35);
    			append_dev(div, span36);
    			append_dev(div, span37);
    			append_dev(div, span38);
    			append_dev(div, span39);
    			append_dev(div, span40);
    			append_dev(div, span41);
    			append_dev(div, span42);
    			append_dev(div, span43);
    			append_dev(div, span44);
    			append_dev(div, span45);
    			append_dev(div, span46);
    			append_dev(div, span47);
    			append_dev(div, span48);
    			append_dev(div, span49);
    			append_dev(div, span50);
    			append_dev(span50, t50);
    			append_dev(div, span51);
    			append_dev(div, span52);
    			append_dev(div, span53);
    			append_dev(div, span54);
    			append_dev(div, span55);
    			append_dev(div, span56);
    			append_dev(div, span57);
    			append_dev(div, span58);
    			append_dev(div, span59);
    			append_dev(div, span60);
    			append_dev(div, span61);
    			append_dev(div, span62);
    			append_dev(div, span63);
    			append_dev(div, span64);
    			append_dev(div, span65);
    			append_dev(div, span66);
    			append_dev(div, span67);
    			append_dev(div, span68);
    			append_dev(div, span69);
    			append_dev(div, span70);
    			append_dev(div, span71);
    			append_dev(div, span72);
    			append_dev(div, span73);
    			append_dev(div, span74);
    			append_dev(div, span75);
    			append_dev(div, span76);
    			append_dev(div, span77);
    			append_dev(div, span78);
    			append_dev(div, span79);
    			append_dev(div, span80);
    			append_dev(div, span81);
    			append_dev(div, span82);
    			append_dev(div, span83);
    			append_dev(div, span84);
    			append_dev(div, span85);
    			append_dev(div, span86);
    			append_dev(div, span87);
    			append_dev(div, span88);
    			append_dev(div, span89);
    			append_dev(div, span90);
    			append_dev(div, span91);
    			append_dev(div, span92);
    			append_dev(div, span93);
    			append_dev(div, span94);
    			append_dev(div, span95);
    			append_dev(div, span96);
    			append_dev(div, span97);
    			append_dev(div, span98);
    			append_dev(div, span99);
    			append_dev(div, span100);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*value*/ 1) set_data_dev(t50, /*value*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Child", slots, []);
    	let { value } = $$props;
    	const writable_props = ["value"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Child> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    	};

    	$$self.$capture_state = () => ({ value });

    	$$self.$inject_state = $$props => {
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value];
    }

    class Child$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { value: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Child",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*value*/ ctx[0] === undefined && !("value" in props)) {
    			console.warn("<Child> was created without expected prop 'value'");
    		}
    	}

    	get value() {
    		throw new Error("<Child>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Child>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/scenario-4/Scenario4.svelte generated by Svelte v3.35.0 */
    const file$a = "src/scenario-4/Scenario4.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (46:4) {#each children as child (child.id)}
    function create_each_block$6(key_1, ctx) {
    	let first;
    	let child;
    	let current;

    	child = new Child$1({
    			props: { value: /*child*/ ctx[9].value },
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(child.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(child, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const child_changes = {};
    			if (dirty & /*children*/ 1) child_changes.value = /*child*/ ctx[9].value;
    			child.$set(child_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(child.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(child.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(child, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(46:4) {#each children as child (child.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let label;
    	let t1;
    	let input;
    	let t2;
    	let button0;
    	let t4;
    	let button1;
    	let t6;
    	let button2;
    	let t8;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*children*/ ctx[0];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*child*/ ctx[9].id;
    	validate_each_keys(ctx, each_value, get_each_context$6, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$6(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$6(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			label = element("label");
    			label.textContent = "Number of components";
    			t1 = space();
    			input = element("input");
    			t2 = space();
    			button0 = element("button");
    			button0.textContent = "Generate";
    			t4 = space();
    			button1 = element("button");
    			button1.textContent = "Update children";
    			t6 = space();
    			button2 = element("button");
    			button2.textContent = "Update single child";
    			t8 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(label, file$a, 29, 6, 550);
    			attr_dev(input, "id", "input-components");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "1");
    			attr_dev(input, ":value", "numChildren");
    			add_location(input, file$a, 30, 6, 592);
    			attr_dev(button0, "id", "btn-generate");
    			add_location(button0, file$a, 37, 6, 771);
    			attr_dev(button1, "id", "btn-update");
    			add_location(button1, file$a, 40, 6, 857);
    			attr_dev(button2, "id", "btn-update-single");
    			add_location(button2, file$a, 41, 6, 930);
    			add_location(div0, file$a, 28, 4, 538);
    			add_location(div1, file$a, 27, 2, 528);
    			add_location(div2, file$a, 26, 0, 520);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, label);
    			append_dev(div0, t1);
    			append_dev(div0, input);
    			append_dev(div0, t2);
    			append_dev(div0, button0);
    			append_dev(div0, t4);
    			append_dev(div0, button1);
    			append_dev(div0, t6);
    			append_dev(div0, button2);
    			append_dev(div1, t8);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*change_handler*/ ctx[7], false, false, false),
    					listen_dev(button0, "click", /*generate*/ ctx[1], false, false, false),
    					listen_dev(button1, "click", /*update*/ ctx[3], false, false, false),
    					listen_dev(button2, "click", /*updateSingle*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*children*/ 1) {
    				each_value = /*children*/ ctx[0];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$6, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div1, outro_and_destroy_block, create_each_block$6, null, get_each_context$6);
    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let children;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Scenario4", slots, []);
    	let numStuff = 0;
    	let numChildren = 0;
    	let offset = 0;

    	function generate() {
    		$$invalidate(5, numChildren = numStuff);
    	}

    	function onChange(value) {
    		numStuff = parseInt(value, 10);
    	}

    	function update() {
    		$$invalidate(6, offset += 1);
    	}

    	function updateSingle() {
    		const i = Math.floor(Math.random() * Math.floor(children.length));
    		$$invalidate(0, children[i].value += 1, children);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Scenario4> was created with unknown prop '${key}'`);
    	});

    	const change_handler = event => onChange(event.target.value);

    	$$self.$capture_state = () => ({
    		Child: Child$1,
    		numStuff,
    		numChildren,
    		offset,
    		generate,
    		onChange,
    		update,
    		updateSingle,
    		children
    	});

    	$$self.$inject_state = $$props => {
    		if ("numStuff" in $$props) numStuff = $$props.numStuff;
    		if ("numChildren" in $$props) $$invalidate(5, numChildren = $$props.numChildren);
    		if ("offset" in $$props) $$invalidate(6, offset = $$props.offset);
    		if ("children" in $$props) $$invalidate(0, children = $$props.children);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*numChildren, offset*/ 96) {
    			 $$invalidate(0, children = new Array(numChildren).fill(null).map((_, i) => ({ id: i, value: i + offset })));
    		}
    	};

    	return [
    		children,
    		generate,
    		onChange,
    		update,
    		updateSingle,
    		numChildren,
    		offset,
    		change_handler
    	];
    }

    class Scenario4 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scenario4",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* src/scenario-5/Node.svelte generated by Svelte v3.35.0 */

    const file$b = "src/scenario-5/Node.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (53:2) {#if subtreeDepth > 0}
    function create_if_block$4(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = Array(/*branchingFactor*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subtreeDepth, branchingFactor, prop*/ 7) {
    				each_value = Array(/*branchingFactor*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$7(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$7(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(53:2) {#if subtreeDepth > 0}",
    		ctx
    	});

    	return block;
    }

    // (54:4) {#each Array(branchingFactor) as _}
    function create_each_block$7(ctx) {
    	let node;
    	let current;

    	node = new Node$1({
    			props: {
    				subtreeDepth: /*subtreeDepth*/ ctx[1] - 1,
    				branchingFactor: /*branchingFactor*/ ctx[0],
    				prop: /*prop*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(node, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node_changes = {};
    			if (dirty & /*subtreeDepth*/ 2) node_changes.subtreeDepth = /*subtreeDepth*/ ctx[1] - 1;
    			if (dirty & /*branchingFactor*/ 1) node_changes.branchingFactor = /*branchingFactor*/ ctx[0];
    			if (dirty & /*prop*/ 4) node_changes.prop = /*prop*/ ctx[2];
    			node.$set(node_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(54:4) {#each Array(branchingFactor) as _}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let div1;
    	let t0;
    	let t1;
    	let span0;
    	let span1;
    	let span2;
    	let span3;
    	let span4;
    	let span5;
    	let span6;
    	let span7;
    	let span8;
    	let span9;
    	let span10;
    	let span11;
    	let span12;
    	let span13;
    	let span14;
    	let span15;
    	let span16;
    	let span17;
    	let span18;
    	let span19;
    	let span20;
    	let span21;
    	let span22;
    	let span23;
    	let span24;
    	let span25;
    	let span26;
    	let span27;
    	let span28;
    	let span29;
    	let span30;
    	let span31;
    	let span32;
    	let span33;
    	let span34;
    	let span35;
    	let span36;
    	let span37;
    	let span38;
    	let span39;
    	let span40;
    	let span41;
    	let span42;
    	let span43;
    	let span44;
    	let span45;
    	let span46;
    	let span47;
    	let span48;
    	let span49;
    	let span50;
    	let t52;
    	let div0;
    	let t53;
    	let t54;
    	let button;
    	let t56;
    	let span51;
    	let span52;
    	let span53;
    	let span54;
    	let span55;
    	let span56;
    	let span57;
    	let span58;
    	let span59;
    	let span60;
    	let span61;
    	let span62;
    	let span63;
    	let span64;
    	let span65;
    	let span66;
    	let span67;
    	let span68;
    	let span69;
    	let span70;
    	let span71;
    	let span72;
    	let span73;
    	let span74;
    	let span75;
    	let span76;
    	let span77;
    	let span78;
    	let span79;
    	let span80;
    	let span81;
    	let span82;
    	let span83;
    	let span84;
    	let span85;
    	let span86;
    	let span87;
    	let span88;
    	let span89;
    	let span90;
    	let span91;
    	let span92;
    	let span93;
    	let span94;
    	let span95;
    	let span96;
    	let span97;
    	let span98;
    	let span99;
    	let span100;
    	let span101;
    	let t107;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*subtreeDepth*/ ctx[1] > 0 && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			t0 = text(/*prop*/ ctx[2]);
    			t1 = space();
    			span0 = element("span");
    			span0.textContent = "-";
    			span1 = element("span");
    			span1.textContent = "-";
    			span2 = element("span");
    			span2.textContent = "-";
    			span3 = element("span");
    			span3.textContent = "-";
    			span4 = element("span");
    			span4.textContent = "-";
    			span5 = element("span");
    			span5.textContent = "-";
    			span6 = element("span");
    			span6.textContent = "-";
    			span7 = element("span");
    			span7.textContent = "-";
    			span8 = element("span");
    			span8.textContent = "-";
    			span9 = element("span");
    			span9.textContent = "-";
    			span10 = element("span");
    			span10.textContent = "-";
    			span11 = element("span");
    			span11.textContent = "-";
    			span12 = element("span");
    			span12.textContent = "-";
    			span13 = element("span");
    			span13.textContent = "-";
    			span14 = element("span");
    			span14.textContent = "-";
    			span15 = element("span");
    			span15.textContent = "-";
    			span16 = element("span");
    			span16.textContent = "-";
    			span17 = element("span");
    			span17.textContent = "-";
    			span18 = element("span");
    			span18.textContent = "-";
    			span19 = element("span");
    			span19.textContent = "-";
    			span20 = element("span");
    			span20.textContent = "-";
    			span21 = element("span");
    			span21.textContent = "-";
    			span22 = element("span");
    			span22.textContent = "-";
    			span23 = element("span");
    			span23.textContent = "-";
    			span24 = element("span");
    			span24.textContent = "-";
    			span25 = element("span");
    			span25.textContent = "-";
    			span26 = element("span");
    			span26.textContent = "-";
    			span27 = element("span");
    			span27.textContent = "-";
    			span28 = element("span");
    			span28.textContent = "-";
    			span29 = element("span");
    			span29.textContent = "-";
    			span30 = element("span");
    			span30.textContent = "-";
    			span31 = element("span");
    			span31.textContent = "-";
    			span32 = element("span");
    			span32.textContent = "-";
    			span33 = element("span");
    			span33.textContent = "-";
    			span34 = element("span");
    			span34.textContent = "-";
    			span35 = element("span");
    			span35.textContent = "-";
    			span36 = element("span");
    			span36.textContent = "-";
    			span37 = element("span");
    			span37.textContent = "-";
    			span38 = element("span");
    			span38.textContent = "-";
    			span39 = element("span");
    			span39.textContent = "-";
    			span40 = element("span");
    			span40.textContent = "-";
    			span41 = element("span");
    			span41.textContent = "-";
    			span42 = element("span");
    			span42.textContent = "-";
    			span43 = element("span");
    			span43.textContent = "-";
    			span44 = element("span");
    			span44.textContent = "-";
    			span45 = element("span");
    			span45.textContent = "-";
    			span46 = element("span");
    			span46.textContent = "-";
    			span47 = element("span");
    			span47.textContent = "-";
    			span48 = element("span");
    			span48.textContent = "-";
    			span49 = element("span");
    			span49.textContent = "-";
    			span50 = element("span");
    			t52 = space();
    			div0 = element("div");
    			t53 = text(/*count*/ ctx[3]);
    			t54 = space();
    			button = element("button");
    			button.textContent = "Update leaf";
    			t56 = space();
    			span51 = element("span");
    			span51.textContent = "-";
    			span52 = element("span");
    			span52.textContent = "-";
    			span53 = element("span");
    			span53.textContent = "-";
    			span54 = element("span");
    			span54.textContent = "-";
    			span55 = element("span");
    			span55.textContent = "-";
    			span56 = element("span");
    			span56.textContent = "-";
    			span57 = element("span");
    			span57.textContent = "-";
    			span58 = element("span");
    			span58.textContent = "-";
    			span59 = element("span");
    			span59.textContent = "-";
    			span60 = element("span");
    			span60.textContent = "-";
    			span61 = element("span");
    			span61.textContent = "-";
    			span62 = element("span");
    			span62.textContent = "-";
    			span63 = element("span");
    			span63.textContent = "-";
    			span64 = element("span");
    			span64.textContent = "-";
    			span65 = element("span");
    			span65.textContent = "-";
    			span66 = element("span");
    			span66.textContent = "-";
    			span67 = element("span");
    			span67.textContent = "-";
    			span68 = element("span");
    			span68.textContent = "-";
    			span69 = element("span");
    			span69.textContent = "-";
    			span70 = element("span");
    			span70.textContent = "-";
    			span71 = element("span");
    			span71.textContent = "-";
    			span72 = element("span");
    			span72.textContent = "-";
    			span73 = element("span");
    			span73.textContent = "-";
    			span74 = element("span");
    			span74.textContent = "-";
    			span75 = element("span");
    			span75.textContent = "-";
    			span76 = element("span");
    			span76.textContent = "-";
    			span77 = element("span");
    			span77.textContent = "-";
    			span78 = element("span");
    			span78.textContent = "-";
    			span79 = element("span");
    			span79.textContent = "-";
    			span80 = element("span");
    			span80.textContent = "-";
    			span81 = element("span");
    			span81.textContent = "-";
    			span82 = element("span");
    			span82.textContent = "-";
    			span83 = element("span");
    			span83.textContent = "-";
    			span84 = element("span");
    			span84.textContent = "-";
    			span85 = element("span");
    			span85.textContent = "-";
    			span86 = element("span");
    			span86.textContent = "-";
    			span87 = element("span");
    			span87.textContent = "-";
    			span88 = element("span");
    			span88.textContent = "-";
    			span89 = element("span");
    			span89.textContent = "-";
    			span90 = element("span");
    			span90.textContent = "-";
    			span91 = element("span");
    			span91.textContent = "-";
    			span92 = element("span");
    			span92.textContent = "-";
    			span93 = element("span");
    			span93.textContent = "-";
    			span94 = element("span");
    			span94.textContent = "-";
    			span95 = element("span");
    			span95.textContent = "-";
    			span96 = element("span");
    			span96.textContent = "-";
    			span97 = element("span");
    			span97.textContent = "-";
    			span98 = element("span");
    			span98.textContent = "-";
    			span99 = element("span");
    			span99.textContent = "-";
    			span100 = element("span");
    			span100.textContent = "-";
    			span101 = element("span");
    			t107 = space();
    			if (if_block) if_block.c();
    			add_location(span0, file$b, 14, 2, 177);
    			add_location(span1, file$b, 14, 16, 191);
    			add_location(span2, file$b, 14, 30, 205);
    			add_location(span3, file$b, 14, 44, 219);
    			add_location(span4, file$b, 14, 58, 233);
    			add_location(span5, file$b, 14, 72, 247);
    			add_location(span6, file$b, 16, 3, 269);
    			add_location(span7, file$b, 16, 17, 283);
    			add_location(span8, file$b, 16, 31, 297);
    			add_location(span9, file$b, 16, 45, 311);
    			add_location(span10, file$b, 16, 59, 325);
    			add_location(span11, file$b, 16, 73, 339);
    			add_location(span12, file$b, 18, 3, 361);
    			add_location(span13, file$b, 18, 17, 375);
    			add_location(span14, file$b, 18, 31, 389);
    			add_location(span15, file$b, 18, 45, 403);
    			add_location(span16, file$b, 18, 59, 417);
    			add_location(span17, file$b, 18, 73, 431);
    			add_location(span18, file$b, 20, 3, 453);
    			add_location(span19, file$b, 20, 17, 467);
    			add_location(span20, file$b, 20, 31, 481);
    			add_location(span21, file$b, 20, 45, 495);
    			add_location(span22, file$b, 20, 59, 509);
    			add_location(span23, file$b, 20, 73, 523);
    			add_location(span24, file$b, 22, 3, 545);
    			add_location(span25, file$b, 22, 17, 559);
    			add_location(span26, file$b, 22, 31, 573);
    			add_location(span27, file$b, 22, 45, 587);
    			add_location(span28, file$b, 22, 59, 601);
    			add_location(span29, file$b, 22, 73, 615);
    			add_location(span30, file$b, 24, 3, 637);
    			add_location(span31, file$b, 24, 17, 651);
    			add_location(span32, file$b, 24, 31, 665);
    			add_location(span33, file$b, 24, 45, 679);
    			add_location(span34, file$b, 24, 59, 693);
    			add_location(span35, file$b, 24, 73, 707);
    			add_location(span36, file$b, 26, 3, 729);
    			add_location(span37, file$b, 26, 17, 743);
    			add_location(span38, file$b, 26, 31, 757);
    			add_location(span39, file$b, 26, 45, 771);
    			add_location(span40, file$b, 26, 59, 785);
    			add_location(span41, file$b, 26, 73, 799);
    			add_location(span42, file$b, 28, 3, 821);
    			add_location(span43, file$b, 28, 17, 835);
    			add_location(span44, file$b, 28, 31, 849);
    			add_location(span45, file$b, 28, 45, 863);
    			add_location(span46, file$b, 28, 59, 877);
    			add_location(span47, file$b, 28, 73, 891);
    			add_location(span48, file$b, 30, 3, 913);
    			add_location(span49, file$b, 30, 17, 927);
    			add_location(span50, file$b, 30, 31, 941);
    			attr_dev(button, "class", "btn-increment-node");
    			add_location(button, file$b, 33, 4, 974);
    			add_location(div0, file$b, 31, 2, 952);
    			add_location(span51, file$b, 35, 2, 1062);
    			add_location(span52, file$b, 35, 16, 1076);
    			add_location(span53, file$b, 35, 30, 1090);
    			add_location(span54, file$b, 35, 44, 1104);
    			add_location(span55, file$b, 35, 58, 1118);
    			add_location(span56, file$b, 35, 72, 1132);
    			add_location(span57, file$b, 37, 3, 1154);
    			add_location(span58, file$b, 37, 17, 1168);
    			add_location(span59, file$b, 37, 31, 1182);
    			add_location(span60, file$b, 37, 45, 1196);
    			add_location(span61, file$b, 37, 59, 1210);
    			add_location(span62, file$b, 37, 73, 1224);
    			add_location(span63, file$b, 39, 3, 1246);
    			add_location(span64, file$b, 39, 17, 1260);
    			add_location(span65, file$b, 39, 31, 1274);
    			add_location(span66, file$b, 39, 45, 1288);
    			add_location(span67, file$b, 39, 59, 1302);
    			add_location(span68, file$b, 39, 73, 1316);
    			add_location(span69, file$b, 41, 3, 1338);
    			add_location(span70, file$b, 41, 17, 1352);
    			add_location(span71, file$b, 41, 31, 1366);
    			add_location(span72, file$b, 41, 45, 1380);
    			add_location(span73, file$b, 41, 59, 1394);
    			add_location(span74, file$b, 41, 73, 1408);
    			add_location(span75, file$b, 43, 3, 1430);
    			add_location(span76, file$b, 43, 17, 1444);
    			add_location(span77, file$b, 43, 31, 1458);
    			add_location(span78, file$b, 43, 45, 1472);
    			add_location(span79, file$b, 43, 59, 1486);
    			add_location(span80, file$b, 43, 73, 1500);
    			add_location(span81, file$b, 45, 3, 1522);
    			add_location(span82, file$b, 45, 17, 1536);
    			add_location(span83, file$b, 45, 31, 1550);
    			add_location(span84, file$b, 45, 45, 1564);
    			add_location(span85, file$b, 45, 59, 1578);
    			add_location(span86, file$b, 45, 73, 1592);
    			add_location(span87, file$b, 47, 3, 1614);
    			add_location(span88, file$b, 47, 17, 1628);
    			add_location(span89, file$b, 47, 31, 1642);
    			add_location(span90, file$b, 47, 45, 1656);
    			add_location(span91, file$b, 47, 59, 1670);
    			add_location(span92, file$b, 47, 73, 1684);
    			add_location(span93, file$b, 49, 3, 1706);
    			add_location(span94, file$b, 49, 17, 1720);
    			add_location(span95, file$b, 49, 31, 1734);
    			add_location(span96, file$b, 49, 45, 1748);
    			add_location(span97, file$b, 49, 59, 1762);
    			add_location(span98, file$b, 49, 73, 1776);
    			add_location(span99, file$b, 51, 3, 1798);
    			add_location(span100, file$b, 51, 17, 1812);
    			add_location(span101, file$b, 51, 31, 1826);
    			add_location(div1, file$b, 12, 0, 160);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, t0);
    			append_dev(div1, t1);
    			append_dev(div1, span0);
    			append_dev(div1, span1);
    			append_dev(div1, span2);
    			append_dev(div1, span3);
    			append_dev(div1, span4);
    			append_dev(div1, span5);
    			append_dev(div1, span6);
    			append_dev(div1, span7);
    			append_dev(div1, span8);
    			append_dev(div1, span9);
    			append_dev(div1, span10);
    			append_dev(div1, span11);
    			append_dev(div1, span12);
    			append_dev(div1, span13);
    			append_dev(div1, span14);
    			append_dev(div1, span15);
    			append_dev(div1, span16);
    			append_dev(div1, span17);
    			append_dev(div1, span18);
    			append_dev(div1, span19);
    			append_dev(div1, span20);
    			append_dev(div1, span21);
    			append_dev(div1, span22);
    			append_dev(div1, span23);
    			append_dev(div1, span24);
    			append_dev(div1, span25);
    			append_dev(div1, span26);
    			append_dev(div1, span27);
    			append_dev(div1, span28);
    			append_dev(div1, span29);
    			append_dev(div1, span30);
    			append_dev(div1, span31);
    			append_dev(div1, span32);
    			append_dev(div1, span33);
    			append_dev(div1, span34);
    			append_dev(div1, span35);
    			append_dev(div1, span36);
    			append_dev(div1, span37);
    			append_dev(div1, span38);
    			append_dev(div1, span39);
    			append_dev(div1, span40);
    			append_dev(div1, span41);
    			append_dev(div1, span42);
    			append_dev(div1, span43);
    			append_dev(div1, span44);
    			append_dev(div1, span45);
    			append_dev(div1, span46);
    			append_dev(div1, span47);
    			append_dev(div1, span48);
    			append_dev(div1, span49);
    			append_dev(div1, span50);
    			append_dev(div1, t52);
    			append_dev(div1, div0);
    			append_dev(div0, t53);
    			append_dev(div0, t54);
    			append_dev(div0, button);
    			append_dev(div1, t56);
    			append_dev(div1, span51);
    			append_dev(div1, span52);
    			append_dev(div1, span53);
    			append_dev(div1, span54);
    			append_dev(div1, span55);
    			append_dev(div1, span56);
    			append_dev(div1, span57);
    			append_dev(div1, span58);
    			append_dev(div1, span59);
    			append_dev(div1, span60);
    			append_dev(div1, span61);
    			append_dev(div1, span62);
    			append_dev(div1, span63);
    			append_dev(div1, span64);
    			append_dev(div1, span65);
    			append_dev(div1, span66);
    			append_dev(div1, span67);
    			append_dev(div1, span68);
    			append_dev(div1, span69);
    			append_dev(div1, span70);
    			append_dev(div1, span71);
    			append_dev(div1, span72);
    			append_dev(div1, span73);
    			append_dev(div1, span74);
    			append_dev(div1, span75);
    			append_dev(div1, span76);
    			append_dev(div1, span77);
    			append_dev(div1, span78);
    			append_dev(div1, span79);
    			append_dev(div1, span80);
    			append_dev(div1, span81);
    			append_dev(div1, span82);
    			append_dev(div1, span83);
    			append_dev(div1, span84);
    			append_dev(div1, span85);
    			append_dev(div1, span86);
    			append_dev(div1, span87);
    			append_dev(div1, span88);
    			append_dev(div1, span89);
    			append_dev(div1, span90);
    			append_dev(div1, span91);
    			append_dev(div1, span92);
    			append_dev(div1, span93);
    			append_dev(div1, span94);
    			append_dev(div1, span95);
    			append_dev(div1, span96);
    			append_dev(div1, span97);
    			append_dev(div1, span98);
    			append_dev(div1, span99);
    			append_dev(div1, span100);
    			append_dev(div1, span101);
    			append_dev(div1, t107);
    			if (if_block) if_block.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*increment*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*prop*/ 4) set_data_dev(t0, /*prop*/ ctx[2]);
    			if (!current || dirty & /*count*/ 8) set_data_dev(t53, /*count*/ ctx[3]);

    			if (/*subtreeDepth*/ ctx[1] > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*subtreeDepth*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Node", slots, []);
    	let { branchingFactor } = $$props;
    	let { subtreeDepth } = $$props;
    	let { prop } = $$props;
    	let count = 0;

    	function increment() {
    		$$invalidate(3, count += 1);
    	}

    	const writable_props = ["branchingFactor", "subtreeDepth", "prop"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Node> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("branchingFactor" in $$props) $$invalidate(0, branchingFactor = $$props.branchingFactor);
    		if ("subtreeDepth" in $$props) $$invalidate(1, subtreeDepth = $$props.subtreeDepth);
    		if ("prop" in $$props) $$invalidate(2, prop = $$props.prop);
    	};

    	$$self.$capture_state = () => ({
    		branchingFactor,
    		subtreeDepth,
    		prop,
    		count,
    		increment
    	});

    	$$self.$inject_state = $$props => {
    		if ("branchingFactor" in $$props) $$invalidate(0, branchingFactor = $$props.branchingFactor);
    		if ("subtreeDepth" in $$props) $$invalidate(1, subtreeDepth = $$props.subtreeDepth);
    		if ("prop" in $$props) $$invalidate(2, prop = $$props.prop);
    		if ("count" in $$props) $$invalidate(3, count = $$props.count);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [branchingFactor, subtreeDepth, prop, count, increment];
    }

    class Node$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
    			branchingFactor: 0,
    			subtreeDepth: 1,
    			prop: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Node",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*branchingFactor*/ ctx[0] === undefined && !("branchingFactor" in props)) {
    			console.warn("<Node> was created without expected prop 'branchingFactor'");
    		}

    		if (/*subtreeDepth*/ ctx[1] === undefined && !("subtreeDepth" in props)) {
    			console.warn("<Node> was created without expected prop 'subtreeDepth'");
    		}

    		if (/*prop*/ ctx[2] === undefined && !("prop" in props)) {
    			console.warn("<Node> was created without expected prop 'prop'");
    		}
    	}

    	get branchingFactor() {
    		throw new Error("<Node>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set branchingFactor(value) {
    		throw new Error("<Node>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get subtreeDepth() {
    		throw new Error("<Node>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subtreeDepth(value) {
    		throw new Error("<Node>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get prop() {
    		throw new Error("<Node>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set prop(value) {
    		throw new Error("<Node>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/scenario-5/Scenario5.svelte generated by Svelte v3.35.0 */
    const file$c = "src/scenario-5/Scenario5.svelte";

    function get_each_context$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	return child_ctx;
    }

    // (44:2) {#if initialized}
    function create_if_block$5(ctx) {
    	let div;
    	let current;
    	let each_value = Array(/*branchingFactor*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(div, file$c, 44, 4, 1071);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*branchingFactor, treeDepth, prop*/ 19) {
    				each_value = Array(/*branchingFactor*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$8(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$8(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(44:2) {#if initialized}",
    		ctx
    	});

    	return block;
    }

    // (46:6) {#each Array(branchingFactor) as _}
    function create_each_block$8(ctx) {
    	let node;
    	let current;

    	node = new Node$1({
    			props: {
    				branchingFactor: /*branchingFactor*/ ctx[0],
    				subtreeDepth: /*treeDepth*/ ctx[1] - 1,
    				prop: /*prop*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(node, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node_changes = {};
    			if (dirty & /*branchingFactor*/ 1) node_changes.branchingFactor = /*branchingFactor*/ ctx[0];
    			if (dirty & /*treeDepth*/ 2) node_changes.subtreeDepth = /*treeDepth*/ ctx[1] - 1;
    			if (dirty & /*prop*/ 16) node_changes.prop = /*prop*/ ctx[4];
    			node.$set(node_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$8.name,
    		type: "each",
    		source: "(46:6) {#each Array(branchingFactor) as _}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let div1;
    	let label0;
    	let t1;
    	let input0;
    	let t2;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let button0;
    	let t7;
    	let div0;
    	let t8;
    	let t9;
    	let button1;
    	let t11;
    	let button2;
    	let t13;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*initialized*/ ctx[2] && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			label0 = element("label");
    			label0.textContent = "Select branching factor";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			label1 = element("label");
    			label1.textContent = "Select tree depth";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			button0 = element("button");
    			button0.textContent = "Generate tree";
    			t7 = space();
    			div0 = element("div");
    			t8 = text(/*count*/ ctx[3]);
    			t9 = space();
    			button1 = element("button");
    			button1.textContent = "Update root";
    			t11 = space();
    			button2 = element("button");
    			button2.textContent = "Update entire tree";
    			t13 = space();
    			if (if_block) if_block.c();
    			add_location(label0, file$c, 27, 2, 512);
    			attr_dev(input0, "id", "input-branching-factor");
    			attr_dev(input0, ":value", "branchingFactor");
    			add_location(input0, file$c, 28, 2, 553);
    			add_location(label1, file$c, 33, 2, 668);
    			attr_dev(input1, "id", "input-tree-depth");
    			attr_dev(input1, ":value", "treeDepth");
    			add_location(input1, file$c, 34, 2, 703);
    			attr_dev(button0, "id", "btn-generate");
    			add_location(button0, file$c, 39, 2, 800);
    			add_location(div0, file$c, 40, 2, 871);
    			attr_dev(button1, "id", "btn-increment-root");
    			add_location(button1, file$c, 41, 2, 892);
    			attr_dev(button2, "id", "btn-update-tree");
    			add_location(button2, file$c, 42, 2, 968);
    			add_location(div1, file$c, 26, 0, 504);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, label0);
    			append_dev(div1, t1);
    			append_dev(div1, input0);
    			append_dev(div1, t2);
    			append_dev(div1, label1);
    			append_dev(div1, t4);
    			append_dev(div1, input1);
    			append_dev(div1, t5);
    			append_dev(div1, button0);
    			append_dev(div1, t7);
    			append_dev(div1, div0);
    			append_dev(div0, t8);
    			append_dev(div1, t9);
    			append_dev(div1, button1);
    			append_dev(div1, t11);
    			append_dev(div1, button2);
    			append_dev(div1, t13);
    			if (if_block) if_block.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*onUpdateBranchingFactor*/ ctx[5], false, false, false),
    					listen_dev(input1, "change", /*onUpdateTreeDepth*/ ctx[6], false, false, false),
    					listen_dev(button0, "click", /*generate*/ ctx[7], false, false, false),
    					listen_dev(button1, "click", /*increment*/ ctx[8], false, false, false),
    					listen_dev(button2, "click", /*updateTree*/ ctx[9], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*count*/ 8) set_data_dev(t8, /*count*/ ctx[3]);

    			if (/*initialized*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*initialized*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Scenario5", slots, []);
    	let branchingFactor = 0;
    	let treeDepth = 0;
    	let initialized = false;
    	let count = 0;
    	let prop = 0;

    	function onUpdateBranchingFactor(event) {
    		$$invalidate(0, branchingFactor = parseInt(event.target.value, 10));
    	}

    	function onUpdateTreeDepth(event) {
    		$$invalidate(1, treeDepth = parseInt(event.target.value, 10));
    	}

    	function generate() {
    		$$invalidate(2, initialized = true);
    	}

    	function increment() {
    		$$invalidate(3, count += 1);
    	}

    	function updateTree() {
    		$$invalidate(4, prop += 1);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Scenario5> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Node: Node$1,
    		branchingFactor,
    		treeDepth,
    		initialized,
    		count,
    		prop,
    		onUpdateBranchingFactor,
    		onUpdateTreeDepth,
    		generate,
    		increment,
    		updateTree
    	});

    	$$self.$inject_state = $$props => {
    		if ("branchingFactor" in $$props) $$invalidate(0, branchingFactor = $$props.branchingFactor);
    		if ("treeDepth" in $$props) $$invalidate(1, treeDepth = $$props.treeDepth);
    		if ("initialized" in $$props) $$invalidate(2, initialized = $$props.initialized);
    		if ("count" in $$props) $$invalidate(3, count = $$props.count);
    		if ("prop" in $$props) $$invalidate(4, prop = $$props.prop);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		branchingFactor,
    		treeDepth,
    		initialized,
    		count,
    		prop,
    		onUpdateBranchingFactor,
    		onUpdateTreeDepth,
    		generate,
    		increment,
    		updateTree
    	];
    }

    class Scenario5 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scenario5",
    			options,
    			id: create_fragment$c.name
    		});
    	}
    }

    /* src/scenario-6/Node.svelte generated by Svelte v3.35.0 */

    const file$d = "src/scenario-6/Node.svelte";

    function get_each_context$9(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	child_ctx[10] = i;
    	return child_ctx;
    }

    // (13:2) {#each items as item, i (i)}
    function create_each_block_1$2(key_1, ctx) {
    	let div;
    	let span0;
    	let t0_value = /*item*/ ctx[8].value0 + "";
    	let t0;
    	let span1;
    	let t1_value = /*item*/ ctx[8].value1 + "";
    	let t1;
    	let span2;
    	let t2_value = /*item*/ ctx[8].value2 + "";
    	let t2;
    	let span3;
    	let t3_value = /*item*/ ctx[8].value3 + "";
    	let t3;
    	let span4;
    	let t4_value = /*item*/ ctx[8].value4 + "";
    	let t4;
    	let span5;
    	let t5_value = /*item*/ ctx[8].value5 + "";
    	let t5;
    	let span6;
    	let t6_value = /*item*/ ctx[8].value6 + "";
    	let t6;
    	let span7;
    	let t7_value = /*item*/ ctx[8].value7 + "";
    	let t7;
    	let span8;
    	let t8_value = /*item*/ ctx[8].value8 + "";
    	let t8;
    	let span9;
    	let t9_value = /*item*/ ctx[8].value9 + "";
    	let t9;
    	let div_key_value;

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			div = element("div");
    			span0 = element("span");
    			t0 = text(t0_value);
    			span1 = element("span");
    			t1 = text(t1_value);
    			span2 = element("span");
    			t2 = text(t2_value);
    			span3 = element("span");
    			t3 = text(t3_value);
    			span4 = element("span");
    			t4 = text(t4_value);
    			span5 = element("span");
    			t5 = text(t5_value);
    			span6 = element("span");
    			t6 = text(t6_value);
    			span7 = element("span");
    			t7 = text(t7_value);
    			span8 = element("span");
    			t8 = text(t8_value);
    			span9 = element("span");
    			t9 = text(t9_value);
    			add_location(span0, file$d, 14, 6, 221);
    			add_location(span1, file$d, 14, 32, 247);
    			add_location(span2, file$d, 14, 58, 273);
    			add_location(span3, file$d, 16, 7, 315);
    			add_location(span4, file$d, 16, 33, 341);
    			add_location(span5, file$d, 16, 59, 367);
    			add_location(span6, file$d, 18, 7, 409);
    			add_location(span7, file$d, 18, 33, 435);
    			add_location(span8, file$d, 18, 59, 461);
    			add_location(span9, file$d, 20, 7, 503);
    			attr_dev(div, "key", div_key_value = /*i*/ ctx[10]);
    			add_location(div, file$d, 13, 4, 201);
    			this.first = div;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, span0);
    			append_dev(span0, t0);
    			append_dev(div, span1);
    			append_dev(span1, t1);
    			append_dev(div, span2);
    			append_dev(span2, t2);
    			append_dev(div, span3);
    			append_dev(span3, t3);
    			append_dev(div, span4);
    			append_dev(span4, t4);
    			append_dev(div, span5);
    			append_dev(span5, t5);
    			append_dev(div, span6);
    			append_dev(span6, t6);
    			append_dev(div, span7);
    			append_dev(span7, t7);
    			append_dev(div, span8);
    			append_dev(span8, t8);
    			append_dev(div, span9);
    			append_dev(span9, t9);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*items*/ 4 && t0_value !== (t0_value = /*item*/ ctx[8].value0 + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*items*/ 4 && t1_value !== (t1_value = /*item*/ ctx[8].value1 + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*items*/ 4 && t2_value !== (t2_value = /*item*/ ctx[8].value2 + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*items*/ 4 && t3_value !== (t3_value = /*item*/ ctx[8].value3 + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*items*/ 4 && t4_value !== (t4_value = /*item*/ ctx[8].value4 + "")) set_data_dev(t4, t4_value);
    			if (dirty & /*items*/ 4 && t5_value !== (t5_value = /*item*/ ctx[8].value5 + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*items*/ 4 && t6_value !== (t6_value = /*item*/ ctx[8].value6 + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*items*/ 4 && t7_value !== (t7_value = /*item*/ ctx[8].value7 + "")) set_data_dev(t7, t7_value);
    			if (dirty & /*items*/ 4 && t8_value !== (t8_value = /*item*/ ctx[8].value8 + "")) set_data_dev(t8, t8_value);
    			if (dirty & /*items*/ 4 && t9_value !== (t9_value = /*item*/ ctx[8].value9 + "")) set_data_dev(t9, t9_value);

    			if (dirty & /*items*/ 4 && div_key_value !== (div_key_value = /*i*/ ctx[10])) {
    				attr_dev(div, "key", div_key_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(13:2) {#each items as item, i (i)}",
    		ctx
    	});

    	return block;
    }

    // (28:2) {#if subtreeDepth > 0}
    function create_if_block$6(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = Array(/*branchingFactor*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*subtreeDepth, branchingFactor, items*/ 7) {
    				each_value = Array(/*branchingFactor*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$9(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$9(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(28:2) {#if subtreeDepth > 0}",
    		ctx
    	});

    	return block;
    }

    // (29:4) {#each Array(branchingFactor) as _}
    function create_each_block$9(ctx) {
    	let node;
    	let current;

    	node = new Node$2({
    			props: {
    				subtreeDepth: /*subtreeDepth*/ ctx[1] - 1,
    				branchingFactor: /*branchingFactor*/ ctx[0],
    				items: /*items*/ ctx[2]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(node, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node_changes = {};
    			if (dirty & /*subtreeDepth*/ 2) node_changes.subtreeDepth = /*subtreeDepth*/ ctx[1] - 1;
    			if (dirty & /*branchingFactor*/ 1) node_changes.branchingFactor = /*branchingFactor*/ ctx[0];
    			if (dirty & /*items*/ 4) node_changes.items = /*items*/ ctx[2];
    			node.$set(node_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$9.name,
    		type: "each",
    		source: "(29:4) {#each Array(branchingFactor) as _}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let div1;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t0;
    	let div0;
    	let t1;
    	let t2;
    	let button;
    	let t4;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*items*/ ctx[2];
    	validate_each_argument(each_value_1);
    	const get_key = ctx => /*i*/ ctx[10];
    	validate_each_keys(ctx, each_value_1, get_each_context_1$2, get_key);

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		let child_ctx = get_each_context_1$2(ctx, each_value_1, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block_1$2(key, child_ctx));
    	}

    	let if_block = /*subtreeDepth*/ ctx[1] > 0 && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			div0 = element("div");
    			t1 = text(/*count*/ ctx[3]);
    			t2 = space();
    			button = element("button");
    			button.textContent = "Update leaf";
    			t4 = space();
    			if (if_block) if_block.c();
    			attr_dev(button, "class", "btn-increment-leaf");
    			add_location(button, file$d, 25, 4, 575);
    			add_location(div0, file$d, 23, 2, 553);
    			add_location(div1, file$d, 11, 0, 160);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, button);
    			append_dev(div1, t4);
    			if (if_block) if_block.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*increment*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*items*/ 4) {
    				each_value_1 = /*items*/ ctx[2];
    				validate_each_argument(each_value_1);
    				validate_each_keys(ctx, each_value_1, get_each_context_1$2, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, div1, destroy_block, create_each_block_1$2, t0, get_each_context_1$2);
    			}

    			if (!current || dirty & /*count*/ 8) set_data_dev(t1, /*count*/ ctx[3]);

    			if (/*subtreeDepth*/ ctx[1] > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*subtreeDepth*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Node", slots, []);
    	let { branchingFactor } = $$props;
    	let { subtreeDepth } = $$props;
    	let { items } = $$props;
    	let count = 0;

    	function increment() {
    		$$invalidate(3, count += 1);
    	}

    	const writable_props = ["branchingFactor", "subtreeDepth", "items"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Node> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("branchingFactor" in $$props) $$invalidate(0, branchingFactor = $$props.branchingFactor);
    		if ("subtreeDepth" in $$props) $$invalidate(1, subtreeDepth = $$props.subtreeDepth);
    		if ("items" in $$props) $$invalidate(2, items = $$props.items);
    	};

    	$$self.$capture_state = () => ({
    		branchingFactor,
    		subtreeDepth,
    		items,
    		count,
    		increment
    	});

    	$$self.$inject_state = $$props => {
    		if ("branchingFactor" in $$props) $$invalidate(0, branchingFactor = $$props.branchingFactor);
    		if ("subtreeDepth" in $$props) $$invalidate(1, subtreeDepth = $$props.subtreeDepth);
    		if ("items" in $$props) $$invalidate(2, items = $$props.items);
    		if ("count" in $$props) $$invalidate(3, count = $$props.count);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [branchingFactor, subtreeDepth, items, count, increment];
    }

    class Node$2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
    			branchingFactor: 0,
    			subtreeDepth: 1,
    			items: 2
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Node",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*branchingFactor*/ ctx[0] === undefined && !("branchingFactor" in props)) {
    			console.warn("<Node> was created without expected prop 'branchingFactor'");
    		}

    		if (/*subtreeDepth*/ ctx[1] === undefined && !("subtreeDepth" in props)) {
    			console.warn("<Node> was created without expected prop 'subtreeDepth'");
    		}

    		if (/*items*/ ctx[2] === undefined && !("items" in props)) {
    			console.warn("<Node> was created without expected prop 'items'");
    		}
    	}

    	get branchingFactor() {
    		throw new Error("<Node>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set branchingFactor(value) {
    		throw new Error("<Node>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get subtreeDepth() {
    		throw new Error("<Node>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set subtreeDepth(value) {
    		throw new Error("<Node>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get items() {
    		throw new Error("<Node>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set items(value) {
    		throw new Error("<Node>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/scenario-6/Scenario6.svelte generated by Svelte v3.35.0 */
    const file$e = "src/scenario-6/Scenario6.svelte";

    function get_each_context$a(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    // (53:2) {#if initialized}
    function create_if_block$7(ctx) {
    	let div;
    	let current;
    	let each_value = Array(/*branchingFactor*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$a(get_each_context$a(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(div, file$e, 53, 4, 1166);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*branchingFactor, treeDepth, items*/ 19) {
    				each_value = Array(/*branchingFactor*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$a(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$a(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(53:2) {#if initialized}",
    		ctx
    	});

    	return block;
    }

    // (55:6) {#each Array(branchingFactor) as _}
    function create_each_block$a(ctx) {
    	let node;
    	let current;

    	node = new Node$2({
    			props: {
    				branchingFactor: /*branchingFactor*/ ctx[0],
    				subtreeDepth: /*treeDepth*/ ctx[1] - 1,
    				items: /*items*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(node, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node_changes = {};
    			if (dirty & /*branchingFactor*/ 1) node_changes.branchingFactor = /*branchingFactor*/ ctx[0];
    			if (dirty & /*treeDepth*/ 2) node_changes.subtreeDepth = /*treeDepth*/ ctx[1] - 1;
    			node.$set(node_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$a.name,
    		type: "each",
    		source: "(55:6) {#each Array(branchingFactor) as _}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$e(ctx) {
    	let div1;
    	let label0;
    	let t1;
    	let input0;
    	let t2;
    	let label1;
    	let t4;
    	let input1;
    	let t5;
    	let button0;
    	let t7;
    	let div0;
    	let t8;
    	let t9;
    	let button1;
    	let t11;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*initialized*/ ctx[2] && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			label0 = element("label");
    			label0.textContent = "Select branching factor";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			label1 = element("label");
    			label1.textContent = "Select tree depth";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			button0 = element("button");
    			button0.textContent = "Generate tree";
    			t7 = space();
    			div0 = element("div");
    			t8 = text(/*count*/ ctx[3]);
    			t9 = space();
    			button1 = element("button");
    			button1.textContent = "Update root";
    			t11 = space();
    			if (if_block) if_block.c();
    			add_location(label0, file$e, 37, 2, 688);
    			attr_dev(input0, "id", "input-branching-factor");
    			attr_dev(input0, ":value", "branchingFactor");
    			add_location(input0, file$e, 38, 2, 729);
    			add_location(label1, file$e, 43, 2, 844);
    			attr_dev(input1, "id", "input-tree-depth");
    			attr_dev(input1, ":value", "treeDepth");
    			add_location(input1, file$e, 44, 2, 879);
    			attr_dev(button0, "id", "btn-generate");
    			add_location(button0, file$e, 49, 2, 976);
    			add_location(div0, file$e, 50, 2, 1047);
    			attr_dev(button1, "id", "btn-increment-root");
    			add_location(button1, file$e, 51, 2, 1068);
    			add_location(div1, file$e, 36, 0, 680);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, label0);
    			append_dev(div1, t1);
    			append_dev(div1, input0);
    			append_dev(div1, t2);
    			append_dev(div1, label1);
    			append_dev(div1, t4);
    			append_dev(div1, input1);
    			append_dev(div1, t5);
    			append_dev(div1, button0);
    			append_dev(div1, t7);
    			append_dev(div1, div0);
    			append_dev(div0, t8);
    			append_dev(div1, t9);
    			append_dev(div1, button1);
    			append_dev(div1, t11);
    			if (if_block) if_block.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "change", /*onUpdateBranchingFactor*/ ctx[5], false, false, false),
    					listen_dev(input1, "change", /*onUpdateTreeDepth*/ ctx[6], false, false, false),
    					listen_dev(button0, "click", /*generate*/ ctx[7], false, false, false),
    					listen_dev(button1, "click", /*increment*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*count*/ 8) set_data_dev(t8, /*count*/ ctx[3]);

    			if (/*initialized*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*initialized*/ 4) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$7(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Scenario6", slots, []);
    	let branchingFactor = 0;
    	let treeDepth = 0;
    	let initialized = false;
    	let count = 0;

    	let items = Array(10).fill(null).map(() => ({
    		value0: 0,
    		value1: 1,
    		value2: 2,
    		value3: 3,
    		value4: 4,
    		value5: 5,
    		value6: 6,
    		value7: 7,
    		value8: 8,
    		value9: 9
    	}));

    	function onUpdateBranchingFactor(event) {
    		$$invalidate(0, branchingFactor = parseInt(event.target.value, 10));
    	}

    	function onUpdateTreeDepth(event) {
    		$$invalidate(1, treeDepth = parseInt(event.target.value, 10));
    	}

    	function generate() {
    		$$invalidate(2, initialized = true);
    	}

    	function increment() {
    		$$invalidate(3, count += 1);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Scenario6> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Node: Node$2,
    		branchingFactor,
    		treeDepth,
    		initialized,
    		count,
    		items,
    		onUpdateBranchingFactor,
    		onUpdateTreeDepth,
    		generate,
    		increment
    	});

    	$$self.$inject_state = $$props => {
    		if ("branchingFactor" in $$props) $$invalidate(0, branchingFactor = $$props.branchingFactor);
    		if ("treeDepth" in $$props) $$invalidate(1, treeDepth = $$props.treeDepth);
    		if ("initialized" in $$props) $$invalidate(2, initialized = $$props.initialized);
    		if ("count" in $$props) $$invalidate(3, count = $$props.count);
    		if ("items" in $$props) $$invalidate(4, items = $$props.items);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		branchingFactor,
    		treeDepth,
    		initialized,
    		count,
    		items,
    		onUpdateBranchingFactor,
    		onUpdateTreeDepth,
    		generate,
    		increment
    	];
    }

    class Scenario6 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Scenario6",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.35.0 */
    const file$f = "src/App.svelte";

    // (83:4) {:else}
    function create_else_block$3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*scenarioComponent*/ ctx[1];

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*scenarioComponent*/ ctx[1])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(83:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (31:4) {#if selectedScenario == null}
    function create_if_block$8(ctx) {
    	let div7;
    	let h4;
    	let t1;
    	let div6;
    	let div0;
    	let label0;
    	let t3;
    	let button0;
    	let t5;
    	let div1;
    	let label1;
    	let t6;
    	let button1;
    	let t8;
    	let div2;
    	let label2;
    	let t9;
    	let button2;
    	let t11;
    	let div3;
    	let label3;
    	let t12;
    	let button3;
    	let t14;
    	let div4;
    	let label4;
    	let t15;
    	let button4;
    	let t17;
    	let div5;
    	let label5;
    	let t18;
    	let button5;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			h4 = element("h4");
    			h4.textContent = "Select scenario";
    			t1 = space();
    			div6 = element("div");
    			div0 = element("div");
    			label0 = element("label");
    			label0.textContent = "Scenario 1: Generate and delete components";
    			t3 = space();
    			button0 = element("button");
    			button0.textContent = "Select";
    			t5 = space();
    			div1 = element("div");
    			label1 = element("label");
    			t6 = text("Scenario 2: Update components in a flat DOM tree\n              ");
    			button1 = element("button");
    			button1.textContent = "Select";
    			t8 = space();
    			div2 = element("div");
    			label2 = element("label");
    			t9 = text("Scenario 3: Update components in a branching DOM tree\n              ");
    			button2 = element("button");
    			button2.textContent = "Select";
    			t11 = space();
    			div3 = element("div");
    			label3 = element("label");
    			t12 = text("Scenario 4: Update components containing mostly static content\n              ");
    			button3 = element("button");
    			button3.textContent = "Select";
    			t14 = space();
    			div4 = element("div");
    			label4 = element("label");
    			t15 = text("Scenario 5\n              ");
    			button4 = element("button");
    			button4.textContent = "Select";
    			t17 = space();
    			div5 = element("div");
    			label5 = element("label");
    			t18 = text("Scenario 6\n              ");
    			button5 = element("button");
    			button5.textContent = "Select";
    			add_location(h4, file$f, 32, 8, 862);
    			add_location(label0, file$f, 35, 12, 929);
    			attr_dev(button0, "id", "btn-scen-1");
    			add_location(button0, file$f, 36, 12, 1001);
    			add_location(div0, file$f, 34, 10, 911);
    			attr_dev(button1, "id", "btn-scen-2");
    			add_location(button1, file$f, 43, 14, 1234);
    			add_location(label1, file$f, 41, 12, 1149);
    			add_location(div1, file$f, 40, 10, 1131);
    			attr_dev(button2, "id", "btn-scen-3");
    			add_location(button2, file$f, 51, 14, 1497);
    			add_location(label2, file$f, 49, 12, 1407);
    			add_location(div2, file$f, 48, 10, 1389);
    			attr_dev(button3, "id", "btn-scen-4");
    			add_location(button3, file$f, 59, 14, 1769);
    			add_location(label3, file$f, 57, 12, 1670);
    			add_location(div3, file$f, 56, 10, 1652);
    			attr_dev(button4, "id", "btn-scen-5");
    			add_location(button4, file$f, 67, 14, 1989);
    			add_location(label4, file$f, 65, 12, 1942);
    			add_location(div4, file$f, 64, 10, 1924);
    			attr_dev(button5, "id", "btn-scen-6");
    			add_location(button5, file$f, 75, 14, 2209);
    			add_location(label5, file$f, 73, 12, 2162);
    			add_location(div5, file$f, 72, 10, 2144);
    			add_location(div6, file$f, 33, 8, 895);
    			add_location(div7, file$f, 31, 6, 848);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, h4);
    			append_dev(div7, t1);
    			append_dev(div7, div6);
    			append_dev(div6, div0);
    			append_dev(div0, label0);
    			append_dev(div0, t3);
    			append_dev(div0, button0);
    			append_dev(div6, t5);
    			append_dev(div6, div1);
    			append_dev(div1, label1);
    			append_dev(label1, t6);
    			append_dev(label1, button1);
    			append_dev(div6, t8);
    			append_dev(div6, div2);
    			append_dev(div2, label2);
    			append_dev(label2, t9);
    			append_dev(label2, button2);
    			append_dev(div6, t11);
    			append_dev(div6, div3);
    			append_dev(div3, label3);
    			append_dev(label3, t12);
    			append_dev(label3, button3);
    			append_dev(div6, t14);
    			append_dev(div6, div4);
    			append_dev(div4, label4);
    			append_dev(label4, t15);
    			append_dev(label4, button4);
    			append_dev(div6, t17);
    			append_dev(div6, div5);
    			append_dev(div5, label5);
    			append_dev(label5, t18);
    			append_dev(label5, button5);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[4], false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[5], false, false, false),
    					listen_dev(button3, "click", /*click_handler_3*/ ctx[6], false, false, false),
    					listen_dev(button4, "click", /*click_handler_4*/ ctx[7], false, false, false),
    					listen_dev(button5, "click", /*click_handler_5*/ ctx[8], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(31:4) {#if selectedScenario == null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$f(ctx) {
    	let main;
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$8, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*selectedScenario*/ ctx[0] == null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			if_block.c();
    			add_location(div, file$f, 29, 2, 801);
    			add_location(main, file$f, 28, 0, 792);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let scenarioComponent;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);

    	function selectScenario(value) {
    		$$invalidate(0, selectedScenario = value);
    	}

    	let selectedScenario = null;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => selectScenario(1);
    	const click_handler_1 = () => selectScenario(2);
    	const click_handler_2 = () => selectScenario(3);
    	const click_handler_3 = () => selectScenario(4);
    	const click_handler_4 = () => selectScenario(5);
    	const click_handler_5 = () => selectScenario(6);

    	$$self.$capture_state = () => ({
    		Scenario1,
    		Scenario2,
    		Scenario3,
    		Scenario4,
    		Scenario5,
    		Scenario6,
    		selectScenario,
    		selectedScenario,
    		scenarioComponent
    	});

    	$$self.$inject_state = $$props => {
    		if ("selectedScenario" in $$props) $$invalidate(0, selectedScenario = $$props.selectedScenario);
    		if ("scenarioComponent" in $$props) $$invalidate(1, scenarioComponent = $$props.scenarioComponent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*selectedScenario*/ 1) {
    			 $$invalidate(1, scenarioComponent = selectedScenario === 1
    			? Scenario1
    			: selectedScenario === 2
    				? Scenario2
    				: selectedScenario === 3
    					? Scenario3
    					: selectedScenario === 4
    						? Scenario4
    						: selectedScenario === 5
    							? Scenario5
    							: selectedScenario === 6 ? Scenario6 : null);
    		}
    	};

    	return [
    		selectedScenario,
    		scenarioComponent,
    		selectScenario,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		click_handler_3,
    		click_handler_4,
    		click_handler_5
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
