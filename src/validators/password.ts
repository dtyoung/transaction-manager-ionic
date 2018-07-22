import { FormControl } from '@angular/forms';

export class PasswordValidator {
    static isValid(control: FormControl): any {
        if(control.value && control.value.length < 6) {
            return {
                "notLongEnough": true
            };
        }
    }
}