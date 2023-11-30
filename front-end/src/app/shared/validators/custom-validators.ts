import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function expirationDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const currentDate = new Date();
        const expirationDate = new Date(control.value);

        return expirationDate < currentDate ? { 'expirationDateInvalid': true } : null;
    };
}