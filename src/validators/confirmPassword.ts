import { FormControl } from '@angular/forms';

export class ConfirmPasswordValidator {
    static isValid(control: FormControl): any {
        if(control.parent) {
            const password = control.parent.controls['password'].value;
            const confirmPassword = control.value;

            if(password !== confirmPassword) {
                return {
                    "passwordsDontMatch": true
                };
            }
        }
    }
}