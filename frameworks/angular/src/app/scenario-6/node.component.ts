import { Component, Input } from '@angular/core';

@Component({
  selector: 'sc6-node',
  templateUrl: './node.component.html',
})
export class Scenario6Node {
  @Input() branches: number[];
  @Input() subtreeDepth: number;

  count = 0;
  items = Array(10)
    .fill(null)
    .map((_, i) => ({
      id: i,
      nested: {
        nested: {
          nested: {
            nested: {
              nested: {
                nested: {
                  nested: {
                    nested: {
                      nested: {
                        nested: {
                          value0: 0,
                          value1: 1,
                          value2: 2,
                          value3: 3,
                          value4: 4,
                          value5: 5,
                          value6: 6,
                          value7: 7,
                          value8: 8,
                          value9: 9,
                        },

                        value0: 0,
                        value1: 1,
                        value2: 2,
                        value3: 3,
                        value4: 4,
                        value5: 5,
                        value6: 6,
                        value7: 7,
                        value8: 8,
                        value9: 9,
                      },

                      value0: 0,
                      value1: 1,
                      value2: 2,
                      value3: 3,
                      value4: 4,
                      value5: 5,
                      value6: 6,
                      value7: 7,
                      value8: 8,
                      value9: 9,
                    },

                    value0: 0,
                    value1: 1,
                    value2: 2,
                    value3: 3,
                    value4: 4,
                    value5: 5,
                    value6: 6,
                    value7: 7,
                    value8: 8,
                    value9: 9,
                  },
                  value0: 0,
                  value1: 1,
                  value2: 2,
                  value3: 3,
                  value4: 4,
                  value5: 5,
                  value6: 6,
                  value7: 7,
                  value8: 8,
                  value9: 9,
                },
                value0: 0,
                value1: 1,
                value2: 2,
                value3: 3,
                value4: 4,
                value5: 5,
                value6: 6,
                value7: 7,
                value8: 8,
                value9: 9,
              },
              value0: 0,
              value1: 1,
              value2: 2,
              value3: 3,
              value4: 4,
              value5: 5,
              value6: 6,
              value7: 7,
              value8: 8,
              value9: 9,
            },
            value0: 0,
            value1: 1,
            value2: 2,
            value3: 3,
            value4: 4,
            value5: 5,
            value6: 6,
            value7: 7,
            value8: 8,
            value9: 9,
          },
          value0: 0,
          value1: 1,
          value2: 2,
          value3: 3,
          value4: 4,
          value5: 5,
          value6: 6,
          value7: 7,
          value8: 8,
          value9: 9,
        },
        value0: 0,
        value1: 1,
        value2: 2,
        value3: 3,
        value4: 4,
        value5: 5,
        value6: 6,
        value7: 7,
        value8: 8,
        value9: 9,
      },
      value0: 0,
      value1: 1,
      value2: 2,
      value3: 3,
      value4: 4,
      value5: 5,
      value6: 6,
      value7: 7,
      value8: 8,
      value9: 9,
    }));

  increment() {
    this.count += 1;
  }

  trackBy(item) {
    return item.id;
  }
}
