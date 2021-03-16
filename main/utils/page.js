// With Blazor, there is some delay before page is available after onload event
export const waitUntilLoaded = (client) => async (rootNodeId) => {
  await new Promise(async (resolve, reject) => {
    while (true) {
      try {
        const x = await client.DOM.querySelector({
          nodeId: rootNodeId,
          selector: "#btn-scen-1",
        });
        if (x.nodeId === 0 || x == null) {
          setTimeout(() => {}, 20);
          continue;
        }
        resolve();
        break;
      } catch (e) {
        reject(e);
      }
    }
  });
};

export const setValue = (client) => async (selector, value) => {
  await client.Runtime.evaluate({
    // React patches input field's setter so element.value = x doesn't work
    expression: `
        Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set.call(document.querySelector("${selector}"), ${value});
        document.querySelector("${selector}").dispatchEvent(new Event('change', { bubbles: true }));
      `,
  });
};

export const click = (client) => async (selector) => {
  await client.Runtime.evaluate({
    expression: `document.querySelector("${selector}").click();`,
  });
};

export const clickLast = (client) => async (selector) => {
  await client.Runtime.evaluate({
    expression: `let temp = document.querySelectorAll("${selector}"); temp[temp.length - 1].click();`,
  });
};
