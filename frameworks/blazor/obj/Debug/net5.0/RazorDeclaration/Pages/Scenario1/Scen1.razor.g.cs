// <auto-generated/>
#pragma warning disable 1591
#pragma warning disable 0414
#pragma warning disable 0649
#pragma warning disable 0169

namespace blazor2.Pages.Scenario1
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
#nullable restore
#line 2 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario1/Scen1.razor"
using System.Collections;

#line default
#line hidden
#nullable disable
    [Microsoft.AspNetCore.Components.RouteAttribute("/scenario1")]
    public partial class Scen1 : Microsoft.AspNetCore.Components.ComponentBase
    {
        #pragma warning disable 1998
        protected override void BuildRenderTree(Microsoft.AspNetCore.Components.Rendering.RenderTreeBuilder __builder)
        {
        }
        #pragma warning restore 1998
#nullable restore
#line 44 "/home/risto/thesis2/frameworks/blazor/Pages/Scenario1/Scen1.razor"
       

    public struct Child {

      public Child(int id) {
        this.id = id;
      }
        public int id { get; set; }
    }

    int numChildren = 0;
    int childType = 1;

    ArrayList children = new ArrayList();
    ArrayList elements = new ArrayList();

    private void generateComponents() {
      for (var i = 0; i < numChildren; i += 1) {
        children.Add(new Child(i));
      }
    }

    private void generateElements() {
      for (var i = 0; i < numChildren; i += 1) {
        elements.Add(i);
      }
    }

    private void switchType() {
      this.childType = 2;
    }

    private void remove() {
      children.Clear();
    }

    private void addOne() {
      children.Add(new Child(children.Count));
        
    }


#line default
#line hidden
#nullable disable
    }
}
#pragma warning restore 1591
