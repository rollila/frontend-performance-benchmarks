#pragma checksum "/home/risto/thesis2/frameworks/blazor/Pages/Scenario4/Scen4.razor" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "bd3b2f77f295b303907e56850c02b5afa9025586"
// <auto-generated/>
#pragma warning disable 1591
namespace blazor2.Pages.Scenario4
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Components;
#nullable restore
#line 1 "/home/risto/thesis2/frameworks/blazor/_Imports.razor"
using System.Net.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "/home/risto/thesis2/frameworks/blazor/_Imports.razor"
using System.Net.Http.Json;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "/home/risto/thesis2/frameworks/blazor/_Imports.razor"
using Microsoft.AspNetCore.Components.Forms;

#line default
#line hidden
#nullable disable
#nullable restore
#line 4 "/home/risto/thesis2/frameworks/blazor/_Imports.razor"
using Microsoft.AspNetCore.Components.Routing;

#line default
#line hidden
#nullable disable
#nullable restore
#line 5 "/home/risto/thesis2/frameworks/blazor/_Imports.razor"
using Microsoft.AspNetCore.Components.Web;

#line default
#line hidden
#nullable disable
#nullable restore
#line 6 "/home/risto/thesis2/frameworks/blazor/_Imports.razor"
using Microsoft.AspNetCore.Components.Web.Virtualization;

#line default
#line hidden
#nullable disable
#nullable restore
#line 7 "/home/risto/thesis2/frameworks/blazor/_Imports.razor"
using Microsoft.AspNetCore.Components.WebAssembly.Http;

#line default
#line hidden
#nullable disable
#nullable restore
#line 8 "/home/risto/thesis2/frameworks/blazor/_Imports.razor"
using Microsoft.JSInterop;

#line default
#line hidden
#nullable disable
#nullable restore
#line 9 "/home/risto/thesis2/frameworks/blazor/_Imports.razor"
using blazor2;

#line default
#line hidden
#nullable disable
#nullable restore
#line 10 "/home/risto/thesis2/frameworks/blazor/_Imports.razor"
using blazor2.Shared;

#line default
#line hidden
#nullable disable
    public partial class Scen4 : Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenElement(0, "div");
            __builder.OpenElement(1, "div");
            __builder.AddMarkupContent(2, "<label>Number of components</label>\n      ");
            __builder.OpenElement(3, "input");
            __builder.AddAttribute(4, "id", "input-components");
            __builder.AddAttribute(5, "type", "number");
            __builder.AddAttribute(6, "min", "1");
            __builder.AddAttribute(7, "value", Microsoft.AspNetCore.Components.BindConverter.FormatValue(
#nullable restore
#line 8 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario4/Scen4.razor"
               numChildren

#line default
#line hidden
#nullable disable
            , culture: global::System.Globalization.CultureInfo.InvariantCulture));
            __builder.AddAttribute(8, "onchange", Microsoft.AspNetCore.Components.EventCallback.Factory.CreateBinder(this, __value => numChildren = __value, numChildren, culture: global::System.Globalization.CultureInfo.InvariantCulture));
            __builder.SetUpdatesAttributeName("value");
            __builder.CloseElement();
            __builder.AddMarkupContent(9, "\n      ");
            __builder.OpenElement(10, "button");
            __builder.AddAttribute(11, "id", "btn-generate");
            __builder.AddAttribute(12, "onclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 10 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario4/Scen4.razor"
                                          generate

#line default
#line hidden
#nullable disable
            ));
            __builder.AddMarkupContent(13, "\n        Generate\n      ");
            __builder.CloseElement();
            __builder.AddMarkupContent(14, "\n      ");
            __builder.OpenElement(15, "button");
            __builder.AddAttribute(16, "id", "btn-update");
            __builder.AddAttribute(17, "onclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 13 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario4/Scen4.razor"
                                        update

#line default
#line hidden
#nullable disable
            ));
            __builder.AddContent(18, "Update children");
            __builder.CloseElement();
            __builder.AddMarkupContent(19, "\n      ");
            __builder.OpenElement(20, "button");
            __builder.AddAttribute(21, "id", "btn-update-single");
            __builder.AddAttribute(22, "onclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 14 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario4/Scen4.razor"
                                               updateSingle

#line default
#line hidden
#nullable disable
            ));
            __builder.AddMarkupContent(23, "\n        Update single child\n      ");
            __builder.CloseElement();
            __builder.CloseElement();
#nullable restore
#line 18 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario4/Scen4.razor"
     foreach(Child c in children) {

#line default
#line hidden
#nullable disable
            __builder.OpenComponent<blazor2.Pages.Scenario4.Scen4Child>(24);
            __builder.AddAttribute(25, "Value", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.Int32>(
#nullable restore
#line 19 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario4/Scen4.razor"
                                        c.value

#line default
#line hidden
#nullable disable
            ));
            __builder.SetKey(
#nullable restore
#line 19 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario4/Scen4.razor"
                          c.id

#line default
#line hidden
#nullable disable
            );
            __builder.CloseComponent();
#nullable restore
#line 20 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario4/Scen4.razor"
    }    

#line default
#line hidden
#nullable disable
            __builder.CloseElement();
        }
        #pragma warning restore 1998
#nullable restore
#line 23 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario4/Scen4.razor"
       

    public class Child {
        public Child(int id, int value) {
            this.id = id;
            this.value = value;
        }
        public int id;
        public int value;

    }

    int numChildren = 0;

    List<Child> children = new List<Child>();

    public void generate() {
        for (int i=0; i<numChildren; i+=1) {
            children.Add(new Child(i, i));
        }
    }

    public void update() {
        foreach (Child child in children) {
            child.value += 1;
        }
    }

    public void updateSingle() {
        var rand = new Random();
        int i = rand.Next(numChildren);
        children[i].value += 1;
    }

#line default
#line hidden
#nullable disable
    }
}
#pragma warning restore 1591
