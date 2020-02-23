/**
 * AASHError is the Error class for this project.
 * Refer to @leismore/lmerror <https://www.npmjs.com/package/@leismore/lmerror>
 *
 * Code           Message
 * 1              invalid credential
 */

import { LMError } from '@leismore/lmerror';
class    AASHError extends LMError {}
export { AASHError };
