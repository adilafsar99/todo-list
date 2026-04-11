import createBaseFields from './TaskListAndTaskFields.js'
import createBaseMethods from './TaskListAndTaskMethods.js'




const baseFields = createBaseFields('Play', 'high', '23-12-2026', false)
const baseMethods = createBaseMethods(baseFields)
console.log(baseFields)
console.log(baseMethods.getTitle())