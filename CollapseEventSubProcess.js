import { is } from 'bpmn-js/lib/util/ModelUtil';

import {
  isExpanded
} from 'bpmn-js/lib/util/DiUtil';

import BpmnModeler from 'bpmn-js/lib/Modeler';

export default class CollapseEventSubProcess {
  constructor(popupMenu, modeling) {
    popupMenu.registerProvider("bpmn-replace", this);
    this.modeling = modeling;
  }

  getPopupMenuEntries(element) {
    if ( is(element, 'bpmn:SubProcess') && element.businessObject.triggeredByEvent ) {
      return{
        'collapse-event-subprocess': {
          label: 'Event sub-process ' + ( isExpanded(element) ? '(collapsed)' : '(expanded)' ),
          className: 'bpmn-icon-event-subprocess-expanded',
          action: () => this.toggleCollapse(element)
        }
      };
    }
  }

  toggleCollapse(element) {
    this.modeling.toggleCollapse(element);
  }

}

CollapseEventSubProcess.inject = [
  'popupMenu',
  'modeling'
];


