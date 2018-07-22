import { FormControl } from '@angular/forms';

export class PasswordValidator {
    static isValid(control: FormControl): any {
        console.log(control);
        if(control.value && control.value.length < 6) {
            return {
                "notLongEnough": true
            };
        }
    }
}