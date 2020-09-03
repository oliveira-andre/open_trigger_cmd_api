import create from './create';
import update from './update';
import destroy from './delete';

const createTriggerValidator = create;
const updateTriggerValidator = update;
const deleteTriggerValidator = destroy;

export {
  createTriggerValidator,
  updateTriggerValidator,
  deleteTriggerValidator,
}
