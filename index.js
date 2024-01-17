import CollapseEventSubProcess from './CollapseEventSubProcess';
import CollapsedEventSubProcessDecorator from './CollapsedEventSubProcessDecorator';

export default {
  __init__: [ 'collapseEventSubProcess', 'collapsedEventSubProcessDecorator' ],
  collapseEventSubProcess: [ 'type', CollapseEventSubProcess ],
  collapsedEventSubProcessDecorator: [ 'type', CollapsedEventSubProcessDecorator ]
};
