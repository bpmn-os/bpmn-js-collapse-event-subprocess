import inherits from 'inherits';

import {
  isExpanded
} from 'bpmn-js/lib/util/DiUtil';

import BpmnRenderer from 'bpmn-js/lib/draw/BpmnRenderer';

import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';


export default function CollapsedEventSubProcessDecorator(
    config, eventBus, styles, pathMap, canvas, textRenderer, modeling, elementRegistry) {

  BpmnRenderer.call(
    this,
    config, eventBus, styles,
    pathMap, canvas, textRenderer,
    1400
  );

  this.canRender = function(element) {
    var businessObject = getBusinessObject(element);

    if ( is(element, 'bpmn:SubProcess') && !businessObject.triggeredByEvent ) {
      return;
    }
    if ( !businessObject.$parent ) {
      return;
    }

    return ( !isExpanded(element) );
  };

  this.drawShape = function(parentNode, shape) {
    var bpmnShape = this.drawBpmnShape(parentNode, shape);

    const flowElements = shape.businessObject.flowElements;
    const startEvents = flowElements.filter(element => is(element, 'bpmn:StartEvent') );
    if ( startEvents.length != 1 ) {
      return bpmnShape;
    }

    const startEvent = elementRegistry.get(startEvents[0].id);
    if ( !startEvent.businessObject
      || !startEvent.businessObject.eventDefinitions
      || startEvent.businessObject.eventDefinitions.length == 0
    ) {
      return bpmnShape;
    }

    startEvent.width -=14;
    startEvent.height -=14;
    startEvent.offset =10;
    startEvent.x +=30;

    var startEventShape = this.drawBpmnShape(parentNode, startEvent );

    startEvent.width +=14;
    startEvent.height +=14;

    return bpmnShape;
  };

  eventBus.on("root.set", event => {
    if ( !event.element.businessObject ) {
      return;
    }
    for (let element of event.element.businessObject.flowElements ) {
      if ( is(element, 'bpmn:SubProcess') && element.triggeredByEvent ) {
        var shape = elementRegistry.get(element.id);
        modeling.updateProperties(shape, {} );
      }
    }
  });

}


inherits(CollapsedEventSubProcessDecorator, BpmnRenderer);

CollapsedEventSubProcessDecorator.prototype.drawBpmnShape = BpmnRenderer.prototype.drawShape;


CollapsedEventSubProcessDecorator.$inject = [
  'config.bpmnRenderer',
  'eventBus',
  'styles',
  'pathMap',
  'canvas',
  'textRenderer',
  'modeling',
  'elementRegistry'
];
