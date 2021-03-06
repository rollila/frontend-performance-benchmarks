#pragma checksum "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "fb73086bdcafb80820525d0f6651cafa4c51ea95"
// <auto-generated/>
#pragma warning disable 1591
namespace blazor2.Pages.Scenario3
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
    public partial class Scen3 : Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
            __builder.OpenElement(0, "div");
            __builder.AddMarkupContent(1, "<label>Select branching factor</label>\n    ");
            __builder.OpenElement(2, "input");
            __builder.AddAttribute(3, "id", "input-branching-factor");
            __builder.AddAttribute(4, "type", "number");
            __builder.AddAttribute(5, "value", Microsoft.AspNetCore.Components.BindConverter.FormatValue(
#nullable restore
#line 6 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
             branchingFactor

#line default
#line hidden
#nullable disable
            , culture: global::System.Globalization.CultureInfo.InvariantCulture));
            __builder.AddAttribute(6, "onchange", Microsoft.AspNetCore.Components.EventCallback.Factory.CreateBinder(this, __value => branchingFactor = __value, branchingFactor, culture: global::System.Globalization.CultureInfo.InvariantCulture));
            __builder.SetUpdatesAttributeName("value");
            __builder.CloseElement();
            __builder.AddMarkupContent(7, "\n    ");
            __builder.AddMarkupContent(8, "<label>Select tree depth</label>\n    ");
            __builder.OpenElement(9, "input");
            __builder.AddAttribute(10, "id", "input-tree-depth");
            __builder.AddAttribute(11, "type", "number\'");
            __builder.AddAttribute(12, "value", Microsoft.AspNetCore.Components.BindConverter.FormatValue(
#nullable restore
#line 12 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
             treeDepth

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(13, "onchange", Microsoft.AspNetCore.Components.EventCallback.Factory.CreateBinder(this, __value => treeDepth = __value, treeDepth));
            __builder.SetUpdatesAttributeName("value");
            __builder.CloseElement();
            __builder.AddMarkupContent(14, "\n    ");
            __builder.OpenElement(15, "button");
            __builder.AddAttribute(16, "id", "btn-generate");
            __builder.AddAttribute(17, "onclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 14 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
                                        generate

#line default
#line hidden
#nullable disable
            ));
            __builder.AddContent(18, "Generate tree");
            __builder.CloseElement();
            __builder.AddMarkupContent(19, "\n    ");
            __builder.OpenElement(20, "button");
            __builder.AddAttribute(21, "id", "btn-generate-simple");
            __builder.AddAttribute(22, "onclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 15 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
                                               generateSimple

#line default
#line hidden
#nullable disable
            ));
            __builder.AddContent(23, "Generate simpler component tree");
            __builder.CloseElement();
            __builder.AddMarkupContent(24, "\n    ");
            __builder.OpenElement(25, "div");
            __builder.AddContent(26, 
#nullable restore
#line 16 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
          count

#line default
#line hidden
#nullable disable
            );
            __builder.CloseElement();
            __builder.AddMarkupContent(27, "\n    ");
            __builder.OpenElement(28, "button");
            __builder.AddAttribute(29, "id", "btn-increment-root");
            __builder.AddAttribute(30, "onclick", Microsoft.AspNetCore.Components.EventCallback.Factory.Create<Microsoft.AspNetCore.Components.Web.MouseEventArgs>(this, 
#nullable restore
#line 17 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
                                              increment

#line default
#line hidden
#nullable disable
            ));
            __builder.AddContent(31, "Update root");
            __builder.CloseElement();
#nullable restore
#line 18 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
     if(initialized) {

#line default
#line hidden
#nullable disable
            __builder.OpenElement(32, "div");
#nullable restore
#line 20 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
         if(nodeType == 1) {
            

#line default
#line hidden
#nullable disable
#nullable restore
#line 21 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
             for(int i = 0; i < branchingFactor; i += 1) {

#line default
#line hidden
#nullable disable
            __builder.OpenComponent<blazor2.Pages.Scenario3.Node>(33);
            __builder.AddAttribute(34, "BranchingFactor", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.Int32>(
#nullable restore
#line 22 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
                                                  branchingFactor

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(35, "SubtreeDepth", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.Int32>(
#nullable restore
#line 22 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
                                                                                  getSubtreeDepth()

#line default
#line hidden
#nullable disable
            ));
            __builder.SetKey(
#nullable restore
#line 22 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
                             i

#line default
#line hidden
#nullable disable
            );
            __builder.CloseComponent();
#nullable restore
#line 23 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
            }

#line default
#line hidden
#nullable disable
#nullable restore
#line 23 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
             
        }

#line default
#line hidden
#nullable disable
#nullable restore
#line 25 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
         if(nodeType == 2) {
            

#line default
#line hidden
#nullable disable
#nullable restore
#line 26 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
             for(int i = 0; i < branchingFactor; i += 1) {

#line default
#line hidden
#nullable disable
            __builder.OpenComponent<blazor2.Pages.Scenario3.Node2>(36);
            __builder.AddAttribute(37, "BranchingFactor", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.Int32>(
#nullable restore
#line 27 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
                                                   branchingFactor

#line default
#line hidden
#nullable disable
            ));
            __builder.AddAttribute(38, "SubtreeDepth", Microsoft.AspNetCore.Components.CompilerServices.RuntimeHelpers.TypeCheck<System.Int32>(
#nullable restore
#line 27 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
                                                                                   getSubtreeDepth()

#line default
#line hidden
#nullable disable
            ));
            __builder.SetKey(
#nullable restore
#line 27 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
                              i

#line default
#line hidden
#nullable disable
            );
            __builder.CloseComponent();
#nullable restore
#line 28 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
            }

#line default
#line hidden
#nullable disable
#nullable restore
#line 28 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
             
        }

#line default
#line hidden
#nullable disable
            __builder.CloseElement();
#nullable restore
#line 31 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
    }

#line default
#line hidden
#nullable disable
            __builder.CloseElement();
        }
        #pragma warning restore 1998
#nullable restore
#line 34 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario3/Scen3.razor"
       
    int branchingFactor =  0;
    int treeDepth =  0;
    bool initialized = false;
    int count =  0;
    int nodeType = 1;
    
    public void generate() {
        initialized = true;
    }

    public void generateSimple() {
        nodeType = 2;
        initialized = true;
    }

    public void increment() {
        count += 1;
    }

    public int getSubtreeDepth() {
        return treeDepth - 1;
    }


#line default
#line hidden
#nullable disable
    }
}
#pragma warning restore 1591
