# bpmn-js collapse/expand event subprocess

This [bpmn-js](https://github.com/bpmn-io/bpmn-js) extension adds a menu item into the popup menu of event subprocesses allowing to collapse/expand them.


## Use Extension

Extend your BPMN modeler with the module:

```javascript
import BpmnModeler from 'bpmn-js/lib/Modeler';

import CollapseEventSubProcessModule from 'bpmn-js-collapse-event-subprocess';

const modeler = new BpmnModeler({
  additionalModules: [
    CollapseEventSubProcessModule
  ]
});
```

## License

MIT licensed

Copyright (C) 2024 Asvin Goel
